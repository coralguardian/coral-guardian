<?php

namespace D4rk0snet\Coralguardian\Event;

use D4rk0snet\CoralAdoption\Enums\AdoptionType;
use D4rk0snet\Coralguardian\Enums\Language;
use D4rk0snet\Coralguardian\Enums\SIBEvent;

class GiftOrder extends AbstractEmailEvent
{
    public static function send(string       $email,
                                Language     $lang,
                                int          $quantity,
                                string       $fiscalReceiptLink,
                                AdoptionType $adoptionType)
    {
        self::sendQuery($email, compact('lang', 'quantity', 'fiscalReceiptLink', 'adoptionType'));
    }

    protected static function getEventName(): SIBEvent
    {
        return SIBEvent::GIFT_ORDER;
    }
}