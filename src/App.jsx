import './App.css';
import {BsCashCoin} from "react-icons/bs"
import Form from './Components/Form';


function App() {
  return (
    <div className="App" style={{maxWidth: 600, margin: "1rem auto"}}>
      <h1 className='display-1 my-5' > <BsCashCoin/> Crypto X Gain Calculator</h1>
      <Form/>
    </div>
  );
}

export default App;
