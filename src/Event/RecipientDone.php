<?php

namespace D4rk0snet\Coralguardian\Event;

use D4rk0snet\Coralguardian\Enums\Language;
use D4rk0snet\Coralguardian\Enums\SIBEvent;

class RecipientDone extends AbstractEmailEvent
{
    public static function send(string $email, Language $language)
    {
        self::sendQuery($email, compact('language'));
    }

    protected static function getEventName(): SIBEvent
    {
        return SIBEvent::RECIPIENT_DONE;
    }
}