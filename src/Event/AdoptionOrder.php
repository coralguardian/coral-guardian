<?php

namespace D4rk0snet\Coralguardian\Event;

use D4rk0snet\Coralguardian\Enums\SIBEvent;

class AdoptionOrder extends AbstractEmailEvent
{
    public static function send(
        string $email,
        string $lang,
        int $quantity,
        string $receiptFileUrl,
        string $nextStepUrl
    ) {
        self::sendQuery($email, compact('lang', 'quantity', 'receiptFileUrl', 'nextStepUrl'));
    }

    protected static function getEventName(): SIBEvent
    {
        return SIBEvent::ADOPTION_ORDER;
    }
}
