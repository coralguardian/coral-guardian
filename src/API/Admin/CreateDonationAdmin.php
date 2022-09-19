<?php

namespace D4rk0snet\Coralguardian\API\Admin;

use D4rk0snet\CoralCustomer\Entity\CompanyCustomerEntity;
use D4rk0snet\Coralguardian\Entity\CustomerEntity;
use D4rk0snet\Donation\Enums\DonationRecurrencyEnum;
use D4rk0snet\Donation\Models\DonationModel;
use D4rk0snet\Donation\Service\DonationService;
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
        DoctrineService::getEntityManager()->flush();

        $donationModel = new DonationModel();
        $donationModel
            ->setAmount($data['donation']['amount'])
            ->setLang($data['donation']['lang'])
            ->setCustomerUUID($customerEntity->getUuid())
            ->setPaymentMethod($data['donation']['payment_method'])
            ->setDonationRecurrency(DonationRecurrencyEnum::ONESHOT->value)
            ->setDate(date_create_from_format("Y-m-d", $data['donation']['donation_date']));

        $donation = DonationService::createDonation($donationModel);
        $donation->setIsPaid(true);

        DoctrineService::getEntityManager()->persist($donation);
        DoctrineService::getEntityManager()->flush();
        $_SESSION["success_notice"] = "Don ajouté avec succès.";
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