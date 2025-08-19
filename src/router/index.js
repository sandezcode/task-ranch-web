/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto';
import Store from '@/store';

const routes = [
  {
    path: '/',
    name: 'TaskRanch',
    component: () => import('@/layouts/Land.vue'),
    children: [
      //---------------------------------------- Public Routes ----------------------------------------
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/pages/security/Register.vue')
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/pages/security/Login.vue')
      },
      //---------------------------------------- Private Routes ----------------------------------------
      {
        path: 'collaborator',
        component: () => import('@/layouts/Collaborator.vue'),
        children: [
          {
            path: 'to-do',
            name: 'ToDoMain',
            component: () => import('@/pages/to-do/Main.vue'),
            children: [
              {
                path: '',
                name: 'ToDo',
                component: () => import('@/pages/to-do/pages/ToDo.vue')
              }
            ]
          }
        ],
        meta: {
          auth: true
        }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach(async (to, from, next) => {
  if(to.matched.some(route => route.meta.auth)){
    await Store.dispatch('setUserData');

    if(Store.state.auth){
      next();
    }else{
      next({name: 'Login'});
    }
  }else{
    next();
  }
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('vuetify:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router;
