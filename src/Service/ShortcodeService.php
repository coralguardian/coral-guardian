<?php

namespace D4rk0snet\Coralguardian\Service;

class ShortcodeService
{
    public static function registerShortcode(string $shortCodeClass): void
    {
        add_action("init", [$shortCodeClass, "onInit"]);
        add_shortcode($shortCodeClass::getTag(), [$shortCodeClass, 'getCallback']);
    }
}