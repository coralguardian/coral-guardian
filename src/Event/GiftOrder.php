<?php

namespace D4rk0snet\Coralguardian\Event;

use D4rk0snet\Adoption\Entity\GiftAdoption;
use D4rk0snet\Adoption\Service\RedirectionService;
use D4rk0snet\CoralAdoption\Entity\GiftCode;
use D4rk0snet\Coralguardian\Entity\CompanyCustomerEntity;
use D4rk0snet\Coralguardian\Enums\SIBEvent;
use D4rk0snet\FiscalReceipt\Service\FiscalReceiptService;
use D4rk0snet\GiftCode\Entity\GiftCodeEntity;

class GiftOrder extends AbstractEmailEvent
{
    private static function send(
        string $email,
        string $lang,
        int $quantity,
        string $fiscalReceiptUrl,
        string $nextStepUrl,
        bool $codeSentTofriend = false,
        bool $isCompany = false,
        array $giftCodeList = []
    )
    {
        self::sendQuery($email, compact('lang', 'quantity', 'fiscalReceiptUrl', 'nextStepUrl', 'codeSentTofriend', 'isCompany', 'giftCodeList'));
    }

    protected static function getEventName(): SIBEvent
    {
        return SIBEvent::GIFT_ORDER;
    }

    public static function sendEvent(GiftAdoption $entity)
    {
        $codeToSend = [];
        if (!$entity->isSendToFriend()) {
            $codeToSend = $entity->getGiftCodes()->map(function(GiftCodeEntity $giftCodeEntity) { return $giftCodeEntity->getGiftCode(); } );
        }

        // Send email event with data needed
        self::send(
            email: $entity->getCustomer()->getEmail(),
            lang: $entity->getLang()->value,
            quantity: $entity->getQuantity(),
            fiscalReceiptUrl: FiscalReceiptService::getURl($entity->getUuid()),
            nextStepUrl: RedirectionService::buildRedirectionUrl($entity),
            codeSentTofriend: $entity->isSendToFriend(),
            isCompany: $entity->getCustomer() instanceof CompanyCustomerEntity,
            giftCodeList: $codeToSend->toArray()
        );
    }
}