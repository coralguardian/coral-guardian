<?php

namespace D4rk0snet\Coralguardian\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Mapping\Entity;

/**
 * @Entity
 */
class IndividualCustomerEntity extends CustomerEntity
{
    /**
     * @ORM\Column(type="string")
     */
    private string $firstname;

    /**
     * @ORM\Column(type="string")
     */
    private string $lastname;

    public function __construct(
        string $firstname,
        string $lastname,
        string $address,
        string $city,
        string $country,
        string $email
    ) {
        parent::__construct(address:$address, city: $city, country: $country, email: $email);
        $this->firstname = $firstname;
        $this->lastname = $lastname;
    }

    public function getFirstname(): string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): IndividualCustomerEntity
    {
        $this->firstname = $firstname;
        return $this;
    }

    public function getLastname(): string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): IndividualCustomerEntity
    {
        $this->lastname = $lastname;
        return $this;
    }
}
