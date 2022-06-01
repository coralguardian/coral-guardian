<?php

namespace D4rk0snet\Coralguardian\Enums;

enum SIBEvent : string
{
    case PAYMENT_SUCCESSFULL = 'payment_success';
    case ADOPTION_ORDER = 'adoption_order';
    case BANK_TRANSFER_PAYMENT = 'bank_transfer_payment';
    case GIFT_ORDER = 'gift_order';
    case NAMING_DONE = 'naming_done';
    case FRIEND_GIF_CODE_SENT = 'friend_gift_code_sent';
    case OWNER_GIFT_CODE_SENT = 'owner_gift_code_sent';
    case DONATION= 'donation';
    case SUBSCRIPTION= 'subscription';
    case RECIPIENT_DONE = 'recipient_done';
    case SUBSCRIPTION_SUMMARY = 'subscription_summary';

}