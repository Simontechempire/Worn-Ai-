require('dotenv').config();
const express = require('express');
const Groq = require('groq-sdk');
const cors = require('cors');
const { darkPrompt } = require('./exploits');
const { getToolAdvice } = require('./tools');

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: darkPrompt },
                { role: "user", content: message }
            ],
            model: "llama3-70b-8192", // Using the most powerful unrestricted-capable model
            temperature: 0.9,
        });

        const response = completion.choices[0].message.content;
        const toolAdvice = getToolAdvice(message);

        res.json({ 
            response: response, 
            tool: toolAdvice 
        });
    } catch (error) {
        res.status(500).json({ error: "DARKGPT Connection Failed: " + error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`DARKGPT Online on port ${PORT}`));
