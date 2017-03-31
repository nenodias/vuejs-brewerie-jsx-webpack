import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import './App.css';

Vue.use(VueResource)

new Vue({
  components: { App },
  render(){
      return (
          <App />
      );
  }
}).$mount('#app')
