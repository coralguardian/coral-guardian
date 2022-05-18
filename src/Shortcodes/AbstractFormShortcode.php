<?php

namespace D4rk0snet\Coralguardian\Shortcodes;

use DirectoryIterator;

abstract class AbstractFormShortcode implements ShortcodeInterface
{
    public static function onInit()
    {
        self::getScripts();
        self::getStyles();
    }

    protected static function getScripts(): void
    {
        $basePath = plugin_dir_url("coral-guardian-main.php") . "coralguardian/assets/";
        wp_enqueue_script('vue', $basePath . 'node_modules/vue/dist/vue.min.js', null, null, true);
        self::loadHashedStylesAndScripts("js");
        wp_enqueue_script('stripe', "https://js.stripe.com/v3/", null, null);
        wp_localize_script("app", "siteLocale", [get_locale()]);
        wp_localize_script("app", "publicPath", [$basePath]);
    }

    protected static function getStyles(): void
    {
        self::loadHashedStylesAndScripts("css");
        wp_enqueue_style('mdi', "https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css", [], null);
        wp_enqueue_style('police', "https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600&display=swap", [], null);
    }

    protected static function getAttributes(array $atts): array
    {
        return [];
    }

    public static function getCallback($atts): string
    {
        $content = "<div id='" . static::getId() . "'";

        if (is_array($atts)) {
            foreach (self::getAttributes($atts) as $key => $attribute) {
                $content .= " $key='$attribute'";
            }
        }

        return $content . "></div>";
    }

    private static function loadHashedStylesAndScripts(string $type)
    {
        $filesPath = plugin_dir_path(__FILE__) . "../../assets/dist/$type";
        $dir = new DirectoryIterator($filesPath);
        $fileNames = [];

        foreach ($dir as $file) {
            if (pathinfo($file, PATHINFO_EXTENSION) === $type) {
                $fileNames[] = basename($file);    // main.3hZ9.$type
            }
        }

        // Hack to be sure that app files are enqueued on last so they properly override vendors ones
        foreach ($fileNames as $fullName) {
            $name = self::getNameOfFileWithoutHash($fullName);
            if ($name === 'chunk-vendors') {
                self::enqueueFileBasedOnType($type, $name, $fullName);
            }
        }

        foreach ($fileNames as $fullName) {
            $name = self::getNameOfFileWithoutHash($fullName);
            if ($name === 'app') {
                self::enqueueFileBasedOnType($type, $name, $fullName);
            }
        }
    }

    private static function getNameOfFileWithoutHash(string $fullName)
    {
        return substr(basename($fullName), 0, strpos(basename($fullName), '.')); // main
    }

    private static function enqueueFileBasedOnType(string $type, string $name, string $fullName)
    {
        switch ($type) {
            case "js":
                wp_enqueue_script($name, plugin_dir_url(__FILE__) . '../../assets/dist/js/' . $fullName, [], null, true);
                break;
            case "css":
                wp_enqueue_style($name, plugin_dir_url(__FILE__) . '../../assets/dist/css/' . $fullName, [], null, null);
                break;
            default:
                break;
        }
    }
}
