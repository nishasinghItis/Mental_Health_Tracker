import OpenAI from 'openai';

export const handleAIChat = async (req, res) => {
  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENROUTER_API_KEY,
      baseURL: 'https://openrouter.ai/api/v1',
    });

    const messages = req.body.messages;

    const formattedMessages = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text,
    }));

    const response = await openai.chat.completions.create({
      model: 'meta-llama/llama-3-8b-instruct',
      messages: [
        { role: 'system', content: 'You are a supportive mental health assistant.' },
        ...formattedMessages,
      ],
      temperature: 0.7,
    });

    const aiReply = response.choices[0].message.content.trim();
    res.status(200).json({ reply: aiReply });
    console.log("Received messages:", messages);
console.log("Sending to OpenAI:", formattedMessages);
console.log("OPENAI_API_KEY Present?", !!process.env.OPENAI_API_KEY);

  } catch (err) {
    console.error('AI Error:', err.response?.data || err.message);
    res.status(500).json({ message: 'AI failed to respond' });
  }
};
