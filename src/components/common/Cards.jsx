import React from 'react';
import Button from './Button';
import './css/cards.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Cards({ card }) {
    console.log("CARD KO ID", card.id)
    if (!card?.id) return null;

    return (
        <Link to={`/products/${card.id}`} className="card" style={{ textDecoration: 'none' }}>
            {card.image && <img src={card.image} alt={card.title} className="card-image" />}
            <div className="card-content">
                <h2 className="card-title">{card.title}</h2>
                <p className="card-description">{card.description}</p>
            </div>
        </Link>
    );

}

export default Cards;
