import { createStore } from 'vuex';

import config from '@/config';

const getDefaultState = () => ({
  config: config,
  auth: false,
  user: {
    user_id: null,
    name: '',
    role: null,
    email: '',
    email_verified_at: null,
    phone_number: '',
    phone_number_verified_at: null
  },
  token: {
    type: '',
    value: ''
  }
});

export default createStore({
  state: getDefaultState(),
  getters: {
    getToken(state){
      return state.token.type + ' ' + state.token.value;
    }
  },
  mutations: {
    setUserData(state){
      state.auth = JSON.parse(localStorage.getItem('auth'));
      state.user = JSON.parse(localStorage.getItem('user'));
      state.token = JSON.parse(localStorage.getItem('token'));
    },
    setUserDataProperty(state, dataProperty){
      let localUserData = JSON.parse(localStorage.getItem('user'));

      state.user[dataProperty.property] = dataProperty.data;
      localUserData[dataProperty.property] = dataProperty.data;

      localStorage.setItem('user', JSON.stringify(localUserData));
    },
    resetStore(state){
      Object.assign(state, getDefaultState());
    }
  },
  actions: {
    setUserData(context){
      context.commit('setUserData');
    },
    resetStore(context){
      context.commit('resetStore');
    },
    clearLocalStorage(){
      localStorage.removeItem('auth');
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  },
  modules: {
    // ...
  }
});
