<template>
  <section>
    <Header title-text="Institution Settings" />
    <form
      v-if="!existingInstitution"
      class="bg-white heading-montserrat px-2 md:w-6/12 my-12 flex justify-center flex-col mx-auto"
      @submit.prevent="handleTeamJoin"
    >
      <SearchSelect
        v-model="form.name"
        placeholder="School Name"
        :items="institutionStore.institutions"
        @info="getInfo"
        @input="clearSchoolForm"
      >
      </SearchSelect>
      <FormField
        v-model="form.number"
        label="School Number"
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
        label="School Abbreviation"
        placeholder="School Abbreviation"
        type="text"
      >
      </FormField>
      <FormField
        v-model="form.code"
        label="School Code"
        placeholder="School Code"
        type="text"
      >
      </FormField>
      <div class="w-full flex justify-evenly pt-8">
        <Button
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
        <label class="text-light-grey text-xs"> SCHOOL NUMBER </label>
        <p class="text-xl pb-5">{{ form.number }}</p>
        <label class="text-light-grey text-xs"> SCHOOL CODE </label>
        <p class="text-xl pb-5">{{ form.code }}</p>
        <label class="text-light-grey text-xs"> SCHOOL ABBREVIATION </label>
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
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useInstitutionStore } from "../../stores/institutions";
import { useUserStore } from "../../stores/auth";

const institutionStore = useInstitutionStore();
const userStore = useUserStore();
const instUpdates = ref([]);
const existingInstitution = ref(false);

const form = ref({
  id: null,
  name: null,
  number: null,
  email: null,
  abbreviation: null,
  code: null,
});

const handleTeamJoin = async () => {
  institutionStore.checkInstitution(form.value);
  // await institutionStore.getInstitutions();
  // const originalData = institutionStore.institutions.filter(
  //   (inst) => inst.id === form.value.id
  // )[0];
  // const updates = [];
  // if (form.value.schoolName !== originalData.name) {
  //   updates.push({ key: "School Name", update: form.value.schoolName });
  // }
  // if (form.value.schoolNumber !== originalData.phoneNumber) {
  //   updates.push({ key: "School Number", update: form.value.schoolNumber });
  // }
  // if (form.value.schoolEmail !== originalData.email) {
  //   updates.push({ key: "School Email", update: form.value.schoolEmail });
  // }
  // if (form.value.schoolAbbreviation !== originalData.abbreviation) {
  //   updates.push({
  //     key: "School Abbreviation",
  //     update: form.value.schoolAbbreviation,
  //   });
  // }
  // if (form.value.schoolCode !== originalData.code) {
  //   updates.push({ key: "School Code", update: form.value.schoolCode });
  // }
  // if (updates.length !== 0) {
  //   instUpdates.value = updates;
  //   modalVisible.value = true;
  // } else {
  //   // might need an alert or warning
  //   console.log("No changes");
  // }

  // TODO handle institution change & create
  institutionStore.editInstitution(form.value);
};

const toggleEditMode = async () => {
  existingInstitution.value = !existingInstitution.value;
  // We only want to call getInstitutions if in editMode & if we don't already have the data
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
    code: null,
  };
};

onMounted(async () => {
  const institutionId = userStore.institution;
  if (institutionId) {
    console.log("THERE IS AN INST ID");
    await institutionStore.getInstitutionByID(institutionId);
    getInfo(institutionStore.userInstitution);

    // Todo change
    // existingInstitution.value = true;
  } else {
    console.log("THERE IS NO INST ID");

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
