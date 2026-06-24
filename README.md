Mamatid Health Center - AI Chatbot Integration Guide

Overview
- Ang guide na ito ay para sa grupo ng Brgy. Mamatid Health Center na magdadagdag ng AI Chatbot
feature sa patient dashboard. Gagamitin ang Google Gemini API (libre) bilang AI backend at PHP +
MySQL para sa scheduling integration.


Mga Files na Gagawin
File Layunin
config/api_key.php Dito lang ilagay ang Gemini API key — huwag ibang file
patient/chatbot.php Chatbox UI page sa loob ng patient dashboard
api/chat.php PHP backend — tatawag sa Gemini API
assets/js/chat.js JavaScript — magpapadala at magpapakita ng reply
dashboard.html Dagdagan ng sidebar link papunta sa chatbot page


Step 1 — Kumuha ng Gemini API Key
1. Pumunta sa aistudio.google.com
2. Mag-login gamit ang Google account
3. Click 'Get API Key' then 'Create API key'
4. I-copy at i-save ang key — huwag ibabahagi
IMPORTANTE: Huwag i-paste ang API key sa kahit anong file maliban sa config/api_key.php.
Idagdag ang file na ito sa .gitignore bago mag-push sa GitHub.

Siguraduhing ganito ang structure ng project sa XAMPP htdocs:
htdocs/
 inyong-project/
 config/
 db.php <- existing na
 api_key.php <- BAGO: dito ang API key
 patient/
 dashboard.php <- existing
 chatbot.php <- BAGO: chatbot page
 staff/
 dashboard.php <- existing
 api/
 chat.php <- BAGO: Gemini backend
 assets/
 css/
 js/
 chat.js <- BAGO: frontend logic

 Step 3 — config/api_key.php
Isang linya lang ang laman ng file na ito:
<?php
define('GEMINI_API_KEY', 'paste-your-key-here');
?>
Huwag i-upload sa GitHub. Idagdag sa .gitignore: config/api_key.php


Step 4 — Chatbox UI (patient/chatbot.php)
Ito ang bagong page na makikita ng pasyente. I-link ito sa sidebar ng dashboard.html. Dalawang bahagi:
(1) chat messages area, at (2) input box + Send button.
<div class="chat-wrapper">
 <div id="chatMessages" class="chat-messages">
 <div class="msg bot">
 Hello! How can I help you today?
 </div>
 </div>
 <div class="chat-input-area">
 <input type="text" id="userInput"
 placeholder="Type your message...">
 <button onclick="sendMessage()">Send</button>
 </div>
 <p class="chat-disclaimer">
 For medical emergencies, please call 911 or
 go directly to the nearest hospital.
 </p>
</div>
<script src="../assets/js/chat.js"></script>
