import React from 'react'
import './FaqSection.css'

import AccordionItem from './AccordionItem'

const FaqSection = () => {
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
      <h5 className='faq-section__heading'>Questions & answers</h5>
      <h6 className='faq-section__heading--small'>FAQs</h6>
      <div className='faq-section__accordion-wrapper'>
        {faqData.map(data => (
          <AccordionItem key={data.id} data={data} />
        ))}
      </div>
    </section >
  )
}

export default FaqSection
