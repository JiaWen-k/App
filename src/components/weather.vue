<template>
<div>
  <div class="chartHeight" style="width:100%; height:100%;" ref="echarts"></div>
</div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: "weather",
  methods: {
    drawChart() {
      let myChart = echarts.init(this.$refs.echarts);
      myChart.setOption({
        title: {
          text: 'weather-forecast'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '℃',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    }
  },
  data(){
    return{
    weather:this.$router.params.weather
    }
  },
  mounted: function() {
    const vm = this;
    vm.$nextTick(() => {
      vm.drawChart();
    });
  },
}

</script>

<style scoped>

</style>