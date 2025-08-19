import React from 'react';
import Button from './Button';
import './css/cards.css';
import { useNavigate } from 'react-router-dom';

function Cards({ card}) {
    function handlebuttonClick(e){
        e.stopPropagation()
    }
    function buttonClick(){
        return console.log("button on card")
    }

    const myButton = {
        text: "Add to Cart",
        textColor: 'white',
        onClickFunction: buttonClick

    }
    let navigate = useNavigate()

    function onClickFunction(){
        navigate(`${card.id}`)
    }

    return (
            <div className="card" onClick={onClickFunction}>
                {card.image && <img src={card.image} alt={card.title} className="card-image" />}
                <div className="card-content">
                    <h2 className="card-title">{card.title}</h2>
                    <p className="card-description">{card.description}</p>
                    <div className="card-button">
                    <Button button={myButton} onClick={handlebuttonClick}/>
                    </div>
                </div>
            </div>
    );
}

export default Cards;
