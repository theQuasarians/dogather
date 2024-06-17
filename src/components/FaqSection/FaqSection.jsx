import React from 'react'
import faqData from './faq-data.json'
import './FaqSection.css'

import AccordionItem from './AccordionItem'

const FaqSection = () => {

  return (
    <section className='faq-section'>
      <h3 className='faq-section__heading'>Questions & answers</h3>
      <h5 className='faq-section__heading--small'>FAQ</h5>
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
