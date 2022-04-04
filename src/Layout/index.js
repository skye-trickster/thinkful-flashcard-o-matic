import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "./HomeLayout"
import DeckLayout from "./DeckLayout";

function Layout() {
  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <Switch>

          <Route path="/decks">
            <DeckLayout />
          </Route>

          <Route exact path="/">
            <Home />
          </Route>

          <Route>
            <NotFound />
          </Route>

        </Switch>
      </div>
    </React.Fragment>
  );
}

export default Layout;
