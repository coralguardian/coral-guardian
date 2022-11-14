<?php

namespace D4rk0snet\Coralguardian\Event;

use D4rk0snet\Adoption\Entity\AdoptionEntity;
use D4rk0snet\Adoption\Entity\GiftAdoption;
use D4rk0snet\Adoption\Enums\AdoptedProduct;
use D4rk0snet\Coralguardian\Enums\Language;
use D4rk0snet\Coralguardian\Enums\SIBEvent;
use D4rk0snet\FiscalReceipt\Service\FiscalReceiptService;
use DateTime;

class RecipientDone extends AbstractEmailEvent
{
    private static function send(
        string $email,
        Language $lang,
        string $adoptedProduct,
        int $quantity,
        ?DateTime $giftDate,
        string $fiscalReceiptUrl,
        string $project
    )
    {
        self::sendQuery($email,
            array_merge(
                compact('lang', 'adoptedProduct', 'quantity', 'fiscalReceiptUrl', 'project'),
                [
                    "giftDate" => $giftDate ? $giftDate->format("d/m/Y") : "",
                    "isToday" => $giftDate === null
                ])
        );
    }

    public static function sendEvent(GiftAdoption $adoptionEntity)
    {
        self::send(
            $adoptionEntity->getCustomer()->getEmail(),
            $adoptionEntity->getLang(),
            $adoptionEntity->getAdoptedProduct()->getProductType(),
            $adoptionEntity->getQuantity(),
            $adoptionEntity->getSendOn(),
            FiscalReceiptService::getURl($adoptionEntity->getUuid()),
            $adoptionEntity->getProject()->value
        );
    }

    protected static function getEventName(): SIBEvent
    {
        return SIBEvent::RECIPIENT_DONE;
    }
}