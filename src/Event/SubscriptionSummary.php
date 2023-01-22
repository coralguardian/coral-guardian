<?php

namespace D4rk0snet\Coralguardian\Event;

use D4rk0snet\Coralguardian\Enums\SIBEvent;

class SubscriptionSummary extends AbstractEmailEvent
{
    private static function send(
        string $email,
        string $fiscalReceiptUrl
    ) {
        self::sendQuery($email, compact('fiscalReceiptUrl'));
    }

    public static function sendEvent(string $email, string $fiscalReceiptUrl)
    {
        self::send(
            email: $email,
            fiscalReceiptUrl: $fiscalReceiptUrl
        );
    }

    protected static function getEventName(): SIBEvent
    {
        return SIBEvent::SUBSCRIPTION_SUMMARY;
    }
}
