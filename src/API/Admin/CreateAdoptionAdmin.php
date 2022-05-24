<?php

namespace D4rk0snet\Coralguardian\API\Admin;

use Hyperion\RestAPI\APIEnpointAbstract;
use WP_REST_Request;
use WP_REST_Response;

class CreateAdoptionAdmin extends APIEnpointAbstract
{
    public static function callback(WP_REST_Request $request): WP_REST_Response
    {
        $data = $request->get_params();
        var_dump($data); die;
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