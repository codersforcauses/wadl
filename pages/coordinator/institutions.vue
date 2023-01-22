<template>
  <section>
    <Modal
      :modal-visibility="modalVisible"
      @close="
        () => {
          modalVisible = false;
          resetFormState();
        }
      "
    >
      <h1 class="py-3 text-2xl text-center">Confirm Changes</h1>
      <hr class="mx-8" />
      <ul v-for="update in instUpdates" :key="update.key" class="mx-6 pt-2">
        <li>
          {{ `${update.key} changed to ${update.update}` }}
        </li>
      </ul>
      <div class="flex justify-evenly items-center my-6">
        <Button
          button-text="Reject"
          button-color="bg-light-red"
          text-color="text-dark-red"
          type="Submit"
          @click="handleReject"
        />
        <Button
          button-text="Approve"
          button-color="bg-light-green"
          text-color="text-white"
          type="Submit"
          @click="handleUpdate"
        />
      </div>
    </Modal>
    <Header title-text="Institution Settings" />
    <form
      class="bg-white heading-montserrat px-2 md:w-6/12 my-12 flex justify-center flex-col mx-auto"
      @submit.prevent="handleTeamJoin"
    >
      <SearchSelect
        v-model="form.schoolName"
        placeholder="School Name"
        :items="institutions"
        @info="getInfo"
        @search-text="getName"
      >
      </SearchSelect>
      <FormField
        v-model="form.schoolNumber"
        label="School Number"
        placeholder="School Number"
        type="number"
      >
      </FormField>
      <FormField
        v-model="form.schoolEmail"
        label="School Email"
        placeholder="School Email"
        type="email"
      >
      </FormField>
      <FormField
        v-model="form.schoolAbbreviation"
        label="School Abbreviation"
        placeholder="School Abbreviation"
        type="text"
      >
      </FormField>
      <FormField
        v-model="form.schoolCode"
        label="School Code"
        placeholder="School Code"
        type="text"
      >
      </FormField>
      <div class="w-full flex justify-center pt-8">
        <Button button-text="Submit" button-color="bg-gold" />
      </div>
    </form>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useInstitutionStore } from "../../stores/institutions";
import { useUserStore } from "../../stores/auth";

const institutionStore = useInstitutionStore();
const userStore = useUserStore();
const institutions = ref(null);
const modalVisible = ref(false);
const instUpdates = ref([]);

const form = ref({
  id: "",
  schoolName: "",
  schoolNumber: "",
  schoolEmail: "",
  schoolAbbreviation: "",
  schoolCode: "",
});
const handleTeamJoin = async () => {
  await institutionStore.getInstitutions();
  const originalData = institutionStore.institutions.filter(
    (inst) => inst.id === form.value.id
  )[0];
  const updates = [];
  if (form.value.schoolName !== originalData.name) {
    updates.push({ key: "School Name", update: form.value.schoolName });
  }
  if (form.value.schoolNumber !== originalData.phoneNumber) {
    updates.push({ key: "School Number", update: form.value.schoolNumber });
  }
  if (form.value.schoolEmail !== originalData.email) {
    updates.push({ key: "School Email", update: form.value.schoolEmail });
  }
  if (form.value.schoolAbbreviation !== originalData.abbreviation) {
    updates.push({
      key: "School Abbreviation",
      update: form.value.schoolAbbreviation,
    });
  }
  if (form.value.schoolCode !== originalData.code) {
    updates.push({ key: "School Code", update: form.value.schoolCode });
  }
  if (updates.length !== 0) {
    instUpdates.value = updates;
    modalVisible.value = true;
  } else {
    // might need an alert or warning
    console.log("No changes");
  }
};

const handleUpdate = () => {
  institutionStore.checkInstitution(form.value);
  institutionStore.updateProfile(form.value);
  modalVisible.value = false;
};

const handleReject = () => {
  const originalData = institutions.value.filter(
    (inst) => inst.id === form.value.id
  )[0];
  getInfo(originalData);
  modalVisible.value = false;
};

onMounted(async () => {
  const user_institutions = userStore.$state.institutions;
  if (user_institutions.length !== 0) {
    getInfo(
      await institutionStore.getInstitutionByID(
        user_institutions.institution_ids
      )
    );
  }
  await institutionStore.getInstitutions();
  institutions.value = institutionStore.institutions;
});

onUnmounted(async () => {
  await institutionStore.clearStore();
});

const getInfo = (data) => {
  form.value.id = data.id;
  form.value.schoolName = data.name;
  // Firestore phonenumber is named different to pinia
  form.value.schoolNumber = data.phoneNumber
    ? data.phoneNumber
    : data.phone_number;
  form.value.schoolEmail = data.email;
  form.value.schoolAbbreviation = data.abbreviation;
  form.value.schoolCode = `${data.code}`;
};
</script>
