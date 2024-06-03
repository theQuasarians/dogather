import React from 'react'
import faqData from './faq-data.json'
import './FaqSection.css'

import AccordionItem from './AccordionItem'

const FaqSection = () => {

  return (
    <section className='faq-section'>
      <h5 className='faq-section__heading'>Questions & answers</h5>
      <h6 className='faq-section__heading--small'>FAQs</h6>
      <div className='faq-section__accordion-wrapper'>
        {faqData && (
          faqData.map((data, index) => (
            <AccordionItem
              key={data.id}
              question={data.question}
              answer={data.answer}
              index={index}
            />
          )))}
      </div>
    </section >
  )
}

export default FaqSection
