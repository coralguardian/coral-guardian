<?php
/**
 * Plugin Name: Adopte un corail / Main plugin
 * Plugin URI:
 * Description: Gestion client des plugins "Adopte un corail"
 * Version: 0.1
 * Requires PHP: 8.1
 * Author: Benoit DELBOE & Grégory COLLIN
 * Author URI:
 * Licence: GPLv2
 */
add_action('plugins_loaded', [\D4rk0snet\Coralguardian\Plugin::class, "launchActions"]);
add_action('admin_menu', [\D4rk0snet\Coralguardian\Service\AdminService::class, "addTopMenu"]);
add_action("admin_notices", [\D4rk0snet\Coralguardian\Service\AdminService::class, "handleAdminNotices"]);
add_action("init", [\D4rk0snet\Coralguardian\Service\AdminService::class, "init"]);
add_action('cli_init', [\D4rk0snet\Coralguardian\Plugin::class,'addCliCommand']);