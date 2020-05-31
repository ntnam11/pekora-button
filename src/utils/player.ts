import PekoBtn from '../components/PekoBtn.vue'
import PekoBtnData from './data'
if (localStorage.getItem('loop') === null || localStorage.getItem('overlap') === null || localStorage.getItem('bgmVolume') === null) {
    localStorage.setItem('loop', '')
    localStorage.setItem('overlap', 'true')
    localStorage.setItem('bgmVolume', '100')
}
function getChecked(element: HTMLInputElement, ret?: boolean) {
    if (element) {
        return element.checked
    }
    return ret ? ret : false
}
export function getConfig(saved?: boolean) {
    let loop = getChecked(document.getElementById('loop') as HTMLInputElement)
    let overlap = getChecked(document.getElementById('overlap') as HTMLInputElement, true)
    let bgmVolume = Number(localStorage.getItem('bgmVolume'))
    if (saved) {
        loop = Boolean(localStorage.getItem('loop'))
        overlap = Boolean(localStorage.getItem('overlap'))
        bgmVolume = Number(localStorage.getItem('bgmVolume'))
    }
    return {
        loop: loop,
        overlap: overlap,
        bgmVolume: bgmVolume
    }
}
export function setConfig() {
    const config = getConfig()
    localStorage.setItem('loop', config.loop == true ? 'true' : '')
    localStorage.setItem('overlap', config.overlap == true ? 'true' : '')
}
export function getRandom(pool: Array<object>) {
    const audio = pool[Math.floor(Math.random() * pool.length)] as PekoBtn
    return {
        audio: audio
    }
}
export const soundCtrl = {
    playing: {
        btnData: {} as PekoBtnData,
        audio: new Audio()
    },
    play: function(btnData: PekoBtnData, audio: HTMLAudioElement) {
        if (!getConfig().overlap) {
            if (this.playing) {
                this.playing.btnData.isPlaying = false
                this.playing.audio.pause()
            }
            this.playing.audio = audio
            this.playing.btnData = btnData
            this.playing.audio.play()
        }
        else {
            audio.play()
            return {
                btnData: btnData,
                audio: audio
            }
        }
        if (getConfig().loop) {
            this.playing.audio.onended = () => {
                this.play(btnData, this.playing.audio)
                // if (getConfig().loop) {
                // }
            }
        }
        else {
            this.playing.audio.onended = null
        }
        return this.playing
    }
}