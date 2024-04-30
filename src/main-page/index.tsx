import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as Scry from "scryfall-sdk";
import CardDetails from "../card-details";
import Home from "../home";
import HeaderWithSidebar from "./HeaderWithSidebar";
import styled from "styled-components";

function App() {
  const [cardData, setCardData] = useState({} as Scry.Card);

  return (
    <Router>
      <div>
        <HeaderWithSidebar />
        <MainContainer>
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
        </MainContainer>
      </div>
    </Router>
  );
}

export default App;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* height: 100vh; */
  max-width: 80vw;
  margin-left: auto;
  margin-right: auto;
`;
