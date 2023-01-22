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
      v-if="!hasInst"
      class="bg-white heading-montserrat px-2 md:w-6/12 my-12 flex justify-center flex-col mx-auto"
      @submit.prevent="handleTeamJoin"
    >
      <SearchSelect
        v-model="form.schoolName"
        placeholder="School Name"
        :items="institutionStore.institutions"
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
    <div v-else class="flex justify-center items-center my-10">
      <div class="p-8 heading-montserrat border border-light-grey rounded-3xl">
        <p class="text-xl">{{ form.schoolName }}</p>
        <label class="text-light-grey text-xs"> SCHOOL NAME </label>
        <p class="text-xl pt-2">{{ form.schoolEmail }}</p>
        <label class="text-light-grey text-xs"> SCHOOL EMAIL </label>
        <p class="text-xl pt-2">{{ form.schoolNumber }}</p>
        <label class="text-light-grey text-xs"> SCHOOL NUMBER </label>
        <p class="text-xl pt-2">{{ form.schoolCode }}</p>
        <label class="text-light-grey text-xs"> SCHOOL CODE </label>
        <p class="text-xl pt-2">{{ form.schoolAbbreviation }}</p>
        <label class="text-light-grey text-xs"> SCHOOL ABBREVIATION </label>
        <div class="mt-8 flex justify-end">
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
const institutions = ref(null);
const modalVisible = ref(false);
const instUpdates = ref([]);
const hasInst = ref(false);

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

const toggleEditMode = async () => {
  hasInst.value = !hasInst.value;
  // We only want to call getInstitutions if in editMode & if we don't already have the data
  if (!hasInst.value && institutionStore.institutions.length === 0) {
    await institutionStore.getInstitutions();
  } else {
    // TODO Change - I just added this for testing - we need to hold the original user insts as an object in inst store
    const userInstitutions = userStore.$state.institutions;
    getInfo(
      await institutionStore.getInstitutionByID(
        userInstitutions.institution_ids
      )
    );
  }
};
const handleUpdate = () => {
  institutionStore.checkInstitution(form.value);
  institutionStore.updateProfile(form.value);
  modalVisible.value = false;
  hasInst.value = true;
};

const handleReject = () => {
  const originalData = institutions.value.filter(
    (inst) => inst.id === form.value.id
  )[0];
  getInfo(originalData);
  modalVisible.value = false;
};

onMounted(async () => {
  const userInstitutions = userStore.$state.institutions;
  console.log(userInstitutions);
  if (userInstitutions.institution_ids) {
    console.log("#$%#$%");
    getInfo(
      await institutionStore.getInstitutionByID(
        userInstitutions.institution_ids
      )
    );
    institutionStore.getInstitutionByID(userInstitutions.institution_ids);
    // Todo change
    hasInst.value = true;
  }
  if (!hasInst) {
    await institutionStore.getInstitutions();
    institutions.value = institutionStore.institutions;
  }
});

onUnmounted(async () => {
  await institutionStore.clearStore();
});

const getInfo = (data) => {
  console.log(data.name);
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
const getName = (name) => {
  form.value.schoolName = name;
};
</script>
