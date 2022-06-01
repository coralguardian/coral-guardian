<?php

namespace D4rk0snet\Coralguardian\Event;

use D4rk0snet\Coralguardian\Enums\Language;
use D4rk0snet\Coralguardian\Enums\SIBEvent;
use D4rk0snet\Donation\Entity\DonationEntity;

class BankTransferPayment extends AbstractEmailEvent
{
    private static function send(string $email,
                                Language $lang)
    {
        self::sendQuery($email, compact('lang'));
    }

    protected static function getEventName(): SIBEvent
    {
        return SIBEvent::BANK_TRANSFER_PAYMENT;
    }

    public static function sendEvent(DonationEntity $donation)
    {
        self::send($donation->getCustomer()->getEmail(), $donation->getLang());
    }
}