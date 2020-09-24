import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _379291cc = () => interopDefault(import('../pages/blogs/index.vue' /* webpackChunkName: "pages/blogs/index" */))
const _e93700e2 = () => interopDefault(import('../pages/dashboard/index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _3e041d0f = () => interopDefault(import('../pages/groups/index.vue' /* webpackChunkName: "pages/groups/index" */))
const _5de4df52 = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _b5c0973e = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _358583e4 = () => interopDefault(import('../pages/posts/index.vue' /* webpackChunkName: "pages/posts/index" */))
const _136fd203 = () => interopDefault(import('../pages/users/index.vue' /* webpackChunkName: "pages/users/index" */))
const _620be2ca = () => interopDefault(import('../pages/manga/search.vue' /* webpackChunkName: "pages/manga/search" */))
const _6e295d1c = () => interopDefault(import('../pages/posts/search.vue' /* webpackChunkName: "pages/posts/search" */))
const _077db58e = () => interopDefault(import('../pages/posts/_postId/index.vue' /* webpackChunkName: "pages/posts/_postId/index" */))
const _51c0792b = () => interopDefault(import('../pages/users/_id.vue' /* webpackChunkName: "pages/users/_id" */))
const _490fdd6c = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/blogs",
    component: _379291cc,
    name: "blogs"
  }, {
    path: "/dashboard",
    component: _e93700e2,
    name: "dashboard"
  }, {
    path: "/groups",
    component: _3e041d0f,
    name: "groups"
  }, {
    path: "/inspire",
    component: _5de4df52,
    name: "inspire"
  }, {
    path: "/login",
    component: _b5c0973e,
    name: "login"
  }, {
    path: "/posts",
    component: _358583e4,
    name: "posts"
  }, {
    path: "/users",
    component: _136fd203,
    name: "users"
  }, {
    path: "/manga/search",
    component: _620be2ca,
    name: "manga-search"
  }, {
    path: "/posts/search",
    component: _6e295d1c,
    name: "posts-search"
  }, {
    path: "/posts/:postId",
    component: _077db58e,
    name: "posts-postId"
  }, {
    path: "/users/:id",
    component: _51c0792b,
    name: "users-id"
  }, {
    path: "/",
    component: _490fdd6c,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
