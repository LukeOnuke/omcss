<script setup>
import { ref, onMounted, toRefs } from 'vue';
import AxiosService from '../services/AxiosService';
import UserRow from '../components/UserRow.vue';
const props = defineProps({
    page:{
      type: String,
      required: true
    }
});

const {page: page} = toRefs(props);
let data = ref(undefined);

onMounted((e) => {
    AxiosService.get(`https://link.samifying.com/api/data?page=${page.value}`).then(d => {
        data.value = d;
        console.log(data.value);
    });
});
</script>

<template>
    <div class="pt-3rem">
        <table v-if="data != undefined">
        <tr>
            <th>ID</th>
            <th>Minecraft Name</th>
            <th>Minecraft ID</th>
            <th>Discord Name</th>
            <th>Discord Nickname</th>
            <th>Discord ID</th>
            <th>Registerd in guild</th>
        </tr>
        <UserRow v-for="user of data.data.content" :key="user.id" :id="user.id" :uuid="user.uuid" :discord-id="user.discordId" :guild="user.guildId"></UserRow>
    </table>
    <nav>
        
    </nav>
    </div>

</template>

<style>

</style>