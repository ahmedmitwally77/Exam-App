import AuthAside from '@/components/shared/auth-shared/auth-aside'
import React from 'react'

type Props = {
  children: React.ReactNode
}
export default function layout({ children }: Props) {
  return (
    <div className='auth-layout grid md:grid-cols-2  min-h-screen'>
      <AuthAside />
      <div className=''>{children}</div>
    </div>
  )
}
