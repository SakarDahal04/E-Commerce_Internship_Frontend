// fetchCartLoader.js
import { createAxiosInstance } from "../services/axiosConfig";

// This loader runs BEFORE the component is rendered
export async function fetchCartLoader() {
  try {
    // Get tokens from localStorage (or cookies)
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));

    if (!authTokens) {
      throw new Response("Unauthorized", { status: 401 });
    }

    // Create an axios instance (pass nulls if not needed)
    const api = createAxiosInstance(authTokens, null, null);

    // Call API
    const response = await api.get("/cart/list-cart/");

    console.log(response.data.results)

    // Return the data to the component
    return response.data.results;
  } catch (error) {
    console.error("Error loading cart:", error);
    throw new Response("Failed to load cart", { status: 500 });
  }
}


export async function fetchOrderLoader() {
  console.log("fetchOrderLoader is running ✅")

  try {
    const authTokens = JSON.parse(localStorage.getItem("authTokens"))

    if (!authTokens) {
      throw new Response("Unauthorized", { status: 401 });
    }

    const api = createAxiosInstance(authTokens, null, null)

    const response = await api.get("/api/user_ordersorders/")

    console.log("This is hte order response: \n",response.data)

    return response.data.results;
  } catch (error) {
      console.error("Failed to fetch the orders: ", error)
      throw new Response("Failed to load the orders", {status: 500})
  }
}
