<template>
  <section>
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

const form = ref({
  id: "",
  schoolName: "",
  schoolNumber: "",
  schoolEmail: "",
  schoolAbbreviation: "",
  schoolCode: "",
});
const handleTeamJoin = () => {
  store.checkInstitution(form.value);
  store.updateProfile(form.value);
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
