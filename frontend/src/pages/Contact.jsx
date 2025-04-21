import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="max-w-screen-xl mx-auto py-10 px-4">
      <div className="text-center text-3xl font-semibold text-[#333333] mb-8">
        <p>CONTACT <span className="text-gray-700">US</span></p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-10 mb-28 items-center">
        <div className="w-full md:w-1/2">
          <img className="w-full rounded-lg shadow-lg" src={assets.contact_image} alt="Contact Us" />
        </div>
        <div className="flex flex-col justify-center items-start gap-6 w-full md:w-1/2 text-gray-600">
          <div className="space-y-2">
            <p className="text-xl font-semibold text-gray-800">OUR OFFICE</p>
            <p className="text-gray-500">Rajkot, Gujarat, India</p>
          <p className=' text-gray-500'>+91-80328-02223 <br /> Email: prescripto@gmail.com</p>
          <p className=' font-semibold text-lg text-gray-600'>CAREERS AT PRESCRIPTO</p>
          <p className=' text-gray-500'>Learn more about our teams and job openings.</p>
          </div>
          
          <div className="space-y-2">
            <p className="text-xl font-semibold text-gray-800">CAREERS AT PRESCRIPTO</p>
            <p className="text-gray-500">Learn more about our teams and job openings.</p>
            <button className="bg-primary text-white px-8 py-3 rounded-md hover:bg-gray-800 transition-all duration-300">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
