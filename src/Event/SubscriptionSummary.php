<?php

namespace D4rk0snet\Coralguardian\Event;

use D4rk0snet\Coralguardian\Enums\SIBEvent;
use D4rk0snet\Donation\Entity\RecurringDonationEntity;
use D4rk0snet\FiscalReceipt\Endpoint\GetFiscalReceiptEndpoint;

/**
 * @todo : PEnser a modifier le service fiscal receipt pour gérer les subscriptions !
 * @todo : gérer les reçus fiscaux pour les dons mensuels
 */
class SubscriptionSummary extends AbstractEmailEvent
{
    private static function send(
        string $email,
        string $lang,
        string $fiscalReceiptUrl,
        string $project
    ) {
        self::sendQuery($email, compact('project','lang', 'fiscalReceiptUrl'));
    }

    public static function sendEvent(RecurringDonationEntity $entity)
    {
        self::send(
            email: $entity->getCustomer()->getEmail(),
            lang: $entity->getLang()->value,
            fiscalReceiptUrl: GetFiscalReceiptEndpoint::getUrl([GetFiscalReceiptEndpoint::ORDER_UUID_PARAM => $entity->getUuid()]),
            project: $entity->getProject()->value
        );
    }

    protected static function getEventName(): SIBEvent
    {
        return SIBEvent::SUBSCRIPTION_SUMMARY;
    }
}
