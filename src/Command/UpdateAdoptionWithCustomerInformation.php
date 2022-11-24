<?php

namespace D4rk0snet\Coralguardian\Command;

use D4rk0snet\Donation\Entity\DonationEntity;
use Hyperion\Doctrine\Service\DoctrineService;

class UpdateAdoptionWithCustomerInformation
{
    public function runCommand()
    {
        $donations = DoctrineService::getEntityManager()->getRepository(DonationEntity::class)->findAll();

        /** @var DonationEntity $donation */
        foreach($donations as $donation)
        {

            $donation->setAddress($donation->getAddress() !== "" ? $donation->getAddress() :
                                          $donation->getCustomer()->getAddress() );
            $donation->setFirstName($donation->getFirstName() !== "" ? $donation->getFirstName() :
                                    $donation->getCustomer()->getFirstname());
            $donation->setLastName($donation->getLastName() !== "" ? $donation->getLastName() :
                                    $donation->getCustomer()->getLastname());
            $donation->setCity($donation->getCity() !== "" ? $donation->getCity() :
                                    $donation->getCustomer()->getCity());
            $donation->setPostalCode($donation->getPostalCode() !== "" ? $donation->getPostalCode() :
                                    $donation->getCustomer()->getPostalCode());
            $donation->setCountry($donation->getCountry() !== "" ? $donation->getCountry() :
                                    $donation->getCustomer()->getCountry());
        }

        DoctrineService::getEntityManager()->flush();
    }
}