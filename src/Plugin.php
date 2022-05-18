<?php

namespace D4rk0snet\Coralguardian;

use D4rk0snet\Coralguardian\Service\ShortcodeService;
use D4rk0snet\Coralguardian\Shortcodes\CoralAdoptionFormShortcode;
use D4rk0snet\Coralguardian\Shortcodes\FullFormShortcode;

class Plugin
{
    public static function launchActions(): void
    {
        ShortcodeService::registerShortcode(CoralAdoptionFormShortcode::class);
        ShortcodeService::registerShortcode(FullFormShortcode::class);
    }
}