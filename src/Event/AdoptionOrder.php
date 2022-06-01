<?php

namespace D4rk0snet\Coralguardian\Event;

use D4rk0snet\Adoption\Entity\AdoptionEntity;
use D4rk0snet\Adoption\Service\RedirectionService;
use D4rk0snet\Coralguardian\Entity\CompanyCustomerEntity;
use D4rk0snet\Coralguardian\Enums\SIBEvent;
use D4rk0snet\FiscalReceipt\Service\FiscalReceiptService;

class AdoptionOrder extends AbstractEmailEvent
{
    public static function send(
        string $email,
        string $lang,
        int $quantity,
        string $receiptFileUrl,
        string $nextStepUrl,
        bool $isCompany = false
    ) {
        self::sendQuery($email, compact('lang', 'quantity', 'receiptFileUrl', 'nextStepUrl', 'isCompany'));
    }

    protected static function getEventName(): SIBEvent
    {
        return SIBEvent::ADOPTION_ORDER;
    }

    public static function sendEvent(AdoptionEntity $entity)
    {
        self::send(
            email: $entity->getCustomer()->getEmail(),
            lang: $entity->getLang()->value,
            quantity: $entity->getQuantity(),
            receiptFileUrl: FiscalReceiptService::getURl($entity->getUuid()),
            nextStepUrl: RedirectionService::buildRedirectionUrl($entity),
            isCompany: $entity->getCustomer() instanceof CompanyCustomerEntity
        );
    }
}
