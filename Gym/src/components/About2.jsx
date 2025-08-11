
import React from 'react';
import brand_img from '../assets/brand_img.png';
import CountUp from 'react-countup';

const About2 = () => {
  return (
    <div
      className="flex flex-col justify-center items-center container mx-auto 
        p-14 px-6 md:px-20 lg:px-32 w-full overflow-hidden bg-transparent"
      id="About"
    >
      {/* Heading */}
      <h1 className="text-2xl sm:text-4xl font-bold mb-2">
        About <span className="underline underline-offset-4 decoration-1 font-light">Our Gym</span>
      </h1>

      {/* Subheading */}
      <p className="text-gray-500 max-w-80 text-center mb-8">
        Passionate About Fitness, Committed to Your Transformation
      </p>

      {/* Stats Section */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-12 mt-10">
        <div className="grid grid-cols-2 gap-6 md:gap-10 text-center md:text-left">
          <div>
            <p className="text-4xl font-medium text-gray-800">
              <CountUp end={10} duration={3} />+
            </p>
            <p>Years of Fitness Excellence</p>
          </div>
          <div>
            <p className="text-4xl font-medium text-gray-800">
              <CountUp end={500} duration={3} />+
            </p>
            <p>Happy Members</p>
          </div>
          <div>
            <p className="text-4xl font-medium text-gray-800">
              <CountUp end={50} duration={3} />+
            </p>
            <p>Certified Trainers</p>
          </div>
          <div>
            <p className="text-4xl font-medium text-gray-800">
              <CountUp end={100} duration={3} />+
            </p>
            <p>Fitness Programs</p>
          </div>
        </div>
      </div>

      {/* Bottom Paragraph */}
      <p className="text-gray-500 text-center mt-12 max-w-xl mx-auto">
        We are committed to transforming lives through fitness, dedication, and expert guidance — helping you become the strongest version of yourself.
      </p>

     
    </div>
  );
};

export default About2;

