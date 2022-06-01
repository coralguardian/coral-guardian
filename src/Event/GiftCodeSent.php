<?php

namespace D4rk0snet\Coralguardian\Event;

use D4rk0snet\Adoption\Enums\AdoptedProduct;
use D4rk0snet\Coralguardian\Enums\Language;
use D4rk0snet\Coralguardian\Enums\SIBEvent;

// Envoie du code cadeau a un ami
class GiftCodeSent extends AbstractEmailEvent
{
    public static function send(string   $email,
                                Language $lang,
                                AdoptedProduct $product,
                                string $message,
                                string $giftCode,
                                string $friendName,
                                int    $quantity)
    {
        self::sendQuery($email, compact('lang', 'product', 'message', 'giftCode', 'friendName', 'quantity'));
    }

    protected static function getEventName(): SIBEvent
    {
        return SIBEvent::FRIEND_GIF_CODE_SENT;
    }
}