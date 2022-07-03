<script setup>
const props = defineProps({
    id:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    iconUrl:{
        type: String,
        required: true
    },
    memberCount:{
        type: Number,
        required: true
    }
});
</script>

<template>
    <tr>
        <th>{{id}}</th>
        <th><img :src="iconUrl" :alt="`Server icon of ${name}`" class="server-icon"></th>
        <th>{{name}}</th>
        <th>{{memberCount}}</th>
    </tr>
</template>

<style>
.server-icon{
    width: 3rem;
    height: 3rem;
    border-radius: 0.2rem;
}
</style>