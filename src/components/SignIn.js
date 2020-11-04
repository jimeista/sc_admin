import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getCurrentUser } from '../features/admin/adminSlice'

export const SignIn = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrentUser())
  }, [dispatch])

  return ''
}
