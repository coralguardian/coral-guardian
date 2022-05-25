<?php

namespace D4rk0snet\Coralguardian\API\Admin;

use D4rk0snet\Donation\Entity\DonationEntity;
use Hyperion\Doctrine\Service\DoctrineService;
use Hyperion\RestAPI\APIEnpointAbstract;
use Hyperion\RestAPI\APIManagement;
use WP_REST_Request;
use WP_REST_Response;

class SetAdoptionAsPaidEndPoint extends APIEnpointAbstract
{
    public const ORDER_UUID_PARAM = 'order_uuid';

    public static function callback(WP_REST_Request $request): WP_REST_Response
    {
        $orderUUID = $request->get_param(self::ORDER_UUID_PARAM);
        if ($orderUUID === null) {
            return APIManagement::APIError('Missing order uuid', 400);
        }

        /** @var DonationEntity $donation */
        $donation = DoctrineService::getEntityManager()->getRepository(DonationEntity::class)->find($orderUUID);
        if($donation === null) {
            return APIManagement::APINotFound();
        }

        $donation->setIsPaid(true);
        DoctrineService::getEntityManager()->flush();
        $_SESSION["success_notice"] = "Paiement validé avec succès.";

        return APIManagement::APIRedirect(get_admin_url(null, 'admin.php?page=coralguardian'));
    }

    public static function getMethods(): array
    {
        return ["GET"];
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
        return "adoption/setAsPaid";
    }
}