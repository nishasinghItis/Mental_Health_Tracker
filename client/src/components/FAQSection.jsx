import React, { useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const faqs = [
  {
    question: "Is my mood data private?",
    answer: "Yes. Your mood entries are securely stored and only visible to you unless you choose to share them."
  },
  {
    question: "How often should I log my mood?",
    answer: "Ideally once a day, but you can log as many times as you need. Regular tracking helps improve self-awareness."
  },
  {
    question: "What is AI Mood Analysis?",
    answer: "Our AI scans your mood notes to summarize emotional trends, helping you better understand your mental health."
  },
  {
    question: "Can I download my mood history?",
    answer: "This feature is coming soon! You’ll be able to export your mood logs in PDF or CSV format."
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">❓ FAQs</h3>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 cursor-pointer transition-all"
            onClick={() => toggleFAQ(index)}
          >
            <div className="flex justify-between items-center">
              <h4 className="font-medium">{faq.question}</h4>
              <span className="text-purple-500">{openIndex === index ? '−' : '+'}</span>
            </div>
            {openIndex === index && (
              <p className="text-gray-600 dark:text-gray-300 mt-2">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
