
import React, { useState} from 'react'

function AirportPage() {
    
    const [numberOfDeparture, setNumberOfDeparture] = useState("")

    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const [userInput, setUserInput] = useState('');
    const [data, setData] = useState('')



    const date = new Date(1517227200)
    const time = date.getHours()

    const handleSubmit = (e) =>{
        setIsPending(true)
        // setUserInput('')
        e.preventDefault();
          fetch(`https://opensky-network.org/api/flights/arrival?airport=${userInput}&begin=1517227200&end=1517230800`)
            .then(res=>{
                
                
                if(!res.ok){
                    throw Error("Could not recognize airport (make sure the airport abbrevation is correct or check your internet connection")
                }
                return res.json()
            })

            .then(data =>{
                setIsPending(false)
                setError(null)
                if(data){
                    setData(data)
                }

            })
            .catch(err =>{
                setIsPending(false)
                setError(err.message)
            })

            fetch(`https://opensky-network.org/api/flights/departure?airport=${userInput}&begin=1517227200&end=1517230800`)
            .then(res=>{
                
                
                if(!res.ok){
                    throw Error("Could not recognize airport (make sure the airport abbrevation is correct or check your internet connection")
                }
                return res.json()
                
            })

            .then(data =>{
                setIsPending(false)
                setError(null)
                if(data){
                    setNumberOfDeparture(data.length)
                }

            })
            .catch(err =>{
                setIsPending(false)
                setError(err.message)
            })   
    }
    

  return (
    <div className='output'>
        <form onSubmit={handleSubmit}>
        <p>Enter ICAO Identifer for the airport you want to check for</p>
            <div className="box">
            
                <input className='text-white' type="search" value={userInput} placeholder='Enter ICAO Identify for the airport you want to check for' onChange={e => setUserInput(e.target.value)}/>
                <button type="submit" className="" >Search</button>    
            </div>
        </form>
        
        {error && <div>{error}</div>} 
            {isPending && <div>Loading.... (please wait a second)</div>} 
        {data && 
        <div>
            {data[0].estArrivalAirport} | {time}:00 pm | {data.length} | {numberOfDeparture}
        </div>
        }
        
        
    </div>
  )
}

export default AirportPage