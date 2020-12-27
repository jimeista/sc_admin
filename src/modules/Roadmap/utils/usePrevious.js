import { useEffect, useRef } from 'react'

// кастомный хук сохранения пред состояния
export const usePrevious = (value) => {
  const ref = useRef()

  useEffect(() => {
    ref.current = value
  })

  return ref.current
}
