<template>
    <div>{{venue[0].venue}}</div>
</template>
<script setup>
    const venues = [
        {
            venue: "South Street",
            roomNum: "024",
            day: "Wednesday"
        },
        {
            venue: "Adjacent Avenue",
            roomNum: "96",
            day: "Wednesday"
        },
        {
            venue: "Rightmost Road",
            roomNum: "111",
            day: "Wednesday"
        },
    ]
</script>