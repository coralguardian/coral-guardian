<?php

namespace D4rk0snet\Coralguardian\Shortcodes;

class DepositFormShortcode extends AbstractFormShortcode
{
    public static function getTag(): string
    {
        return "deposit-form";
    }

    public static function getId(): string
    {
        return "deposit-form";
    }

    protected static function getAttributes(array $atts): array
    {
        return [];
    }
}
