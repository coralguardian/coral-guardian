<?php
namespace D4rk0snet\Coralguardian\Command;

use D4rk0snet\Adoption\Entity\AdopteeEntity;
use D4rk0snet\Adoption\Entity\AdoptionEntity;
use D4rk0snet\Adoption\Entity\Friend;
use D4rk0snet\Adoption\Entity\GiftAdoption;
use D4rk0snet\Adoption\Enums\AdoptedProduct;
use D4rk0snet\Adoption\Enums\Seeder;
use D4rk0snet\Coralguardian\Entity\CustomerEntity;
use D4rk0snet\Coralguardian\Enums\Language;
use D4rk0snet\Donation\Entity\DonationEntity;
use D4rk0snet\Donation\Entity\RecurringDonationEntity;
use D4rk0snet\CoralOrder\Enums\PaymentMethod;
use D4rk0snet\GiftCode\Entity\GiftCodeEntity;
use DateTime;
use Doctrine\DBAL\Connection;
use Hyperion\Doctrine\Service\DoctrineService;

class MigrationScript
{
    private Connection $conn;
    private array $customersIdUUIDMapping = [];
    private array $adoptionIdUUIDMapping = [];

    public function runCommand()
    {
        $this->conn = DoctrineService::getEntityManager()->getConnection();
        echo "Création des customers";
        $this->createCustomers();
        echo "Création des adoptions";
        $this->createAdoptions();
        echo "Création des donations";
        $this->createDonations();
        echo "Création des GiftAdoptions";
        $this->createFriendAndGiftAdoptions();

        echo "Création des adoptees";
        $this->createAdoptees();
    }

    private function createDonations()
    {
        $sql = "
            select customer_id, amount, lang, timestamp, discr, stripeChargeId
            from auc_order
            where auc_order.discr IN ('monthlyGift', 'oneshotGift')
        ";

        $stmt = $this->conn->prepare($sql);
        $results = $stmt->executeQuery();

        foreach ($results->fetchAllAssociative() as $result) {
            $customer = DoctrineService::getEntityManager()->getRepository(CustomerEntity::class)->find($this->customersIdUUIDMapping[$result['customer_id']]);
            if($result['discr'] === 'monthlyGift') {
                $entity = new RecurringDonationEntity(
                    customer: $customer,
                    date: (new \DateTime)->setTimestamp($result['timestamp']),
                    amount: $result['amount'],
                    lang: $result['lang'] === '' ? Language::from(Language::FR->value) : Language::from($result['lang']),
                    paymentMethod: PaymentMethod::CREDIT_CARD,
                    isPaid: true
                );
            } else {
                $entity = new DonationEntity(
                    customer: $customer,
                    date: (new \DateTime)->setTimestamp($result['timestamp']),
                    amount: $result['amount'],
                    lang: $result['lang'] === '' ? Language::from(Language::FR->value) : Language::from($result['lang']),
                    isPaid: true,
                    paymentMethod: PaymentMethod::CREDIT_CARD
                );
            }
            $entity->setStripePaymentIntentId($result['stripeChargeId']);
            DoctrineService::getEntityManager()->persist($entity);
        }

        DoctrineService::getEntityManager()->flush();
    }

    private function createAdoptions()
    {
        $sql = "
            select auc_order.id, customer_id, amount, lang, timestamp, apo.quantityOrdered as qt, auc_order.lang as lang, apo.productType_id as product_type_id
            from auc_order
            inner join auc_product_order apo on auc_order.id = apo.id
            where auc_order.discr = 'product';
        ";

        $stmt = $this->conn->prepare($sql);
        $results = $stmt->executeQuery();

        foreach ($results->fetchAllAssociative() as $result) {
            $customer = DoctrineService::getEntityManager()->getRepository(CustomerEntity::class)->find($this->customersIdUUIDMapping[$result['customer_id']]);

            switch($result['product_type_id']) {
                case 1 : $adoptedProduct = AdoptedProduct::CORAL; break;
                case 2 : $adoptedProduct = AdoptedProduct::REEF_LADY; break;
                case 3 : $adoptedProduct = AdoptedProduct::BUTTERFLY_REEF; break;
                case 4 : $adoptedProduct = AdoptedProduct::REEF_NAPOLEON; break;
                default: throw new \Exception("Invalid adopted product id (".$result['product_type_id'].")");
            }

            $adoption = new AdoptionEntity(
                customer: $customer,
                date: (new \DateTime)->setTimestamp($result['timestamp']),
                amount: $result['amount'],
                lang: $result['lang'] === "" ? Language::from('fr') : Language::from($result['lang']),
                adoptedProduct: $adoptedProduct,
                quantity: $result['qt'],
                paymentMethod: PaymentMethod::CREDIT_CARD,
                isPaid: true
            );

            DoctrineService::getEntityManager()->persist($adoption);
            DoctrineService::getEntityManager()->flush();
            $this->adoptionIdUUIDMapping[$result['id']] = $adoption->getUuid();

        }

    }

