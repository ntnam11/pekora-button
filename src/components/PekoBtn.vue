<template>
    <div class="btn" @click="play()" @contextmenu.prevent="openMenu()">
        <div class="text">{{ text }}</div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';
    @Component
    export default class PekoBtn extends Vue {
        @Prop() private text!: string
        @Prop() private data!: object
        private play() {
            // eslint-disable-next-line
            const a = new Audio(require('../../public/voices/' + (this.data as any).file))
            a.play()
        }
        private openMenu() {
            console.log('A')
        }
    }
</script>

<style lang="scss" scoped>
    .btn {
        background: var(--pekora-color);
        padding: 10px;
        border-radius: 10px;
        .text {
            cursor: pointer
        }
    }
</style>