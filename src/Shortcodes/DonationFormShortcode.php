<?php

namespace D4rk0snet\Coralguardian\Shortcodes;

class DonationFormShortcode extends AbstractFormShortcode
{
    public static function getTag(): string
    {
        return "donation-form";
    }

    public static function getId(): string
    {
        return "donation-form";
    }

    protected static function getAttributes(array $atts): array
    {
        $attributes = [];
        if(array_key_exists("fiscal_type", $atts)) {
            $attributes[] = ["data-initial-fiscal-type" => $atts["fiscal_type"]];
        }
        if(array_key_exists("donation_type", $atts)) {
            $attributes[] = ["data-initial-donation-type" => $atts["donation_type"]];
        }
        return $attributes;
    }
}
