<?php

namespace D4rk0snet\Coralguardian\Event;
use D4rk0snet\Coralguardian\Enums\SIBEvent;
use Exception;
use GuzzleHttp\Client;

abstract class AbstractEmailEvent
{
    private const SIB_ENDPOINT = 'https://in-automate.sendinblue.com/api/v2/trackEvent';

    protected static function sendQuery(string $email, array $data = [], array $properties = [])
    {
        if(array_intersect(['email','event'],array_keys($properties))) {
            throw new \Exception("Impossible d'utiliser email ou event comme clef de propriété pour le tableau properties");
        }

        $sibApiKey = get_option(\Hyperion\Sendinblue\Plugin::SENDINBLUE_API_KEY_OPTION);
        if(false === $sibApiKey) {
            throw new \Exception("Variable d'environnement SIB_APIKEY non définie.");
        }

        $body = [
            'email' => $email,
            'event' => static::getEventName()->value
        ];

        if (count($properties)) {
            $body['properties'] = $properties;
        }

        if (count($data)) {
            foreach($data as $index => $value) {
                if($value instanceof \BackedEnum) {
                    $body['eventdata']['data'][$index] = $value->value;
                } else {
                    $body['eventdata']['data'][$index] = $value;
                }
            }
        }

        $header = [
            'Accept' => 'application/json',
            'Content-Type' => 'application/json',
            'ma-key' => $sibApiKey
        ];

        $client = new Client();
        $response = $client->request('POST', self::SIB_ENDPOINT, [
            'body' => json_encode($body, JSON_THROW_ON_ERROR),
            'headers' => $header
        ]);

        if($response->getStatusCode() !== 204) {
            throw new Exception("Failed event.");
        }
    }

    abstract protected static function getEventName() : SIBEvent;
}