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
                                AdoptedProduct $adoptedProduct,
                                string $message,
                                string $giftCode,
                                string $friendName,
                                int    $quantity)
    {
        self::sendQuery($email, compact('lang', 'adoptedProduct', 'message', 'giftCode', 'friendName', 'quantity'));
    }

    public static function sendEvent(GiftCodeEntity $giftCodeEntity, int $quantity = null)
    {
        self::send(
            email: $giftCodeEntity->getFriend()->getFriendEmail(),
            lang: $giftCodeEntity->getGiftAdoption()->getLang(),
            adoptedProduct: $giftCodeEntity->getGiftAdoption()->getAdoptedProduct(),
            message: $giftCodeEntity->getGiftAdoption()->getMessage(),
            giftCode: $giftCodeEntity->getGiftCode(),
            friendName: $giftCodeEntity->getFriend()->getFriendFirstname() . " " . $giftCodeEntity->getFriend()->getFriendLastname(),
            quantity: $quantity ?? $giftCodeEntity->getGiftAdoption()->getQuantity()
        );
    }

    protected static function getEventName(): SIBEvent
    {
        return SIBEvent::FRIEND_GIF_CODE_SENT;
    }
}