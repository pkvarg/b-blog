import React from 'react'

const Footer = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-center'>
        <p className='text-grey text-[20px] text-center'>
          Copyright &copy; {Date().substring(11, 15)} All rights reserved
        </p>
        <a
          className='text-grey text-[20px] text-center'
          href='https://pictusweb.sk'
          target='_blank'
        >
          &#60;&#47;&#62; PICTUSWEB Development
        </a>
      </div>
    </>
  )
}

export default Footer
