<?php

namespace D4rk0snet\Coralguardian\Event;

use D4rk0snet\Coralguardian\Enums\Language;
use D4rk0snet\Coralguardian\Enums\SIBEvent;

class BankTransferPayment extends AbstractEmailEvent
{
    public static function send(string $email,
                                Language $lang)
    {
        self::sendQuery($email, compact('lang'));
    }

    protected static function getEventName(): SIBEvent
    {
        return SIBEvent::BANK_TRANSFER_PAYMENT;
    }
}