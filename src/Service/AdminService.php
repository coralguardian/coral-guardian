<?php

namespace D4rk0snet\Coralguardian\Service;

use D4rk0snet\Adoption\Entity\AdoptionEntity;
use D4rk0snet\Adoption\Entity\GiftAdoption;
use D4rk0snet\Certificate\Endpoint\GetCertificateEndpoint;
use D4rk0snet\Coralguardian\Entity\CompanyCustomerEntity;
use D4rk0snet\FiscalReceipt\Service\FiscalReceiptService;
use Doctrine\ORM\EntityManagerInterface;
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
        //$donationModels = self::getDonationModels();
        self::getTwig()->load("Admin/tracking.twig")->display([
          'items' => $orderModels,
            'assets_path' => home_url("/app/plugins/coralguardian/assets/", "http")
        ]);
    }

    public static function coralCreateAdoptionPage()
    {
//        $products = DoctrineService::getEntityManager()->getRepository(Product::class)->findAll();
        self::getTwig()->load("Admin/forms/create-adoption.twig")->display([
            'assets_path' => home_url("/app/plugins/coralguardian/assets/", "http"),
            'adoption_file' => home_url("/app/plugins/coralguardian/public/coral-guardian-adoptees-admin.xlsx", "http"),
            'recipient_file' => home_url("/app/plugins/coralguardian/public/coral-guardian-recipients-admin.xlsx", "http"),
//            "products" => $products,
//            "action" => CreateAdoptionAdmin::getUrl()
        ]);
    }

    public static function coralCreateDonationPage()
    {
//        $projects = DoctrineService::getEntityManager()->getRepository(Project::class)->findAll();
        self::getTwig()->load("Admin/forms/create-donation.twig")->display([
            'assets_path' => home_url("/app/plugins/coralguardian/assets/", "http"),
//            "projects" => $projects,
//            "action" => CreateDonationAdmin::getUrl()
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
        $adoptionsEntities = DoctrineService::getEntityManager()->getRepository(AdoptionEntity::class)->findAll();
        $giftAdoptionEntities = DoctrineService::getEntityManager()->getRepository(GiftAdoption::class)->findBy([], ['uuid' => 'desc']);

        return array_map(function (AdoptionEntity $adoption) {
            $customer = $adoption->getCustomer();
            return [
                "id" => $adoption->getUuid(),
                "date" => $adoption->getDate(),
                "adoptionType" => $customer instanceof CompanyCustomerEntity ? "entreprise" : "particulier",
                "action" => $adoption instanceof GiftAdoption ? "cadeau" : "adoption",
                "product" => $adoption->getAdoptedProduct()->value,
                "companyName" => $customer instanceof CompanyCustomerEntity ? $customer->getCompanyName() : "--",
                "name" => $customer->getFirstname().' '.$customer->getLastname(),
                "email" => $customer->getEmail(),
                "amount" => $adoption->getQuantity(),
                "price" => (string)$adoption->getAmount(),
                "link" => "",//getenv('WP_HOME') . "/wp/wp-admin/post.php?post=" . $postId . "&action=edit",
                "isPaid" => $adoption->isPaid() ? "Confirmé" : "Non payé",
                "certificate" => "http://".GetCertificateEndpoint::getUrl()."?".GetCertificateEndpoint::ORDER_UUID_PARAM."=".$adoption->getUuid(),//GetCertificate::getUrl()."?order_id=" . $postId,
                "receipt" => "http://".FiscalReceiptService::getURl($adoption->getUuid())
            ];
        }, array_merge($adoptionsEntities,$giftAdoptionEntities));
    }

//    private function getDonationModels()
//    {
//        $donations = self::entityManager->getRepository(Donation::class)->findBy([], ['id' => 'desc']);
//
//        return array_map(function (Donation $donation) {
//            $customer = $donation->getCustomer();
//            $receipts = [];
//            // Pour un don mensuel qui s'étale sur 2 années il y aura 2 reçus fiscaux
//            /** @var FiscalReceipt $receipt */
//            foreach ($donation->getFiscalReceipts() as $receipt) {
//                $receipts[] = GetFiscalReceipt::getUrl() . "?receipt_id=" . $receipt->getPost()->getId();
//            }
//            return [
//                "id" => $donation->getId(),
//                "endDate" => $donation instanceof RecurrentDonation ? $donation->getStopDate() : null,
//                "date" => $donation->getStartDate(),
//                "adoptionType" => $customer instanceof Company ? "entreprise" : "particulier",
//                "action" => $donation instanceof RecurrentDonation ? "don mensuel" : "don ponctuel",
//                "product" => "--",
//                "companyName" => $customer instanceof Company ? $customer->getCompanyName() : "--",
//                "name" => $customer->getFullName(),
//                "email" => $customer->getEmail(),
//                "amount" => "--",
//                "price" => (string)$donation->getAmount(),
//                "link" => WP_HOME . "/wp/wp-admin/post.php?post=" . $donation->getPost()->getId() . "&action=edit",
//                "isPaid" => $donation->getPaymentMethod()->isPaid() ? "Confirmé" : "--",
//                "project" => $donation->getProject()->getCountry(),
//                "receipts" => $receipts
//            ];
//        }, $donations);
//    }

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
