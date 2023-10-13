import { useState } from "react";
import "./App.css";
import Center from "./components/Center";
import Header from "./components/Header";

function App() {
  const [boardModalOpen, setBoardModalOpen] = useState<boolean>(false);
  return (
    <>
      <Header boardOpen={boardModalOpen} setBoardOpen={setBoardModalOpen} />
      <Center />
    </>
  );
}

export default App;
