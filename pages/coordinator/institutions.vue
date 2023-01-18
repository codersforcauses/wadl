<template>
  <section>
    <Modal :modal-visibility="modalVisible">
      <h1 class="pb-2 text-2xl text-center">Confirm Changes</h1>
      <ul class="mx-6" v-for="update in instUpdates">
        <li>
          {{ `${update.key} changed to ${update.update}` }}
        </li>
      </ul>
      <div class="flex justify-between items-center">
        <Button
          button-text="Reject"
          button-color="bg-red-500"
          type="Submit"
          class="m-5 ml-8"
          @click="handleReject"
        />
        <Button
          button-text="Accept"
          button-color="bg-green-500"
          type="Submit"
          class="m-5 ml-8"
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
        type="number"
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

const store = useInstitutionStore();
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
const handleTeamJoin = () => {
  const original_data = institutions.value.filter(
    (inst) => inst.id === form.value.id
  )[0];
  let updates = [];
  if (form.value.schoolName !== original_data.name) {
    updates.push({ key: "School Name", update: form.value.schoolName });
  }
  if (form.value.schoolNumber !== original_data.phoneNumber) {
    updates.push({ key: "School Number", update: form.value.schoolNumber });
  }
  if (form.value.schoolEmail !== original_data.email) {
    updates.push({ key: "School Email", update: form.value.schoolEmail });
  }
  if (form.value.schoolAbbreviation !== original_data.abbreviation) {
    updates.push({
      key: "School Abbreviation",
      update: form.value.schoolAbbreviation,
    });
  }
  if (form.value.schoolCode !== original_data.code) {
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
  store.checkInstitution(form.value);
  store.updateProfile(form.value);
  modalVisible.value = false;
};

const handleReject = () => {
  const original_data = institutions.value.filter(
    (inst) => inst.id === form.value.id
  )[0];
  console.log(original_data);
  getInfo(original_data);
  modalVisible.value = false;
};

onMounted(async () => {
  await store.getInstitutions();
  institutions.value = store.institutions;
});
onUnmounted(async () => {
  await store.clearStore();
});

const getInfo = (data) => {
  form.value.id = data.id;
  form.value.schoolName = data.name;
  form.value.schoolNumber = data.phoneNumber;
  form.value.schoolEmail = data.email;
  form.value.schoolAbbreviation = data.abbreviation;
  form.value.schoolCode = data.code;
};
const getName = (name) => {
  form.value.schoolName = name;
};
</script>
