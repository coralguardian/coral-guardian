<?php

namespace D4rk0snet\Coralguardian\API\Admin;

use D4rk0snet\Adoption\Entity\GiftAdoption;
use D4rk0snet\Adoption\Service\AdoptionService;
use D4rk0snet\Coralguardian\Entity\CompanyCustomerEntity;
use D4rk0snet\Coralguardian\Entity\CustomerEntity;
use D4rk0snet\Donation\Models\DonationModel;
use D4rk0snet\NamingFileImport\Service\NamingFileService;
use D4rk0snet\NamingFileImport\Service\RecipientFileService;
use Hyperion\Doctrine\Service\DoctrineService;
use Hyperion\RestAPI\APIEnpointAbstract;
use Hyperion\RestAPI\APIManagement;
use WP_REST_Request;
use WP_REST_Response;

class CreateDonationAdmin extends APIEnpointAbstract
{
    /**
     * @todo: passer par le modele pour le customer
     */
    public static function callback(WP_REST_Request $request): WP_REST_Response
    {
        $data = $request->get_params();

        var_dump($data); die;

        if($data['customer']['type'] === "individual") {
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

        if($data['order']['type'] === "regular") {
            $adoptionModel = new DonationModel();
            $adoptionModel
                ->setPaymentMethod($data['order']['payment_method'])
                ->setAdoptedProduct($data['order']['product_key'])
                ->setCustomerUUID($customerEntity->getUuid())
                ->setLang($data['order']['lang'])
                ->setQuantity((int)$data['order']['quantity'])
                ->setAmount((float)$data['order']['price']);

            $adoption = AdoptionService::createAdoption($adoptionModel);
        } else {
            $giftAdoptionModel = new DonationModel();
            $giftAdoptionModel
                ->setAmount((float)$data['order']['price'])
                ->setQuantity((int)$data['order']['quantity'])
                ->setLang($data['order']['lang'])
                ->setCustomerUUID($customerEntity->getUuid())
                ->setAdoptedProduct($data['order']['product_key'])
                ->setPaymentMethod($data['order']['payment_method']);

            $adoption = AdoptionService::createGiftAdoption($giftAdoptionModel);
        }

        DoctrineService::getEntityManager()->persist($adoption);
        DoctrineService::getEntityManager()->flush();

        return APIManagement::APIRedirect(admin_url("admin.php?page=coralguardian"));
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
        return "donation/admin/create";
    }
}