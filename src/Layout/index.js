import Header from "./Header";
import NotFound from "./NotFound";
import { Route, Switch } from "react-router-dom/cjs/react-router-dom.min";
import Home from "./Home";
import CreateDeck from "./Deck/CreateDeck";
import DeckView from "./Deck/DeckView";
import Study from "./Study";
import EditDeck from "./Deck/EditDeck";
import AddCard from "./Card/AddCard";
import EditCard from "./Card/EditCard";


function Layout() {

  return (
    <>
      <Header />

      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <DeckView />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
