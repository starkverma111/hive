<template>
  <div>
    <!-- Sticky back button -->
    <div class="sticky top-0 bg-white shadow-none border-0 z-50 rounded-sm">
      <button class="btn btn-circle bg-white font-extrabold border-0 shadow-none mx-1 my-1" @click="goBack">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
        </svg>
      </button>
    </div>

    <!-- Centered sign up form -->
    <div class="flex items-center justify-center min-h-screen p-4 animate__animated animate__fadeIn ">
      <div class="w-full max-w-lg p-6 bg-white">
        <h2 class="text-3xl font-bold text-start mb-2">Sign Up</h2>
        <p class="mb-6 text-gray-500 text-lg">Create an account to get started</p>

        <!-- Email input -->
        <label class="input input-bordered rounded-3xl flex items-center gap-2 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70">
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input type="text" class="grow" placeholder="Email" aria-label="Email" autocomplete="off" v-model="email" required />
        </label>

        <!-- Password input -->
        <label class="input input-bordered rounded-3xl flex items-center gap-2 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70">
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input :type="showPassword ? 'text' : 'password'" class="grow" placeholder="Password" aria-label="Password" autocomplete="off" v-model="password" required />
        </label>

        <!-- Confirm Password input -->
        <label class="input input-bordered rounded-3xl flex items-center gap-2 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70">
            <path fill-rule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clip-rule="evenodd" />
          </svg>
          <input :type="showPassword ? 'text' : 'password'" class="grow" placeholder="Confirm Password" aria-label="Confirm Password" 
          v-model="confirmPassword" autocomplete="off" required />
        </label>

        <!-- Show Password -->
        <div class="flex items-center justify-start mb-6">
          <input type="checkbox" class="checkbox checkbox-sm" v-model="showPassword" />
          <label class="ml-2 text-gray-600">Show Password</label>
        </div>

        <!-- Buttons -->
        <button class="btn btn-primary rounded-3xl w-full mb-4" @click="signUp">Sign Up</button>
        <button class="btn rounded-3xl w-full" @click="goLogin()">Go to login</button>
      </div>
    </div>
    
    <!-- Success Toast -->
    <div v-if="showSuccess" class="alert alert-success fixed bottom-0 w-full p-4 mx-auto bg-gray-100 text-green-700 shadow-lg 
    rounded-t-3xl rounded-none z-50 flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current h-6 w-6 mr-2">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <span class="text-base">{{ successMessage }}</span>
    </div>
    
    <!-- Error Toast -->
    <div v-if="showError" class="alert alert-error fixed bottom-0 w-full p-4 mx-auto bg-gray-100 text-red-700 shadow-lg 
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
  name: 'SignUpForm',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      successMessage: '',
      showSuccess: false,
      showError: false,
      errorMessage: '',
      showPassword: false
    };
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },

    goLogin() {
      this.$router.push("/login");
    },

    signUp() {
      if (this.password !== this.confirmPassword) {
        this.showErrorToast('Passwords do not match.');
        return;
      }

      axios.post(`${process.env.VUE_APP_BASE_API_URL}/register.php`, {
        email: this.email,
        password: this.password,
        confirm_password: this.confirmPassword
      })
      .then(response => {
        if (response.data.status === 'success') {
          this.showSuccessToast('Registration successful!');
          //this.$router.push('/home');
        } else {
          this.showErrorToast(response.data.message);
        }
      })
      .catch(error => {
        this.showErrorToast('An error occurred: ' + error.message);
      });
    },

    // Show error toast for 3 seconds
    showErrorToast(message) {
      this.errorMessage = message;
      this.showError = true;

      setTimeout(() => {
        this.showError = false;
      }, 3000);
    },

    // Show success toast for 3 seconds
    showSuccessToast(message) {
      this.successMessage = message;
      this.showSuccess = true;

      setTimeout(() => {
        this.showSuccess = false;
      }, 3000);
    }
  }
};
</script>

<style scoped>
.alert-error, .alert-success {
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
