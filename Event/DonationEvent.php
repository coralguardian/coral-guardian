<?php

namespace D4rk0snet\Coralguardian\Event;

use D4rk0snet\Coralguardian\Enums\SIBEvent;

class DonationEvent extends AbstractEmailEvent
{
    public static function send(
        string $email,
        string $fiscalReceiptUrl,
        string $lang
    ) {
        self::sendQuery($email, compact('lang', 'fiscalReceiptUrl'));
    }

    protected static function getEventName(): SIBEvent
    {
        return SIBEvent::DONATION;
    }
}
