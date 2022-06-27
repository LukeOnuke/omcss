<script setup>
import { ref, onMounted, toRefs, onUpdated } from 'vue'
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
import BasicInfoHero from '../components/BasicInfoHero.vue';
import axios from 'axios';
import AxiosService from '../services/AxiosService';

import {report} from "@/reporting.js";
import { Severity } from '../reporting';

let resp = ref(undefined);
let isReady = ref(false);

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

function getStatus(apiPath, port){
  isReady.value = false;
  resp.value = undefined;

  let url = `${apiPath.replace("-", "/")}${port ? `:${port}` : ""}/status`;

  const knownServerResult = knownServers.find((e)=> e.alias == apiPath);
  if(knownServerResult) url = `${knownServerResult.serverUrl}/status`;

  console.log(url);

  AxiosService.getProxied(url).then(function (response){
    resp.value = response.data;
    isReady.value = true;
    console.log(response.data);
  }).catch(function (error){
    console.error('Error:', error);
    isReady.value = false;
    report("Failed to fetch status!", error, Severity.fatal);
  });
}

onMounted(() => {
    console.log(`Starting on adress ${apiPath.value}`);
    getStatus(apiPath.value, port.value);
    document.title = `OMCSS - ${apiPath.value}`;
});

router.afterEach((to, from, faliure) => {
    getStatus(to.props.apiPath, to.props.port);
});


</script>

<template>
    <div v-if="isReady">
      <div class="bg-medium container pt-3rem">
        <h1>Status</h1>
        <BasicInfoHero :resp="resp"></BasicInfoHero>
      </div>
      <div class="container">
        <h1>Players</h1>
        <section v-if="resp.players.online < 1" class="flex flex-center">
          <div>
            <img src="@/assets/alone.svg" class="h-10"/>
            <p class="text-center">Its silent. The fire crackles.</p>
          </div>
        </section>
        <section v-else class="flex flex-gap-big scrollbar-x">
          <Player v-for="plr in resp.players.list" :key="plr.name" :uuid="plr.id" :name="plr.name"></Player>
        </section>
      </div>
      <div class="container">
        <h1>Plugins</h1>
        <section class="flex flex-gap flex-break">
        <Badge class="badge" v-for="plugin in resp.plugins" :key="plugin">{{plugin.name}}</Badge>
      </section>
      </div>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
</template>