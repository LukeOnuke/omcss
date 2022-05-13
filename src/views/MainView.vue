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
let resp = ref(undefined);
let isReady = ref(false);
let error = ref(undefined);

const props = defineProps({
    ipp:{
        type: String,
        required: true
    },
    portp:{
        type: String,
        required: true
    }
});

const {portp, ipp} = toRefs(props);

function getStatus(ip, port){
  error.value = undefined;
  isReady.value = false;
  resp.value = undefined;

  let url = `http://${ipp.value}:${portp.value}/api/status`;
  if(portp.value == undefined) url = `http://${ipp.value}/api/status`;

  fetch(`http://${ipp.value}:${portp.value}/api/status`, {method: 'GET'})
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
        getStatus(mutation.payload.adress, mutation.payload.port);
        
    }
});

onMounted(() => {
    console.log(`${ipp.value} ${portp.value}`);
    store.commit('changeAdress', {adress: ipp.value, port: portp.value});
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
        <section class="flex flex-gap">
        <Badge class="badge" v-for="plugin in resp.plugins" :key="plugin">{{plugin}}</Badge>
      </section>
      </div>
    </div>
</template>