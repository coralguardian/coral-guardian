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
    private string $mainContactName;

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

    public function getMainContactName(): string
    {
        return $this->mainContactName;
    }

    public function setMainContactName(string $mainContactName): CompanyCustomerModel
    {
        $this->mainContactName = $mainContactName;
        return $this;
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
