import React from 'react'

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <div>
        <div className='bg-red-800 w-2/12'>This is comming from the dashboard layout</div>
        {children}
        <div className='bg-red-800 w-2/12'>This is comming from the dashboard layout</div>
    </div>
  )
}

export default layout