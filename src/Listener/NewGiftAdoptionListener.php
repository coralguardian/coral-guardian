<?php

namespace D4rk0snet\Coralguardian\Listener;

use D4rk0snet\Adoption\Entity\GiftAdoption;
use D4rk0snet\CoralCustomer\Entity\CompanyCustomerEntity;
use D4rk0snet\Coralguardian\Event\GiftCodeSent;
use D4rk0snet\Coralguardian\Event\GiftOrder;

class NewGiftAdoptionListener
{
    public static function doAction(GiftAdoption $giftAdoptionEntity)
    {
        // Envoie du mail
        GiftOrder::sendEvent($giftAdoptionEntity);

        if (!$giftAdoptionEntity->getCustomer() instanceof CompanyCustomerEntity) {
            GiftCodeSent::sendEvent($giftAdoptionEntity->getGiftCodes()->first());
        }
    }
}