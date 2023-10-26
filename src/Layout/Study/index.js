import React, {useState, useEffect} from "react";
import {Link, useParams, useHistory} from "react-router-dom";
import {readDeck} from "../../utils/api";
import NotEnoughCards from "./NotEnoughCards";
import StudyCardsView from "./StudyCardsView";

function Study() {
    const {deckId} = useParams();
    const [deck, setDeck] = useState();


    useEffect(() => {
        const abortController = new AbortController();
        const loadDeck = async () => {
            const data = await readDeck(deckId, abortController.signal);
            setDeck(data);
        }
        loadDeck();
        return () => abortController.abort();
    }, [deckId]);

    

    if (!deck) {
        return (<p>Loading</p>);
    } else {
        const cardsView = deck.cards.length <= 2 
                    ? <NotEnoughCards deckId={deckId} nowCards={deck.cards.length} /> 
                    : <StudyCardsView cards={deck.cards} />;
        return (
            <>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to={`/decks/${deck.id}`} >{deck.name}</Link></li>
                        <li className="breadcrumb-item">Study</li>
                    </ol>
                </nav>
                <h1>Study: {deck.name}</h1>
                {cardsView}

            </>
        );
    }

}

export default Study;