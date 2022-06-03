import "./App.css";
import styled from "@emotion/styled";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { List } from "./Components/List";
import { useMediaItemStore } from "./Store/store.ts";
import { useEffect, useRef, useState } from "react";
import { BrowserRouter } from "react-router-dom";

const AppContainer = styled.div`
  height: 100vh;
  min-height: 100vh;
  overflow: hidden;
`;

function App() {
  const { initialize } = useMediaItemStore();

  const [isLoading, setIsLoading] = useState(true);
  const initializeStore = async () => {
    await initialize();
    setIsLoading(false);
  };
  useEffect(() => {
    initializeStore();
  }, []);
  return (
    <AppContainer>
      <Header />
      {isLoading && <div>Loading data...</div>}
      {!isLoading && <List />}
      <Footer />
    </AppContainer>
  );
}

export default App;
