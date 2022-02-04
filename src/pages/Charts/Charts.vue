<template>
  <div class="charts-overview">
 
    <div>
      <b-row>

        <b-col xs="12" lg="12" sm="12">
          <Widget
              
          >
            <echart :options="cd.echarts.line" :init-options="initEchartsOptions" style="height: 370px"></echart>
          </Widget>
        </b-col>

      </b-row>
    </div>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import {chartData, liveChart, liveChartInterval} from './mock';

import ECharts from 'vue-echarts/components/ECharts';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/themeRiver';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';

import Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';

exporting(Highcharts);
exportData(Highcharts);

import { Chart } from 'highcharts-vue';
import Sparklines from '../../components/Sparklines/Sparklines'

export default {
  name: "Charts",
  components: { Widget, echart: ECharts, highcharts: Chart, Sparklines },
  data() {
    return {
      cd: chartData,
      ld: liveChart,
      initEchartsOptions: {
        renderer: 'canvas'
      }
    };
  },
  computed: {
    sparklineData() {
      return {
        series: [{data: [1, 7, 3, 5, 7, 8]}],
        options1: {
          colors: [this.appConfig.colors.green],
          plotOptions: {
            bar: {
              columnWidth: '50%'
            }
          }
        },
        options2: {
          colors: [this.appConfig.colors.red],
          plotOptions: {
            bar: {
              columnWidth: '50%'
            }
          }
        }
      }
    }
  },
  beforeDestroy() {
    clearInterval(liveChartInterval);
  }
};
</script>

<style src="./Charts.scss" lang="scss" />
