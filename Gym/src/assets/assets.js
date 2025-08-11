
import cross_icon from './cross_icon.svg';
import menu_icon from './menu_icon.svg';
import star_icon from './star_icon.svg';
import left_arrow from './left_arrow.svg';
import right_arrow from './right_arrow.svg';
import brand_img from './brand_img.png';
import header_img from './header_img.png';
import { FaEnvelope } from 'react-icons/fa';



// PROJECT IMAGES
import project_1 from './project_1.jpg';
import project_2 from './project_2.jpg';
import project_3 from './project_3.jpg';
import project_4 from './project_4.jpg';
import project_5 from './project_5.jpg';
import project_6 from './project_6.jpg';

// PROFILE IMAGES
import profile_1 from './profile_1.png';
import profile_2 from './profile_2.png';
import profile_3 from './profile_3.png';

// ASSETS EXPORT
export const assets = {
  
  cross_icon,
  menu_icon,
  star_icon,
  left_arrow,
  right_arrow,
  brand_img,
  project_1,
  project_2,
  project_3,
  project_4,
  project_5,
  project_6,
  profile_1,
  profile_2,
  profile_3,
  brand_img,
  header_img,
 
 
};

// PROJECT DATA
export const projectsData = [
  {
    title: "Skyline Haven",
    location: "California",
    img: assets.project_1
  },
  {
    title: "Vista Verde",
     location: "San Francisco",
    img: assets.project_2
  },
  {
    title: "Serenity Suites",
    location: "Chicago",
    img: assets.project_3
  },
  {
    title: "Central Square",
    location: "Los Angeles",
    img:assets.project_4
  },
  {
    title: "Ocean View",
    location: "Miami",
    img: assets.project_5
  },
  {
    title: "Golden Peak",
    location: "New York",
    img: assets.project_6
  },
];


// TESTIMONIAL DATA
export const TestimonialsData = [
  {
    name: "Donald Jackman",
    title: "Fitness Enthusiast",
    image: profile_1,
    alt: "Portrait of Donald Jackman",
    rating: 5,
    text: "Joining this gym was the best decision of my life. I feel stronger, healthier, and more confident every day!"
  },
  {
    name: "Richard Nelson",
    title: "Software Engineer",
    image: profile_2,
    alt: "Portrait of Richard Nelson",
    rating: 4,
    text: "From the trainers to the equipment — everything is top-notch. I’ve gained muscle and discipline here!"
  },
  {
    name: "James Washington",
    title: "Entrepreneur",
    image: profile_3,
    alt: "Portrait of James Washington",
    rating: 5,
    text: "In just 3 months, I transformed my body. The energy here is unmatched — it's my second home now!"
  }
];

