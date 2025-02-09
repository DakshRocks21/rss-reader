// Written by Daksh
// Adapted from https://www.embla-carousel.com/

import React, { useEffect, useRef, useState } from 'react'
import EmblaCarouselLib from 'embla-carousel'

import { PrevButton, NextButton, usePrevNextButtons } from './EmblaButtons'

const EmblaCarousel = ({ slides = [], options = {}, plugins = [], renderSlide }) => {
  const viewportRef = useRef(null)
  const [embla, setEmbla] = useState(null)

  useEffect(() => {
    if (!viewportRef.current) return
    const emblaInstance = EmblaCarouselLib(viewportRef.current, options, plugins)
    setEmbla(emblaInstance)
    return () => emblaInstance.destroy()
  }, [options, plugins])

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(embla)
  

  return (
    <div
      className="max-w-3xl mx-auto"
      style={{
        '--slide-height': '40rem',
        '--slide-spacing': '1rem',
        '--slide-size': '100%',
      }}
    >
      <div className="overflow-hidden" ref={viewportRef}>
        <div
          className="flex flex-col items-center space-y-16"
          style={{
            marginTop: "calc(var(--slide-spacing) * -1)",
            height: "calc(var(--slide-height))",
            touchAction: 'pan-x pinch-zoom', 
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="transform w-full"
              style={{                
                paddingTop: "var(--slide-spacing)",
              }}
            >
              {renderSlide(slide, index)}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-7">
        <PrevButton disabled={prevBtnDisabled} onClick={onPrevButtonClick} />
        <NextButton disabled={nextBtnDisabled} onClick={onNextButtonClick} />
      </div>
    </div>
  )
}

export default EmblaCarousel
