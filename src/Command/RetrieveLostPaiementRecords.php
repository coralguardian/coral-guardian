<?php

namespace D4rk0snet\Coralguardian\Command;

use D4rk0snet\CoralCustomer\Model\CustomerModel;
use D4rk0snet\CoralOrder\Enums\CoralOrderEvents;
use D4rk0snet\CoralOrder\Model\DonationOrderModel;
use D4rk0snet\Donation\Enums\DonationRecurrencyEnum;
use Hyperion\Stripe\Service\StripeService;
use JsonMapper;
use PHPMailer\PHPMailer\Exception;
use Stripe\SetupIntent;

class RetrieveLostPaiementRecords
{
    public function runCommand()
    {
        $starting_after = null;
        $emails = [];
        do {
            try {
                $allOptions = ['created' => ['gt' => 1697932800, 'lt' => 1700697599]];
                if($starting_after !== null) {
                    $allOptions['starting_after'] = $starting_after;
                }
                $setupIntents = StripeService::getStripeClient()->setupIntents->all($allOptions);
                $starting_after = $setupIntents->last()->id;
            } catch (\Exception $exception) {
                die($exception->getMessage());
            }

            foreach($setupIntents as $setupIntent) {
                $status = $setupIntent->status;
                if($status !== "succeeded") {
                   // var_dump('status not suceeded');
                    continue;
                }

                // On va vérifier que l'on a une facture qui est payé après le setup intent.
                try {
                    $invoiceSearchResult = StripeService::getStripeClient()->invoices->search([
                        'query' => "customer:\"$setupIntent->customer\" AND created > $setupIntent->created AND status:\"paid\" AND total > 0"]);
                } catch (\Exception $exception) {
                    die($exception->getMessage());
                }

                if($invoiceSearchResult->count() === 0) {
                   // var_dump('facture non trouvé');
                    continue;
                }

                $email = json_decode($setupIntent->metadata['customer'])->email;
                echo "Traitement de $email...";

                $this->resumeOperations($setupIntent);
                echo "TERMINE. \n";
            }
        } while($setupIntents->has_more);
    }

    public function resumeOperations(SetupIntent $setupIntent)
    {
        $mapper = new JsonMapper();
        $mapper->bExceptionOnMissingData = true;
        $mapper->postMappingMethod = 'afterMapping';

       // if($setupIntent->metadata['customer']->)
        if($setupIntent->metadata['donationOrdered'] !== null) {
            $donations = json_decode($setupIntent->metadata['donationOrdered'], false, 512, JSON_THROW_ON_ERROR);

            // On isole un éventuel don oneshot
            $filterResults = array_filter($donations, static function ($donationOrderData) {
                return $donationOrderData->donationRecurrency === DonationRecurrencyEnum::ONESHOT->value;
            });
        }

        if($setupIntent->metadata['productOrdered'] !== null) {
            do_action(CoralOrderEvents::NEW_ORDER->value, $setupIntent);
        }

        // On traite chaque don
        if($setupIntent->metadata['donationOrdered'] !== null && count($filterResults) > 0)
        {
            foreach($filterResults as $donationOrderData) {
                $oneshotDonation = $mapper->map(
                    $donationOrderData,
                    new DonationOrderModel()
                );

                $customer = $mapper->map(
                    json_decode($setupIntent->metadata['customer'], false, 512, JSON_THROW_ON_ERROR),
                    new CustomerModel()
                );

                do_action(CoralOrderEvents::NEW_DONATION->value, $oneshotDonation, $customer, $setupIntent->id);
            }
        }
    }
}

