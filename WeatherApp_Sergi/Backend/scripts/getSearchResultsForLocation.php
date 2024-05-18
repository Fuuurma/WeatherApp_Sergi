<?php

require '../../vendor/autoload.php';

use GuzzleHttp\Client;
use Symfony\Component\DomCrawler\Crawler;

function getTopSearchResults($query, $numResults = 3)
{
    $client = new Client();
    $response = $client->request('GET', 'https://www.google.com/search', [
        'query' => ['q' => $query]
    ]);

    $html = $response->getBody()->getContents();
    $crawler = new Crawler($html);

    $results = [];
    $crawler->filter('a')->each(function ($node) use (&$results, $numResults) {
        if (count($results) < $numResults) {
            $url = $node->attr('href');
            $titleNode = $node->filter('h3');

            if ($titleNode->count() > 0) {
                $title = $titleNode->text();

                if (preg_match('/\/url\?q=([^&]+)/', $url, $matches)) {
                    $url = urldecode($matches[1]);
                }

                $results[] = [
                    'title' => htmlspecialchars($title, ENT_QUOTES, 'UTF-8'),
                    'url' => htmlspecialchars($url, ENT_QUOTES, 'UTF-8')
                ];
            }
        }
    });

    return $results;
}

// Prevent any output before headers
ob_start();

$query = isset($_GET['query']) ? $_GET['query'] : 'Barcelona'; // Default to 'Barcelona' if no query provided
$topResults = getTopSearchResults($query);

// Ensure no whitespace before JSON output
header('Content-Type: application/json');
echo json_encode($topResults);

// Flush output buffer
ob_end_flush();
