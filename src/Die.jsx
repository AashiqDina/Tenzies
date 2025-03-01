export default function Die(props){
    return <button onClick={() => props.hold(props.id)} className="Dice" style={props.isHeld ? {backgroundColor: "rgb(65, 200, 90)"} : null}>
            <h1 className="DiceNumber">{props.Number}</h1>
        </button>
        }
