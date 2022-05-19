<?php

namespace D4rk0snet\Coralguardian\Service;

use D4rk0snet\Coralguardian\Entity\CompanyCustomerEntity;
use D4rk0snet\Coralguardian\Entity\IndividualCustomerEntity;
use D4rk0snet\Coralguardian\Model\CompanyCustomerModel;
use D4rk0snet\Coralguardian\Model\IndividualCustomerModel;
use Hyperion\Doctrine\Service\DoctrineService;

class CustomerService
{
    public static function createCompanyCustomer(CompanyCustomerModel $model) : CompanyCustomerEntity
    {
        $customer = new CompanyCustomerEntity(
            companyName: $model->getCompanyName(),
            mainContactName: $model->getMainContactName(),
            address: $model->getAddress(),
            city: $model->getCity(),
            country: $model->getCountry(),
            email: $model->getEmail()
        );

        DoctrineService::getEntityManager()->persist($customer);
        DoctrineService::getEntityManager()->flush();

        return $customer;
    }

    public static function createIndividualCustomer(IndividualCustomerModel $model) : IndividualCustomerEntity
    {
        $customer = new IndividualCustomerEntity(
            firstname: $model->getFirstname(),
            lastname: $model->getLastname(),
            address: $model->getAddress(),
            city: $model->getCity(),
            country: $model->getCountry(),
            email: $model->getEmail()
        );

        DoctrineService::getEntityManager()->persist($customer);
        DoctrineService::getEntityManager()->flush();

        return $customer;
    }
}
