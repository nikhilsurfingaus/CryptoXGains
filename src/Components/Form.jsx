import React from 'react'
import FormInputLabel from './FormInputLabel'
import {FaDollarSign} from "react-icons/fa"
import {RiCoinsFill, RiCoinFill} from "react-icons/ri"
import {BiRefresh, BiRocket} from "react-icons/bi"
import {useState} from 'react'
import './Form.css'
import Select from 'react-select';
import {useEffect} from 'react'
import {IToasterTypes, NotificationToast, ToastEvent, toastEventManager} from "dyzz-toaster";

function Form() {

    const [crypto, setCrypto] = useState("");
    const [intialTokPrice, setInitialTokPrice] = useState("");
    const [tokens, setTokens] = useState("");
    const [intialInvestment, setIntialInvestment] = useState("");
    const [sellTokPrice, setSellTokPrice] = useState("");
    const [finalInvestment, setFinalInvestment] = useState("");
    const [xGain, setXGain] = useState("");
    const [result, setResult] = useState("")
    const [displayResult, setDisplayResult] = useState(false)

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
        setDisplayResult(true)
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

    //const [set, setList] = useState(false)

    //API MAGIC STUFF HERE
    //const [listOfCoins, setListOfCoins] = useState([]);
    const [newArr, setNewArr] = useState([]);

        useEffect(() => {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    'X-API-KEY': 'r/f2OW8soqrmcLwd9/oSbJP4Myqs6ffzgabhiRCml1g='
                }
            };

            fetch('https://openapiv1.coinstats.app/coins?limit=200', options)
                .then(response => response.json())
                .then(response => {
                    console.log(response); // Log the response object to inspect its structure

                    if (response && response.result) {
                        const coinData = response.result.map(item => ({
                            value: item.name,
                            label: item.symbol,
                            logo: item.icon
                            // Add other necessary properties as needed
                        }));
                        
                        setNewArr(coinData);
                    }
                })
                .catch(err => console.error(err));
        }, []);


    // Deprecated Function
    //   function coinToArr() {
    //     listOfCoins.forEach((mapItem) => {
    //         if (set === false) {
    //             setNewArr(newArr => [...newArr, {value: mapItem.name, label: mapItem.symbol, logo: mapItem.icon}])
    //             setList(true)
    //         }
    //     })
    //   }

      function refreshPage(){
        setCrypto("");
        setInitialTokPrice("");
        setTokens("");
        setIntialInvestment("");
        setSellTokPrice("");
        setFinalInvestment("");
        setXGain("");
        setResult("")
        setDisplayResult(false)
        reset();
    } 

    const reset = () => {
        toastEventManager.emit(ToastEvent.CREATE,
          {timeOutDelay: 3500, indicateLine: true, text: 'All Fields Reset', type: IToasterTypes.NOTIFICATION})
    };

  return (
    <form className='major animate__animated animate__fadeIn' onSubmit={(e)=> e.preventDefault()}>


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


        {displayResult ? (
            <h4 className="alert alert-info fw-bold">
            {xGain}{result}
            </h4>
        ): null}


        <button type='submit' className='btn btn-dark btn-lg w-50 center' 
            onClick={calculateGains}> <BiRocket className='ref-icon rocket'/> Calculate  </button>


        <button type='submit' className='btn btn-dark btn-sm w-10 float-left refresh' 
            onClick={refreshPage}> <BiRefresh className='ref-icon'/>   
        </button>

        <NotificationToast />

    </form>
  )
}

export default Form