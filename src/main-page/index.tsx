import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as Scry from "scryfall-sdk";
import CardDetails from "../card-details";
import "./main-page.css";
import Home from "../home";

function App() {
  const [cardData, setCardData] = useState({} as Scry.Card);

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/"
            element={<Home cardData={cardData} setCardData={setCardData} />}
          />
          <Route
            path="/carddetails/:cardName"
            element={<CardDetails cardData={cardData} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
