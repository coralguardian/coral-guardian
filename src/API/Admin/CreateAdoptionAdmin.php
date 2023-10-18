<?php

namespace D4rk0snet\Coralguardian\API\Admin;

use D4rk0snet\Adoption\Entity\AdoptionEntity;
use D4rk0snet\Adoption\Entity\GiftAdoption;
use D4rk0snet\Adoption\Enums\AdoptedProduct;
use D4rk0snet\CoralCustomer\Entity\CompanyCustomerEntity;
use D4rk0snet\CoralCustomer\Entity\CustomerEntity;
use D4rk0snet\Coralguardian\Enums\Language;
use D4rk0snet\CoralOrder\Enums\PaymentMethod;
use D4rk0snet\CoralOrder\Enums\Project;
use D4rk0snet\GiftCode\Entity\GiftCodeEntity;
use D4rk0snet\GiftCode\Service\GiftCodeService;
use D4rk0snet\NamingFileImport\Service\NamingFileService;
use D4rk0snet\NamingFileImport\Service\RecipientFileService;
use Hyperion\Doctrine\Service\DoctrineService;
use Hyperion\RestAPI\APIEnpointAbstract;
use Hyperion\RestAPI\APIManagement;
use WP_REST_Request;
use WP_REST_Response;

class CreateAdoptionAdmin extends APIEnpointAbstract
{
    /**
     * @todo: passer par le modele pour le customer
     */
    public static function callback(WP_REST_Request $request): WP_REST_Response
    {
        $data = $request->get_params();
        if ($data['customer']['type'] === "individual") {
            $customerEntity = new CustomerEntity(
                address: $data['customer']['address'],
                city: $data['customer']['city'],
                country: $data['customer']['country'],
                email: $data['customer']['email'],
                postalCode: $data['customer']['postal_code'],
                firstname: $data['customer']['first_name'],
                lastname: $data['customer']['last_name']
            );
        } else {
            $customerEntity = new CompanyCustomerEntity(
                companyName: $data['customer']['company_name'],
                address: $data['customer']['address'],
                postalCode: $data['customer']['postal_code'],
                city: $data['customer']['city'],
                country: $data['customer']['country'],
                email: $data['customer']['email'],
                firstname: $data['customer']['first_name'],
                lastname: $data['customer']['last_name']
            );
        }

        DoctrineService::getEntityManager()->persist($customerEntity);

        /**
         * @todo : Attention ici on reprends les infos du customer.
         * @todo : L'idéal serait de permettre de modifier ces infos comme sur le front.
         */

        if ($data['order']['type'] === "regular") {
            $adoption = new AdoptionEntity(
                customer: $customerEntity,
                date: new \DateTime(),
                amount: (float)$data['order']['price'],
                lang: Language::from($data['order']['lang']),
                adoptedProduct: AdoptedProduct::from($data['order']['product_key']),
                quantity: (int)$data['order']['quantity'],
                paymentMethod: PaymentMethod::from($data['order']['payment_method']),
                isPaid: true,
                project: Project::from($data['donation']['project']),
                address: $data['customer']['address'],
                postalCode: $data['customer']['postal_code'],
                city: $data['customer']['city'],
                country: $data['customer']['country'],
                firstName: $data['customer']['first_name'],
                lastName: $data['customer']['last_name']
            );
        } else {
            $adoptedProduct = AdoptedProduct::from($data['order']['product_key']);
            $adoption = new GiftAdoption(
                customer: $customerEntity,
                date: new \DateTime(),
                amount: (float)$data['order']['price'],
                lang: Language::from($data['order']['lang']),
                adoptedProduct: $adoptedProduct,
                quantity: (int)$data['order']['quantity'],
                paymentMethod: PaymentMethod::from($data['order']['payment_method']),
                isPaid: true,
                sendToFriend: true,
                project: Project::from($data['donation']['project']),
                sendOn: null,
                message: null,
                address: $data['customer']['address'],
                postalCode: $data['customer']['postal_code'],
                city: $data['customer']['city'],
                country: $data['customer']['country'],
                firstName: $data['customer']['first_name'],
                lastName: $data['customer']['last_name']
            );

            for ($i = 0; $i < $adoption->getQuantity(); $i++) {
                $giftCode = new GiftCodeEntity(
                    giftCode: GiftCodeService::createGiftCode(bin2hex(random_bytes(20)), $adoptedProduct),
                    giftAdoption: $adoption,
                    productQuantity: 1
                );
                DoctrineService::getEntityManager()->persist($giftCode);
            }
        }

        DoctrineService::getEntityManager()->persist($adoption);
        DoctrineService::getEntityManager()->flush();

        $adoptionFilename = self::saveFileFromRequest($_FILES["file"]["tmp_name"]['adoptions']);
        NamingFileService::importDataFromFile($adoption->getUuid(), $adoptionFilename);

        if ($adoption instanceof GiftAdoption) {
            $recipientFilename = self::saveFileFromRequest($_FILES["file"]["tmp_name"]['recipients']);
            RecipientFileService::importDataFromFile($adoption->getUuid(), $recipientFilename);
        }
        $_SESSION["success_notice"] = "Adoption ajoutée avec succès.";

        return APIManagement::APIRedirect(admin_url("admin.php?page=coralguardian"));
    }

    private static function saveFileFromRequest(string $filePath)
    {
        $filename = tempnam("/tmp", "") . ".xlsx";
        move_uploaded_file($filePath, $filename);

        return $filename;
    }

    public static function getMethods(): array
    {
        return ["POST"];
    }

    public static function getPermissions(): string
    {
        if (current_user_can('manage_options')) {
            return "__return_true";
        }

        return "__return_false";
    }

    public static function getEndpoint(): string
    {
        return "adoption/admin/create";
    }
}