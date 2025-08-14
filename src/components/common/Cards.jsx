import React from 'react';
import Button from './Button';
import './css/cards.css';

function Cards({ card }) {
    const myButton = {
        text: "Add to Cart",
        textColor: 'white'
    }
    return (
        <div className="card">
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
