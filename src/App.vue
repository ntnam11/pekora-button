<template>
  <div id="app" :key="siteLang">
    <div class="nav">
      <div class="contact">
        <a href="https://www.youtube.com/channel/UC1DCedRgGHBdm81E1llLhOQ" target="_blank">
          <img src="@/assets/youtube.png" class="logo">
        </a>
        <a href="https://twitter.com/usadapekora" target="_blank">
          <img src="@/assets/twitter.png" class="logo">
        </a>
        <a href="https://aquaminato.moe" class="centered" target="_blank">
          <span>{{ langs[siteLang].text.aqua }}</span>
        </a>
        <a href="https://sfubuki.moe" class="centered" target="_blank">
          <span>{{ langs[siteLang].text.fubuki }}</span>
        </a>
      </div>
      <div class="lang-selector">
        <div>{{ langs[siteLang].lang[siteLang] }}</div>
        <div>
          <div class="lang" v-for="(text, lang) in langs[siteLang].lang" :key="lang" @click="setLang(lang)" v-bind:class="siteLang == lang ? 'selected' : '' ">{{ text }}</div>
        </div>
      </div>
    </div>
    <div class="controller">
      <div>
        <button class="btn" @click="chooseRandom()" :disabled="playingRandom || playingRandomCat != ''">{{ langs[siteLang].action.random }}</button>
        <button class="btn" @click="playRandom()" :disabled="playingRandomCat != ''">{{ playingRandom ? langs[siteLang].action.stop : langs[siteLang].action.nonstop }}</button>
        <div>
          <label class="checkbox-container">{{ langs[siteLang].action.loop }}
            <input type="checkbox" :checked="getConfig(true).loop" :disabled="playingRandom" name="loop" id="loop" @click="setConfig()">
            <span class="checkmark"></span>
          </label>
        </div>
        <div>
          <label class="checkbox-container">{{ langs[siteLang].action.overlap }}
            <input type="checkbox" :checked="getConfig(true).overlap" :disabled="playingRandom" name="overlap" id="overlap" @click="setConfig()">
            <span class="checkmark"></span>
          </label>
        </div>
        <div>
          <label class="checkbox-container">{{ langs[siteLang].action.bgm }}
            <input type="checkbox" :checked="playingBgm" name="bgm" id="bgm" @click="playBgm()">
            <span class="checkmark"></span>
          </label>
        </div>
        <div :hidden="!playingBgm">
          <label class="slider-container">{{ langs[siteLang].action.volume }}
            <input type="range" min="1" max="100" :value="getConfig(true).bgmVolume * 100" class="slider" id="bgmVolume" @change="bgmVolumeChange()">
          </label>
        </div>
      </div>
    </div>
    <div v-for="(voices, category) in categories" :key="category">
      <div class="group">
        <div class="group-header">
          <h4>{{ category }}</h4>
          <button class="btn" @click="playRandomCat(voices, category)" :disabled="playingRandom || (playingRandomCat != '' && playingRandomCat != category)">{{ playingRandomCat == category ?  langs[siteLang].action.stop : langs[siteLang].action.nonstop }}</button>
        </div>
        <div class="voices">
          <PekoBtn v-for="data in voices" :key="data.file" v-bind:data="data"></PekoBtn>
        </div>
      </div>
    </div>
    <div class="footer">
      <a href="https://github.com/ntnam11/pekora-button" target="_blank">
        <img src="@/assets/github.png" class="logo">
      </a>
      <p>{{ langs[siteLang].text['term'] }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PekoBtn from './components/PekoBtn.vue'
import categoryName from '../public/categories.json'
import { getLang, setLang } from './utils/lang'
import { getConfig, setConfig } from './utils/player'
import PekoBtnData from './utils/data'
console.clear()

@Component({
  components: {
    PekoBtn
  },
})
export default class App extends Vue {
  data() {
    return {
      categories: (function() {
        const categories: Record<string, Array<object>> = {}

        function getCategoryName(cat: string): string {
          // eslint-disable-next-line
          return getLang((categoryName as any)[cat])
        }
        
        const r = require.context('../public/meta/', false, /\.json$/)
        r.keys().forEach((path: string) => {
          const data = r(path)
          data.isPlaying = false
          const cat = getCategoryName(data.category)
          if (Object.prototype.hasOwnProperty.call(categories, cat)) {
            categories[cat].push(data)
          }
          else {
            categories[cat] = [data]
          }
        })

        return categories
      })(),
      langs: (function() {
        const r = require.context('../public/lang/', false, /\.json$/)
        const langs: object = {}
        r.keys().forEach((path: string) => {
          // eslint-disable-next-line
          (langs as any)[path.slice(2, 4)] = r(path)
        })
        return langs
      })(),
      getLang: getLang,
      getConfig: getConfig,
      setConfig: setConfig,
      siteLang: localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en',
      setLang: function(lang: string) {
        setLang(lang)
        this.siteLang = lang
      },
      chooseRandom() {
        const arr: Array<object> = []
        // eslint-disable-next-line
        for (const [k, v] of Object.entries(this.categories)) {
          arr.push(...v.map(f => {
            const btn = new PekoBtn({
              propsData: {
                data: f,
              }
            })
            return btn
          }))
        }
        const selected = arr[Math.floor(Math.random() * arr.length)] as PekoBtn
        selected.playBtn(() => {
          if (this.playingRandom) {
            this.chooseRandom()
          }
        })
      },
      playing: {
        btnData: {} as PekoBtnData,
        audio: new Audio(),
      },
      playingRandom: false,
      playingRandomCat: '',
      playRandom() {
        this.playingRandomCat = ''
        if (this.playingRandom) {
          this.playingRandom = false
          this.playing.audio.pause()
        }
        else {
          this.playingRandom = true
          this.chooseRandom()
        }
      },
      chooseRandomCat(arr: Array<object>, cat: string) {
        const selected = new PekoBtn({
          propsData: {
            data: arr[Math.floor(Math.random() * arr.length)]
          }
        })
        this.playing = selected.playBtn(() => {
          if (this.playingRandomCat == cat) {
            this.chooseRandomCat(arr, cat)
          }
        })
      },
      playRandomCat(arr: Array<object>, cat: string) {
        if (this.playingRandomCat == cat) {
          this.playingRandomCat = ''
          this.playing.btnData.isPlaying = false
          this.playing.audio.pause()
        }
        else {
          this.playingRandomCat = cat
          this.chooseRandomCat(arr, cat)
        }
      },
      bgm: new Audio(require('../public/bgm.mp3')),
      playingBgm: false,
      playBgm() {
        if (this.playingBgm) {
          this.playingBgm = false
          this.bgm.onended = null
          this.bgm.pause()
        }
        else {
          this.playingBgm = true
          this.bgm.volume = getConfig().bgmVolume
          this.bgm.play()
          this.bgm.onended = () => {
            if (this.playingBgm) {
              this.bgm.play()
            }
          }
        }
      },
      bgmVolumeChange() {
        const value = Number((document.getElementById('bgmVolume') as HTMLInputElement).value) / 100
        this.bgm.volume = value
        localStorage.setItem('bgmVolume', String(value))
      }
    }
  }
}
</script>

<style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    .logo {
      width: 40px;
    }
    .nav {
      display: flex;
      justify-content: space-between;
      position: relative;
      top: 0px;
      background: var(--pekora-color);
      z-index: 100;
      .contact {
        display: flex;
        a {
          padding: 10px;
          display: flex;
          &:hover {
            background: var(--pekora-color-light);
          }
        }
      }
      .lang-selector {
        &>div {
          cursor: pointer;
          &:first-child {
            padding: 20px;
            height: calc(100% - 40px);
          }
          &:last-child {
            right: 0;
            display: none;
            position: absolute;
          }
        }
        &:hover {
          &>div:last-child {
            display: block;
          }
        }
        .lang {
          padding: 20px;
          right: 0;
          background: var(--pekora-color);
          &:hover {
            cursor: pointer;
            background: var(--pekora-color-light);
          }
        }
      }
    }
    .controller {
      margin: 10px 0;
      display: flex;
      > div {
        display: flex;
        margin: auto;
        > * {
          margin: auto 10px;
        }
      }
    }
    .group {
      .group-header {
        display: flex;
        background: var(--pekora-color);
        padding: 5px;
        margin-bottom: 5px;
        h4 {
          width: 100%;
          margin: auto;
        }
        .btn {
          width: 20%;
          max-width: 180px;
        }
      }
    }
    .footer {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      width: -webkit-fill-available;
      position: absolute;
      bottom: 0;
      > * {
        margin: auto 0;
      }
    }
  }
</style>
