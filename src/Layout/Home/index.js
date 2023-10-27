import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {listDecks} from "../../utils/api";
import DeckCard from "./DeckCard";

function Home () {
    const [decks, setDecks] = useState([]);

    useEffect(() => {
        const abortController = new AbortController()
        const getDecks = async () => {
            const decksFromApi = await listDecks(abortController.signal);
            setDecks(decksFromApi);
        }
        getDecks();
        return () => abortController.abort();
    }, decks);
    const deckCards = decks.map((deck) => <DeckCard deck={deck} key={deck.id} />);

    return (
        <>
            <Link className="btn btn-primary mb-2" to={"/decks/new"}>Create Deck</Link>
            <div>
                {deckCards}
            </div>
        </>
    )

}

export default Home;