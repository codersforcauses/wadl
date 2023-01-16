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
            @search-text="getName"
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
  schoolName: "",
  schoolNumber: "",
  schoolEmail: "",
});
const handleTeamJoin = () => {
  console.log(form.value);
};

onMounted(async () => {
  await store.getInstitutions();
  institutions.value = store.institutions;
});
onUnmounted(() => {
  store.clearStore();
});
const getInfo = (data) => {
  form.value.schoolName = data.name;
  form.value.schoolNumber = data.phoneNumber;
  form.value.schoolEmail = data.email;
};
const getName = (name) => {
  console.log("name:", name);
};
</script>
