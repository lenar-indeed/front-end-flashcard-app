import React, {useState} from "react";
import {useHistory} from "react-router-dom";

function StudyCardsView({cards}) {
    const [cardCount, setCardCount] = useState([1]);
    const [card, setCard] = useState(cards[0]);
    const [flipped, setFlipped] = useState(false);
    const history = useHistory();
    const flipHandle = () => {
        setFlipped(!flipped);
    }
    const nextHandle = () => {
        if (cardCount === cards.length) {
            if (window.confirm("Restart cards? Click 'cancel' to return to the home page.")) {
                setFlipped(false);
                setCardCount(1); 
                setCard(cards[0]);
            } else { 
                history.push("/");
            }
        } else {
            setCardCount(parseInt(cardCount) + 1);
            setCard(cards[cardCount]);
            setFlipped(false);
        }
    }
    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">Card {cardCount} of {cards.length}</h4>
                <p className="card-text">{flipped ? card.back : card.front}</p>
                <button onClick={flipHandle} className="btn btn-secondary mr-2">Flip</button>
                {flipped ? (<button onClick={nextHandle} className="btn btn-primary">Next</button>) : ""} 
            </div>
        </div>
    )
}

export default StudyCardsView;