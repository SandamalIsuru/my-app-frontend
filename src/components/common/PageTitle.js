import { Divider } from '@mui/material'
import classNames from 'classnames'
import React from 'react'

const PageTitle = ({className, title, boldTitle}) => {
  return (
    <div className={classNames("flex xxs:flex-col lg:flex-row lg:items-end lg:justify-between", className)}>
        <div className='text-4xl'>{title}<span className='font-bold ml-2'>{boldTitle}</span></div>
        <div className='lg:flex lg:flex-1 bg-dividerColor h-1 lg:mb-2 xxs:mt-2'>
          <Divider />
        </div>
    </div>
  )
}

export default PageTitle