import React from 'react'
import { useNavigate } from 'react-router-dom'

const Surveys = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className='text-white'>
        <h1
          className='text-green text-[25px] cursor-pointer'
          onClick={() => navigate('/')}
        >
          Home.
        </h1>
        <h1 className='text-center text-[50px] p-8'>Surveys</h1>
        <div className='m-8 text-[25px] '>
          <p className='my-5 text-green'>
            These surveys are for Christians for a few good purposes:
          </p>

          <li>To start some meaningful conversations on faith.</li>
          <li>To see how we do and think.</li>
          <li>To make you check if the Bible really tells you so.</li>
          <li>To help one another be fresh and living testimony of Jesus.</li>
          <li>To maintain the God given oneness of the Spirit.</li>

          <p className='my-5 text-message-red'>
            These surveys are NOT INTENDED:
          </p>
          <li>To fight for denominational doctrines.</li>
          <li>To cause divisions.</li>
          <li>To slander anyone.</li>
        </div>
      </div>
    </>
  )
}

export default Surveys
