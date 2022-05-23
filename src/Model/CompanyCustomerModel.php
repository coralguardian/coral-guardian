<?php

namespace D4rk0snet\Coralguardian\Model;

use D4rk0snet\Coralguardian\Enums\Language;

class CompanyCustomerModel
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

    /**
     * @required
     */
    private Language $language;

    public function getAddress(): string
    {
        return $this->address;
    }

    public function setAddress(string $address): self
    {
        $this->address = $address;
        return $this;
    }

    public function getCity(): string
    {
        return $this->city;
    }

    public function setCity(string $city): self
    {
        $this->city = $city;
        return $this;
    }

    public function getCountry(): string
    {
        return $this->country;
    }

    public function setCountry(string $country): self
    {
        $this->country = $country;
        return $this;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    public function getPostalCode(): string
    {
        return $this->postalCode;
    }

    public function setPostalCode(string $postalCode): self
    {
        $this->postalCode = $postalCode;
        return $this;
    }

    public function wantsNewsletter(): bool
    {
        return $this->wantsNewsletter;
    }

    public function getLanguage(): Language
    {
        return $this->language;
    }

    public function setLanguage(string $language): self
    {
        try {
            $this->language = Language::from($language);
            return $this;
        } catch (\ValueError $exception) {
            throw new \Exception("Code de langue invalide",400);
        }
    }

    public function getCompanyName(): string
    {
        return $this->companyName;
    }

    public function setCompanyName(string $companyName): CompanyCustomerModel
    {
        $this->companyName = $companyName;
        return $this;
    }

    public function getFirstname(): string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): void
    {
        $this->firstname = $firstname;
    }

    public function getLastname(): string
    {
        return $this->lastname;
    }

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

    public function setWantsNewsletter(bool $wantsNewsletter): CompanyCustomerModel
    {
        $this->wantsNewsletter = $wantsNewsletter;
        return $this;
    }
}
