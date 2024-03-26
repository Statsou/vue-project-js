import { createRouter, createWebHashHistory } from 'vue-router'
import GlobalFeed from '@/views/GlobalFeed.vue'
import YourFeed from '@/views/YourFeed.vue'
import TagFeed from '@/views/TagFeed.vue'

import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'

import Article from '@/views/Article.vue'
import CreateArticle from '@/views/CreateArticle.vue'
import EditArticle from '@/views/EditArticle.vue'

import UserProfile from '@/views/UserProfile.vue'
import Settings from '@/views/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'globalFeed',
    component: GlobalFeed
  },
  {
    path: '/feed',
    name: 'yourFeed',
    component: YourFeed
  },
  {
    path: '/tags/:slug',
    name: 'tag',
    component: TagFeed
  },
  {
    path: '/article/new',
    name: 'createArticle',
    component: CreateArticle
  },
  {
    path: '/article/:slug',
    name: 'article',
    component: Article
  },
  {
    path: '/article/:slug/edit',
    name: 'editArticle',
    component: EditArticle
  },

  {
    path: '/profile/:slug',
    name: 'userProfile',
    component: UserProfile
  },
  {
    path: '/profile/:slug/favorites',
    name: 'userProfileFavorites',
    component: UserProfile
  },

  {
    path: '/settings',
    name: 'settings',
    component: Settings
  },

  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
