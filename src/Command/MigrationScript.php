<?php
namespace D4rk0snet\Coralguardian\Command;

use D4rk0snet\Adoption\Entity\AdopteeEntity;
use D4rk0snet\Adoption\Entity\AdoptionEntity;
use D4rk0snet\Adoption\Entity\Friend;
use D4rk0snet\Adoption\Entity\GiftAdoption;
use D4rk0snet\Adoption\Enums\AdoptedProduct;
use D4rk0snet\Adoption\Enums\Seeder;
use D4rk0snet\Coralguardian\Entity\CustomerEntity;
use D4rk0snet\Donation\Entity\DonationEntity;
use D4rk0snet\Donation\Entity\RecurringDonationEntity;
use D4rk0snet\Donation\Enums\PaymentMethod;
use D4rk0snet\GiftCode\Entity\GiftCodeEntity;
use Doctrine\DBAL\Connection;
use Hyperion\Doctrine\Service\DoctrineService;

class MigrationScript
{
    private Connection $conn;

    public function runCommand()
    {
        $this->conn = DoctrineService::getEntityManager()->getConnection();
        $this->createCustomers();
        $this->createAdoptions();
        $this->createDonations();
        $this->createFriendAndGiftAdoptions();
    }

    private function createDonations()
    {
        $sql = "
            select customer_id, amount, lang, quantityOrdered, timestamp, discr
            from auc_order
            where auc_order.discr IN ('monthlyGift', 'oneshotGift')
        ";

        $stmt = $this->conn->prepare($sql);
        $results = $stmt->executeQuery();

        foreach ($results->fetchAllAssociative() as $result) {
            $customer = DoctrineService::getEntityManager()->getRepository(CustomerEntity::class)->find($result->customer_id);
            if($result->discr === 'monthlyGift') {
                $entity = new RecurringDonationEntity(
                    customer: $customer,
                    date: new \DateTime($result->timestamp),
                    amount: $result->amount,
                    lang: $result->lang,
                    paymentMethod: PaymentMethod::CREDIT_CARD,
                    isPaid: true
                );
            } else {
                $entity = new DonationEntity(
                    customer: $customer,
                    date: new \DateTime($result->timestamp),
                    amount: $result->amount,
                    lang: $result->lang,
                    isPaid: true,
                    paymentMethod: PaymentMethod::CREDIT_CARD
                );
            }
            DoctrineService::getEntityManager()->persist($entity);
        }

        DoctrineService::getEntityManager()->flush();
    }

    private function createAdoptions()
    {
        $sql = "
            select customer_id, amount, lang, quantityOrdered, timestamp, apo.quantityOrdered as qt, auc_order.lang as lang
            from auc_order
            inner join auc_product_order apo on auc_order.id = apo.id
            inner join auc_product_type apt on apo.productType_id = apt.id and apt.discr='coral'
            inner join auc_coral ac on apt.id = ac.id
            where auc_order.discr = 'product';
        ";

        $stmt = $this->conn->prepare($sql);
        $results = $stmt->executeQuery();

        foreach ($results->fetchAllAssociative() as $result) {
            $customer = DoctrineService::getEntityManager()->getRepository(CustomerEntity::class)->find($result->customer_id);

            switch($result->product_type_id) {
                case 1 : $adoptedProduct = AdoptedProduct::CORAL; break;
                case 2 : $adoptedProduct = AdoptedProduct::REEF_LADY; break;
                case 3 : $adoptedProduct = AdoptedProduct::BUTTERFLY_REEF; break;
                case 4 : $adoptedProduct = AdoptedProduct::REEF_NAPOLEON; break;
                default: throw new \Exception("Invalid adopted product id ($result->product_type_id)");
            }

            $adoption = new AdoptionEntity(
                customer: $customer,
                date: new \DateTime($result->timestamp),
                amount: $result->amount,
                lang: $result->lang,
                adoptedProduct: $adoptedProduct,
                quantity: $result->qt,
                paymentMethod: PaymentMethod::CREDIT_CARD,
                isPaid: true
            );

            DoctrineService::getEntityManager()->persist($adoption);
        }

        DoctrineService::getEntityManager()->flush();
    }

