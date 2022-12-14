<script setup>
import ProfileInfo from "~/components/admin/ProfileInfo.vue";
import TableHeader from "~/components/coordinator/TableHeader.vue";
</script>

<template>
  <div>
    <div>
      <ProfileInfo username="Carmen Leong" role="Admin" />
    </div>
    <div>
      <TableHeader :headings="['Teams', 'Level', 'Division']" />
    </div>
  </div>
</template>
