import React, { useState, useEffect } from "react";
import {useTelegram} from "./hooks/useTelegram";
import './App.css';
import {Route, Routes} from 'react-router-dom'
import ProductList from "./Components/ProductList/ProductList";

function App() {
  const {tg} = useTelegram();

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
