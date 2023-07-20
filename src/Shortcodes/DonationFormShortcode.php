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
        return [];
    }
}
