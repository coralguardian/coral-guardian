<?php

namespace D4rk0snet\Coralguardian\Event;

use D4rk0snet\Coralguardian\Enums\SIBEvent;

class GiftOrder extends AbstractEmailEvent
{
    public static function send(
        string $email,
        string $lang,
        int $quantity,
        string $receiptFileUrl,
        string $nextStepUrl,
        bool $codeSentTofriend = false,
        bool $isCompany = false,
        array $codeToSend = []
    )
    {
        self::sendQuery($email, compact('lang', 'quantity', 'receiptFileUrl', 'nextStepUrl', 'codeSentTofriend', 'isCompany', 'codeToSend'));
    }

    protected static function getEventName(): SIBEvent
    {
        return SIBEvent::GIFT_ORDER;
    }
}