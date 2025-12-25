import OpenAI from 'openai';

export const handleAIChat = async (req, res) => {
  try {
    // Check if API key is configured
    if (!process.env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY === 'your-openrouter-api-key-here') {
      // Fallback response when API key is not configured
      const userMessage = req.body.messages[req.body.messages.length - 1]?.text || '';
      const fallbackResponse = generateFallbackResponse(userMessage);
      return res.status(200).json({ reply: fallbackResponse });
    }

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
    
  } catch (err) {
    console.error('AI Error:', err.response?.data || err.message);
    // Fallback response on error
    const userMessage = req.body.messages[req.body.messages.length - 1]?.text || '';
    const fallbackResponse = generateFallbackResponse(userMessage);
    res.status(200).json({ reply: fallbackResponse });
  }
};

// Simple fallback response generator
const generateFallbackResponse = (userMessage) => {
  const responses = [
    "I understand you're going through something. Remember, it's okay to feel what you're feeling.",
    "Thank you for sharing with me. Taking time to reflect on your emotions is a positive step.",
    "I hear you. Sometimes talking about our feelings can help us process them better.",
    "Your feelings are valid. Consider practicing some deep breathing or mindfulness techniques.",
    "It sounds like you're dealing with a lot. Remember to be kind to yourself during difficult times."
  ];
  
  // Simple keyword-based responses
  const lowerMessage = userMessage.toLowerCase();
  if (lowerMessage.includes('sad') || lowerMessage.includes('depressed')) {
    return "I'm sorry you're feeling sad. Remember that these feelings are temporary, and it's okay to reach out for support when you need it.";
  }
  if (lowerMessage.includes('anxious') || lowerMessage.includes('worried')) {
    return "Anxiety can be overwhelming. Try taking slow, deep breaths. Focus on what you can control right now.";
  }
  if (lowerMessage.includes('angry') || lowerMessage.includes('frustrated')) {
    return "It's natural to feel frustrated sometimes. Consider taking a short break or doing something that helps you relax.";
  }
  if (lowerMessage.includes('happy') || lowerMessage.includes('good')) {
    return "I'm glad to hear you're feeling positive! It's wonderful when we can appreciate the good moments.";
  }
  
  return responses[Math.floor(Math.random() * responses.length)];
};
