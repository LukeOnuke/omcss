<script setup>
import { ref, onMounted, toRefs, onUpdated } from 'vue';
import AxiosService from '../services/AxiosService';
import UserRow from '../components/UserRow.vue';
import Pagenation from '../components/Pagenation.vue';
const props = defineProps({
    page:{
      type: String,
      required: true
    }
});

const {page: page} = toRefs(props);
let data = ref(undefined);

function refresh(){
    AxiosService.get(`https://link.samifying.com/api/data?page=${page.value}`).then(d => {
        data.value = d.data;
        console.log(data.value);
    });
}

onMounted((e) => {
    refresh();
});

onUpdated(e => {
    refresh();
});
</script>

<template>
<div v-if="data != undefined">
    <div class="pt-3rem container flex flex-center">
        <table >
        <tr>
            <th>ID</th>
            <th>Minecraft Name</th>
            <th>Minecraft ID</th>
            <th>Discord Name</th>
            <th>Discord Nickname</th>
            <th>Discord ID</th>
            <th>Registerd in guild</th>
        </tr>
        <UserRow v-for="user of data.content" :key="user.id" :id="user.id" :uuid="user.uuid" :discord-id="user.discordId" :guild="user.guildId"></UserRow>
    </table>
    </div>

    <nav>
        <Pagenation :page="Number(page)" :max-page="data.totalPages - 1"></Pagenation>
    </nav>
</div>
</template>

<style>

</style>