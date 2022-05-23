<?php

namespace D4rk0snet\Coralguardian\Model;

abstract class AbstractCustomerModel
{
    /**
     * @required
     */
    private string $address;

    /**
     * @required
     */
    private string $postalCode;

    /**
     * @required
     */
    private string $city;

    /**
     * @required
     */
    private string $country;

    /**
     * @required
     */
    private string $email;

    /**
     * @required
     */
    private bool $wantsNewsletter;


    public function getAddress(): string
    {
        return $this->address;
    }

    public function setAddress(string $address): AbstractCustomerModel
    {
        $this->address = $address;
        return $this;
    }

    public function getCity(): string
    {
        return $this->city;
    }

    public function setCity(string $city): AbstractCustomerModel
    {
        $this->city = $city;
        return $this;
    }

    public function getCountry(): string
    {
        return $this->country;
    }

    public function setCountry(string $country): AbstractCustomerModel
    {
        $this->country = $country;
        return $this;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): AbstractCustomerModel
    {
        $this->email = $email;
        return $this;
    }

    public function getPostalCode(): string
    {
        return $this->postalCode;
    }

    public function setPostalCode(string $postalCode): AbstractCustomerModel
    {
        $this->postalCode = $postalCode;
        return $this;
    }

    public function wantsNewsletter(): bool
    {
        return $this->wantsNewsletter;
    }
}