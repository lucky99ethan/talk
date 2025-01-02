import React from 'react'

const Layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='h-screen w-full bg-yellow-100'>
      {children}
    </div>
  )
}
export default Layout;
