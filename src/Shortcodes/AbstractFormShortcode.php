<?php

namespace D4rk0snet\Coralguardian\Shortcodes;

use DirectoryIterator;

abstract class AbstractFormShortcode
{
    abstract protected function getId();
    private string $basePath;

    public function __construct()
    {
        $this->basePath = plugin_dir_url("coral-adoption.php") . "coral-adoption/assets/";
        add_action("init", [$this, "onInit"]);
    }

    public function onInit()
    {
        $this->getScripts();
        $this->getStyles();
    }

    protected function getScripts(): void
    {
        wp_enqueue_script('vue', $this->basePath . 'node_modules/vue/dist/vue.min.js', null, null, true);
        $this->loadHashedStylesAndScripts("js");
//        wp_enqueue_script('app', $this->basePath . 'dist/js/app.js', [], null, true);
//        wp_enqueue_script('vendor', $this->basePath . 'dist/js/chunk-vendors.js', [], null, true);
        wp_enqueue_script('stripe', "https://js.stripe.com/v3/", null, null);
        wp_localize_script("app", "siteLocale", [get_locale()]);
        wp_localize_script("app", "publicPath", [$this->basePath]);
    }

    protected function getStyles(): void
    {
        $this->loadHashedStylesAndScripts("css");
//        wp_enqueue_style('app', $this->basePath . 'dist/css/app.css', [], null);
//        wp_enqueue_style('vendor', $this->basePath . 'dist/css/chunk-vendors.css', [], null);
        wp_enqueue_style('mdi', "https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css", [], null);
        wp_enqueue_style('police', "https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600&display=swap", [], null);
    }

    protected function getAttributes(array $atts): array
    {
        return [];
    }

    public function getCallback($atts): string
    {
        $content = "<div id='{$this->getId()}'";

        if (is_array($atts)) {
            foreach ($this->getAttributes($atts) as $key => $attribute) {
                $content .= " $key='$attribute'";
            }
        }

        return $content . "></div>";
    }

    private function loadHashedStylesAndScripts(string $type)
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
            $name = $this->getNameOfFileWithoutHash($fullName);
            if ($name === 'chunk-vendors') {
                $this->enqueueFileBasedOnType($type, $name, $fullName);
            }
        }

        foreach ($fileNames as $fullName) {
            $name = $this->getNameOfFileWithoutHash($fullName);
            if ($name === 'app') {
                $this->enqueueFileBasedOnType($type, $name, $fullName);
            }
        }
    }

    private function getNameOfFileWithoutHash(string $fullName)
    {
        return substr(basename($fullName), 0, strpos(basename($fullName), '.')); // main
    }

    private function enqueueFileBasedOnType(string $type, string $name, string $fullName)
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
