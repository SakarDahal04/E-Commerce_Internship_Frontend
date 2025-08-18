import React from 'react';
import Button from './Button';
import './css/cards.css';
import { useNavigate } from 'react-router-dom';

function Cards({ card}) {
    function buttonClick(){
        navigate(``)
    }
    const myButton = {
        text: "Add to Cart",
        textColor: 'white'
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
                    <Button button={myButton} />
                </div>
            </div>
    );
}

export default Cards;
