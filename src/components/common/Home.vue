<template>
    <div class="wrapper">
        <e1-container>
            <v-head>
                <vHead></vHead>
            </v-head>
            <e1-main>
                <br />
                <goods></goods>
            </e1-main>
        </e1-container>
    </div>
</template>

<script>
import vHead from './Header.vue';
import goods from '../page/Goods.vue'
export default {
    components: {
        vHead,
        goods,
    },
};
</script>
