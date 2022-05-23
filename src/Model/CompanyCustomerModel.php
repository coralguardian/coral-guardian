<?php

namespace D4rk0snet\Coralguardian\Model;

class CompanyCustomerModel extends AbstractCustomerModel
{
    /**
     * @required
     */
    private string $companyName;

    /**
     * @required
     */
    private string $firstname;

    /**
     * @required
     */
    private string $lastname;

    private ?string $alternateNewsletterEmail = null;

    public function getCompanyName(): string
    {
        return $this->companyName;
    }

    public function setCompanyName(string $companyName): CompanyCustomerModel
    {
        $this->companyName = $companyName;
        return $this;
    }

    /**
     * @return string
     */
    public function getFirstname(): string
    {
        return $this->firstname;
    }

    /**
     * @param string $firstname
     */
    public function setFirstname(string $firstname): void
    {
        $this->firstname = $firstname;
    }

    /**
     * @return string
     */
    public function getLastname(): string
    {
        return $this->lastname;
    }

    /**
     * @param string $lastname
     */
    public function setLastname(string $lastname): void
    {
        $this->lastname = $lastname;
    }

    public function getAlternateNewsletterEmail(): ?string
    {
        return $this->alternateNewsletterEmail;
    }

    public function setAlternateNewsletterEmail(?string $alternateNewsletterEmail): CompanyCustomerModel
    {
        $this->alternateNewsletterEmail = $alternateNewsletterEmail;
        return $this;
    }
}
