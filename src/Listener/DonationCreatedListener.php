<?php

namespace D4rk0snet\Coralguardian\Listener;

use D4rk0snet\Coralguardian\Event\DonationEvent;
use D4rk0snet\Coralguardian\Event\SubscriptionOrder;
use D4rk0snet\Donation\Entity\DonationEntity;
use D4rk0snet\Donation\Entity\RecurringDonationEntity;

class DonationCreatedListener
{
    public static function doAction($donationEntity)
    {
        // Envoie du mail
        if($donationEntity instanceof RecurringDonationEntity) {
            SubscriptionOrder::sendEvent($donationEntity);
        } elseif ($donationEntity instanceof DonationEntity) {
            DonationEvent::sendEvent($donationEntity);
        } else {
            throw new \Exception("Invalid entity in DonationCreatedListener");
        }
    }
}