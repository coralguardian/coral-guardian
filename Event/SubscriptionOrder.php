<?php

namespace D4rk0snet\Coralguardian\Event;

use D4rk0snet\Coralguardian\Enums\SIBEvent;

class SubscriptionOrder extends AbstractEmailEvent
{
    public static function send(
        string $email,
        string $lang
    ) {
        self::sendQuery($email, compact('lang'));
    }

    protected static function getEventName(): SIBEvent
    {
        return SIBEvent::SUBSCRIPTION;
    }
}
