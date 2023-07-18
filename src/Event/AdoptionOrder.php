<?php

namespace D4rk0snet\Coralguardian\Event;

use D4rk0snet\Adoption\Entity\AdoptionEntity;
use D4rk0snet\Adoption\Service\RedirectionService;
use D4rk0snet\CoralCustomer\Entity\CompanyCustomerEntity;
use D4rk0snet\Coralguardian\Enums\SIBEvent;
use D4rk0snet\FiscalReceipt\Service\FiscalReceiptService;
use D4rk0snet\NamingFileImport\API\GetNamingFileEndPoint;

class AdoptionOrder extends AbstractEmailEvent
{
    public static function send(
        string $email,
        string $lang,
        int $quantity,
        string $fiscalReceiptUrl,
        string $nextStepUrl,
        string $project,
        bool $namingDone,
        bool $isCompany = false,
        string $adoptionUuid = null,
        string $namingFileUrl = null
    ) {
        self::sendQuery($email, compact('project','lang', 'quantity', 'fiscalReceiptUrl', 'nextStepUrl', 'isCompany',
                                        'namingDone', 'adoptionUuid', 'namingFileUrl'));
    }

    protected static function getEventName(): SIBEvent
    {
        return SIBEvent::ADOPTION_ORDER;
    }

    public static function sendEvent(AdoptionEntity $entity)
    {
        self::send(
            email: $entity->getCustomer()->getEmail(),
            lang: $entity->getLang()->value,
            quantity: $entity->getQuantity(),
            fiscalReceiptUrl: FiscalReceiptService::getURl($entity->getUuid()),
            nextStepUrl: RedirectionService::buildRedirectionUrlWithoutHost($entity),
            project: $entity->getProject()->value,
            namingDone: count($entity->getAdoptees()) > 0,
            isCompany: $entity->getCustomer() instanceof CompanyCustomerEntity,
            adoptionUuid: $entity->getUuid(),
            namingFileUrl: GetNamingFileEndPoint::getUrl(['adoptionUuid' => $entity->getUuid()])
        );
    }
}
