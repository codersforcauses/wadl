<template>
  <section class="px-16">
    <form
      class="bg-white heading-montserrat py-10"
      @submit.prevent="handleTeamJoin"
    >
      <div class="text-6xl text-center">Institution Settings</div>
      <hr class="border-black mt-8" />
      <div class="py-12 px-48">
        <div class="py-1">
          <SearchSelect
            placeholder="School Name"
            :items="institutions"
            @info="getInfo"
            @search-text="getName"
          >
          </SearchSelect>
        </div>
        <div class="py-1">
          <FormField
            v-model="form.schoolNumber"
            label="School Number"
            placeholder="School Number"
            type="number"
          ></FormField>
        </div>
        <div class="py-1">
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
import { ref, onMounted } from "vue";
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
const getInfo = (data) => {
  console.log("DATA:", data);
};
const getName = (name) => {
  console.log("name:", name);
};
</script>
