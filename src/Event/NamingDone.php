<?php

namespace D4rk0snet\Coralguardian\Event;

use D4rk0snet\Adoption\Enums\AdoptedProduct;
use D4rk0snet\Coralguardian\Enums\Language;
use D4rk0snet\Coralguardian\Enums\SIBEvent;

class NamingDone extends AbstractEmailEvent
{
    public static function send(string         $email,
                                Language       $lang,
                                AdoptedProduct $adoptionType,
                                int            $quantity,
                                string         $fiscalReceiptUrl,
                                string         $certificateUrl)
    {
        self::sendQuery($email, compact('lang', 'adoptionType', 'quantity', 'fiscalReceiptUrl', 'certificateUrl'));
    }

    protected static function getEventName(): SIBEvent
    {
        return SIBEvent::NAMING_DONE;
    }
}