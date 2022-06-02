<?php

namespace D4rk0snet\Coralguardian\Event;

use D4rk0snet\Adoption\Entity\Friend;
use D4rk0snet\Adoption\Enums\AdoptedProduct;
use D4rk0snet\Coralguardian\Enums\Language;
use D4rk0snet\Coralguardian\Enums\SIBEvent;

// Envoie du code cadeau a un ami
class GiftCodeSent extends AbstractEmailEvent
{
    private static function send(string   $email,
                                Language $lang,
                                AdoptedProduct $product,
                                string $message,
                                string $giftCode,
                                string $friendName,
                                int    $quantity)
    {
        self::sendQuery($email, compact('lang', 'product', 'message', 'giftCode', 'friendName', 'quantity'));
    }

    public static function sendEvent(Friend $friend, int $quantity = null)
    {
        self::send(
            email: $friend->getFriendEmail(),
            lang: $friend->getGiftAdoption()->getLang(),
            product: $friend->getGiftAdoption()->getAdoptedProduct(),
            message: $friend->getGiftAdoption()->getMessage(),
            giftCode: $friend->getGiftCode(),
            friendName: $friend->getFriendFirstname() . " " . $friend->getFriendLastname(),
            quantity: $quantity ?? $friend->getGiftAdoption()->getQuantity()
        );
    }

    protected static function getEventName(): SIBEvent
    {
        return SIBEvent::FRIEND_GIF_CODE_SENT;
    }
}