const Theme = {
    Light: 'light',
    Dark: 'dark',

    init() {
        const theme = localStorage.getItem('theme') || this.Light

        this.apply(theme)
    },

    apply(theme) {
        document.documentElement.setAttribute('data-theme', theme)

        localStorage.setItem('theme', theme)
    },
    
    toggle() {
        const current = localStorage.getItem('theme') || this.Light

        const next = 
            current === this.Light ? this.Dark : this.Light
    
        this.apply(next)
    }
}