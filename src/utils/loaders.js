// fetchCartLoader.js
import { createAxiosInstance } from "../services/axiosConfig";

// This loader runs BEFORE the component is rendered
export async function fetchCartLoader() {
  try {
    // Get tokens from localStorage (or cookies)
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));

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
