const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

async function sendMessage() {
    const text = userInput.value;
    if (!text) return;

    appendMessage('user', text);
    userInput.value = '';

    try {
        const response = await fetch('/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: text })
        });
        const data = await response.json();
        
        let botText = data.response;
        if (data.tool) botText += `\n\n[SYSTEM ADVICE]: ${data.tool}`;
        
        appendMessage('bot', botText);
    } catch (e) {
        appendMessage('bot', 'ERROR: System breach or API failure.');
    }
}

function appendMessage(role, text) {
    const div = document.createElement('div');
    div.className = `msg ${role}`;
    div.innerText = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.onclick = sendMessage;
userInput.onkeypress = (e) => { if (e.key === 'Enter') sendMessage(); };
