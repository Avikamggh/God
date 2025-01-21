const chatbox = document.getElementById('chatbox');
const userInput = document.getElementById('userInput');

async function sendMessage() {
    const userMessage = userInput.value;
    if (!userMessage) return;

    chatbox.innerHTML += `<p><strong>You:</strong> ${userMessage}</p>`;
    userInput.value = '';

    try {
        const response = await axios.post('https://api.perplexity.ai/chat/completions', {
            model: 'llama-3.1-sonar-small-128k-online',
            messages: [
                { role: 'system', content: 'Be precise and concise.' },
                { role: 'user', content: userMessage }
            ]
        }, {
            headers: {
                'Authorization': 'Bearer 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',
                'Content-Type': 'application/json'
            }
        });

        const aiResponse = response.data.choices[0].message.content;
        chatbox.innerHTML += `<p><strong>AI:</strong> ${aiResponse}</p>`;
    } catch (error) {
        console.error('Error:', error);
        chatbox.innerHTML += `<p><strong>Error:</strong> Failed to get response from AI.</p>`;
    }

    chatbox.scrollTop = chatbox.scrollHeight;
}