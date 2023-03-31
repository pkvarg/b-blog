import React, { useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import Message from '../components/Message'

const Contact = () => {
  const [message, setMessage] = useState(null)
  const [messageSuccess, setMessageSuccess] = useState(null)
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [mailMessage, setMailMessage] = useState('')
  const [checkBox, setCheckBox] = useState(false)

  const handleCheckBox = () => {
    setCheckBox((current) => !current)
  }

  const form = useRef()
  const x = import.meta.env.VITE_EMAIL_EXTRA_ONE
  const y = import.meta.env.VITE_EMAIL_EXTRA_TWO
  const [passwordGroupOne, setPasswordGroupOne] = useState(x)
  const [passwordGroupTwo, setPasswordGroupTwo] = useState(y)

  const sendEmail = (e) => {
    e.preventDefault()

    if (passwordGroupOne !== x || passwordGroupTwo !== y) {
      setMessage('Error. Send us an email please.')
      setName('')
      setSubject('')
      setEmail('')
      setPhone('')
      setMailMessage('')
      // increaseBots()

      const element = document.getElementById('contact')
      element.scrollIntoView({ behavior: 'smooth' })
    } else {
      emailjs
        .sendForm(
          import.meta.env.VITE_EMAILJS_SERVICE,
          import.meta.env.VITE_EMAILJS_TEMPLATE,
          form.current,
          import.meta.env.VITE_EMAILJS_USER
        )
        .then(
          (result) => {
            console.log(result.text)
            setMessageSuccess('Success. Message sent!')

            console.log('message sent')
          },
          (error) => {
            console.log(error.text)
            setMessageSuccess(error.text)
          }
        )

      setName('')
      setSubject('')
      setEmail('')
      setPhone('')
      setMailMessage('')
      const element = document.getElementById('contact')
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className='pt-40 pb-10 '>
      <h1
        id='contact'
        className='text-[35px] lg:text-[50px] text-green text-center lg:pt-0 pt-[55px]'
      >
        Send us a message
      </h1>
      <div className='mx-4 md:mx-6 lg:mx-0 flex lg:flex-row flex-col lg:justify-center text-white lg:py-[5px] '>
        <div className='pt-[50px] lg:pt-0 lg:pt-[0px] '>
          {messageSuccess && (
            <Message variant='success'>{messageSuccess}</Message>
          )}
          {message && <Message variant='danger'>{message}</Message>}
          <div>
            <form
              ref={form}
              onSubmit={sendEmail}
              className='flex flex-col gap-[2.5px] text-[25px] text-grey'
            >
              <div className='flex lg:flex-row flex-col gap-[25px]'>
                <div className='flex flex-col justify-center '>
                  <label className='form-label mt-[2.5%]'>
                    Name <sup>*</sup>
                  </label>
                  <input
                    className='form-control rounded-xl'
                    type='text'
                    name='user_name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required='required'
                  />

                  <label className='form-label mt-[2.5%]'>
                    Email <sup>*</sup>
                  </label>
                  <input
                    className='form-control rounded-xl'
                    type='email'
                    name='user_email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required='required'
                  />
                </div>
                <div className='flex flex-col justify-center '>
                  <label className='form-label mt-[2.5%]'> Subject</label>
                  <input
                    className='form-control rounded-xl'
                    type='text'
                    name='user_subject'
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />

                  <label className='form-label mt-[2.5%]'> Phone</label>
                  <input
                    className='form-control rounded-xl'
                    type='text'
                    name='user_phone'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className='flex flex-col'>
                <label className='form-label mt-[2.5%]'>
                  Message <sup>*</sup>
                </label>
                <textarea
                  className='form-control rounded-xl'
                  rows='5'
                  name='message'
                  value={mailMessage}
                  onChange={(e) => setMailMessage(e.target.value)}
                  required='required'
                ></textarea>

                <div className='flex flex-row form-check mt-8'>
                  <input
                    id='flexCheckDefault'
                    type='checkbox'
                    defaultChecked={false}
                    value={checkBox}
                    onChange={handleCheckBox}
                    required='required'
                    className='rounded-xl w-[25px]'
                  />

                  <label
                    className='form-check-label text-[25px] lg:text-[30px] ml-[15px]'
                    htmlFor='flexCheckDefault'
                  >
                    I Agree with data collection
                  </label>
                </div>
              </div>
              <input
                className='form-control hidden'
                type='text'
                defaultValue={passwordGroupOne}
                onChange={(e) => setPasswordGroupOne(e.target.value)}
              />
              <input
                className='form-control hidden'
                type='text'
                defaultValue={passwordGroupTwo}
                onChange={(e) => setPasswordGroupTwo(e.target.value)}
              />
              <button
                className='text-[35px] bg-violet lg:mt-10 mt-10 pt-1 rounded-xl border border-white hover:text-white hover:bg-green'
                type='submit'
                value='Send'
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact