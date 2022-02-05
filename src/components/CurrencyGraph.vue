<script>
import {Bar, mixins} from "vue-chartjs";

const {reactiveProp} = mixins

export default {
  name: "CurrencyGraph",
  extends: Bar,
  props: {
    options:{
      type:Object,
      default:()=>{
      return {
        responsive: true,
        maintainAspectRatio: false
      }}
    }
  },
  mixins: [reactiveProp],
  mounted() {
    this.renderChart(this.chartData, this.options)
  },
}
</script>

<style scoped>

</style>