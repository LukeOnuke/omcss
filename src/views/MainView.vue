<script setup>
import { ref, onMounted, toRefs } from 'vue'
import PlayerCount from '@/components/PlayerCount.vue';
import InGameClock from '@/components/InGameClock.vue';
import UTCClock from '@/components/UTCClock.vue';
import CopyableText from '@/components/CopyableText.vue';
import BigAlert from '@/components/BigAlert.vue';
import Badge from '@/components/Badge.vue';
import Player from '@/components/Player.vue';
import NavBar from '@/components/NavBar.vue';
import {store} from "@/main"
import { router } from '@/main';
import { knownServers } from '@/utill.js'
let resp = ref(undefined);
let isReady = ref(false);
let error = ref(undefined);

const props = defineProps({
    apiPath:{
      type: String,
      required: true
    },
    port:{
      type: String,
      required: false
    }
});

const {port : port, apiPath: apiPath} = toRefs(props);

function getStatus(){
  error.value = undefined;
  isReady.value = false;
  resp.value = undefined;

  let url = `${apiPath.value.replace("-", "/")}${port.value ? `:${port.value}` : ""}/status`;

  const knownServerResult = knownServers.find((e)=> e.alias == apiPath.value);
  if(knownServerResult) url = `${knownServerResult.serverUrl}/status`;

  console.log(url);
  fetch("https://link.samifying.com/api/proxy", {method: 'POST', redirect: "follow", headers:{
    "Content-Type" : "application/json"
  }, body:JSON.stringify({
    "url":url
  })})
  .then(response => response.json())
  .then(data => {
    resp.value = data;
    isReady.value = true;
    console.log(data);
    })
  .catch((e) => {
    console.error('Error:', e);
    error.value = e;
  });;
}

const unsubscribe = store.subscribe((mutation, state) =>{
    console.log(`${mutation.type} - ${mutation.payload}`);
    if(mutation.type = "changeAdress"){
        getStatus(mutation.payload.adress);
    }
});

onMounted(() => {
    console.log(`Starting on adress ${apiPath.value}`);
    store.commit('changeAdress', apiPath.value);
    document.title = `OMCSS - ${apiPath.value}`;
});


</script>

<template>
    <div class="flex flex-center full" v-if="error != undefined">
      <BigAlert>
        <h1>A error occured!</h1>
        <p><i>{{error.name}}</i> : {{error.message}}</p>
        <hr>
        <p>If you think this is a bug, please report the error <a href="">here</a>.</p>
      </BigAlert>
    </div>
    <div v-if="isReady">
      <div class="bg-medium container">
        <h1>Status</h1>
      <div class="flex flex-space">
        <section>
          <PlayerCount :players="resp.players"></PlayerCount>
          <CopyableText :text="resp.world.seed.toString()"></CopyableText>
          <p>{{resp.version}}</p>
        </section>
        <section>
          <InGameClock class="text-align-right" :time="resp.world.time"></InGameClock>
          <UTCClock class="text-align-right"></UTCClock>
        </section>
      </div>
      </div>
      <div class="container">
        <h1>Players</h1>
        <section v-if="resp.players.online < 1" class="flex flex-center">
          <div>
            <img src="@/assets/alone.svg" class="h-10"/>
            <p class="text-center">Its silent. The fire crackles.</p>
          </div>
        </section>
        <section v-else class="flex flex-gap flex-space">
          <Player v-for="plr in resp.players.list" :key="plr.name" :uuid="plr.id" :name="plr.name"></Player>
        </section>
      </div>
      <div class="container">
        <h1>Plugins</h1>
        <section class="flex flex-gap flex-break">
        <Badge class="badge" v-for="plugin in resp.plugins" :key="plugin">{{plugin}}</Badge>
      </section>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
</template>