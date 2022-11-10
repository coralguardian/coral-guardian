<?php

namespace D4rk0snet\Coralguardian\Event;

use D4rk0snet\Coralguardian\Enums\SIBEvent;
use D4rk0snet\Donation\Entity\DonationEntity;
use D4rk0snet\FiscalReceipt\Service\FiscalReceiptService;

class DonationEvent extends AbstractEmailEvent
{
    private static function send(
        string $email,
        string $fiscalReceiptUrl,
        string $lang,
        string $project
    ) {
        self::sendQuery($email, compact('project','lang', 'fiscalReceiptUrl'));
    }

    protected static function getEventName(): SIBEvent
    {
        return SIBEvent::DONATION;
    }

    public static function sendEvent(DonationEntity $entity)
    {
        self::send(
            email: $entity->getCustomer()->getEmail(),
            fiscalReceiptUrl: FiscalReceiptService::getURl($entity->getUuid()),
            lang: $entity->getLang()->value,
            project: $entity->getProject()->value
        );
    }
}