    private function createAdoptees()
    {
        $sql = "
            select name, transplantPicture, productPicture, auc_customized_product.productOrder_id as orderId
            from auc_customized_product
        ";

        $stmt = $this->conn->prepare($sql);
        $results = $stmt->executeQuery();

        foreach ($results->fetchAllAssociative() as $result) {
            if(!isset($this->adoptionIdUUIDMapping[$result['orderId']])) {
                echo "Impossible de trouver l'adoption pour ".$result['orderId']."\n";
                continue;
            }
            $adoption = DoctrineService::getEntityManager()->getRepository(DonationEntity::class)->find($this->adoptionIdUUIDMapping[$result['orderId']]);

            switch($result['transplantPicture']) {
                case 'valentina.jpg': $seeder = Seeder::VALENTINA; break;
                case 'sahril.jpg': $seeder = Seeder::SAHRIL; break;
                case 'murdhi.jpg': $seeder = Seeder::MURDHI; break;
                case 'muslim.jpg': $seeder = Seeder::MUSLIM; break;
                case 'suhar.jpg': $seeder = Seeder::SUHAR; break;
                case 'jonas.jpg': $seeder = Seeder::JONAS; break;
                case 'dulah.jpg': $seeder = Seeder::DULAH; break;
                case 'coral-guardian-team.png': $seeder = Seeder::TEAM; break;
                default: $seeder = Seeder::JONAS; break;
            }

            $adoptee = new AdopteeEntity(
                name: $result['name'],
                seeder: $seeder,
                adoption: $adoption,
                adopteeDatetime: new \DateTime('now'),
                picture: trim((string)$result['productPicture']) === '' ? "P9121949.jpg" : $result['productPicture']
            );

            DoctrineService::getEntityManager()->persist($adoptee);
        }

        DoctrineService::getEntityManager()->flush();
    }


    private function createCustomers()
    {
        $sql = "
            select auc_person.id as id, firstName, lastName, email, address, postCode, city, name as country_name
            from auc_person
            inner join auc_customer ac on auc_person.id = ac.id
            inner join auc_country a on ac.country_id = a.id
            where auc_person.discr = 'customer'";
        $stmt = $this->conn->prepare($sql);
        $results = $stmt->executeQuery();

        //var_dump($results->fetchAllAssociative()); die;
        foreach ($results->fetchAllAssociative() as $result) {
            $customer = new CustomerEntity(
                address: (string) $result['address'],
                city: (string) $result['city'],
                country: (string) $result['country_name'],
                email: (string) $result['email'],
                postalCode: (string) $result['postCode'],
                firstname: (string) $result['firstName'],
                lastname: (string) $result['lastName']
            );
            DoctrineService::getEntityManager()->persist($customer);
            DoctrineService::getEntityManager()->flush();
            $this->customersIdUUIDMapping[$result['id']] = $customer->getUuid();
        }
    }

    private function createFriendAndGiftAdoptions()
    {
        $sql = "
            select DISTINCT ao.amount,
                   ao.customer_id as customerId,
                   auc_person.id as friendId, 
                   firstName, 
                   lastName, 
                   email, 
                   token, 
                   auc_order_has_friend.quantityOffered as quantityOffered,
                   apo.quantityOrdered as quantityOrdered,
                   ao.lang as lang,
                   ao.timestamp as timestamp,
                   apo.productType_id as product_type_id,
                   ao.id as orderId 
            from auc_person
            inner join auc_order_has_friend on friend_id = auc_person.id
            inner join auc_order ao on auc_order_has_friend.order_id = ao.id
            inner join auc_product_order apo on ao.id = apo.id
            where auc_person.discr = 'friend'
        ";

        $stmt = $this->conn->prepare($sql);
        $results = $stmt->executeQuery();
        foreach ($results->fetchAllAssociative() as $result) {
            // Recherche du customer
            $customer = DoctrineService::getEntityManager()->getRepository(CustomerEntity::class)->find($this->customersIdUUIDMapping[$result['customerId']]);

            switch($result['product_type_id']) {
                case 1 : $adoptedProduct = AdoptedProduct::CORAL; break;
                case 2 : $adoptedProduct = AdoptedProduct::REEF_LADY; break;
                case 3 : $adoptedProduct = AdoptedProduct::BUTTERFLY_REEF; break;
                case 4 : $adoptedProduct = AdoptedProduct::REEF_NAPOLEON; break;
                default: throw new \Exception("Invalid adopted product id (".$result['product_type_id'].")");
            }


            $giftAdoption = new GiftAdoption(
                customer: $customer,
                date: (new \DateTime)->setTimestamp($result['timestamp']),
                amount: $result['amount'],
                lang: $result['lang'] === '' ? Language::FR : Language::from($result['lang']),
                adoptedProduct: $adoptedProduct,
                quantity: $result['quantityOrdered'],
                paymentMethod: PaymentMethod::CREDIT_CARD,
                isPaid: true,
                sendToFriend: false,
                sendOn: null, // doute
                message: null
            );

            $giftCode = new GiftCodeEntity(
                giftCode: $result['token'],
                giftAdoption: $giftAdoption,
                productQuantity: 1
            );

            $friend = new Friend(
                friendFirstname: $result['firstName'],
                friendLastname: $result['lastName'],
                friendEmail: $result['email'],
                giftCode: $giftCode
            );

            DoctrineService::getEntityManager()->persist($giftAdoption);
            DoctrineService::getEntityManager()->persist($giftCode);
            DoctrineService::getEntityManager()->persist($friend);
            DoctrineService::getEntityManager()->flush();

            $this->adoptionIdUUIDMapping[$result['orderId']] = $giftAdoption->getUuid();
        }
    }
}