<?php

namespace D4rk0snet\Coralguardian\Event;

use D4rk0snet\Coralguardian\Enums\Language;
use D4rk0snet\Coralguardian\Enums\SIBEvent;

class ScheduledCodeSentEvent extends AbstractEmailEvent
{
    public static function send(string   $email,
                                Language $lang,
                                int      $quantity)
    {
        self::sendQuery($email, compact('lang', 'quantity'));
    }

    protected static function getEventName(): SIBEvent
    {
        return SIBEvent::SCHEDULED_GIF_CODE_SENT;
    }
}