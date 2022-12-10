<script setup>
    import AdminButton from '~/components/AdminButton.vue';
    import ProfileInfo from '~/components/ProfileInfo.vue';
</script>

<template>
    <div>
        <ProfileInfo name="Carmen Leong" title="Super Admin"/>
        <div class="grid w-1/2 grid-cols-3 gap-2 justify-centre">
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
