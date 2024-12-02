import router from '@/router';
import { createStore } from 'vuex';

export default createStore({
  state: {
    user: null, // Dados do usuário logado
    token: null, // Token para autenticação
    tokenExpiry: null, // Data de expiração do token
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, { token, expiry }) {
      state.token = token;
      state.tokenExpiry = expiry;
    },
    LOGOUT(state) {
      state.user = null;
      state.token = null;
      state.tokenExpiry = null;
    },
  },
  actions: {
    login({ commit }, user) {
      const tokenExpiry = new Date().getTime() + 2 * 60 * 60 * 1000; // 2 horas
      const token = btoa(`${user.cpf}:${user.password}`); // Simulação de token

      // Salvar no localStorage
      localStorage.setItem(
        'auth',
        JSON.stringify({ user, token, tokenExpiry })
      );

      commit('SET_USER', user);
      commit('SET_TOKEN', { token, expiry: tokenExpiry });
    },
    checkSession({ commit }) {
      const auth = JSON.parse(localStorage.getItem('auth'));
      if (auth) {
        const currentTime = new Date().getTime();
        if (currentTime < auth.tokenExpiry) {
          commit('SET_USER', auth.user);
          commit('SET_TOKEN', {
            token: auth.token,
            expiry: auth.tokenExpiry,
          });
        } else {
          localStorage.removeItem('auth');
          commit('LOGOUT');
        }
      }
    },
    logout({ commit }) {
      localStorage.removeItem('auth');
      commit('LOGOUT');
      return router.push('/');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
    currentUser: (state) => state.user,
    isAdmin: (state) => state.user?.role === 'Administrador',
  },
});
