<?php

namespace D4rk0snet\Coralguardian\Model;

class IndividualCustomerModel extends AbstractCustomerModel
{
    /**
     * @required
     */
    private string $firstname;

    /**
     * @required
     */
    private string $lastname;

    public function getFirstname(): string
    {
        return $this->firstname;
    }

    public function setFirstname(string $firstname): IndividualCustomerModel
    {
        $this->firstname = $firstname;
        return $this;
    }

    public function getLastname(): string
    {
        return $this->lastname;
    }

    public function setLastname(string $lastname): IndividualCustomerModel
    {
        $this->lastname = $lastname;
        return $this;
    }
}
