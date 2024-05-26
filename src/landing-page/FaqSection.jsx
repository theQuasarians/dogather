import React, { useEffect, useState } from 'react'
import './faq-section.css'

import AccordionItem from './AccordionItem'

const FaqSection = () => {
  const [headingText, setHeadingText] = useState('Questions & answers'); // Initial heading text

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setHeadingText(isMobile ? 'FAQs' : 'Questions & answers');
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const faqData = [
    {
      id: 1,
      question: "How does the app connect me to the people I can build projects with",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis leo hendrerit magna ullamcorper, quis ultricies magna fermentum."
    },

    {
      id: 2,
      question: "What skills should I have to connect with people",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis leo hendrerit magna ullamcorper, quis ultricies magna fermentum."
    },

    {
      id: 3,
      question: "How does this app help me to gather a team and launch my idea",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis leo hendrerit magna ullamcorper, quis ultricies magna fermentum."
    },
    {
      id: 4,
      question: "Should I be professional to gather people as my team",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis leo hendrerit magna ullamcorper, quis ultricies magna fermentum."
    },
    {
      id: 5,
      question: "Should I be professional to gather people as my team",
      answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis leo hendrerit magna ullamcorper, quis ultricies magna fermentum."
    }
  ]
  return (
    <section className='faq-section'>
      <h3 className='faq-section__heading'>{headingText}</h3>
      <div className='faq-section__accordion-wrapper'>
        {faqData.map(data => (
          <AccordionItem key={data.id} data={data}></AccordionItem>
        ))}
      </div>

    </section >
  )
}

export default FaqSection
