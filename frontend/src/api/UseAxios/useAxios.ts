import { jwtDecode } from 'jwt-decode';
import axios, {AxiosRequestHeaders} from "axios";
import { useAuthStore } from "../../store/Auth/auth";

function logout() {
  useAuthStore.getState().logout()
  window.location.href = '/login'
}

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const axi = axios.create({
  baseURL,
})

export const authApi = axios.create({
  baseURL,
  withCredentials: true,
});

authApi.interceptors.request.use(async (config) => {
  const token : string = useAuthStore.getState().access;
  //Token en cada request(global)
  config.headers = {
    Authorization: `Bearer ${token}`,
  } as AxiosRequestHeaders;

  type Token = {
    exp: number
  }

  const tokenDecoded : Token = jwtDecode(token)

  const expiration = new Date(tokenDecoded.exp * 1000);
  const now = new Date();
  const fiveMinutes = 1000 * 60 * 5;

  if(expiration.getTime() - now.getTime() < fiveMinutes)
  try {
    const res = await axi.post('/users/refresh/', { refresh: useAuthStore.getState().refresh })
    useAuthStore.getState().setToken(res.data.access, res.data.refresh)

  } catch (e: any ) {
    if (e.response.status == 401) {
      logout()
    }
  }
  return config

});
