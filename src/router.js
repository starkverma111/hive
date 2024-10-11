import { createRouter, createWebHistory } from 'vue-router';
import LoginPage from './views/LoginPage.vue';
import SignupPage from './views/SignupPage.vue';
import HomePage from './views/HomePage.vue';
//import NotFoundPage from './views/NotFoundPage.vue'; // Import a NotFound component

/* child router */
import MainPage from './views/components/MainPage.vue';
import FavoritePage from './views/components/FavoritePage.vue';
import DeletePage from './views/components/DeletePage.vue';
import SettingsPage from './views/components/SettingsPage.vue';

const routes = [
  {
    path: '/',
    name: 'LoginPage',
    component: LoginPage,
    meta: { guest: true },  // Only accessible by guests (not logged in)
  },
  {
    path: '/signup',
    name: 'SignupPage',
    component: SignupPage,
    meta: { guest: true },  // Only accessible by guests (not logged in)
  },
  {
    path: '/home',
    component: HomePage,
    children: [
      {
        path: '',
        name: 'MainPage',
        component: MainPage,
      },
      {
        path: 'favorite',
        name: 'FavoritePage',
        component: FavoritePage,
      },
      {
        path: 'delete',
        name: 'DeletePage',
        component: DeletePage,
      },
      {
        path: 'settings',
        name: 'SettingsPage',
        component: SettingsPage,
      },
    ],
    meta: { requiresAuth: true },  // Only accessible when logged in
  },
  {
    path: '/:catchAll(.*)', // Catch-all route
    redirect: { name: 'MainPage' } // Redirect to MainPage
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Simple authentication check (use your actual authentication logic)
function isLoggedIn() {
  return !!localStorage.getItem('user_id');  // Check if 'user' exists in localStorage
}

// Add navigation guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // If route requires authentication and user is not logged in, redirect to login
    if (!isLoggedIn()) {
      next({ name: 'LoginPage' });
    } else {
      next(); // Allow navigation if logged in
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    // If route is for guests and user is logged in, redirect to home
    if (isLoggedIn()) {
      next({ name: 'MainPage' });
    } else {
      next(); // Allow navigation if not logged in
    }
  } else {
    next(); // Always allow navigation for other routes
  }
});

export default router;
