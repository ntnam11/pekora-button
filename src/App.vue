<template>
  <div id="app">
    <div class="nav">
      <div class="logo">
        <img src="" alt="">
      </div>
    </div>
    <div v-for="(voices, category) in groups" :key="category">
      <div class="group">
        <h4>{{ category }}</h4>
        <div v-for="voice in voices" :key="voice.file" style="display: flex">
          <PekoBtn v-bind:text="getText(voice)" v-bind:data="voice"></PekoBtn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PekoBtn from './components/PekoBtn.vue';

@Component({
  components: {
    PekoBtn
  },
})
export default class App extends Vue {
  data() {
    return {
      groups: (function() {
        const groups: Record<string, Array<object>> = {}

        function importAll (r: __WebpackModuleApi.RequireContext) {
          r.keys().forEach((key: string) => {
            const data = r(key)
            if (Object.prototype.hasOwnProperty.call(groups, data.category)) {
              groups[data.category].push(data)
            }
            else {
              groups[data.category] = [data]
            }
          })
        }

        importAll(require.context('../public/meta/', true, /\.json$/))
        return groups
      })()
    }
  }
  getText(voice: object) {
    let lang = localStorage.getItem('lang')
    if (!lang) {
        lang = 'en'
        localStorage.setItem('lang', 'en')
    }
    // eslint-disable-next-line
    return (voice as any).name[lang]
  }
}
</script>

<style lang="scss">
  #app {
    --pekora-color: #a3e2f7;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
    .group {
      h4 {
        background: var(--pekora-color);
        padding: 5px;
        margin-bottom: 5px;
      }
    }
  }
</style>
