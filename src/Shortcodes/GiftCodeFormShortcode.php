<?php

namespace D4rk0snet\Coralguardian\Shortcodes;

class GiftCodeFormShortcode extends AbstractFormShortcode
{
    public function getTag(): string
    {
        return "gift-code-form";
    }

    protected function getId()
    {
        return "gift-code-form";
    }

    protected function getAttributes(array $atts): array
    {
        return [];
    }
}
