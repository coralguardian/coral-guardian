<?php

namespace D4rk0snet\Coralguardian\Shortcodes;

class FullFormShortcode extends AbstractFormShortcode
{
    public function getTag(): string
    {
        return "full-form";
    }

    protected function getId()
    {
        return "full-form";
    }

    protected function getAttributes(array $atts): array
    {
        $attributes = [];
        return $attributes;
    }
}
