import Elysia, { t } from "elysia";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRETKEY as string);

export async function createCheckOutSession() {
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    payment_method_types: ["promptpay"],
    line_items: [
      {
        price: "price_1OtLs7G6PbZNqqwGfnCFG2w3",
        quantity: 1,
      },
    ],
    mode: "payment",
    return_url:
      "http://localhost:5173/payment/status?sessionId={CHECKOUT_SESSION_ID}",
  });

  return session.client_secret;
}

export async function retrieveCheckOutSession(sessionId: string) {
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  return {
    status: session.status,
    customer_email: session.customer_details?.email,
  };
}

const paymentApi = new Elysia({ prefix: "/payment" })
  .get("/test", () => "test payment")
  .post("/", () => createCheckOutSession())
  .get(
    "/status",
    ({ query: { sessionId } }) => retrieveCheckOutSession(sessionId),
    {
      query: t.Object({
        sessionId: t.String(),
      }),
    }
  );

export default paymentApi;
