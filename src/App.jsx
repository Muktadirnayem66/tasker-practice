import Footer from "./components/Footer";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import TaskBoard from "./components/tasks/TaskBoard";


const App = () => {
  return (
    <div>

      <Header/>
     <div className="flex flex-col justify-center items-center">
     <HeroSection/>
     <TaskBoard/>
     
     </div>

      <Footer/>
      
    </div>
  );
};

export default App;