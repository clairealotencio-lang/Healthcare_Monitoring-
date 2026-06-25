// js/chat.js - Frontend logic for the Health AI Chatbot

async function sendMessage() {
    const inputField = document.getElementById('userInput');
    const chatMessages = document.getElementById('chatMessages');
    const messageText = inputField.value.trim();

    // Prevent sending empty text
    if (!messageText) return;

    // 1. Display User Message in the chat area
    appendMessage(messageText, 'user');
    inputField.value = ''; // Clear input field

    // 2. Display a temporary "Thinking..." placeholder for the bot
    const loadingId = 'loading-' + Date.now();
    appendMessage('Thinking...', 'bot', loadingId);

    try {
        // 3. Send the message to your PHP backend in the 'api' folder
        // --- FIX IS HERE: fetch path updated to reach '../api/chat.php' ---
        const response = await fetch('../api/chat.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: messageText })
        });
        // ---------------------------------------------------------------------

        const data = await response.json();
        
        // Remove the temporary loading element
        document.getElementById(loadingId)?.remove();

        // 4. Render the AI response or an error message
        if (data.reply) {
            appendMessage(data.reply, 'bot');
        } else if (data.error) {
            appendMessage('Error: ' + data.error, 'bot error');
        } else {
            appendMessage('Something went wrong. Please try again later.', 'bot error');
        }

    } catch (error) {
        console.error('Chat Error:', error);
        // Remove loading indicator if connection fails
        document.getElementById(loadingId)?.remove();
        appendMessage('Could not connect to the health center server.', 'bot error');
    }
}

// Helper function to dynamically add message blocks to the DOM
function appendMessage(text, sender, id = null) {
    const chatMessages = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    
    // Assign classes for styling ('msg bot' or 'msg user')
    messageDiv.className = `msg ${sender}`;
    if (id) messageDiv.id = id;
    
    // textContent safe prevents XSS vulnerabilities
    messageDiv.textContent = text;
    
    chatMessages.appendChild(messageDiv);
    
    // Auto-scroll to the bottom of the chat pane
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Allow sending messages by pressing the "Enter" key
document.getElementById('userInput')?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});