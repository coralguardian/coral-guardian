<?php

namespace D4rk0snet\Coralguardian\Event;

use D4rk0snet\Adoption\Entity\AdoptionEntity;
use D4rk0snet\Adoption\Enums\AdoptedProduct;
use D4rk0snet\Certificate\Service\CertificateService;
use D4rk0snet\Coralguardian\Enums\Language;
use D4rk0snet\Coralguardian\Enums\SIBEvent;
use D4rk0snet\FiscalReceipt\Service\FiscalReceiptService;

class NamingDone extends AbstractEmailEvent
{
    private static function send(string         $email,
                                Language       $lang,
                                AdoptedProduct $adoptedProduct,
                                int            $quantity,
                                string         $fiscalReceiptUrl,
                                string         $certificateUrl)
    {
        self::sendQuery($email, compact('lang', 'adoptedProduct', 'quantity', 'fiscalReceiptUrl', 'certificateUrl'));
    }

    public static function sendEvent(AdoptionEntity $adoptionOrder)
    {
        self::send(
            email: $adoptionOrder->getCustomer()->getEmail(),
            lang: $adoptionOrder->getLang(),
            adoptedProduct: $adoptionOrder->getAdoptedProduct(),
            quantity: $adoptionOrder->getQuantity(),
            fiscalReceiptUrl: FiscalReceiptService::getUrl($adoptionOrder->getUuid()),
            certificateUrl: CertificateService::getUrl($adoptionOrder->getUuid())
        );
    }

    protected static function getEventName(): SIBEvent
    {
        return SIBEvent::NAMING_DONE;
    }
}