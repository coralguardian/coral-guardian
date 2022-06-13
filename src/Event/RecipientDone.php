<?php

namespace D4rk0snet\Coralguardian\Event;

use D4rk0snet\Adoption\Entity\AdoptionEntity;
use D4rk0snet\Adoption\Entity\GiftAdoption;
use D4rk0snet\Adoption\Enums\AdoptedProduct;
use D4rk0snet\Coralguardian\Enums\Language;
use D4rk0snet\Coralguardian\Enums\SIBEvent;
use DateTime;

class RecipientDone extends AbstractEmailEvent
{
    private static function send(
        string $email,
        Language $lang,
        AdoptedProduct $adoptedProduct,
        int $quantity,
        ?DateTime $giftDate
    )
    {
        self::sendQuery($email,
            array_merge(
                compact('lang', 'adoptedProduct', 'quantity'),
                [
                    "giftDate" => $giftDate ? $giftDate->format("d/m/Y") : "",
                    "isToday" => $giftDate === null
                ])
        );
    }

    public static function sendEvent(GiftAdoption $adoptionEntity)
    {
        self::send(
            $adoptionEntity->getCustomer()->getEmail(),
            $adoptionEntity->getLang(),
            $adoptionEntity->getAdoptedProduct(),
            $adoptionEntity->getQuantity(),
            $adoptionEntity->getSendOn()
        );
    }

    protected static function getEventName(): SIBEvent
    {
        return SIBEvent::RECIPIENT_DONE;
    }
}