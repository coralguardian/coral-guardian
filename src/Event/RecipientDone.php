<?php

namespace D4rk0snet\Coralguardian\Event;

use D4rk0snet\Adoption\Entity\AdoptionEntity;
use D4rk0snet\Adoption\Enums\AdoptedProduct;
use D4rk0snet\Coralguardian\Enums\Language;
use D4rk0snet\Coralguardian\Enums\SIBEvent;

class RecipientDone extends AbstractEmailEvent
{
    private static function send(
        string $email,
        Language $lang,
        AdoptedProduct $adoptedProduct,
        int $quantity
    )
    {
        self::sendQuery($email, compact('lang', 'adoptedProduct', 'quantity'));
    }

    public static function sendEvent(AdoptionEntity $adoptionEntity)
    {
        self::send(
            $adoptionEntity->getCustomer()->getEmail(),
            $adoptionEntity->getLang(),
            $adoptionEntity->getAdoptedProduct(),
            $adoptionEntity->getQuantity()
        );
    }

    protected static function getEventName(): SIBEvent
    {
        return SIBEvent::RECIPIENT_DONE;
    }
}