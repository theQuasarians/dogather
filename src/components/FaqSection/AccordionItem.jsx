import React, { useState } from 'react'
import accordionMinus from '../../assets/accordionMinus.svg'
import accordionPlus from '../../assets/accordionPlus.svg'

const AccordionItem = ({ question, answer, index }) => {
  const [isOpen, setIsOpen] = useState(index === 0)

  const toggleOpen = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <div className='accordion-item'>
      {/* Toggles content when title text is clicked */}
      <div className='accordion-item__title-group' onClick={toggleOpen}>
        <h4 className='accordion-item__title'>{question}</h4>
        <img
          className='accordion-item__icon'
          src={isOpen ? accordionMinus : accordionPlus}
        />
      </div>
      <p className={`accordion-item__content 
          ${isOpen ? 'accordion-item__content--active' : ''}`}>
        {answer}
      </p>
    </div>
  )
}

export default AccordionItem
