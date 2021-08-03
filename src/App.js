import React from "react";
import Characters from "./components/Characters";
import "./App.css";
import styled from 'styled-components'

const Title = styled.h1`
font-size: 3rem;
` 
const Body = styled.div`
display: flex;
flex-direction: column;
background-color: #333;
`

function App() {
  return <Body className="App">
    <Title className="title">Comic Novels</Title>
    <Characters />
  </Body>;
}

export default App;
