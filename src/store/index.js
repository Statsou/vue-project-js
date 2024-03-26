import { createStore } from 'vuex'
import auth from '@/store/modules/auth'
import feed from '@/store/modules/feed'
import popularTags from '@/store/modules/popularTags'
import article from '@/store/modules/article'
import createArticle from './modules/createArticle'
import editArticle from './modules/editArticle'
import settings from './modules/settings'
import addToFavorites from './modules/addToFavorites'
import userProfile from './modules/userProfile'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    feed,
    popularTags,
    article,
    createArticle,
    editArticle,
    settings,
    addToFavorites,
    userProfile
  }
})
