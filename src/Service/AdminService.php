<?php

namespace D4rk0snet\Coralguardian\Service;

use D4rk0snet\Adoption\Entity\AdoptionEntity;
use D4rk0snet\Adoption\Entity\GiftAdoption;
use D4rk0snet\Adoption\Enums\AdoptedProduct;
use D4rk0snet\Certificate\Endpoint\GetCertificateEndpoint;
use D4rk0snet\Coralguardian\API\Admin\CreateAdoptionAdmin;
use D4rk0snet\Coralguardian\API\Admin\CreateDonationAdmin;
use D4rk0snet\Coralguardian\API\Admin\SetAdoptionAsPaidEndPoint;
use D4rk0snet\Coralguardian\Entity\CompanyCustomerEntity;
use D4rk0snet\Donation\Entity\DonationEntity;
use D4rk0snet\Donation\Entity\RecurringDonationEntity;
use D4rk0snet\FiscalReceipt\Service\FiscalReceiptService;
use D4rk0snet\NamingFileImport\API\Admin\GetNamingFileEndPoint;
use D4rk0snet\NamingFileImport\API\Admin\GetRecipientsFileEndPoint;
use Hyperion\Doctrine\Service\DoctrineService;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;

class AdminService
{

    public const MENU_SLUG = "coralguardian";
    public const NEW_ADOPTION_MENU_SLUG = "coralguardian-create-adoption";
    public const NEW_DONATION_MENU_SLUG = "coralguardian-creation-donation";

    public static function init(): void
    {
        self::startSession();
    }

    public static function addTopMenu()
    {
        add_menu_page(
            'Suivi des dons et adoptions',
            'Adopte un corail',
            'manage_options',
            self::MENU_SLUG,
            [AdminService::class, 'coralOrdersPage'],
            null
        );

        add_submenu_page(
            self::MENU_SLUG,
            'Nouvelle adoption',
            'Nouvelle adoption',
            "manage_options",
            self::NEW_ADOPTION_MENU_SLUG,
            [AdminService::class, 'coralCreateAdoptionPage']
        );

        add_submenu_page(
            self::MENU_SLUG,
            'Nouveau don',
            'Nouveau don',
            "manage_options",
            self::NEW_DONATION_MENU_SLUG,
            [AdminService::class, 'coralCreateDonationPage']
        );
    }

    public static function coralOrdersPage()
    {
        $orderModels = self::getOrderModels();
        self::getTwig()->load("Admin/tracking.twig")->display([
          'items' => array_merge($orderModels),
            'assets_path' => home_url("/app/plugins/coralguardian/assets/", "http")
        ]);
    }

    public static function coralCreateAdoptionPage()
    {
        $products = [];

        foreach(AdoptedProduct::getAllAdoptedProduct() as $k => $v) {
            $products[] = [
                    'key' => $v,
                    'value' => $k
            ];
        }

        self::getTwig()->load("Admin/forms/create-adoption.twig")->display([
            'assets_path' => home_url("/app/plugins/coralguardian/assets/", "http"),
            'adoption_file' => GetNamingFileEndPoint::getUrl(),
            'recipient_file' => GetRecipientsFileEndPoint::getUrl(),
            "products" => $products,
            "action" => CreateAdoptionAdmin::getUrl()
        ]);
    }

    public static function coralCreateDonationPage()
    {
        self::getTwig()->load("Admin/forms/create-donation.twig")->display([
            'assets_path' => home_url("/app/plugins/coralguardian/assets/", "http"),
            "action" => CreateDonationAdmin::getUrl()
        ]);
    }

    public static function handleAdminNotices()
    {
        if (!empty($_SESSION["success_notice"])) {
            ?>
            <div class="updated notice">
                <p><?php echo $_SESSION["success_notice"] ?></p>
            </div>
            <?php
            unset($_SESSION["success_notice"]);
        } elseif (!empty($_SESSION["error_notice"])) {
            ?>
            <div class="error notice">
                <p><?php echo $_SESSION["error_notice"] ?></p>
            </div>
            <?php
            unset($_SESSION["error_notice"]);
        }
    }

    private static function getOrderModels()
    {
        $donations = DoctrineService::getEntityManager()->getRepository(DonationEntity::class)->findAll();

        return array_map(function (DonationEntity $donation) {
            $customer = $donation->getCustomer();
            $isDonation = !($donation instanceof AdoptionEntity || $donation instanceof GiftAdoption);

            switch(get_class($donation)) {
                case AdoptionEntity::class : $action = "Adoption"; break;
                case GiftAdoption::class : $action = "Cadeau"; break;
                case DonationEntity::class : $action = "Don ponctuel"; break;
                case RecurringDonationEntity::class : $action = "Don mensuel"; break;
                default:
                    throw new \Exception("Invalid donation class : ".get_class($donation));
            }

            $object = [
                "id" => (string) $donation->getUuid(),
                "date" => $donation->getDate()->format("d-m-Y"),
                "adoptionType" => $customer instanceof CompanyCustomerEntity ? "entreprise" : "particulier",
                "action" => $action,
                "product" => $isDonation ? "--" : __($donation->getAdoptedProduct()),
                "companyName" => $customer instanceof CompanyCustomerEntity ? $customer->getCompanyName() : "--",
                "name" => $customer->getFirstname().' '.$customer->getLastname(),
                "email" => $customer->getEmail(),
                "amount" => $isDonation ? "--" : $donation->getQuantity(),
                "price" => (string)$donation->getAmount(),
                "link" => "",//getenv('WP_HOME') . "/wp/wp-admin/post.php?post=" . $postId . "&action=edit",
                "isPaid" => $donation->isPaid() ? "Confirmé" : SetAdoptionAsPaidEndPoint::getUrl()."?".SetAdoptionAsPaidEndPoint::ORDER_UUID_PARAM."=".$donation->getUuid(),
            ];

            if(!$isDonation) {
                $object["certificate"] = GetCertificateEndpoint::getUrl()."?".GetCertificateEndpoint::ORDER_UUID_PARAM."=".$donation->getUuid();
                $object["receipt"] = "http://".FiscalReceiptService::getURl($donation->getUuid());

            } else {
                /** @todo : Pour un don mensuel qui s'étale sur 2 années il y aura 2 reçus fiscaux */
                $object["receipt"] = "http://".FiscalReceiptService::getURl($donation->getUuid());
            }

            return $object;

        }, $donations);
    }

    private static function startSession()
    {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
    }

    private static function getTwig(): Environment
    {
        $loader = new FilesystemLoader(__DIR__."/../Template");
        return new Environment($loader);
    }
}
