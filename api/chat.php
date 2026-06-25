<?php
// api/chat.php - Backend API for Gemini integration
header('Content-Type: application/json');

// 1. Include the API key file (sitting in the root directory, one level up)
// --- FIX IS HERE: Path is updated to go one level up ---
require_once '../api_key.php';

// 2. Get the incoming JSON message from the frontend
$inputData = json_decode(file_get_contents('php://input'), true);
$userMessage = isset($inputData['message']) ? trim($inputData['message']) : '';

if (empty($userMessage)) {
    echo json_encode(['error' => 'Message cannot be empty.']);
    exit;
}

// 3. Set up the Gemini API Endpoint & Payload
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" . GEMINI_API_KEY;

// Contextual instructions guide the AI to act appropriately for a health center context
$payload = [
    "contents" => [
        [
            "parts" => [
                ["text" => $userMessage]
            ]
        ]
    ],
    "systemInstruction" => [
        "parts" => [
            ["text" => "You are an AI assistant for the Brgy. Mamatid Health Center. Help patients with general inquiries, center hours, or health tips, but remind them you cannot give official medical diagnoses. Keep responses helpful and concise."]
        ]
    ]
];

// 4. Send the request to Google Gemini API using cURL
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

$response = curl_exec($ch);

// Error check for connection issues
if (curl_errno($ch)) {
    echo json_encode(['error' => 'Failed to connect to AI engine: ' . curl_error($ch)]);
    curl_close($ch);
    exit;
}

curl_close($ch);

// 5. Parse Gemini's specific JSON structure and return it cleanly to JavaScript
$responseData = json_decode($response, true);

// Extract the core reply text from Gemini's nested response object
if (isset($responseData['candidates'][0]['content']['parts'][0]['text'])) {
    $aiReply = $responseData['candidates'][0]['content']['parts'][0]['text'];
    echo json_encode(['reply' => $aiReply]);
} else {
    // Return error and debug data if response is unexpected
    echo json_encode(['error' => 'Invalid response from AI server.', 'debug' => $responseData]);
}
?>