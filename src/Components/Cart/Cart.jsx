import "./Cart.css";
import React, {useCallback, useState, useEffect } from "react";
import Button from "../Button/Button";
import {useTelegram} from "../../hooks/useTelegram";

function Cart({cartItems, onCheckout, onAdd}){
    
    const totalPrice = cartItems.reduce((a,c)=>a + c.amount * c.quantity, 0);

    const {tg, queryId} = useTelegram();
    // const tg = window.Telegram.WebApp;
    // const queryId = tg.initDataUnsafe?.query_id; 

    //эта штука должна скрывать мэйн кнопку 
    if(cartItems.length === 0){
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
          text: `Order ${totalPrice} points`
      })
  }

  //слушатель события 
  const onSendData = useCallback( () => {
    const data = {
        products: cartItems,
        totalPrice: totalPrice,
        queryId,
    }    
    fetch('http://85.119.146.179:8000/web-data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
}, [cartItems])
//

useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
        tg.offEvent('mainButtonClicked', onSendData)
    }
}, [onSendData])

    return (

      cartItems, 
        <div className="cart__container">     
          <br /> 
          <div className="total">Total amount of points: {totalPrice}</div>          
          {/* <Button
            title={`${cartItems.length === 0 ? "View order" : "View order"} `}
            type={"checkout"}
            disable={cartItems.length === 0 ? true : false}
            //onClick={onCheckout}
            onClick={onAdd}
          /> */}
        </div>
      );
    }

export default Cart;