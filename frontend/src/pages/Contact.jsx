import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-[#707070]'>
        <p>CONTACT <span className='text-gray-700 font-semibold'></span></p>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="png image from pngtree.com/" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className=' font-semibold text-lg text-gray-600'>OUR OFFICE</p>
          <p className=' text-gray-500'>765,Chinhat  <br /> 226028,  Lucknow, India</p>
          <p className=' text-gray-500'>Tel: 8318153358 <br /> Email: ps8448373@gmail.com</p>
        </div>
      </div>

    </div>
  )
}

export default Contact
