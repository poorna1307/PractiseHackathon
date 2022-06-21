import logo from './logo.svg';
import './App.css';
import NavigationBar from './Components/NavigationBar';
import NavbarSignup from './Components/NavbarSignup';
import Footer from './Components/Footer';
function App() {
  return (
    <div className="App">
      {/* <NavigationBar/> */}
      <NavbarSignup/>
      <Footer/>
    </div>
  );
}

export default App;
