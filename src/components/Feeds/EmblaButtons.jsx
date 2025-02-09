// Written by Daksh
// Adapted from https://www.embla-carousel.com/

import React, { useCallback, useEffect, useState } from 'react'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

export const usePrevNextButtons = (emblaApi) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollPrev()
  }, [emblaApi])

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return
    emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback((emblaInstance) => {
    setPrevBtnDisabled(!emblaInstance.canScrollPrev())
    setNextBtnDisabled(!emblaInstance.canScrollNext())
  }, [])

  useEffect(() => {
    if (!emblaApi) return
    onSelect(emblaApi)
    emblaApi.on('reInit', onSelect).on('select', onSelect)
  }, [emblaApi, onSelect])

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  }
}

export const PrevButton = ({ children, ...restProps }) => {
  return (
    <button
      type="button"
      {...restProps}
      className="bg-secondary-container text-on-surface w-10 h-10 border rounded-lg cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <FaChevronUp className='text-xl'/>
      {children}
    </button>
  )
}

export const NextButton = ({ children, ...restProps }) => {
  return (
    <button
      type="button"
      {...restProps}
      className="bg-secondary-container text-on-surface w-10 h-10 border rounded-lg cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
    >
     <FaChevronDown className='text-xl' />
      {children}
    </button>
  )
}
