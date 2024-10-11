<template>
  <div class="flex items-center justify-center min-h-screen p-4">
    <div class="w-full max-w-md p-6 animate__animated animate__fadeIn">
      <h2 class="text-3xl font-bold text-start mb-2">Login</h2>
      <p class="mb-6 text-gray-500 text-lg">Login to continue using the app</p>

      <label class="input input-bordered rounded-3xl flex items-center gap-2 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70">
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input
          type="text"
          class="grow"
          placeholder="Email"
          aria-label="Email"
          autocomplete="off"
          v-model="email"
          required
        />
      </label>

      <label class="input input-bordered rounded-3xl flex items-center gap-2 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70">
          <path
            fill-rule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clip-rule="evenodd"
          />
        </svg>
        <input
          :type="showPassword ? 'text' : 'password'"
          class="grow"
          placeholder="Password"
          aria-label="Password"
          autocomplete="off"
          v-model="password"
          required
        />
        <label class="swap btn-xs opacity-70">
          <input type="checkbox" @change="togglePasswordVisibility" />
          <div class="swap-on">Hide</div>
          <div class="swap-off">Show</div>
        </label>
      </label>

      <div class="flex items-center justify-end mb-6">
        <button class="btn btn-sm bg-white border-0 shadow-none text-gray-500">Forgot Password?</button>
      </div>

      <button class="btn btn-primary rounded-3xl w-full mb-4" @click="handleLogin">Login</button>
      <button class="btn rounded-3xl w-full" @click="goToSignUp()">Sign Up</button>
    </div>

    <!-- Error Toast -->
    <div v-if="showError" class="alert alert-error fixed bottom-0 w-full  p-4 mx-auto bg-gray-100 text-red-700 shadow-lg 
    rounded-t-3xl rounded-none z-50 flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current h-6 w-6 mr-2">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span class="text-base">{{ errorMessage }}</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      showError: false,
      errorMessage: ''
    };
  },
  methods: {
    // Login method that sends login details to the API
    handleLogin() {
      axios.post(`${process.env.VUE_APP_BASE_API_URL}/login.php`, {
        email: this.email,
        password: this.password
      })
      .then(response => {
        if (response.data.status === 'success') {
          console.log(response.data.status);
          // Store user_id in localStorage
          localStorage.setItem('user_id', response.data.user_id);

          // Redirect user to the home page
          this.$router.push('/home');
        } else {
          this.showErrorToast(response.data.message || 'Login failed.');
        }
      })
      .catch(error => {
        this.showErrorToast('An error occurred: ' + error.message);
      });
    },

    // Toggle password visibility
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },

    // Show error toast for 3 seconds
    showErrorToast(message) {
      this.errorMessage = message;
      this.showError = true;

      setTimeout(() => {
        this.showError = false;
      }, 3000);
    },

    // Redirect to the sign-up page
    goToSignUp() {
      this.$router.push('/signup');
    }
  }
};
</script>

<style scoped>
.alert-error {
  animation: slideUp 0.6s cubic-bezier(0.22, 1, 0.36, 1), fadeIn 0.4s ease-out;
}

@keyframes slideUp {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