    private function createAdoptees()
    {
        foreach ($results->fetchAllAssociative() as $result) {
            switch($result->transplantPicture) {
                case 'valentina.jpg': $seeder = Seeder::VALENTINA; break;
                case 'sahril.jpg': $seeder = Seeder::SAHRIL; break;
                case 'murdhi.jpg': $seeder = Seeder::MURDHI; break;
                case 'muslim.jpg': $seeder = Seeder::MUSLIM; break;
                case 'suhar.jpg': $seeder = Seeder::SUHAR; break;
                case 'jonas.jpg': $seeder = Seeder::JONAS; break;
                case 'dulah.jpg': $seeder = Seeder::DULAH; break;
                case 'coral-guardian-team.png': $seeder = Seeder::TEAM; break;
                default: throw new \Exception("Invalid seeder ($result->transplantPicture)");
            }

            $adoptee = new AdopteeEntity(
                name: $result->adoption_name,
                seeder: $seeder,
                adoption: $giftAdoption,
                adopteeDatetime: new \DateTime('now'),
                picture: $result->transplantPicture
            );

            DoctrineService::getEntityManager()->persist($adoptee);
        }
    }


    private function createCustomers()
    {
        $sql = "
            select firstName, lastName, email, address, postCode, city, name as country_name
            from auc_person
            inner join auc_customer ac on auc_person.id = ac.id
            inner join auc_country a on ac.country_id = a.id
            where auc_person.discr = 'customer'";
        $stmt = $this->conn->prepare($sql);
        $results = $stmt->executeQuery();

        foreach ($results->fetchAllAssociative() as $result) {
            $customer = new CustomerEntity(
                address: $result->address,
                city: $result->city,
                country: $result->country_name,
                email: $result->email,
                postalCode: $result->postCode,
                firstname: $result->firstName,
                lastname: $result->lastName
            );
            DoctrineService::getEntityManager()->persist($customer);
        }

        DoctrineService::getEntityManager()->flush();
    }

    private function createFriendAndGiftAdoptions()
    {
        $sql = "
            select auc_order.amount, 
                   auc_person.id, 
                   firstName, 
                   lastName, 
                   email, 
                   token, 
                   acp.name as adoption_name, 
                   acp.transplantPicture, 
                   acp.productPicture, 
                   auc_order_has_friend.quantityOffered as quantityOffered,
                   apo.quantityOrdered as quantityOrdered,
                   auc_order.lang as lang,
                   auc_order.timestamp as timestamp,
                   apo.productType_id as product_type_id
            from auc_person
            inner join auc_order_has_friend on friend_id = auc_person.id
            inner join auc_order ao on auc_order_has_friend.order_id = ao.id
            inner join auc_product_order apo on ao.id = apo.id
            left join auc_customized_product acp on apo.id = acp.productOrder_id
            where auc_person.discr = 'friend'
        ";

        $stmt = $this->conn->prepare($sql);
        $results = $stmt->executeQuery();
        foreach ($results->fetchAllAssociative() as $result) {
            // Recherche du customer
            $customer = DoctrineService::getEntityManager()->getRepository(CustomerEntity::class)->find($result->id);

            switch($result->product_type_id) {
                case 1 : $adoptedProduct = AdoptedProduct::CORAL; break;
                case 2 : $adoptedProduct = AdoptedProduct::REEF_LADY; break;
                case 3 : $adoptedProduct = AdoptedProduct::BUTTERFLY_REEF; break;
                case 4 : $adoptedProduct = AdoptedProduct::REEF_NAPOLEON; break;
                default: throw new \Exception("Invalid adopted product id ($result->product_type_id)");
            }


            $giftAdoption = new GiftAdoption(
                customer: $customer,
                date: new \DateTime($result->timestamp),
                amount: $result->amount,
                lang: $result->lang,
                adoptedProduct: $adoptedProduct, // ???
                quantity: $result->quantityOrderd,
                paymentMethod: PaymentMethod::CREDIT_CARD,
                isPaid: true,
                sendToFriend: false,
                sendOn: null, // doute
                message: null
            );

            $giftCode = new GiftCodeEntity(
                giftCode: $result->token,
                giftAdoption: $giftAdoption,
                productQuantity: 1
            );

            $friend = new Friend(
                friendFirstname: $result->firstName,
                friendLastname: $result->lastName,
                friendEmail: $result->email,
                giftCode: $giftCode
            );

            DoctrineService::getEntityManager()->persist($giftAdoption);
            DoctrineService::getEntityManager()->persist($giftCode);
            DoctrineService::getEntityManager()->persist($friend);
        }

        DoctrineService::getEntityManager()->flush();
    }
}