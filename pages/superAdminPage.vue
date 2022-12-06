<template>
    <div>
        <div class="flex justify">
            <AdminButton title = "Tournaments" />
            <AdminButton title = "Institutions" />
            <AdminButton title = "Adjudicators" />
        </div>
        <div class="flex">
            <AdminButton title = "Teams" />
            <AdminButton title = "Venues" />
            <AdminButton title = "Fixtures" />
        </div>
        <div class="flex">
            <AdminButton title = "Users" />
            <AdminButton title = "Results" />
            <AdminButton title = "Sign-up Requests" />
        </div>
    </div>
</template>

<script>
    import AdminButton from '~/components/AdminButton.vue';
</script>

<style>

</style>
