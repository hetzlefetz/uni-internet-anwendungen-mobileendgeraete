import "./App.css";
import styled from "@emotion/styled";
import { Header } from "./Components/Header";
import { Footer } from "./Components/Footer";
import { List } from "./Components/List";

const AppContainer = styled.div`
  height: 100vh;
  min-height: 100vh;
  overflow: hidden;
`;

function App() {
  console.log("Hello");
  return (
    <AppContainer>
      <Header />
      <List />
      <Footer />
    </AppContainer>
  );
}

export default App;
