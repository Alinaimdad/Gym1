
import React from 'react';
import { TestimonialsData } from '../assets/assets';
import star_icon from '../assets/star_icon.svg';
import { motion } from 'framer-motion';

const Testimonials = () => {
  return (
    <div
      className="flex flex-col justify-center items-center container mx-auto 
      p-14 px-6 md:px-20 lg:px-32 w-full overflow-hidden bg-transparent"
      id="Testimonials"
    >
      {/* Heading */}
      <h1 className="text-2xl sm:text-4xl font-bold mb-2">
        Customers <span className="underline underline-offset-4 decoration-1 font-light">Testimonials</span>
      </h1>

      {/* Subheading */}
      <p className="text-gray-500 max-w-80 text-center mb-8">
        Real Stories From Those who Found their Homes With Us
      </p>

      {/* Testimonials Cards */}
      <div className="flex flex-wrap justify-center gap-8">
        {TestimonialsData.map((testimonial, index) => (
          <motion.div
            key={index}
            className="max-w-[320px] border shadow-lg rounded-xl px-6 py-8 text-center bg-white"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <img
              src={testimonial.image}
              alt={testimonial.alt}
              className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
            />
            <h3 className="text-lg font-semibold">{testimonial.name}</h3>
            <p className="text-sm text-gray-500">{testimonial.title}</p>

            {/* Stars */}
            <div className="flex justify-center gap-1 mt-3">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <img key={i} src={star_icon} alt="star" className="w-4 h-4" />
              ))}
            </div>

            {/* Text */}
            <p className="mt-4 text-gray-600 italic text-sm">
              "{testimonial.text}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;

