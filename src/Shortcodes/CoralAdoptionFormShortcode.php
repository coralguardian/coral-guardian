<?php

namespace D4rk0snet\Coralguardian\Shortcodes;

class CoralAdoptionFormShortcode extends AbstractFormShortcode
{
    public function getTag(): string
    {
        return "coral-adoption-form";
    }

    protected function getId()
    {
        return "coral-form";
    }

    protected function getAttributes(array $atts): array
    {
        $attributes = [];
        if(array_key_exists("fiscal_type", $atts)) {
            $attributes[] = ["data-initial-fiscal-type" => $atts["fiscal_type"]];
        }
        return $attributes;
    }
}
