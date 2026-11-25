import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import ProjectsGrid from './components/ProjectsGrid';
import Footer from './components/Footer';
import MotionEffects from './components/MotionEffects';
import Particles from './components/Particles';

export default function App() {
  return <div className="app-shell"><Particles/><div className="page-content"><MotionEffects/><Navbar/><main><Hero/><About/><TechStack/><ProjectsGrid/></main><Footer/></div></div>;
}

