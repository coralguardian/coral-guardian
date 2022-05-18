<?php

namespace D4rk0snet\Coralguardian\Shortcodes;

interface ShortcodeInterface
{
    static function getTag(): string;
    static function getId(): string;
}