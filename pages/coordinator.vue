<script setup>
import ProfileInfo from "~/components/admin/ProfileInfo.vue";
import Table from "~/components/coordinator/Table.vue";
</script>

<template>
  <div>
    <div>
      <ProfileInfo username="Carmen Leong" role="Admin" />
    </div>
    <div>
      <Table :headings="['Teams', 'Level', 'Division']" />
    </div>
  </div>
</template>