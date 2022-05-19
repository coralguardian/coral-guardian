<?php

namespace D4rk0snet\Coralguardian\Model;

class CompanyCustomerModel
{
    private string $companyName;
    private string $mainContactName;
    private string $address;
    private string $city;
    private string $country;
    private string $email;

    public function getCompanyName(): string
    {
        return $this->companyName;
    }

    public function setCompanyName(string $companyName): CompanyCustomerModel
    {
        $this->companyName = $companyName;
        return $this;
    }

    public function getMainContactName(): string
    {
        return $this->mainContactName;
    }

    public function setMainContactName(string $mainContactName): CompanyCustomerModel
    {
        $this->mainContactName = $mainContactName;
        return $this;
    }

    public function getAddress(): string
    {
        return $this->address;
    }

    public function setAddress(string $address): CompanyCustomerModel
    {
        $this->address = $address;
        return $this;
    }

    public function getCity(): string
    {
        return $this->city;
    }

    public function setCity(string $city): CompanyCustomerModel
    {
        $this->city = $city;
        return $this;
    }

    public function getCountry(): string
    {
        return $this->country;
    }

    public function setCountry(string $country): CompanyCustomerModel
    {
        $this->country = $country;
        return $this;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): CompanyCustomerModel
    {
        $this->email = $email;
        return $this;
    }
}