import React, { useState, useEffect } from "react";
import {useTelegram} from "./hooks/useTelegram";
import './App.css';
import {Route, Routes} from 'react-router-dom'
import ItemCard from "./Components/ProductList/ProductList";
//import Cart from "./Components/Cart/Cart";

//const tg =  window.Telegram.WebApp; 

function App() {
  const {onToggleButton, tg} = useTelegram();

  useEffect(() => {
      tg.ready();
  }, [])

  return (
      <div className="App">
          { <Routes>
              <Route index element={<ProductList />}/>              
          </Routes> }
      </div>
  );
}
//<Route path={'viewOrder'} element={<Cart />}/>
export default App;
