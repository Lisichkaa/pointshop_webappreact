import React, { useState, useEffect } from "react";
import {useTelegram} from "./hooks/useTelegram";
import './App.css';
//const tg =  window.Telegram.WebApp; 

function App() {
  const {onToggleButton, tg} = useTelegram();

  useEffect(() => {
    tg.ready();
  });

  return (
    <div className="App">
      work
    </div>
  );
}

export default App;
