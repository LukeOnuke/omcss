<script setup>
import { onMounted, toRefs, ref } from 'vue';
import AxiosService from '../services/AxiosService';
import Player from '../components/Player.vue';
import CopyableText from '../components/CopyableText.vue';
const props = defineProps({
    name:{
      type: String,
      required: false
    }
});

const {name : name} = toRefs(props);

let user = ref(
  {
    basic : undefined,
    complex: undefined,
    discord: undefined,
    ban: undefined
  }
);

onMounted((e) => {
    AxiosService.get(`https://link.samifying.com/api/cache/name/${name.value}`).then(udata => {
      user.value.basic = udata.data;
      AxiosService.get(`https://link.samifying.com/api/data/uuid/${user.value.basic.id}`).then(cdata => {
        user.value.complex = cdata.data;
      });
      AxiosService.get(`https://link.samifying.com/api/user/${user.value.basic.id}?checkForBan=1`).catch(bdata => {
        user.value.ban = bdata.data;
      });
      AxiosService.get(`https://link.samifying.com/api/user/${user.value.basic.id}`).then(ddata => {
        user.value.discord = ddata.data;
      });
      
    });
});
</script>

<template>
    <div class="container flex flex-center flex-row pt-3rem playerview-collapse flex-gap">
      <section v-if="user.basic != undefined && user.discord != undefined" class="flex flex-center flex-column">
        <Player :name="user.basic.name" :uuid="user.basic.id"></Player>
        <p>{{user.discord.name}}</p>
        <img :src="user.discord.avatar" :alt="`Discord avatar of ${user.basic.name}`"/>
      </section>
      <section v-if="user.basic && user.complex && user.discord" class="">
        <h1>Player data for {{user.basic.name}}</h1>
        <p><strong>UUID</strong>: <CopyableText :text="user.basic.id"></CopyableText></p>
        <p><strong>DiscordID</strong>: <CopyableText :text="user.discord.id"></CopyableText></p>
        <p><strong>Discord name and handle</strong>: <CopyableText :text="user.discord.name"></CopyableText></p>
        <p><strong>Linked at</strong>: {{user.complex.createdAt}}</p>
      </section>
    </div>
</template>

<style>

@media only screen and (max-width: 768px) {
.playerview-collapse{
  flex-direction: column;
}
}
</style>