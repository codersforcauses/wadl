<template>
  <section>
    <Header title-text="Institution Settings" />
    <form
      v-if="!existingInstitution"
      class="bg-white heading-montserrat px-2 md:w-6/12 my-12 flex justify-center flex-col mx-auto"
      @submit.prevent="handleInstitution"
    >
      <SearchSelect
        v-if="institutionStore.institutions"
        v-model="form.name"
        placeholder="School Name"
        :items="institutionStore.institutions"
        @info="getInfo"
        @input="clearSchoolForm"
      >
      </SearchSelect>
      <FormField
        v-model="form.number"
        label="School Phone Number"
        placeholder="School Number"
        type="number"
      >
      </FormField>
      <FormField
        v-model="form.email"
        label="School Email"
        placeholder="School Email"
        type="email"
      >
      </FormField>
      <FormField
        v-model="form.abbreviation"
        label="School Name Abbreviation"
        placeholder="School Abbreviation"
        type="text"
      >
      </FormField>
      <div class="w-full flex justify-evenly pt-8">
        <Button
          v-if="institutionStore.userInstitution"
          button-text="Cancel"
          button-color="bg-light-red"
          text-color="text-dark-red"
          type="Submit"
          @click="toggleEditMode"
        />
        <Button button-text="Submit" button-color="bg-gold" />
      </div>
    </form>
    <div v-else class="flex justify-center items-center w-full">
      <div class="mt-8 heading-montserrat rounded-3xl md:w-5/12 border p-5">
        <label class="text-light-grey text-xs"> SCHOOL NAME </label>
        <p class="text-xl pb-5">{{ form.name }}</p>
        <label class="text-light-grey text-xs"> SCHOOL EMAIL </label>
        <p class="text-xl pb-5">{{ form.email }}</p>
        <label class="text-light-grey text-xs"> SCHOOL PHONE NUMBER </label>
        <p class="text-xl pb-5">{{ form.number }}</p>
        <label class="text-light-grey text-xs">
          SCHOOL NAME ABBREVIATION
        </label>
        <p class="text-xl">{{ form.abbreviation }}</p>

        <div class="mt-8 flex justify-center">
          <Button
            button-text="Edit"
            button-color="bg-light-green"
            text-color="text-white"
            type="Edit"
            size="small"
            @click="toggleEditMode"
          />
        </div>
      </div>
    </div>
  </section>
  <Notification
    :modal-visibility="notification.isVisible"
    :is-success="notification.isSuccess"
    :body="notification.message"
    @close="notification.dismiss()"
  />
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useInstitutionStore } from "../../stores/institutions";
import { useUserStore } from "../../stores/user";
import { useHead } from "#imports";
import useNotification from "../../composables/useNotification";
useHead({
  title: "Institution",
});
const institutionStore = useInstitutionStore();
const userStore = await useUserStore();
const existingInstitution = ref(false);

const notification = useNotification();

const form = ref({
  id: null,
  name: null,
  number: null,
  email: null,
  abbreviation: null,
});

const handleInstitution = async () => {
  form.value.code = undefined;
  try {
    await institutionStore.checkInstitution(form.value);
  } catch (error) {
    notification.notifyError(error);
    return;
  }
  existingInstitution.value = true;
  notification.notifySuccess("Updated institution settings successfully");
};

const toggleEditMode = async () => {
  existingInstitution.value = !existingInstitution.value;
  if (
    !existingInstitution.value &&
    institutionStore.institutions.length === 0
  ) {
    await institutionStore.getInstitutions();
  } else {
    getInfo(institutionStore.userInstitution);
  }
};

const clearSchoolForm = () => {
  form.value = {
    id: null,
    name: form.value.name,
    number: null,
    email: null,
    abbreviation: null,
  };
};

onMounted(async () => {
  const institutionId = userStore.institution;
  if (institutionId) {
    await institutionStore.getInstitutionByID(institutionId);
    getInfo(institutionStore.userInstitution);
    existingInstitution.value = true;
  } else {
    await institutionStore.getInstitutions();
  }
});

onUnmounted(async () => {
  await institutionStore.clearStore();
});

const getInfo = (data) => {
  form.value = { ...data };
};
</script>
