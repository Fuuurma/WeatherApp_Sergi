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

            // Only process if there is an <h3> tag inside the <a> tag
            if ($titleNode->count() > 0) {
                $title = $titleNode->text();

                // Parse the real URL from the href attribute
                if (preg_match('/\/url\?q=([^&]+)/', $url, $matches)) {
                    $url = urldecode($matches[1]);
                }

                $results[] = [
                    'title' => $title,
                    'url' => $url
                ];
            }
        }
    });

    return $results;
}

// Search for "Barcelona" and get the top 3 results
$query = 'Formula one';
$topResults = getTopSearchResults($query);

// Return the results as HTML
foreach ($topResults as $index => $result) {
    echo "<h2>Result " . ($index + 1) . ":</h2>";
    echo "<p>Title: " . htmlspecialchars($result['title']) . "</p>";
    echo "<p>URL: <a href=\"" . htmlspecialchars($result['url']) . "\">" . htmlspecialchars($result['url']) . "</a></p>";
    echo "<hr>";
}
