// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './components/Home';
// import Projects from './components/Projects';
// import Contact from './components/Contact';
// import About2 from './components/About2';
// import Journey from './components/Journey';
// import Footer from './components/Footer';
//  // Make sure you have this file created

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/projects" element={<Projects />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/about" element={<About2 />} />
//         <Route path="/journey" element={<Journey />} /> {/* ✅ Added this line */}
//       </Routes>
//     </Router>
//   );
// };

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import Projects from './components/Projects';
import Contact from './components/Contact';
import About2 from './components/About2';
import Journey from './components/Journey';
import Signup from './components/Signup'; // ✅ Signup imported

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ✅ All routes including Signup now use Layout (Navbar + Footer) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About2 />} />
          <Route path="journey" element={<Journey />} />
          <Route path="signup" element={<Signup />} /> {/* ✅ Moved inside */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
