import React, { useMemo } from "react";
import { Typography, Paper } from '@mui/material';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from "@stripe/react-stripe-js";

import useResponsiveFontSize from "../useResponsiveFontSize";

import { useNavigate } from 'react-router-dom';

import styles from './styles.module.css';

const useOptions = () => {

  const fontSize = useResponsiveFontSize();
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize,
          color: "#424770",
          letterSpacing: "0.025em",
          fontFamily: "Source Code Pro, monospace",
          "::placeholder": {
            color: "#aab7c4"
          }
        },
        invalid: {
          color: "#9e2146"
        }
      }
    }),
    [fontSize]
  );

  return options;
};

const SplitForm = (props) => {

  const {cb, nights, price } = props;

  const stripe = useStripe();
  const elements = useElements();
  const options = useOptions();

  const [success, setSuccess] = React.useState(false)

  const token = localStorage.getItem("token")

  const handleSubmit = async event => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement)
    });

    console.log(paymentMethod)

    if(!error){
        try{
            const {id} = paymentMethod
            const body = {
                amount: parseFloat(price) * 100,
                id: id
            }
            const response = await fetch("https://unistaysherokuserver.herokuapp.com/api/payment",{
                method: "POST",
                headers: {
                  'Authorization': token,
                    'Content-Type': 'application/json',
                    "Accepts":"application/json"
                },
                body: JSON.stringify(body) 
            })
            const content = await response.json();
            console.log(content)

            if(content.success){
                setSuccess(true);
                cb(true)
            }
      }
        catch (error){
            console.log(error)
        }
    }
    else{
    console.log(error.message)
    }
}

  return (
      <Paper className={styles.body} sx={{
        display : "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        width:"25vw", 
        height: "40vh",
        backgroundColor: "#FE7E6D",
        borderRadius: 10,

        }} elevation={2}>
    {!success ? 
    <>
     <Typography variant="h5"> 
    Total: €{price}
    </Typography>
    <Typography variant="h5"> 
    {nights !== "WS" ?  "Number of Nights: " + nights : 'Full Semester' }
    </Typography>
    <form onSubmit={handleSubmit} className={styles.input}>
      <label className={styles.label}>
        Card number
        <CardNumberElement
          options={options}
          onReady={() => {
            console.log("CardNumberElement [ready]");
          }}
          onChange={event => {
            console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            console.log("CardNumberElement [focus]");
          }}
        />
      </label>
      <label className={styles.label}>
        Expiration date
        <CardExpiryElement
          options={options}
          onReady={() => {
            console.log("CardNumberElement [ready]");
          }}
          onChange={event => {
            console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            console.log("CardNumberElement [focus]");
          }}
        />
      </label>
      <label className={styles.label}>
        CVC
        <CardCvcElement
          options={options}
          onReady={() => {
            console.log("CardNumberElement [ready]");
          }}
          onChange={event => {
            console.log("CardNumberElement [change]", event);
          }}
          onBlur={() => {
            console.log("CardNumberElement [blur]");
          }}
          onFocus={() => {
            console.log("CardNumberElement [focus]");
          }}
        />
      </label>
      <button className={styles.button} type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
    </> :
    <h1>Success</h1>
        }
    </Paper>

  );
};

export default SplitForm;
