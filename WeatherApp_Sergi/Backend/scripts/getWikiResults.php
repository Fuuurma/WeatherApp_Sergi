<?php
// Get the location parameter from the URL
$location = isset($_GET['location']) ? $_GET['location'] : 'Barcelona';

// Set the endpoint and parameters for the Wikipedia API query
$endpoint = "https://en.wikipedia.org/w/api.php";
$params = [
    "action" => "query",
    "format" => "json",
    "titles" => $location,
    "prop" => "extracts",
    "exintro" => true,
    "explaintext" => true
];

// Build the URL
$url = $endpoint . "?" . http_build_query($params);

// Use file_get_contents to send the request
$response = file_get_contents($url);

// Check for a valid response
if ($response !== FALSE) {
    // Decode the JSON response
    $data = json_decode($response, true);

    // Extract the page information
    $pages = $data['query']['pages'];
    $page = reset($pages);

    // Prepare the response
    $result = [
        "title" => $page['title'],
        "extract" => $page['extract']
    ];

    // Output the JSON response
    header('Content-Type: application/json');
    echo json_encode($result, JSON_PRETTY_PRINT);
} else {
    // Handle the error case
    $error = [
        "error" => "Error fetching data from Wikipedia API"
    ];
    header('Content-Type: application/json');
    echo json_encode($error, JSON_PRETTY_PRINT);
}
