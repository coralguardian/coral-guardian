<?php

namespace D4rk0snet\Coralguardian\Listener;

use D4rk0snet\Adoption\Entity\GiftAdoption;
use D4rk0snet\Coralguardian\Event\GiftOrder;

class NewGiftAdoptionListener
{
    public static function doAction(GiftAdoption $giftAdoptionEntity)
    {
        GiftOrder::sendEvent($giftAdoptionEntity);
    }
}