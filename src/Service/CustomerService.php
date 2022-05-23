<?php

namespace D4rk0snet\Coralguardian\Service;

use D4rk0snet\Coralguardian\Entity\CompanyCustomerEntity;
use D4rk0snet\Coralguardian\Entity\CustomerEntity;
use D4rk0snet\Coralguardian\Model\CompanyCustomerModel;
use D4rk0snet\Coralguardian\Model\IndividualCustomerModel;
use Hyperion\Doctrine\Service\DoctrineService;

class CustomerService
{
    public static function createCompanyCustomer(CompanyCustomerModel $model): CompanyCustomerEntity
    {
        $customer = new CompanyCustomerEntity(
            companyName: $model->getCompanyName(),
            address: $model->getAddress(),
            postalCode: $model->getPostalCode(),
            city: $model->getCity(),
            country: $model->getCountry(),
            email: $model->getEmail(),
            firstname: $model->getFirstname(),
            lastname: $model->getLastname()
        );

        DoctrineService::getEntityManager()->persist($customer);
        DoctrineService::getEntityManager()->flush();

        return $customer;
    }

    public static function createIndividualCustomer(IndividualCustomerModel $model): CustomerEntity
    {
        $customer = new CustomerEntity(
            address: $model->getAddress(),
            city: $model->getCity(),
            country: $model->getCountry(),
            email: $model->getEmail(),
            postalCode: $model->getPostalCode(),
            firstname: $model->getFirstname(),
            lastname: $model->getLastname(),
        );

        DoctrineService::getEntityManager()->persist($customer);
        DoctrineService::getEntityManager()->flush();

        return $customer;
    }
}
