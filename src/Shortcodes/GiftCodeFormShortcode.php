<?php

namespace D4rk0snet\Coralguardian\Shortcodes;

class GiftCodeFormShortcode extends AbstractFormShortcode
{
    public static function getTag(): string
    {
        return "gift-code-form";
    }

    public static function getId(): string
    {
        return "gift-code-form";
    }

    protected static function getAttributes(array $atts): array
    {
        return [];
    }
}
