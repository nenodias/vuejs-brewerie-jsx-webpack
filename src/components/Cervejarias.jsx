import Pagination from './Pagination'
import _ from 'lodash';

const HOST = "http://localhost:3000";

export default {
    components:{
        Pagination
    },
    data() {
        return {
                isLoading: false,
                title: "Vue.js Crud",
                search: "",
                breweries: [],
                page: 1,
                total: 0,
                selected: {},
                itensPerPage: 10
        };
    },
    methods:{
        showLoading(){
            this.isLoading = true;
        },
        hideLoading(){
            this.isLoading = false;
        },
        async loadBreweries(){
            this.showLoading();

            let start = (this.page * this.itensPerPage) - this.itensPerPage;
            let end = (this.page * this.itensPerPage);
            try{
                let response = await this.$http.get(`${HOST}/breweries?_start=${start}&_end=${end}`);
                this.breweries = await response.json();
                this.total = response.headers.map['X-Total-Count'];
            }catch(err){
                console.error(err);
            }finally{
                this.hideLoading();
            }
        },
        searchBreweries(){

        },
        async onChangePage(page){
            this.page = page;
            this.loadBreweries();
        },
        breweriesRows(){
            return _.map(this.breweries,function(brewery){
                return (
                    <tr key={ brewery.id }>
                        <td>{ brewery.name }</td>
                        <td>{ brewery.city }</td>
                        <td>{ brewery.phone }</td>
                        <td class="is-icon">
                            <a href="#">
                                <i class="fa fa-map-marker"></i>
                            </a>
                            <a href="#">
                                <i class="fa fa-plus-circle"></i>
                            </a>
                        </td>
                        <td class="is-icon">
                            <a href="#">
                                <i class="fa fa-edit"></i>
                            </a>
                            <a href="#">
                                <i class="fa fa-trash"></i>
                            </a>
                        </td>
                    </tr>
                );
            });
        },
        renderLoading(){
            return (<a class="fixo button is-large is-danger is-loading">Loading</a>);
        }
    },
    async mounted(){
        this.loadBreweries();
    },
    render(){
        let t = this;
        if(t.loading){
            t.renderLoading();
        }
        return (
            <div class="container">
                <h1 class="title">{ t.title }</h1>
                <div class="columns">
                    <div class="column is-5">
                        <p class="control has-addons">
                            <input class="input is-expanded" type="text" v-model="search" placeholder="Procure pelo nome" />
                            <a class="button is-info" click="searchBreweries()">Search</a>
                        </p>
                    </div>
                    <div class="column is-5">
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-12">
                        <table class="table is-narrow is-bordered">
                            <thead>
                                <th>Nome</th>
                                <th>Cidade</th>
                                <th>Telefone</th>
                                <th>Mais</th>
                                <th>Ações</th>
                            </thead>
                            <tbody>
                                { t.breweriesRows() }
                            </tbody>
                        </table>
                        <Pagination total={ t.total } page={ t.page } itensPerPage={ t.itensPerPage } onChange={ t.onChangePage.bind(this) } />
                    </div>
                </div>
            </div>
        );
    }
}
