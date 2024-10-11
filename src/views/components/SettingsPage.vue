<template>
  <div class="max-w-xl mx-auto p-4">
    <h2 class="text-lg text-gray-600">Settings Page</h2>
    <!-- List Wrapper -->
    <ul class="space-y-2">
      <li class="my-3 text-large ms-3 me-2">
        <button class="btn w-full btn-wide flex items-center justify-start rounded-md border-gray-200 my-2 active:bg-slate-600 active:text-white text-base font-normal" @click.prevent="openProfileModal">
            <span class="text-left">Profile Settings</span>
          </button>
        <button class="btn w-full btn-wide flex items-center justify-start rounded-md border-gray-200 my-2 active:bg-slate-600 active:text-white text-base font-normal" @click.prevent="openPasswordModal">
            <span class="text-left">Change Password</span>
          </button>
        <hr class="my-6" />
        <button class="btn w-full btn-wide flex items-center justify-start rounded-md border-gray-200 my-2 active:bg-rose-400 active:text-white text-base font-normal" @click="logout">
            <span class="text-left">Logout</span>
          </button>
      </li>
    </ul>
    <!-- Modal box for Profile Update -->
    <dialog id="profile_modal" class="modal modal-bottom md:modal-middle" @click="closeModal('profile_modal')">
      <div class="modal-box relative p-4" @click.stop>
        <!-- Close Button -->
        <form method="dialog">
          <button class="btn btn-sm btn-circle absolute right-2 top-2" @click.prevent="closeModal('profile_modal')">✕</button>
        </form>
        <!-- Modal Drag Handle -->
        <div class="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-2"></div>
        <!-- Modal Title -->
        <h3 class="text-lg font-bold mt-4 text-center">Edit Profile</h3>
        <p class="text-center my-4 text-large">Edit Your Profile Details</p>
        <div role="alert" class="alert my-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info h-6 w-6 shrink-0">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
          <span>Please provide additional details to help us enhance the security of your account. This information will also assist in the recovery of your account during any potential issues.</span>
        </div>
        <!-- Form Grid -->
        <div class="modal-action w-full p-6">
          <div class="grid grid-cols-1 gap-y-6">
            <!-- First Name and Last Name in one row -->
            <div class="grid grid-cols-2 gap-x-4">
              <!-- First Name -->
              <div>
                <label for="fname" class="block text-start font-medium mb-1">First Name</label>
                <input type="text" v-model="profile.fname" placeholder="First Name" class="input input-bordered w-full" />
              </div>
              <!-- Last Name -->
              <div>
                <label for="lname" class="block text-start font-medium mb-1">Last Name</label>
                <input type="text" v-model="profile.lname" placeholder="Last Name" class="input input-bordered w-full" />
              </div>
            </div>
            <!-- Email -->
            <div>
              <label for="email" class="block text-start font-medium mb-1">Your Email</label>
              <input type="email" v-model="profile.email" placeholder="Email" class="input input-bordered w-full" disabled />
            </div>
            <!-- Phone -->
            <div>
              <label for="phone" class="block text-start font-medium mb-1">Phone No</label>
              <input type="text" v-model="profile.phone" placeholder="Phone" class="input input-bordered w-full" />
            </div>
            <!-- Update Profile Button -->
            <div>
              <button class="btn w-full mt-6 rounded-full bg-slate-600 text-white active:bg-slate-800 hover:bg-slate-800 text-base font-normal" @click.prevent="updateProfile">
              Update Profile
            </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
    <!-- Modal box for Change Password -->
    <dialog id="password_modal" class="modal modal-bottom md:modal-middle" @click="closeModal('password_modal')">
      <div class="modal-box relative p-4" @click.stop>
        <!-- Close Button -->
        <form method="dialog">
          <button class="btn btn-sm btn-circle absolute right-2 top-2" @click.prevent="closeModal('password_modal')">✕</button>
        </form>
        <!-- Modal Drag Handle -->
        <div class="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-2"></div>
        <!-- Modal Title -->
        <h3 class="text-lg font-bold mt-4 text-center">Change Password</h3>
        <div role="alert" class="alert my-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info h-6 w-6 shrink-0">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
          <span>Please choose a strong password with at least 8 characters, including a mix of uppercase letters, lowercase letters, numbers, 
      and symbols.</span>
        </div>
        <!-- Form -->
        <div class="modal-action w-full p-6">
          <div class="grid grid-cols-1 gap-y-6 w-full mx-auto">
            <!-- Current Password -->
            <div>
              <label for="currentPassword" class="block text-start font-medium mb-1">Current Password</label>
              <input type="password" v-model="passwordData.currentPassword" placeholder="Current Password" class="input input-bordered w-full" />
            </div>
            <!-- New Password -->
            <div>
              <label for="newPassword" class="block text-start font-medium mb-1">New Password</label>
              <input type="password" v-model="passwordData.newPassword" placeholder="New Password" class="input input-bordered w-full" />
            </div>
            <!-- Save Changes Button -->
            <div>
              <button class="btn w-full mt-4 rounded-full bg-slate-600 text-white active:bg-slate-800 hover:bg-slate-800 text-base font-normal" @click.prevent="changePassword">
              Save Changes
            </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        profile: {
          fname: '',
          lname: '',
          email: '',
          phone: '',
        },
        passwordData: {
          currentPassword: '',
          newPassword: '',
        },
        isProfileFetched: false, // Track if the profile has been fetched
      };
    },
    methods: {
      openProfileModal() {
        if (!this.isProfileFetched) {
          this.fetchProfileData(); // Fetch data when opening modal
          this.isProfileFetched = true; // Prevent fetching multiple times
        }
        document.getElementById('profile_modal').showModal();
      },
      openPasswordModal() {
        document.getElementById('password_modal').showModal();
      },
      closeModal(modalId) {
        document.getElementById(modalId).close();
      },
      logout() {
        // Remove user ID from local storage
        localStorage.removeItem('user_id');
        // Optionally, redirect to the login page
        this.$router.push({
          name: 'LoginPage'
        });
      },
      fetchProfileData() {
        const userId = localStorage.getItem('user_id');
        if (!userId) {
          console.error('User ID not found in local storage.');
          return;
        }
        axios
          .post(`${process.env.VUE_APP_BASE_API_URL}/admin_details.php`, {
            id: userId,
          })
          .then((response) => {
            // Assuming the response contains the user profile data
            if (response.data.length > 0) {
              this.profile = response.data[0]; // Set the profile to the first returned item
            } else {
              console.error('No user profile data found.');
            }
          })
          .catch((error) => {
            console.error('Error fetching profile data:', error);
          });
      },
      updateProfile() {
        const userId = localStorage.getItem('user_id');
        axios
          .post(`${process.env.VUE_APP_BASE_API_URL}/update_admin_profile.php`, {
            id: userId,
            ...this.profile,
          })
          .then(() => {
            console.log('Profile updated successfully');
            this.closeModal('profile_modal');
          })
          .catch((error) => {
            console.error('Error updating profile:', error);
          });
      },
      changePassword() {
        const userId = localStorage.getItem('user_id');
        const {
          currentPassword,
          newPassword
        } = this.passwordData;
        // Basic validation
        if (!currentPassword || !newPassword) {
          alert('Please enter both the current password and new password.');
          return;
        }
        if (newPassword.length < 6) {
          alert('New password must be at least 6 characters long.');
          return;
        }
        if (newPassword.includes(' ')) {
          alert('Password should not contain spaces.');
          return;
        }
        // Proceed to send request to the server
        axios
          .post(`${process.env.VUE_APP_BASE_API_URL}/admin_change_password.php`, {
            id: userId,
            currentPassword: currentPassword,
            newPassword: newPassword,
          })
          .then((response) => {
            // Check the server's response for success or failure
            if (response.data.success) {
              alert('Password changed successfully.');
              this.closeModal('password_modal');
            } else if (response.data.error) {
              alert(response.data.error); // Display server error message
            }
          })
          .catch((error) => {
            console.error('Error changing password:', error);
            alert('An error occurred while changing the password. Please try again.');
          });
      }
    },
  };
</script>

<style scoped>
  /* Add any additional styles if needed */
</style>
