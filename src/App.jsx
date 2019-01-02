import Cervejarias from './components/Cervejarias'

export default {
  name: 'app',
  components: {
    Cervejarias
  },
  render() {
    return (
      <div id="app">
        <Cervejarias></Cervejarias>
      </div>
    );
  }
}
