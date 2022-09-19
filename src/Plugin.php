<?php

namespace D4rk0snet\Coralguardian;

use D4rk0snet\Coralguardian\API\Admin\CreateAdoptionAdmin;
use D4rk0snet\Coralguardian\API\Admin\CreateDonationAdmin;
use D4rk0snet\Coralguardian\API\Admin\SetAdoptionAsPaidEndPoint;
use D4rk0snet\Coralguardian\API\CustomerEndpoint;
use D4rk0snet\Coralguardian\Service\ShortcodeService;
use D4rk0snet\Coralguardian\Shortcodes\CoralAdoptionFormShortcode;
use D4rk0snet\Coralguardian\Shortcodes\DonationFormShortcode;
use D4rk0snet\Coralguardian\Shortcodes\FullFormShortcode;
use D4rk0snet\Coralguardian\Shortcodes\GiftCodeFormShortcode;
use D4rk0snet\Coralguardian\Shortcodes\ReefAdoptionFormShortcode;
use WP_CLI;

class Plugin
{
    public static function launchActions(): void
    {
        ShortcodeService::registerShortcode(CoralAdoptionFormShortcode::class);
        ShortcodeService::registerShortcode(FullFormShortcode::class);
        ShortcodeService::registerShortcode(ReefAdoptionFormShortcode::class);
        ShortcodeService::registerShortcode(DonationFormShortcode::class);
        ShortcodeService::registerShortcode(GiftCodeFormShortcode::class);
        do_action(\Hyperion\RestAPI\Plugin::ADD_API_ENDPOINT_ACTION, new SetAdoptionAsPaidEndPoint());
        do_action(\Hyperion\RestAPI\Plugin::ADD_API_ENDPOINT_ACTION, new CreateAdoptionAdmin());
        do_action(\Hyperion\RestAPI\Plugin::ADD_API_ENDPOINT_ACTION, new CreateDonationAdmin());
    }

    public static function addCliCommand()
    {
        WP_CLI::add_command('migrate_old_site', ['\D4rk0snet\Coralguardian\Command\MigrationScript','runCommand']);
    }
}