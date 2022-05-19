<?php

namespace D4rk0snet\Coralguardian\API;

use D4rk0snet\Coralguardian\Enums\CustomerType;
use D4rk0snet\Coralguardian\Model\CompanyCustomerModel;
use D4rk0snet\Coralguardian\Model\IndividualCustomerModel;
use D4rk0snet\Coralguardian\Service\CustomerService;
use Hyperion\RestAPI\APIEnpointAbstract;
use Hyperion\RestAPI\APIManagement;
use JsonMapper;
use WP_REST_Request;

/**
 * Endpoint pour la création d'une adoption mais qui n'a pas été encore payé.
 * @todo : Blinder en cas d'échec pour ne pas avoir d'inconsistence dans la bdd
 */
class CustomerEndpoint extends APIEnpointAbstract
{
    public static function callback(WP_REST_Request $request): \WP_REST_Response
    {
        $payload = json_decode($request->get_body(), false, 512, JSON_THROW_ON_ERROR);
        if ($payload === null) {
            return APIManagement::APIError("Invalid body content", 400);
        }

        try {
            $customerType = CustomerType::from($payload->type);
        } catch (\ValueError $exception) {
            return APIManagement::APIError("Undefined customer type", 400);
        }

        switch ($customerType) {
            case CustomerType::INDIVIDUAL:
                $model = new IndividualCustomerModel();
                break;
            case CustomerType::COMPANY:
                $model = new CompanyCustomerModel();
                break;
        }

        try {
            $mapper = new JsonMapper();
            $mapper->bExceptionOnMissingData = true;
            $customerModel = $mapper->map($payload, $model);
        } catch (\Exception $exception) {
            return APIManagement::APIError($exception->getMessage(), 400);
        }

        switch ($customerType) {
            case CustomerType::INDIVIDUAL:
                $uuid = CustomerService::createIndividualCustomer($customerModel)->getUuid();
                break;
            case CustomerType::COMPANY:
                $uuid = CustomerService::createCompanyCustomer($customerModel)->getUuid();
                break;
        }

        return APIManagement::APIOk([
            "uuid" => $uuid,
        ]);
    }

    public static function getMethods(): array
    {
        return ["POST"];
    }

    public static function getPermissions(): string
    {
        return "__return_true";
    }

    public static function getEndpoint(): string
    {
        return "customer";
    }
}
