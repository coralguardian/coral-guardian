<?php

namespace D4rk0snet\Coralguardian\Shortcodes;

class FullFormShortcode extends AbstractFormShortcode
{
    public static function getTag(): string
    {
        return "full-form";
    }

    public static function getId(): string
    {
        return "full-form";
    }

    protected static function getAttributes(array $atts): array
    {
        return [];
    }
}
