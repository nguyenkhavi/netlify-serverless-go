import { useEffect, useRef, useState } from 'react'

export default function useScrollableAnim(listLength: number) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const containerRef = useRef<HTMLElement>(null)

  const slidePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? listLength - 1 : prev - 1))
  }
  const slideNext = () => {
    setCurrentIndex((prev) => (prev === listLength - 1 ? 0 : prev + 1))
  }
  const slideTo = (index: number) => () => setCurrentIndex(index)

  useEffect(() => {
    const sectionEl = containerRef.current
    if (!sectionEl) return
    let startX = 0
    let endX = 0

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0]?.clientX ?? 0
    }

    const handleTouchEnd = (e: TouchEvent) => {
      endX = e.changedTouches[0]?.clientX ?? 0

      const distanceX = endX - startX

      if (distanceX > 50) {
        setCurrentIndex((prev) => (prev === 0 ? listLength - 1 : prev - 1))
      }
      if (distanceX < -50) {
        setCurrentIndex((prev) => (prev === listLength - 1 ? 0 : prev + 1))
      }
    }

    const handleMouseDown = (e: MouseEvent) => {
      startX = e.clientX
    }

    const handleMouseUp = (e: MouseEvent) => {
      endX = e.clientX

      const distanceX = endX - startX

      if (distanceX > 0) {
        setCurrentIndex((prev) => (prev === 0 ? listLength - 1 : prev - 1))
      }
      if (distanceX < 0) {
        setCurrentIndex((prev) => (prev === listLength - 1 ? 0 : prev + 1))
      }
    }

    sectionEl.addEventListener('touchstart', handleTouchStart, { passive: true })
    sectionEl.addEventListener('touchend', handleTouchEnd, { passive: true })
    sectionEl.addEventListener('mousedown', handleMouseDown, { passive: true })
    sectionEl.addEventListener('mouseup', handleMouseUp, { passive: true })
    return () => {
      sectionEl.removeEventListener('touchstart', handleTouchStart)
      sectionEl.removeEventListener('touchend', handleTouchEnd)
      sectionEl.removeEventListener('mousedown', handleMouseDown)
      sectionEl.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return [containerRef, { slidePrev, slideNext, currentIndex, slideTo }] as const
}
