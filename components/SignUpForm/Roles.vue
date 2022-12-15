<template>
  <div>
    <label class="mb-1">Role</label>
    <select
      name="role"
      id="role"
      class="pt-1.5 pb-1.5 pl-2.5 border border-solid border-light-grey rounded-md mb-1.5 w-full heading-montserrat"
    >
      <option selected disabled hidden>Select Role</option>
      <option value="adjudicator_coordinator">Adjudicator Coordinator</option>
      <option value="adjudicator">Adjudicator</option>
      <option value="team_coordinator">Team Coordinator</option>
    </select>
  </div>
</template>

<script setup></script>

<style scoped></style>
