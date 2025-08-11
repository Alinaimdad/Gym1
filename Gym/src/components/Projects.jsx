

// import React, { useRef } from 'react';
//  import { projectsData, assets } from '../assets/assets';

// const Projects = () => {
//   const scrollRef = useRef(null);

//   const scroll = (direction) => {
//     if (scrollRef.current) {
//       const scrollAmount = direction === 'left' ? -300 : 300;
//       scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
//     }
//   };

//   return (
//     <div className="w-full py-16 px-6 md:px-20 lg:px-32 bg-white" id="Projects">
//       <h1 className="text-3xl font-bold text-center mb-2">
//         Project <span className="underline font-light">Completed</span>
//       </h1>
//       <p className="text-center text-gray-500 mb-6">
//         Crafting Spaces, Building Legacies, Explore our Portfolio
//       </p>

//       {/* Arrows */}
//       <div className="flex justify-center gap-4 mb-4">
//         <button onClick={() => scroll('left')} className="p-3 bg-gray-200 rounded-full hover:bg-gray-300">
//           <img src={assets.left_arrow} alt="Left" className="w-4 h-4" />
//         </button>
//         <button onClick={() => scroll('right')} className="p-3 bg-gray-200 rounded-full hover:bg-gray-300">
//           <img src={assets.right_arrow} alt="Right" className="w-4 h-4" />
//         </button>
//       </div>

//       {/* Horizontal Slider */}
//       <div
//         ref={scrollRef}
//         className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-2"
//       >
//         {projectsData.map((project, index) => (
//           <div
//             key={index}
//             className="min-w-[300px] max-w-sm bg-white rounded-xl shadow-md flex-shrink-0"
//           >
            
//             <div className="p-4">
//               <h3 className="text-lg font-bold">{project.title}</h3>
//               <p className="text-sm text-gray-500">{project.location}</p>
//               <p className="text-sm text-gray-700">{project.price}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Projects;
import React, { useRef } from 'react';
import { projectsData, assets } from '../assets/assets';

const Projects = () => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full py-16 px-6 md:px-20 lg:px-32 bg-white" id="Projects">
      <h1 className="text-3xl font-bold text-center mb-2">
        Project <span className="underline font-light">Completed</span>
      </h1>
      <p className="text-center text-gray-500 mb-6">
    "From Iron to Inspiration — Discover Our Gym Setup Masterpieces"
      </p>

      {/* Arrows */}
      <div className="flex justify-center gap-4 mb-4">
        <button onClick={() => scroll('left')} className="p-3 bg-gray-200 rounded-full hover:bg-gray-300">
          <img src={assets.left_arrow} alt="Left" className="w-4 h-4" />
        </button>
        <button onClick={() => scroll('right')} className="p-3 bg-gray-200 rounded-full hover:bg-gray-300">
          <img src={assets.right_arrow} alt="Right" className="w-4 h-4" />
        </button>
      </div>

      {/* Horizontal Scrollable Projects */}
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-2"
      >
        {projectsData.map((project, index) => (
          <div
            key={index}
            className="min-w-[300px] max-w-sm bg-white rounded-xl shadow-md flex-shrink-0"
          >
            <img
              src={project.img} // Make sure it's "img" in your data
              alt={project.title}
              className="w-full h-48 object-cover rounded-t-xl"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">{project.title}</h3>
              <p className="text-sm text-gray-500">{project.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;



