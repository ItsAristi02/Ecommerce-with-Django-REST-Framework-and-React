import { authApi, axi } from "../UseAxios/useAxios";


export const registerRequest = async (email: string, name: string, password: string, last_name: string) => {
  await axi.post("/users/register/", {email, name, last_name, password});
}

export const loginRequest = async (email: string, password: string) => {
  const response = axi.post("/users/login/", {email, password});
  return response;
}

export const getUsersRequest = async ({ pageParam = 1 }) => {
  const response = await authApi.get(`/users/users/?page=${pageParam}&pages=10`);
  return response.data;
}

