import './home.css';
import MyNavbar from './components/navbar.js';

function Home() {
  return (
    
    <div className="Home">

      <header>
      <MyNavbar />
      </header>

      {/* The global font for our platform*/}
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@200..900&display=swap');
      </style>      
    </div>
  );
}

export default Home;
