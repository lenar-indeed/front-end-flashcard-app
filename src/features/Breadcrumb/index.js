import React from "react";

function Breadcrumb({deck, action, card}) {
    console.log("BEFORE ", deck, action);
    if (deck && !action) {
        console.log("INSIDE ", deck.name, action);
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
                </ol>
            </nav>
        )
    }

    if (deck && action==="Edit Card" && card) {
        console.log("INSIDE ", deck.name, action, card.id);
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">{deck.name}</a></li>
                    <li className="breadcrumb-item active" aria-current="page">{action} {card.id}</li>
                </ol>
            </nav>
        )
    }
    
    if (deck && action && !card) {
        console.log("INSIDE ", deck.name, action);
        return (
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="/">Home</a></li>
                    <li className="breadcrumb-item"><a href="/decks/{deck.id}">{deck.name}</a></li>
                    <li className="breadcrumb-item active" aria-current="page">{action}</li>
                </ol>
            </nav>
        )
    }

}

export default Breadcrumb;