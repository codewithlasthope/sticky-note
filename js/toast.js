const Toast = {
    container: null,

    init() {
        this.container = document.getElementById('toast-container')
    },

    show(message, type ='info') {
        const toast = document.createElement('div')

        toast.classList.add('toast', type)

        toast.textContent = message

        this.container.appendChild(toast)

        requestAnimationFrame(() => {
            toast.classList.add('show')
        })
    
        setTimeout(() => {
            toast.classList.remove('show')

            setTimeout(() => {
                toast.remove()
            }, 250);

        }, 2000);
    }
}