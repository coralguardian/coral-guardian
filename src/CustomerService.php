<?php

namespace D4rk0snet\Coralguardian\Service;

use D4rk0snet\Coralguardian\Entity\CompanyCustomerEntity;
use D4rk0snet\Coralguardian\Entity\IndividualCustomerEntity;
use Hyperion\Doctrine\Service\DoctrineService;

class CustomerService
{
    public static function getOrCreateCompanyCustomer(
        string $email,
        string $companyName,
        string $mainContactName,
        string $address,
        string $city,
        string $country
    ) : CompanyCustomerEntity {

        $customer = DoctrineService::getEntityManager()
            ->getRepository(CompanyCustomerEntity::class)
            ->findOneBy(['email' => $email]);

        if ($customer === null) {
            $customer = new CompanyCustomerEntity(
                companyName: $companyName,
                mainContactName: $mainContactName,
                address: $address,
                city: $city,
                country: $country,
                email: $email
            );
            DoctrineService::getEntityManager()->persist($customer);
        }

        return $customer;
    }

    public static function getOrCreateIndividualCustomer(
        string $email,
        string $firstname,
        string $lastname,
        string $address,
        string $city,
        string $country
    ) : IndividualCustomerEntity {

        $customer = DoctrineService::getEntityManager()
            ->getRepository(IndividualCustomerEntity::class)
            ->findOneBy(['email' => $email]);

        if ($customer === null) {
            $customer = new IndividualCustomerEntity(
                firstname: $firstname,
                lastname: $lastname,
                address: $address,
                city: $city,
                country: $country,
                email: $email
            );
            DoctrineService::getEntityManager()->persist($customer);
        }

        return $customer;
    }
}
