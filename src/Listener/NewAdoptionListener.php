<?php

namespace D4rk0snet\Coralguardian\Listener;

use D4rk0snet\Adoption\Entity\AdoptionEntity;
use D4rk0snet\Adoption\Models\AdoptionModel;
use D4rk0snet\Coralguardian\Event\AdoptionOrder;
use D4rk0snet\Coralguardian\Event\NamingDone;

class NewAdoptionListener
{
    public static function doAction(AdoptionModel $adoptionModel, AdoptionEntity $adoptionEntity)
    {
        // Envoie du mail
        AdoptionOrder::sendEvent($adoptionEntity);

        // Est ce que le nommage a déjà eu lieu ?
        // Si oui on envoi direct l'évènement naming_done
        if(count($adoptionEntity->getAdoptees())) {
            NamingDone::sendEvent($adoptionEntity);
        }
    }
}