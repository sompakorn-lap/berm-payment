import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";

const stripe = loadStripe(import.meta.env.VITE_STRIPE_PUBLICKEY as string);

export function CheckOutForm() {
  const [clientSecret, setClientSecret] = useState("");

  async function getClientSecret() {
    const res = await axios.post("/api/payment");
    setClientSecret(res.data);
  }

  useEffect(() => {
    getClientSecret();
  }, []);

  return (
    <EmbeddedCheckoutProvider stripe={stripe} options={{ clientSecret }}>
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  );
}
