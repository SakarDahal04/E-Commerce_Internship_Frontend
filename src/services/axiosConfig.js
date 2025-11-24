import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

export const createAxiosInstance = (authTokens, setAuthTokens, setUser, logoutUser) => {
    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_API_URL,
    })

    axiosInstance.interceptors.request.use(
        async (req) => {
            if (!authTokens) {
                return req;
            }

            const user = jwtDecode(authTokens.access)

            const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

            if (!isExpired) {
                req.headers.Authorization = `Bearer ${authTokens.access}`
                return req;
            }

            console.log("Auth Token is expired. Refreshing.....")

            try {
                const response = await axios.post(
                    `${import.meta.env.VITE_API_URL}/api/auth/token/refresh/`,
                    {
                        refresh: authTokens.refresh
                    }
                );

                localStorage.setItem("authTokens", JSON.stringify(response.data))

                setAuthTokens(response.data)

                setUser(jwtDecode(response.data.access))

                req.headers.Authorization = `Bearer ${response.data.access}`

                return req
            } catch (error) {
                console.log("Refresh token is expired. Logging out.....")
                logoutUser()

                return Promise.reject(error)
            }
        },
        (err) => {
            return Promise.reject(err)
        }
    )
    return axiosInstance;
} 