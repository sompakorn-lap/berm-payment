import Elysia from "elysia";
import userApi from "./features/user/user.api";
import paymentApi from "./libs/stripe/stripe";

const api = new Elysia({ prefix: "/api" })
  .use(userApi)
  .use(paymentApi)
;

export default api;