<script setup>
import { ref, onMounted, toRefs } from 'vue';
import AxiosService from '../services/AxiosService';
import GuildToRoleService from '../services/GuildToRoleService';
const props = defineProps({
    id:{
      type: Number,
      required: true
    },
    uuid:{
      type: String,
      required: true
    },
    discordId:{
      type: String,
      required: true
    },
    guild:{
      type: String,
      required: true
    }
});

const {id: id, uuid: uuid, discordId: discordId, guild: guild} = toRefs(props);
let minecraftName = ref("");
let discordNames = ref(undefined);

onMounted((e) => {
    AxiosService.get(`https://link.samifying.com/api/cache/uuid/${uuid.value}`).then(data => {
        minecraftName.value = data.data.name;
    });
    AxiosService.get(`https://link.samifying.com/api/user/${uuid.value}?simple=true`).then(data => { //&guild=${guild.value}&role=${GuildToRoleService.getRoleFromGuild(guild.value)}
        discordNames.value = {handle: data.data.name};
    }).catch(function (e){
        discordNames.value = {handle: "unknown", nickname: "unknown"}
    });
});
</script>

<template>
    <tr>
        <th>{{id}}</th>

        <th v-if="minecraftName != ''"><router-link :to="`/player/${minecraftName}`">{{minecraftName}}</router-link></th><th v-else> LOADING</th>

        <th>{{uuid}}</th>

        <th v-if="discordNames != undefined">{{discordNames.handle}}</th><th v-else> LOADING</th>

        <th>{{discordId}}</th>

        <th>{{guild}}</th>
    </tr>
</template>