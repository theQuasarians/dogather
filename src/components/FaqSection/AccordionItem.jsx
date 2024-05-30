import React, { useState } from 'react'

const AccordionItem = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='accordion-item'>
      <div className='accordion-item__title-group'>
        <h4 className='accordion-item__title'>{data.question}</h4>
        {isOpen ?
          <button onClick={toggleOpen} className='accordion-item__close'>
            <img className='accordion-item__icon' src='../../public/accordionMinus.svg' />
          </button>
          :
          <button onClick={toggleOpen} className='accordion-item__open'>
            <img className='accordion-item__icon' src='../../public/accordionPlus.svg' />
          </button>
        }
      </div>
      <p className={`accordion-item__content ${isOpen ? '' : 'hidden'}`}>{data.answer}</p>
    </div>
  )
}

export default AccordionItem
