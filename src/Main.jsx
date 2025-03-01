import Die from './Die.jsx'
import React from 'react'
import Confetti from 'react-confetti'

export default function Main(){

    const [DiceNumbers, setDiceNumbers] = React.useState([])
    const [GameWon, setGameWon] = React.useState(false)

    function WonChecker(){
        let AllDiceHeldStatus = true
        let AllDiceSameValue = true 
        let preValue = DiceNumbers[0]?.number
        for(let i = 0; i<DiceNumbers.length; i++){
            AllDiceHeldStatus = (DiceNumbers[i].isHeld && AllDiceHeldStatus)
            AllDiceSameValue = (preValue == DiceNumbers[i].number)
            preValue = DiceNumbers[i].number
        }
        if(AllDiceHeldStatus && AllDiceSameValue){
            setGameWon(true)
        }
    }


    function FirstGenerateNewDice(){
        const DiceArray = []
        setGameWon(false)
        for(let i = 0; i<10; i++){
            DiceArray.push({id: i, number: (Math.floor(Math.random() * 6) + 1), isHeld: false})
        }
        return DiceArray
    }

    function StartOver(){
        setDiceNumbers(FirstGenerateNewDice())
    }


    React.useEffect(
        () => {
            setDiceNumbers(FirstGenerateNewDice())
        }, []
    )
    
    const isFirstRender = React.useRef(true) 

    React.useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false; 
            return;
        }
        WonChecker(); 
    }, [DiceNumbers]); 



    function hold(id){
        for(let i=0; i<DiceNumbers.length; i++){
            if(id == DiceNumbers[i].id){
                setDiceNumbers(
                    prevDiceNumbers => {
                        return prevDiceNumbers.map(
                            prevDiceNumber =>
                                    (prevDiceNumber.id == id) ? {...prevDiceNumber, isHeld: !prevDiceNumber.isHeld} : prevDiceNumber
                        )
                    }
                )
            }
        }
    }

    function Reroll(){
        setDiceNumbers(DiceNumbers.map(prevDiceNumbers => {
            if(prevDiceNumbers.isHeld){
                return {id: prevDiceNumbers.id, number: prevDiceNumbers.number, isHeld: prevDiceNumbers.isHeld};
            }
            else{
                let rndNumber = (Math.floor(Math.random() * 6) + 1);
                return {id: prevDiceNumbers.id, number: rndNumber, isHeld: prevDiceNumbers.isHeld};
            }
        }));
    }

    const Dice = DiceNumbers.map(diceObject => <Die key={diceObject.id} id={diceObject.id} Number={diceObject.number} isHeld={diceObject.isHeld} hold={hold}/>)
    return (
        <main>
            <h1 className='Title'>Tenzies</h1>
            <p className='Instructions'>Roll until all dice are the same number. Click to freeze the dice!</p>
            <div className='DiceCollection'>
                {Dice}
            </div>
            {GameWon ?
            <button className='RerollButton' onClick={StartOver} style={{width: "9rem"}}>Play Again!</button> :
            <button className='RerollButton' onClick={Reroll}>Reroll</button>
            }
            {GameWon ? <Confetti/> : null}
        </main>  
    )
}