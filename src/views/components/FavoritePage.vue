<template>
  <div>
    <div class="max-w-xl mx-auto p-4">
      <!-- List Wrapper -->
      <h2 class="text-lg text-gray-600">Favorite Page</h2>
      <ul class="space-y-4" v-for="(contact, index) in contacts" :key="index">
        <li v-if="contact.favorite === 1 && contact.deletec === 0"
          class="flex items-center bg-white border p-4 rounded-2xl my-3 w-full">
          <div class="flex items-center">
            <div class="avatar rounded-full border border-green-200 p-1">
              <div class="w-12 rounded-full">
                <img :src="`https://i.pravatar.cc/50?random=${index + 1}`" alt="User Image" />
              </div>
            </div>
            <div class="ml-4">
              <h2 class="font-semibold text-lg">{{ contact.fname }} {{ contact.lname }}</h2>
              <p class="text-gray-500">+91 {{ contact.phone }}</p>
            </div>
          </div>
          <button class="btn btn-ghost ml-auto btn-sm" @click="openOptions(contact.id)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
              class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v.01M12 12v.01M12 18v.01" />
            </svg>
          </button>
        </li>
      </ul>
    </div>

    <!-- Modal box for list of options -->
    <dialog id="my_modal_5" class="modal modal-bottom md:modal-middle" @click="closeModal">
      <div class="modal-box relative text-center p-2 m-0" @click.stop>
        <div class="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-2"></div>
        <form method="dialog">
          <button class="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
        </form>
        <h3 class="text-lg font-bold mt-6">Select One</h3>
        <p class="py-2">Press ESC key or click the button below to close</p>
        <div class="modal-action p-0 m-0 flex flex-col items-center justify-center w-full p-4">
          <button class="btn w-full my-1 rounded-full active:bg-slate-600 active:text-white text-base font-normal"
            @click="Unfavorite">Un-Favorite</button>
          <button class="btn w-full my-1 rounded-full active:bg-slate-600 active:text-white text-base font-normal"
            @click="deleteContact">Trash</button>
        </div>
      </div>
    </dialog>

    <div class="my-30 bg-gray-500"></div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      contacts: [],
      selectedContactId: null,
      userId: null,
    };
  },
  computed: {
    selectedContact() {
      return this.contacts.find(contact => contact.id === this.selectedContactId) || {};
    },
  },
  methods: {
    // Fetch contacts for the logged-in user
    fetchContacts() {
      if (this.userId) {
        axios
          .post(`${process.env.VUE_APP_BASE_API_URL}/fetch.php`, {
            user_id: this.userId,
          })
          .then((response) => {
            this.contacts = response.data;
            console.log(this.contacts);
          })
          .catch((error) => {
            console.error('Error fetching contacts:', error);
          });
      } else {
        console.error('User ID is not set.');
      }
    },

    closeModal() {
      document.getElementById('my_modal_5').close();
    },



    openOptions(contactId) {
      this.selectedContactId = contactId;
      this.openModalIfValid();
    },

    openModalIfValid() {
      if (this.selectedContact) {
        document.getElementById('my_modal_5').showModal();
      } else {
        console.error('Selected contact not found.');
      }
    },





    Unfavorite() {
      if (this.selectedContactId) {
        axios
          .post(`${process.env.VUE_APP_BASE_API_URL}/unfavorite.php`, {
            id: this.selectedContactId,
          })
          .then((response) => {
            console.log(response.data);
            this.fetchContacts();
            this.closeModal();
          })
          .catch((error) => {
            console.error('Error unfavoriting:', error);
            alert('Error unfavoriting. Please try again.');
          });
      }
    },

    deleteContact() {
      if (this.selectedContactId) {
        axios
          .post(`${process.env.VUE_APP_BASE_API_URL}/delete.php`, {
            id: this.selectedContactId,
          })
          .then((response) => {
            console.log(response.data);
            this.fetchContacts();
            this.closeModal();
          })
          .catch((error) => {
            console.error('Error deleting:', error);
            alert('Error deleting. Please try again.');
          });
      }
    },

  },
  mounted() {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      this.userId = parseInt(storedUserId, 10);
      this.fetchContacts();
    } else {
      console.error('User ID not found in local storage.');
    }
  },
};
</script>