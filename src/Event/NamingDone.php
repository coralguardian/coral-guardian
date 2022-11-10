<?php

namespace D4rk0snet\Coralguardian\Event;

use D4rk0snet\Adoption\Entity\AdoptionEntity;
use D4rk0snet\Adoption\Enums\AdoptedProduct;
use D4rk0snet\Certificate\Service\CertificateService;
use D4rk0snet\Coralguardian\Enums\Language;
use D4rk0snet\Coralguardian\Enums\SIBEvent;
use D4rk0snet\FiscalReceipt\Service\FiscalReceiptService;
use D4rk0snet\GiftCode\Entity\GiftCodeEntity;

class NamingDone extends AbstractEmailEvent
{
    private static function send(string         $email,
                                 Language       $lang,
                                 AdoptedProduct $adoptedProduct,
                                 int            $quantity,
                                 string         $fiscalReceiptUrl,
                                 string         $certificateUrl,
                                 bool           $fromGift,
                                 string         $project)
    {
        self::sendQuery($email, compact('project','lang', 'adoptedProduct', 'quantity', 'fiscalReceiptUrl', 'certificateUrl', 'fromGift'));
    }

    public static function sendEvent(mixed $entity)
    {
        if ($entity instanceof GiftCodeEntity) {
            $adoption = $entity->getGiftAdoption();
            self::send(
                email: $entity->getFriend()->getFriendEmail(),
                lang: $adoption->getLang(),
                adoptedProduct: $adoption->getAdoptedProduct(),
                quantity: $entity->getProductQuantity(),
                fiscalReceiptUrl: "",
                certificateUrl: CertificateService::getUrl($entity->getGiftCode(), true),
                fromGift: 1,
                project: $entity->getGiftAdoption()->getProject()->value
            );
        } else {
            self::send(
                email: $entity->getCustomer()->getEmail(),
                lang: $entity->getLang(),
                adoptedProduct: $entity->getAdoptedProduct(),
                quantity: $entity->getQuantity(),
                fiscalReceiptUrl: FiscalReceiptService::getUrl($entity->getUuid()),
                certificateUrl: CertificateService::getUrl($entity->getUuid()),
                fromGift: 0,
                project: $entity->getGiftAdoption()->getProject()->value
            );
        }

    }

    protected static function getEventName(): SIBEvent
    {
        return SIBEvent::NAMING_DONE;
    }
}