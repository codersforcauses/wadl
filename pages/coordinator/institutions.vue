<template>
  <section class="px-16">
    <form
      class="bg-white heading-montserrat py-10"
      @submit.prevent="handleTeamJoin"
    >
      <div class="text-6xl text-center">Institution Settings</div>
      <hr class="border-black mt-8" />
      <div class="py-12 px-48">
        <div>
          <SearchSelect
            v-model="form.schoolName"
            placeholder="School Name"
            :items="institutions"
            @info="getInfo"
          >
          </SearchSelect>
        </div>
        <div>
          <FormField
            v-model="form.schoolNumber"
            label="School Number"
            placeholder="School Number"
            type="number"
          >
          </FormField>
        </div>
        <div>
          <FormField
            v-model="form.schoolEmail"
            label="School Email"
            placeholder="School Email"
            type="email"
          >
          </FormField>
        </div>
        <div>
          <FormField
            v-model="form.schoolAbbreviation"
            label="School Abbreviation"
            placeholder="School Abbreviation"
            type="text"
          >
          </FormField>
        </div>
        <div>
          <FormField
            v-model="form.schoolCode"
            label="School Code"
            placeholder="School Code"
            type="number"
          >
          </FormField>
        </div>
        <div class="w-full flex justify-center pt-8">
          <Button button-text="Submit" button-color="bg-gold" />
        </div>
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
  store.checkInstitution();
  // store.updateProfile(form.value);
};

onMounted(async () => {
  await store.getInstitutions();
  institutions.value = store.institutions;
  form.value.schoolNumber = null;
  form.value.schoolEmail = null;
  form.value.schoolAbbreviation = null;
  form.value.schoolCode = null;
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
</script>
