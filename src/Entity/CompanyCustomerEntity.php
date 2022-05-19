<?php

namespace D4rk0snet\Coralguardian\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="customer_company")
 */
class CompanyCustomerEntity extends CustomerEntity
{
    /**
     * @ORM\Column(type="string")
     */
    private string $companyName;

    /**
     * @ORM\Column(type="string")
     */
    private string $mainContactName;

    public function __construct(
        string $companyName,
        string $mainContactName,
        string $address,
        string $postalCode,
        string $city,
        string $country,
        string $email
    ) {
        parent::__construct(address:$address, city: $city, country: $country, email: $email, postalCode: $postalCode);
        $this->companyName = $companyName;
        $this->mainContactName = $mainContactName;
    }

    public function getCompanyName(): string
    {
        return $this->companyName;
    }

    public function setCompanyName(string $companyName): CompanyCustomerEntity
    {
        $this->companyName = $companyName;
        return $this;
    }

    public function getMainContactName(): string
    {
        return $this->mainContactName;
    }

    public function setMainContactName(string $mainContactName): CompanyCustomerEntity
    {
        $this->mainContactName = $mainContactName;
        return $this;
    }
}
