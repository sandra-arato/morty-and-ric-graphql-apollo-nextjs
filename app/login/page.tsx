'use client'
 
import { useRouter } from 'next/navigation'
import Login from './login'
 
export default function Page() {
  const router = useRouter()
 
  return (
    <Login onSubmit={() => router.push('/')} />
  )
}