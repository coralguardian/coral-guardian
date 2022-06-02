<?php

namespace D4rk0snet\Coralguardian\Event;

use D4rk0snet\Adoption\Entity\AdoptionEntity;
use D4rk0snet\Coralguardian\Enums\Language;
use D4rk0snet\Coralguardian\Enums\SIBEvent;

class RecipientDone extends AbstractEmailEvent
{
    private static function send(string $email, Language $language)
    {
        self::sendQuery($email, compact('language'));
    }

    public static function sendEvent(AdoptionEntity $adoptionEntity)
    {
        self::send(
            $adoptionEntity->getCustomer()->getEmail(),
            $adoptionEntity->getLang());
    }

    protected static function getEventName(): SIBEvent
    {
        return SIBEvent::RECIPIENT_DONE;
    }
}