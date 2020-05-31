<template>
    <div class="btn" v-bind:disabled="data.isDisabled" v-bind:class="{ playing: data.isPlaying }" @click="playBtn()" @contextmenu.prevent="openMenu()">
        <div class="text">{{ getText() }}</div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator'
    import { getLang } from '../utils/lang'
    import { soundCtrl } from '../utils/player'
    import PekoBtnData from '../utils/data'
    @Component
    export default class PekoBtn extends Vue {
        @Prop() data!: PekoBtnData
        private getText() {
            return getLang(this.data.name)
        }
        playBtn(callback?: Function, params?: Array<object>) {
            this.data.isPlaying = true
            const ctrl = soundCtrl.play(this.data, new Audio(require('../../public/voices/' + this.data.file)))
            ctrl.audio.onended = () => {
                this.data.isPlaying = false
                if (callback) {
                    callback(params)
                }
            }
            return ctrl
        }
        private openMenu() {
            console.log('A')
        }
    }
</script>

<style lang="scss">
    .btn {
        display: inline-block;
        background: var(--pekora-color);
        padding: 10px;
        border-radius: 10px;
        margin: 2px;
        width: max-content;
        transition: all .5s ease;
        &:hover {
            cursor: pointer;
            background: var(--pekora-color-light);
        }
        &.playing {
            background: var(--pekora-color-light);
        }
    }
</style>