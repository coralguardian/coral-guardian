<?php

namespace D4rk0snet\Coralguardian\Service;

use D4rk0snet\CoralCustomer\Entity\CompanyCustomerEntity;
use D4rk0snet\Coralguardian\Entity\CustomerEntity;
use D4rk0snet\Coralguardian\Enums\Language;
use D4rk0snet\Coralguardian\Enums\SIBLists;
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

        // Create sendinblue user and put it in newsletter list
        $sibLists = [];
        if($model->wantsNewsletter() === true)
        {
            $sibLists[] = $model->getLanguage() === Language::FR ? SIBLists::NEWSLETTER_FR->value : SIBLists::NEWSLETTER_EN->value;
        }

        \Hyperion\Sendinblue\Service\CustomerService::createCustomer(
            $model->getEmail(),
            [
                'NOM' => $model->getLastname(),
                'PRENOM' => $model->getFirstname(),
                'CODE_POSTAL' => $model->getPostalCode(),
                'VILLE' => $model->getCity(),
                'PAYS' => $model->getCountry(),
                'ADRESSE' => $model->getAddress(),
                'LANGUE' => $model->getLanguage()->value
            ],
            $sibLists
        );

        return $customer;
    }
}
