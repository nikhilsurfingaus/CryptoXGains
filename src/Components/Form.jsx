import React from 'react'
import FormInputLabel from './FormInputLabel'
import {FaDollarSign} from "react-icons/fa"
import {RiCoinsFill, RiCoinFill} from "react-icons/ri"
import {BiRefresh, BiRocket} from "react-icons/bi"
import {useState} from 'react'
import './Form.css'
import Select from 'react-select';
import Axios from 'axios';
import {useEffect} from 'react'
import Footer from './Footer';

function Form() {

    const [crypto, setCrypto] = useState("");
    const [intialTokPrice, setInitialTokPrice] = useState("");
    const [tokens, setTokens] = useState("");
    const [intialInvestment, setIntialInvestment] = useState("");
    const [sellTokPrice, setSellTokPrice] = useState("");
    const [finalInvestment, setFinalInvestment] = useState("");
    const [xGain, setXGain] = useState("");
    const [result, setResult] = useState("")

    function roundHalf(num) {
        return Math.round(num*2)/2;
    }

    function calculateInitialInvest() {
        var initalIn = intialTokPrice*tokens;
        setIntialInvestment(initalIn);
        return intialInvestment;
    }

    function calculateFinalInvest() {
        var FinalIn = sellTokPrice*tokens;
        setFinalInvestment(FinalIn);
        return finalInvestment;
    }

    function calculateGains() {
        var finalInvest = sellTokPrice*tokens;
        var deciGain = roundHalf(finalInvest/intialInvestment);
        setXGain(deciGain);
        updateResult();
        return xGain;
    }

    function updateResult() {
        if ((crypto !== "") && (intialTokPrice !== "") && (tokens !== "") && (sellTokPrice !== "")) {
            let disp = "X " + crypto + " Gains Required"
            setResult(disp);
        } else {
            var err = ": Ensure All Fields Are Complete"
            setResult(err);
        }
    }

    const [set, setList] = useState(false)

    //API MAGIC STUFF HERE
    const [listOfCoins, setListOfCoins] = useState([]);
    const [newArr, setNewArr] = useState([]);

    useEffect(() => {
        Axios.get("https://api.coinstats.app/public/v1/coins?skip=0&limit=200").then(
            (response) => {
              setListOfCoins(response.data.coins);
              coinToArr();
            }).catch(err => console.log(err))
      });

      function coinToArr() {
        listOfCoins.forEach((mapItem) => {
            if (set === false) {
                setNewArr(newArr => [...newArr, {value: mapItem.name, label: mapItem.symbol, logo: mapItem.icon}])
                setList(true)
            }
        })
      }

      function refreshPage(){
        window.location.reload();
    } 

  return (
    <form className='major' onSubmit={(e)=> e.preventDefault()}>


        <div className='input-group mb-3'>
            <span className='input-group-text'> Select Cryptocurrenecy <RiCoinFill className='ico'/></span>
            <Select className='drop'  options={newArr} onChange={opt => setCrypto(opt.value)}
            formatOptionLabel={newArr => (
                <div className="country-option">
                  <img className='coin-logo' src={newArr.logo} alt="logo" />
                  <span>{newArr.label}</span>
                </div>)}
            />
        </div>


        {/* <FormInputLabel dataType={"text"} text="Cryptocurrency" icon={<RiCoinFill className='ico'/>} 
        placeholder="Select Cryptocurrenecy" value={crypto} onInput={(e)=> setCrypto(e.target.value)}/> */}

        <FormInputLabel dataType={"number"} text="Intial Buy" icon={<FaDollarSign className='ico'/>} 
        placeholder="Price Per Token/Coin" onKeyUp={calculateInitialInvest} value={intialTokPrice} 
        onInput={(e)=> setInitialTokPrice(e.target.value)}/>

        <FormInputLabel dataType={"number"} text="Tokens/Coins" icon={<RiCoinsFill className='ico'/>} placeholder="Number Of Token/Coin" 
        onKeyUp={calculateInitialInvest} value={tokens}
        onInput={(e)=> setTokens(e.target.value)}/>

        <FormInputLabel dataType={"number"} text="Total Intial Investment" icon={<FaDollarSign className='ico'/>} 
                placeholder="Calculated Intial Investement" readOnly={true} value={intialInvestment}/>

        <FormInputLabel dataType={"number"} text="Target Sell Price" icon={<FaDollarSign className='ico'/>} 
        placeholder="Sell Price Per Token/Coin" value={sellTokPrice} 
        onKeyUp={calculateFinalInvest}
        onInput={(e)=> setSellTokPrice(e.target.value)}/>

        <FormInputLabel dataType={"number"} text="Total Final Investment" icon={<FaDollarSign className='ico'/>} 
                placeholder="Calculated Final Investement" readOnly={true} value={finalInvestment}/>

        <h4 className="alert alert-info fw-bold">
            {xGain}{result}
        </h4>

        <button type='submit' className='btn btn-info btn-lg w-50 center' 
            onClick={calculateGains}> <BiRocket className='ref-icon'/> Calculate  </button>


        <button type='submit' className='btn btn-info btn-sm w-10 float-left refresh' 
            onClick={refreshPage}> <BiRefresh className='ref-icon'/>   
        </button>

        <Footer/>

    </form>
  )
}

export default Form