import React from "react";
import "./App.css";

//accessible components
import Nav from "./components/Nav/Nav";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Nav />
      </header>
      <main>
        <h1>Accessible React Components</h1>
        <p>A collection of accessible, commonly used UI components for React</p>
        <h2>Nav</h2>
        <p>
          renders a number of NavList components and contains a single NavMenu
          component
        </p>
      </main>
    </div>
  );
}

export default App;
