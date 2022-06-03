<?php

namespace D4rk0snet\Coralguardian\Event;

use D4rk0snet\Adoption\Entity\Friend;
use D4rk0snet\Coralguardian\Enums\Language;
use D4rk0snet\Coralguardian\Enums\SIBEvent;

class OwnerScheduledCodeSentNotificationEvent extends AbstractEmailEvent
{
    private static function send(string   $email,
                                Language $lang,
                                int      $quantity)
    {
        self::sendQuery($email, compact('lang', 'quantity'));
    }

    public static function sendEvent(Friend $friend)
    {
        self::send(
            email: $friend->getGiftCode()->getGiftAdoption()->getCustomer()->getEmail(),
            lang: $friend->getGiftCode()->getGiftAdoption()->getLang(),
            quantity: $friend->getGiftCode()->getGiftAdoption()->getQuantity()
        );
    }

    protected static function getEventName(): SIBEvent
    {
        return SIBEvent::OWNER_GIFT_CODE_SENT;
    }
}