import React from 'react';
import Header from './Header';

const AboutUs = () => {
  return (
    <main className="w-screen min-h-screen flex flex-col items-center justify-center bg-primary mt-0">
      <Header />
      <div className="flex flex-col items-center justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
        <h1 className="text-3xl font-bold text-center mb-8">About Us</h1>
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-between w-full">
          <div className="md:w-1/2 max-w-lg">
            <p className="text-lg text-gray-700 mb-4">
              We are a passionate team dedicated to bringing delicious food right to your doorstep.
              Our mission is to provide a seamless and enjoyable food delivery experience for our customers.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              With our wide range of partner restaurants and efficient delivery system, you can order your favorite meals with ease and have them delivered in no time.
            </p>
            <p className="text-lg text-gray-700">
              Customer satisfaction is our top priority, and we strive to deliver exceptional service every step of the way.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              src="https://plus.unsplash.com/premium_photo-1678281888592-8ad623bb39e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80"
              alt="About Us"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default AboutUs;
