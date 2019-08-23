import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import user from './modules/user'
import menu from './modules/menu'
import decorate from './modules/decorate'
import data from './modules/data'
import getters from './getters'
import api from '@/api';

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    tagsView,
    user,
    menu,
    decorate,
    data
  },
  getters
});
store._apis = api;

export default store
