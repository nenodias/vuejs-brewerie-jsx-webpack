export default {
    props: ["total", "page", "itensPerPage"],
    computed: {
        totalPages: function () {
            console.log(`Total: ${this.total}`);
            console.log(`itensPerPage: ${this.itensPerPage}`);
            return Math.ceil(this.total / this.itensPerPage) || 1;
        },
        showNextButton: function () {
            return this.page != this.totalPages;
        },
        showPreviousButton: function () {
            return this.page != 1;
        }
    },
    methods: {
        goNextPage: function () {
            if (this.showNextButton) {
                this.$emit('change', this.page + 1);
            }
        },
        goPreviousPage: function () {
            if (this.showPreviousButton) {
                this.$emit('change', this.page - 1);
            }
        },
        goFirstPage: function () {
            if (this.showPreviousButton) {
                this.$emit('change', 1);
            }
        },
        goLastPage: function () {
            if (this.showNextButton) {
                this.$emit('change', this.totalPages);
            }
        },
        goPage: function (page) {
            if (page >= 1 && page <= this.totalPages) {
                this.$emit('change', page);
            }
        }
    },
    render() {
        const t = this;

        return (
            <nav class="pagination">
                <a class="button" onClick={t.goPreviousPage.bind(t)}>Anterior</a>
                <ul>
                    <li class="is-pulled-left">
                        <a class="button" onClick={t.goFirstPage.bind(t)}>1</a>
                    </li>

                    <li class="is-pulled-left">
                        <span>...</span>
                    </li>
                    <li class="is-pulled-left">
                        <a class="button" onClick={t.goPage.bind(t, t.page - 1)}>{t.page - 1}</a>
                    </li>

                    <li class="is-pulled-left">
                        <span class="button is-primary">{t.page}</span>
                    </li>

                    <li class="is-pulled-left">
                        <a class="button" onClick={t.goPage.bind(t, t.page + 1)}>{t.page + 1}</a>
                    </li>
                    <li class="is-pulled-left">
                        <span>...</span>
                    </li>

                    <li class="is-pulled-left">
                        <a class="button" onClick={t.goLastPage.bind(t)}>{t.totalPages}</a>
                    </li>
                </ul>
                <a class="button" onClick={t.goNextPage.bind(t)}>Próximo</a>
            </nav>
        );
    }
}
