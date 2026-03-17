import { useDispatch } from "react-redux";
import { register, login, getMe } from "../service/auth.api";
import { setUser, setLoading, setError } from "../auth.slice";

export function useAuth() {

  const dispatch = useDispatch();

  async function handleRegister({ email, username, password }) {
    dispatch(setLoading(true));

    try {
      const response = await register(email, username, password);

      dispatch(setUser(response.user));
      dispatch(setLoading(false));

      return response;

    } catch (error) {

      dispatch(setError(error));
      dispatch(setLoading(false));

      throw error;
    }
  }

  async function handleLogin({ email, password }) {
    dispatch(setLoading(true));

    try {
      const response = await login(email, password);

      dispatch(setUser(response.user));
      dispatch(setLoading(false));

      return response;

    } catch (error) {

      dispatch(setError(error));
      dispatch(setLoading(false));

      throw error;
    }
  }

  async function handleGetMe() {
    dispatch(setLoading(true));

    try {
      const response = await getMe();

      dispatch(setUser(response.user));
      dispatch(setLoading(false));

      return response;

    } catch (error) {

      dispatch(setError(error));
      dispatch(setLoading(false));

      throw error;
    }
  }

  return {
    handleRegister,
    handleLogin,
    handleGetMe
  };
}