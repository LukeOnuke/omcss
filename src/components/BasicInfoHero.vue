<script setup>
import { toRefs} from 'vue'
import PlayerCount from '@/components/PlayerCount.vue';
import CopyableText from '@/components/CopyableText.vue';
import InGameClock from '@/components/InGameClock.vue';
import UTCClock from '@/components/UTCClock.vue';
const props = defineProps({
    resp: Object
});

const { resp } = toRefs(props);
</script>

<template>
    <div class="flex flex-space basicinfohero-break basicinfohero-text-break">
        <section>
            <PlayerCount :players="resp.players"></PlayerCount>
            <CopyableText :text="resp.world.seed.toString()"></CopyableText>
            <p>{{resp.version}}</p>
        </section>
        <section>
            <InGameClock class="text-align-right basicinfohero-text-break" :time="resp.world.time"></InGameClock>
            <UTCClock class="text-align-right basicinfohero-text-break"></UTCClock>
        </section>
    </div>
</template>

<style>

@media only screen and (max-width: 400px) {
    .basicinfohero-break{
        flex-direction: column;
    }

    .basicinfohero-text-break{
        text-align: left;
    }
}
</style>