import {action} from 'easy-peasy';

const auth = {
  token: '',
  isAuth: false,

  setToken: action((state, payload) => {
    state.token = payload;
  }),
  setAuth: action((state, payload) => {
    state.isAuth = payload;
  }),
};

export default auth;
