<script setup>
import { ref, onMounted, toRefs } from 'vue';
import AxiosService from '../services/AxiosService';
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
let discordNames = ref({});

onMounted((e) => {
    AxiosService.getProxied(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid.value}/`).then(data => {
        minecraftName.value = data.data.name;
    });
    AxiosService.get(`https://link.samifying.com/api/user/${uuid.value}?guild=${guild.value}`).then(data => {
        discordNames.value = {handle: data.data.name, nickname: data.data.nickname};
    }).catch(function (e){
        discordNames.value = {handle: "unknown", nickname: "unknown"}
    });
});
</script>

<template>
    <tr>
        <th>{{id}}</th>

        <th v-if="minecraftName != ''">{{minecraftName}}</th><th v-else> LOADING</th>

        <th>{{uuid}}</th>

        <th v-if="discordNames != {}">{{discordNames.handle}}</th><th v-else> LOADING</th>
        <th v-if="discordNames != {}">{{discordNames.nickname}}</th><th v-else> LOADING</th>

        <th>{{discordId}}</th>

        <th>{{guild}}</th>
    </tr>
</template>