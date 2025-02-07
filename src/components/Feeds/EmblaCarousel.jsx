// Written by Daksh
// Adapted from https://www.embla-carousel.com/

import React, { useEffect, useRef, useState } from 'react'
import EmblaCarouselLib from 'embla-carousel'
import Autoplay from 'embla-carousel-autoplay'

import { PrevButton, NextButton, usePrevNextButtons } from './EmblaButtons'
import { DotButton, useDotButton } from './EmblaDotButtons'

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
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(embla)

  return (
    <div
      className="max-w-3xl mx-auto"
      style={{
        '--slide-height': '35rem',
        '--slide-spacing': '1rem',
        '--slide-size': '100%',
      }}
    >
      <div className="overflow-hidden" ref={viewportRef}>
        <div
          className="flex flex-col items-center"
          style={{
            marginTop: "calc(var(--slide-spacing) * -1)",
            height: "calc(var(--slide-spacing) + var(--slide-height))",
            touchAction: 'pan-x pinch-zoom', 
          }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="transform"
              style={{
                flex: "0 0 var(--slide-size)",
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

      {/* Dot Navigation */}
      {/* <div className="flex justify-center mt-4">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            className={`bg-transparent border-[0.2rem] border-[#888] rounded-full w-[2.6rem] h-[2.6rem] mx-[0.4rem] cursor-pointer ${
              selectedIndex === index && 'border-[#333]'
            }`}
            onClick={() => onDotButtonClick(index)}
          >
          </DotButton>
        ))}
      </div> */}

    </div>
  )
}

export default EmblaCarousel
