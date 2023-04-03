import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth, xauth } from './../firebaseConfig'

const NavbarSubSite = () => {
  const [navbar, setNavbar] = useState(false)
  const navigate = useNavigate()

  const [isAuth, setIsAuth] = useState()

  useEffect(() => {
    const loggedIn = localStorage.getItem(xauth)
    if (loggedIn) {
      setIsAuth(loggedIn)
    } else if (!loggedIn) {
      setIsAuth(false)
    } else {
      setIsAuth(false)
    }
  }, [isAuth])

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      //navigate('/')
    })
  }

  return (
    <>
      <nav className='w-full text-white nav-font'>
        <div className='justify-between px-4 mx-auto lg:max-w-[90%] md:items-center md:flex md:px-8'>
          <div>
            <div className='flex items-center justify-between py-3 md:py-5 md:block'>
              <h1
                className='text-green text-[25px] ml-6 cursor-pointer'
                onClick={() => navigate('/')}
              >
                Home.
              </h1>
              <div className='md:hidden'>
                <button
                  className='p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border'
                  onClick={() => setNavbar(!navbar)}
                >
                  {navbar ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-10 h-10'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                    >
                      <path
                        fillRule='evenodd'
                        d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                        clipRule='evenodd'
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      className='w-10 h-10'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M4 6h16M4 12h16M4 18h16'
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? 'block' : 'hidden'
              }`}
            >
              <ul className='justify-center space-y-8 md:flex md:space-x-6 md:space-y-0'>
                {location.pathname !== '/blog' ? (
                  <li>
                    <a href='/blog' className='text-[2rem] hover:text-green'>
                      Blog
                    </a>
                  </li>
                ) : (
                  <li>
                    <a href='/surveys' className='text-[2rem] hover:text-green'>
                      Surveys
                    </a>
                  </li>
                )}

                {!isAuth && (
                  <li className='text-[2rem] hover:text-green'>
                    <a href={'/login'}>Login</a>
                  </li>
                )}
                {isAuth && (
                  <>
                    <li className='text-[2rem] hover:text-green'>
                      <button onClick={signUserOut}>Log out</button>
                    </li>
                    <li className='text-[2rem] hover:text-green'>
                      <a href={'/create-blog'} className='ml-2'>
                        Create Blog
                      </a>
                    </li>
                  </>
                )}

                {/* <li className='text-[2rem] hover:text-green'>
                  {!isAuth ? (
                    <a href={'/login'}>Login</a>
                  ) : (
                    <>
                    </>
                  )}
                </li> */}

                {/* <li>
              <LanguageBar />
            </li> */}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavbarSubSite
