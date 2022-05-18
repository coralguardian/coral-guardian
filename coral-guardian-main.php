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
add_filter(\Hyperion\Doctrine\Plugin::ADD_ENTITIES_FILTER, function (array $entityPaths) {
    $entityPaths[] = __DIR__."/src/Entity";

    return $entityPaths;
});
//new \D4rk0snet\Coralguardian\Shortcodes\FullFormShortcode();
//new \D4rk0snet\Coralguardian\Shortcodes\CoralAdoptionFormShortcode();
