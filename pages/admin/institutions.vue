<script setup>
import { ref, computed } from "vue";
import { useInstitutionStore } from "../../stores/institutions";
import { useHead } from "#imports";
import useNotification from "../../composables/useNotification";
useHead({
  title: "Institutions",
});

const notification = useNotification();
const errorMessage = ref(null);

const headers = [
  {
    key: "name",
    title: "Institution",
  },
  {
    key: "number",
    title: "Phone Number",
  },
  {
    key: "email",
    title: "Email",
  },
];

const defaultInputState = {
  id: null,
  name: null,
  code: null,
  abbreviation: null,
  number: null,
  email: null,
};

const modalVisibility = ref(false);
const editMode = ref(false);
const formInput = ref({ ...defaultInputState });

const store = useInstitutionStore();

store.getInstitutions();

const resetFormState = () => {
  formInput.value = { ...defaultInputState };
  editMode.value = false;
  errorMessage.value = null;
};

const searchTerm = ref(null);
const filteredInstitutions = computed(() => {
  const query = searchTerm.value;
  const results = store.institutions.filter((institutions) =>
    institutions.name.toLowerCase().includes(query)
  );
  return query !== null ? results : store.institutions;
});

const updateInstitution = async () => {
  try {
    await store.editInstitution(formInput.value);
  } catch (error) {
    errorMessage.value = error.message;
    return;
  }
  modalVisibility.value = false;
  notification.notifySuccess("Updated institution successfully");
  resetFormState();
};

const createInstitution = async () => {
  // update store
  try {
    await store.createInstitution(formInput.value);
  } catch (error) {
    errorMessage.value = error.message;
    return;
  }
  modalVisibility.value = false;
  notification.notifySuccess("Created institution successfully");
  resetFormState();
};

const handleEdit = (row) => {
  modalVisibility.value = row.modalVisibility;
  editMode.value = row.editMode;
  formInput.value = row.data;
};

// Notification Modal
const notificationVisibility = ref(false);
const isSuccess = ref(false);
const notificationMessage = ref("");

const deleteInstitution = (id) => {
  store.deleteInstitution(id);
  if (!store.errorMessage) {
    isSuccess.value = true;
    notificationVisibility.value = true;
    notificationMessage.value = "Institution successfully deleted";
  }
};
</script>

<template>
  <Modal
    :modal-visibility="modalVisibility"
    size="w-7/12"
    @close="
      () => {
        modalVisibility = false;
        resetFormState();
      }
    "
  >
    <div v-if="editMode">
      <p class="text-3xl heading-montserrat font-bold px-6 py-3 text-center">
        Edit Institution
      </p>
      <form
        class="px-10"
        @submit.prevent="
          () => {
            updateInstitution();
          }
        "
      >
        <FormField v-model="formInput.name" label="Institution Name" />
        <FormField v-model="formInput.code" label="Code" />
        <FormField v-model="formInput.abbreviation" label="Abbreviation" />
        <FormField v-model="formInput.number" label="Phone Number" type="tel" />
        <FormField v-model="formInput.email" label="Email" type="email" />
        <p v-if="errorMessage" class="text-danger-red">
          {{ errorMessage }}
        </p>
        <div class="flex justify-evenly w-full my-5">
          <Button
            button-text="Delete"
            button-color="bg-pink-100"
            type="Submit"
            class="text-red-700"
            @click="deleteInstitution(formInput.id)"
          />
          <Notification
            :modal-visibility="notificationVisibility"
            :is-success="isSuccess"
            :body="notificationMessage"
            @close="
              () => {
                notificationVisibility = false;
                redirect();
              }
            "
          />
          <Button button-text="Update" button-color="bg-gold" type="Submit" />
        </div>
      </form>
    </div>
    <div v-else>
      <p class="text-3xl heading-montserrat font-bold px-6 py-3 text-center">
        Add Institution
      </p>
      <form
        class="px-10"
        @submit.prevent="
          () => {
            createInstitution();
          }
        "
      >
        <FormField v-model="formInput.name" label="Institution Name" />
        <FormField v-model="formInput.code" label="Code" />
        <FormField v-model="formInput.abbreviation" label="Abbreviation" />
        <FormField v-model="formInput.number" label="Phone Number" type="tel" />
        <FormField v-model="formInput.email" label="Email" type="email" />
        <p v-if="errorMessage" class="text-danger-red">
          {{ errorMessage }}
        </p>
        <div class="flex justify-evenly items-center">
          <Button
            button-text="Submit"
            button-color="bg-gold"
            type="Submit"
            class="m-5 ml-8"
          />
        </div>
      </form>
    </div>
  </Modal>

  <section
    class="flex flex-col items-center justify-center max-w-screen max-h-screen"
  >
    <Header title-text="Institutions" />
    <div class="flex items-center justify-center w-full">
      <SearchBar
        @handle-filter="
          (searchString) => {
            searchTerm = searchString;
          }
        "
      />
      <Button
        button-text="Add"
        button-color="bg-gold"
        class="ml-2"
        type="button"
        size="medium"
        @click="modalVisibility = true"
      />
    </div>
    <Table
      :headers="headers"
      :data="filteredInstitutions"
      no-data-text="No institutions registered"
      @edit="handleEdit"
    />
  </section>
  <Notification
    :modal-visibility="notification.isVisible"
    :is-success="notification.isSuccess"
    :body="notification.message"
    @close="notification.dismiss()"
  />
</template>
