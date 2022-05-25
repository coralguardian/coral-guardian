<?php

namespace D4rk0snet\Coralguardian\API\Admin;

use D4rk0snet\Adoption\Entity\AdoptionEntity;
use D4rk0snet\Adoption\Entity\GiftAdoption;
use D4rk0snet\Adoption\Enums\AdoptedProduct;
use D4rk0snet\Coralguardian\Entity\CompanyCustomerEntity;
use D4rk0snet\Coralguardian\Entity\CustomerEntity;
use D4rk0snet\Coralguardian\Enums\Language;
use D4rk0snet\Donation\Enums\PaymentMethod;
use D4rk0snet\NamingFileImport\Service\NamingFileService;
use D4rk0snet\NamingFileImport\Service\RecipientFileService;
use Hyperion\Doctrine\Service\DoctrineService;
use Hyperion\RestAPI\APIEnpointAbstract;
use Hyperion\RestAPI\APIManagement;
use WP_REST_Request;
use WP_REST_Response;

class CreateAdoptionAdmin extends APIEnpointAbstract
{
    public static function callback(WP_REST_Request $request): WP_REST_Response
    {
        $data = $request->get_params();
        if($data['customer']['type'] === "individual") {
            $customerEntity = new CustomerEntity(
                address: $data['customer']['address'],
                city: $data['customer']['city'],
                country: $data['customer']['country'],
                email: $data['customer']['email'],
                postalCode: $data['customer']['postal_code'],
                firstname: $data['customer']['first_name'],
                lastname: $data['customer']['lastname']
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
                lastname: $data['customer']['lastname']
            );
        }

        DoctrineService::getEntityManager()->persist($customerEntity);

        if($data['customer']['order']['type'] === "regular") {
            $adoption = new AdoptionEntity(
                customer: $customerEntity,
                date: new \DateTime(),
                amount: (float)$data['order']['price'],
                lang: Language::from($data['order']['lang']),
                adoptedProduct: AdoptedProduct::from($data['order']['product_key']),
                quantity: (int)$data['order']['quantity'],
                paymentMethod: PaymentMethod::from($data['order']['payment_method']),
                isPaid: true
            );
        } else {
            $adoption = new GiftAdoption(
                customer: $customerEntity,
                date: new \DateTime(),
                amount: (float)$data['order']['price'],
                lang: Language::from($data['order']['lang']),
                adoptedProduct: AdoptedProduct::from($data['order']['product_key']),
                quantity: (int)$data['order']['quantity'],
                paymentMethod: PaymentMethod::from($data['order']['payment_method']),
                isPaid: true,
                sendOn: null,
                message: $data['order']['message']
            );
        }

        DoctrineService::getEntityManager()->persist($adoption);
        DoctrineService::getEntityManager()->flush();

        $adoptionFilename = self::saveFileFromRequest($_FILES["file"]["tmp_name"]['adoptions']);
        NamingFileService::importDataFromFile($adoptionFilename, $adoption);

        if($adoption instanceof GiftAdoption) {
            $recipientFilename = self::saveFileFromRequest($_FILES["file"]["tmp_name"]['recipients']);
            RecipientFileService::importDataFromFile($recipientFilename, $adoption);
        }

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
        if(current_user_can('manage_options')) {
            return "__return_true";
        }

        return "__return_false";
    }

    public static function getEndpoint(): string
    {
        return "adoption/admin/create";
    }
}