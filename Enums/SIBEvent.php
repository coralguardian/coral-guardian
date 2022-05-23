<?php

namespace D4rk0snet\Coralguardian\Enums;

enum SIBEvent : string
{
    case PAYMENT_SUCCESSFULL = 'payment_success';
    case ADOPTION_ORDER = 'adoption_order';
    case BANK_TRANSFER_PAYMENT = 'bank_transfer_payment';
    case GIFT_ORDER = 'gift_order';
    case NAMING_DONE = 'naming_done';
    case SCHEDULED_GIF_CODE_SENT = 'scheduled_gift_code_sent';
    case OWNER_SCHEDULED_GIFT_CODE_SENT = 'owner_scheduled_gift_code_sent';
    case DONATION= 'donation';
    case SUBSCRIPTION= 'subscription';

}