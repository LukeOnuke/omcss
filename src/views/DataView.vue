<script setup>
import { ref, onMounted, toRefs, onUpdated } from 'vue';
import AxiosService from '../services/AxiosService';
import UserRow from '../components/UserRow.vue';
import Pagenation from '../components/Pagenation.vue';
import { router } from '../main';
import DiscordServerRow from '../components/DiscordServerRow.vue';
const props = defineProps({
    page:{
      type: String,
      required: true
    }
});

const {page: page} = toRefs(props);
let data = ref(undefined);
let currentPage = ref(Number(page.value));
let serversWithBot = ref({});

function refreshUserTable(){
    AxiosService.get(`https://link.samifying.com/api/data?page=${currentPage.value}`).then(d => {
        data.value = d.data;
        console.log(data.value);
    });
}

function refreshServersWithBotTable(){
    AxiosService.get("https://link.samifying.com/api/info/guilds").then(d => {
        serversWithBot.value = d.data;
    })
}

onMounted((e) => {
    refreshUserTable();
    refreshServersWithBotTable();
});

router.afterEach((to, from, faliure) => {
    currentPage.value = Number(to.params.page);
    console.log("Changing router path", to, from);
    refreshUserTable();
});

//onUpdated(e => {
//    refresh();
//});
</script>

<template>
<section></section>
<div v-if="data != undefined" class="pt-3rem container">
    <div class="flex flex-center">
        <table class="mb-1rem" :key="currentPage">
        <tr>
            <th colspan="7">Linked accounts</th>
        </tr>
        <tr>
            <th>ID</th>
            <th>Minecraft Name</th>
            <th>Minecraft ID</th>
            <th>Discord Name</th>
            <th>Discord ID</th>
            <th>Registerd in guild</th>
        </tr>
        <UserRow v-for="user of data.content" :key="user.id" :id="user.id" :uuid="user.uuid" :discord-id="user.user.discordId" :guild="user.guild.discordId"></UserRow>
    </table>
    </div>

    <nav>
        <Pagenation :key="currentPage" :page="currentPage" :max-page="data.totalPages - 1"></Pagenation>
    </nav>
</div>

<div class="container">
        <div class="flex flex-center" v-if="serversWithBot != {}">
            <table>
                <tr>
                    <th>ID</th>
                    <th>Icon</th>
                    <th>Name</th>
                    <th>Member Count</th>
                </tr>
                <DiscordServerRow v-for="server in serversWithBot" :key="server.id" :id="server.id" :icon-url="server.iconUrl" :member-count="server.memberCount" :name="server.name"></DiscordServerRow>
            </table>
        </div>
    </div>
</template>

<style>

</style>