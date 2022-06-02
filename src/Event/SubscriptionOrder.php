<?php

namespace D4rk0snet\Coralguardian\Event;

use D4rk0snet\Coralguardian\Enums\SIBEvent;
use D4rk0snet\Donation\Entity\RecurringDonationEntity;

class SubscriptionOrder extends AbstractEmailEvent
{
    private static function send(
        string $email,
        string $lang
    ) {
        self::sendQuery($email, compact('lang'));
    }

    public static function sendEvent(RecurringDonationEntity $entity)
    {
        self::send(
            email: $entity->getCustomer()->getEmail(),
            lang: $entity->getLang()->value,
        );
    }

    protected static function getEventName(): SIBEvent
    {
        return SIBEvent::SUBSCRIPTION;
    }
}
