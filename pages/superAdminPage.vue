<script setup>
    import AdminButton from '~/components/AdminButton.vue';
    import ProfileInfo from '~/components/ProfileInfo.vue';
</script>

<template>
    <div class="flex items-center justify-center">
        <ProfileInfo username="Carmen Leong" role="Super Admin"/>
    </div>
    <div class="flex items-center justify-center w-full">
        <div class="grid w-2/3 grid-cols-3 gap-2">
            <AdminButton title="Tournaments" link="/" />
            <AdminButton title="Institutions" link="/" />
            <AdminButton title="Adjudicators" link="/"/>
            <AdminButton title="Teams" link="/"/>
            <AdminButton title="Venues" link="/"/>
            <AdminButton title="Fixtures" link="/"/>
            <AdminButton title="Users" link="/"/>
            <AdminButton title="Results" link="/"/>
            <AdminButton title="Sign-up Requests" link="/"/>
        </div>
    </div>
</template>

<style>

</style>
