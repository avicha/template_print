export default {
    methods: {
        clickHandler(e) {
            this.$emit('click', !(e.ctrlKey || e.metaKey))
        }
    }
}