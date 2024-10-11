<template>
  <div>
    <div class="max-w-xl mx-auto p-4">
      <!-- List Wrapper -->
      <h2 class="text-lg text-gray-600">All Contacts</h2>
      <!-- Check if contacts are available -->
      <div v-if="contacts.length === 0" class="text-center p-4 text-gray-500">
        <div role="alert" class="alert max-w-md my-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-info h-6 w-6 shrink-0">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
          <span>Please take a moment to add your first contact.</span>
        </div>
        <div class="my-3 flex justify-center">
          <img src="@/assets/img/pic.png" alt="Description of the image" style="height: 300px;" />
        </div>
      </div>
      <div v-else>
        <ul class="space-y-4" v-for="(contact, index) in contacts" :key="index">
          <li class="flex items-center bg-white border p-4 rounded-2xl my-3 w-full" v-if="contact.deletec === 0">
            <div class="flex items-center">
              <div class="avatar rounded-full border border-slate-50 p-1">
                <div class="w-12 rounded-full">
                  <img :src="`https://i.pravatar.cc/50?random=${index + 1}`" alt="User Image" />
                </div>
              </div>
              <div class="ml-4">
                <h2 class="font-semibold text-lg"> {{ contact.fname }} {{ contact.lname }}</h2>
                <p class="text-gray-500">+91 {{ contact.phone }}</p>
              </div>
            </div>
            <button class="btn btn-ghost ml-auto btn-sm" @click="openOptions(contact.id)">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v.01M12 12v.01M12 18v.01" />
                                  </svg>
                                </button>
          </li>
        </ul>
      </div>
      <div class="bg-gray-50" style="height:200px;"></div>
    </div>
    <!-- Bottom Bar -->
    <div class="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg z-10">
      <div class="flex justify-between">
        <button class="btn btn-ghost">Home</button>
        <button class="btn btn-ghost">Contacts</button>
        <button class="btn btn-ghost">Settings</button>
      </div>
    </div>
    <!-- Floating Button -->
    <button class="btn  bg-primary text-white fixed bottom-20 right-7 rounded-lg z-20 " onclick="my_modal_add_contact.showModal()">
                            <svg
                          xmlns="http://www.w3.org/2000/svg"
                          class="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Add
                      </button>
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
          <button class="btn w-full my-1 rounded-full active:bg-slate-600 active:text-white text-base font-normal" @click="openEditModal">Edit</button>
          <div v-if="selectedContact && selectedContact.favorite !== 1" class="w-full">
            <button class="btn w-full my-1 rounded-full active:bg-slate-600 active:text-white text-base font-normal" @click="Mkfavorite">Favorite</button>
          </div>
          <div v-else class="w-full">
            <button class="btn w-full my-1 rounded-full active:bg-slate-600 active:text-white text-base font-normal" @click="Unfavorite">Un-favorite</button>
          </div>
          <button class="btn w-full my-1 rounded-full active:bg-slate-600 active:text-white text-base font-normal" @click="deleteContact()">Trash</button>
        </div>
      </div>
    </dialog>
    <!-- Modal box for edit details -->
    <dialog id="my_modal_6" class="modal modal-bottom md:modal-middle" @click="closeEditModal">
      <div class="modal-box relative text-center p-2 m-0" @click.stop>
        <div class="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-2"></div>
        <form method="dialog">
          <button class="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
        </form>
        <h3 class="text-lg font-bold mt-6">Edit Contact</h3>
        <p class="py-2">Edit Your Contact Details</p>
        <div class="modal-action p-0 m-0 flex flex-col items-center justify-center w-full p-4">
          <div class="grid grid-cols-1 gap-y-6 mx-3">
            <!-- First Name and Last Name in one row -->
            <div class="grid grid-cols-2 gap-x-4">
              <div>
                <label for="fname" class="block text-start font-medium mb-1">First Name*</label>
                <input type="text" v-model="selectedContact.fname" placeholder="First" class="input input-bordered w-full" />
              </div>
              <div>
                <label for="lname" class="block text-start font-medium mb-1">Surname</label>
                <input type="text" v-model="selectedContact.lname" placeholder="Surname" class="input input-bordered w-full" />
              </div>
            </div>
            <!-- Phone -->
            <div>
              <label for="phone" class="block text-start font-medium mb-1">Mobile*</label>
              <input type="text" v-model="selectedContact.phone" placeholder="+91" class="input input-bordered w-full" />
            </div>
            <!-- Checkbox for Favorite -->
            <!-- Update Profile Button -->
            <div>
              <button class="btn w-full mt-6 rounded-full bg-blue-600 text-white active:bg-slate-800 
              hover:bg-slate-800 text-base font-normal mb-5" @click="updateContact">Update Contact</button>
            </div>
          </div>

        </div>
      </div>
    </dialog>
    <!-- Modal box for adding a new contact -->
    <dialog id="my_modal_add_contact" class="modal modal-bottom md:modal-middle">
      <div class="modal-box relative text m-0 p-6">
        <!-- Centered top border handle -->
        <div class="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-2"></div>
        <!-- Close button -->
        <form method="dialog">
          <button class="btn btn-sm btn-circle absolute right-2 top-2">✕</button>
        </form>
        <!-- Title and description -->
        <h3 class="text-lg font-bold text-center">Add New Contact</h3>
        <p class="py-2 mb-5 text-center">Fill in the details below to add a new contact.</p>
        <!-- Form fields -->
        <div class="grid grid-cols-1 gap-y-6 mx-3">
          <!-- First Name and Last Name in one row -->
          <div class="grid grid-cols-2 gap-x-4">
            <div>
              <label for="fname" class="block text-start font-medium mb-1">First Name*</label>
              <input type="text" v-model="contact_fname" placeholder="First" class="input input-bordered w-full" />
            </div>
            <div>
              <label for="lname" class="block text-start font-medium mb-1">Surname</label>
              <input type="text" v-model="contact_lname" placeholder="Surname" class="input input-bordered w-full" />
            </div>
          </div>
          <!-- Phone -->
          <div>
            <label for="phone" class="block text-start font-medium mb-1">Mobile*</label>
            <input type="text" v-model="contact_phone" placeholder="+91" class="input input-bordered w-full" />
          </div>
          <!-- Checkbox for Favorite -->
          <div class="flex items-center rounded-md p-4 bg-gray-50">
            <input type="checkbox" v-model="contact_favorite" id="favorite" class="mr-2 checkbox checkbox-primary">
            <label for="favorite" class="text-gray-600">Mark as Favorite</label>
          </div>
          <!-- Update Profile Button -->
          <div>
            <button class="btn w-full mt-6 rounded-full bg-primary text-white active:bg-slate-800 hover:bg-slate-800 text-base font-normal mb-5" @click="addContact()">
                        Add Contact
                      </button>
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
        contacts: [],
        selectedContactId: null,
        userId: null,
        contact_fname: '',
        contact_lname: '',
        contact_phone: '',
        contact_favorite: false
      };
    },
    computed: {
      selectedContact() {
        return Array.isArray(this.contacts) ?
          this.contacts.find(contact => contact.id === this.selectedContactId) || {} : {};
      }
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
              this.contacts = Array.isArray(response.data) ? response.data : []; // Ensure contacts is an array
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
      closeEditModal() {
        document.getElementById('my_modal_6').close();
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
      openEditModal() {
        if (this.selectedContactId) {
          this.closeModal();
          document.getElementById('my_modal_6').showModal();
        } else {
          console.error('No contact selected for editing.');
        }
      },
      updateContact() {
        if (this.selectedContactId) {
          axios
            .post(`${process.env.VUE_APP_BASE_API_URL}/update.php`, {
              id: this.selectedContactId,
              fname: this.selectedContact.fname,
              lname: this.selectedContact.lname,
              phone: this.selectedContact.phone,
            })
            .then((response) => {
              console.log(response.data);
              this.fetchContacts();
              this.closeEditModal();
            })
            .catch((error) => {
              console.error('Error updating contact:', error);
              alert('Error updating contact. Please try again.');
            });
        }
      },
      Mkfavorite() {
        if (this.selectedContactId) {
          axios
            .post(`${process.env.VUE_APP_BASE_API_URL}/favorite.php`, {
              id: this.selectedContactId,
            })
            .then((response) => {
              console.log(response.data);
              this.fetchContacts();
              this.closeModal();
            })
            .catch((error) => {
              console.error('Error marking favorite:', error);
              alert('Error marking favorite. Please try again.');
            });
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
      addContact() {
        // Validation for required fields
        if (this.contact_fname && this.contact_lname) {
          axios
            .post(`${process.env.VUE_APP_BASE_API_URL}/add_contact.php`, {
              user_id: this.userId,
              fname: this.contact_fname,
              lname: this.contact_lname,
              phone: this.contact_phone,
              ffavorite: this.contact_favorite,
            })
            .then((response) => {
              console.log(response.data);
              this.fetchContacts(); // Fetch updated contacts
              document.getElementById('my_modal_add_contact').close(); // Close the add contact modal
              // Optionally reset form fields after adding
              this.contact_fname = '';
              this.contact_lname = '';
              this.contact_phone = '';
              this.contact_favorite = false;
            })
            .catch((error) => {
              console.error('Error adding contact:', error);
              alert('Error adding contact. Please try again.');
            });
        } else {
          alert('First Name and Phone are required fields.');
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
