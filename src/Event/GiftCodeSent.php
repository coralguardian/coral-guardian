<?php

namespace D4rk0snet\Coralguardian\Event;

use D4rk0snet\Adoption\Enums\AdoptedProduct;
use D4rk0snet\Coralguardian\Enums\Language;
use D4rk0snet\Coralguardian\Enums\SIBEvent;
use D4rk0snet\GiftCode\Entity\GiftCodeEntity;

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

    public static function sendEvent(GiftCodeEntity $giftAdoption, int $quantity = null)
    {
        self::send(
            email: $giftAdoption->getFriend()->getFriendEmail(),
            lang: $giftAdoption->getGiftAdoption()->getLang(),
            product: $giftAdoption->getGiftAdoption()->getAdoptedProduct(),
            message: $giftAdoption->getGiftAdoption()->getMessage(),
            giftCode: $giftAdoption->getGiftCode(),
            friendName: $giftAdoption->getFriend()->getFriendFirstname() . " " . $giftAdoption->getFriend()->getFriendLastname(),
            quantity: $quantity ?? $giftAdoption->getGiftAdoption()->getQuantity()
        );
    }

    protected static function getEventName(): SIBEvent
    {
        return SIBEvent::FRIEND_GIF_CODE_SENT;
    }
}