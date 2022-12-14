<script setup>
defineProps({
    headings: Array,
    Default: [],
})
</script>

<template>
    <div class="flex justify-center">
        <div class="w-2/3">
            <table class="flex items-center justify-center table-auto">
                <thead>
                    <tr>
                        <th class="text-2xl text-black" v-for="({ heading }, index) in headings">
                            {{ headings[index] }}
                            <!-- {{ index }} -->
                        </th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </div>
        <div>
            
        </div>
    </div>
</template>