export const getLang = function(obj: object): string {
    let lang = localStorage.getItem('lang')
    if (!lang) {
        lang = 'en'
        localStorage.setItem('lang', 'en')
    }
    if (lang in obj) {
        // eslint-disable-next-line
        const text = (obj as any)[lang]
        if (text != '') {
            return text
        }
    }
    // eslint-disable-next-line
    return (obj as any)['en']
}

export const setLang = function(lang: string) {
    localStorage.setItem('lang', lang)
}