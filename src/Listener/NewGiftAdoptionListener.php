<?php

namespace D4rk0snet\Coralguardian\Listener;

use D4rk0snet\Adoption\Entity\GiftAdoption;
use D4rk0snet\Adoption\Models\GiftAdoptionModel;
use D4rk0snet\Coralguardian\Event\GiftOrder;

class NewGiftAdoptionListener
{
    public static function doAction(GiftAdoptionModel $adoptionModel, GiftAdoption $giftAdoptionEntity)
    {
        // Envoie du mail
        GiftOrder::sendEvent($giftAdoptionEntity);
    }
}