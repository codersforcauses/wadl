<template>
  <div>
    <p>Role</p>
    <select name="role" id="role">
      <option selected disabled hidden>Select Role</option>
      <option value="adjudicator_coordinator">Adjudicator Coordinator</option>
      <option value="adjudicator">Adjudicator</option>
      <option value="team_coordinator">Team Coordinator</option>
    </select>
  </div>
</template>

<script setup></script>

<style scoped>
p {
  margin-bottom: 4px;
}
select {
  padding-top: 6px;
  padding-bottom: 6px;
  padding-left: 10px;
  border: solid 1px lightgray;
  border-radius: 6px;
  margin-bottom: 6px;
  font-family: theme("fontFamily.brandon");
  letter-spacing: theme("letterSpacing.12");
  width: 100%;
}
</style>
