<?php

namespace D4rk0snet\Coralguardian\Event;

use D4rk0snet\Coralguardian\Enums\Language;
use D4rk0snet\Coralguardian\Enums\SIBEvent;
use D4rk0snet\Donation\Entity\DonationEntity;

class BankTransferPayment extends AbstractEmailEvent
{
    private static function send(string $email,
                                Language $lang,
                                string   $project)
    {
        self::sendQuery($email, compact('project','lang'));
    }

    protected static function getEventName(): SIBEvent
    {
        return SIBEvent::BANK_TRANSFER_PAYMENT;
    }

    public static function sendEvent(DonationEntity $donation)
    {
        self::send(
            email: $donation->getCustomer()->getEmail(),
            lang: $donation->getLang(),
            project: $donation->getProject()->value
        );
    }
}