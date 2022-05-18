<?php

namespace D4rk0snet\Coralguardian\Shortcodes;

class ReefAdoptionFormShortcode extends AbstractFormShortcode
{
    public static function getTag(): string
    {
        return "reef-adoption-form";
    }

    public static function getId(): string
    {
        return "reef-form";
    }

    protected static function getAttributes(array $atts): array
    {
        $attributes = [];
        if(array_key_exists("fiscal_type", $atts)) {
            $attributes[] = ["data-initial-fiscal-type" => $atts["fiscal_type"]];
        }
        return $attributes;
    }
}
