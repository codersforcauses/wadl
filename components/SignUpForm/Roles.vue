<template>
  <select name="roles" id="roles" @change="displayInstitution($event)">
    <option selected disabled hidden>Select Role</option>
    <option value="adjudicator_coordinator">Adjudicator Coordinator</option>
    <option value="adjudicator">Adjudicator</option>
    <option value="team_coordinator">Team Coordinator</option>
  </select>
  <select name="institution" id="institution" style="display: none">
    <option selected disabled hidden>Select Institution</option>
    <option value="trinity">Trinity</option>
  </select>
  <select
    name="affiliated_institutions"
    id="affiliated_institutions"
    style="display: none"
    multiple
  >
    <option selected disabled hidden>Select Institutions</option>
    <option value="trinity">Trinity</option>
    <option value="hale">Hale School</option>
  </select>
</template>

<script setup>
function displayInstitution(event) {
  var selection = event.target.value;
  if (selection === "adjudicator_coordinator") {
    document.getElementById("institution").style.display = "none";
    document.getElementById("affiliated_institutions").style.display = "none";
  } else if (selection === "adjudicator") {
    document.getElementById("institution").style.display = "none";
    document.getElementById("affiliated_institutions").style.display = "block";
  } else if (selection === "team_coordinator") {
    document.getElementById("institution").style.display = "block";
    document.getElementById("affiliated_institutions").style.display = "none";
  }
}
</script>
