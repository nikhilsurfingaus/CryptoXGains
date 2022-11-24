import './App.css';
import Form from './Components/Form';
import logo from './Assets/logo.png';
import Footer from './Components/Footer';
import ParticlesBg from './Components/ParticlesBg';

function App() {


  return (
    <div className="App" style={{maxWidth: 600, margin: "1rem auto"}}>
      <img className='display-1 my-5 logo animate__animated animate__slideInDown' src={logo} alt='site logo' /> 
      <ParticlesBg />

      <Form />
      <Footer/>

    </div>
  );
}

export default App;
