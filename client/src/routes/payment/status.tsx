import { createFileRoute, Navigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react';
import axios from 'axios';
import * as v from "valibot";

const paymentStatusSchema = v.object({
  sessionId: v.string()
});

// type PaymentStatusType = v.InferOutput<typeof paymentStatusSchema>;

export const Route = createFileRoute('/payment/status')({
  component: ReturnCheckOut,
  validateSearch: paymentStatusSchema
})

function ReturnCheckOut() {
  const [status, setStatus] = useState<string | null>(null);
  const [email, setEmail] = useState("");

  const { sessionId } = Route.useSearch();

  async function getRetrive() {
    const { data } = await axios.get(`/api/payment/status?sessionId=${sessionId}`);
    console.log(data);
    setStatus(data.status);
    setEmail(data.customer_email);
  }

  useEffect(() => {
    getRetrive();
  }, []);

  if (status === "open") return <Navigate to="/payment" />;

  if (status === "complete") return <p>success: {email}</p>;

  return null;
}
