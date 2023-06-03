import React, {useState} from 'react';
import './ProductList.css';
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";
import ItemCard from '../ItemCard/ItemCard';

const { getData } = require("../../db/db");
const products = getData();


const  ProductList = () => {
    const [cartItems, setCartItems] = useState([]);
    const {tg, queryId} = useTelegram();

    const totalAmount = cartItems.reduce((a,c)=>a + c.amount * c.quantity, 0);

    const onSendData = useCallback(() => {
      const data = {
          products: cartItems,
          //totalPrice: getTotalPrice(addedItems),
          queryId,
      }
      fetch('http://192.168.0.2:8000/web-data', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
      })
  }, [addedItems])

  useEffect(() => {
      tg.onEvent('mainButtonClicked', onSendData)
      return () => {
          tg.offEvent('mainButtonClicked', onSendData)
      }
  }, [onSendData])

    //проверяем есть продукт в корзине, если да, то quantity++, если не нашли то quantity = 1
    const onAdd = (product) =>{    
      const alreadyAdded = cartItems.find((item)=> item.id === product.id);
      let newItems = [];
      if(alreadyAdded) {
      newItems = cartItems.map( (item) =>
          item.id === product.id ? {...alreadyAdded, quantity: alreadyAdded.quantity + 1} : item)
    } else {
        newItems = [...cartItems, {...product, quantity: 1}]; 
      }  
      
      setCartItems(newItems)

      if (newItems.length >= 1){
        tg.MainButton.show();
      } else {
        tg.MainButton.hide();
        tg.MainButton.setParams({
          text: `Купить ${totalAmount}`})
    }
}  
    const onRemove = (product) => {
      const alreadyAdded = cartItems.find((item)=> item.id === product.id);
      let newItems = [];
      if(alreadyAdded.quantity === 1){
        newItems = cartItems.filter(item => item.id !== product.id) ; 
      }
      else{
        newItems = cartItems.map(item => 
          item.id === product.id ? {...alreadyAdded, quantity: alreadyAdded.quantity - 1} : item      
        );
      } 
      setCartItems(newItems)
      
      if (newItems.length >= 1){
        tg.MainButton.show();
      } else {
        tg.MainButton.hide();
      }
    };

    return (
        <>
        <h1 className="heading">Order points!</h1>

        <div className='products__container'>
            {products.map(item => (
                <ItemCard
                    product={item}
                    //key = {item.id}
                    onAdd={onAdd}
                    onRemove={onRemove}
                />
            ))}
        </div>        
        <div className="totalAmount__container">     
          <br /> 
          <div className="total">Total amount of points: {totalAmount}</div>               
        </div>
        </>
    );

  };  

export default ProductList;
