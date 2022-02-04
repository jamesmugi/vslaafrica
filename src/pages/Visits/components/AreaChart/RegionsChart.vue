<template>
  <div>
    <div class="regionschart" ref="regionschart">

    </div>

  </div>

</template>

<script>
import AnimatedNumber from "animated-number-vue";
import * as am4core from "@amcharts/amcharts4/core";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4charts from "@amcharts/amcharts4/charts";


// import cities from './mock';
import axios  from 'axios';


export default {
  name: 'Map',
  components: { AnimatedNumber },
  data() {
    
    return {
      animateNumberOptions: {
        duration: 2000,
        easing: 'easeInQuad',
        formatValue(value) {
          let number = value.toFixed(0);
          let numberAsArrayWithSapces = [];
          while (number >= 1) {
            numberAsArrayWithSapces.unshift(number % 1000);
            number = (number/1000).toFixed();
          }
          return numberAsArrayWithSapces.join(' ');
        }
      },
      groups: [],
      dashboarddata: this.$session.get("dashboarddata"),
      apiUrl: 'https://api.vsla.africa/api/',
    }
  },
  beforeMount()
  {
    // this.GetGroups();

  },
  mounted() {
   /* Chart code */
// Themes begin
am4core.useTheme(am4themes_animated);
// Themes end

// Create chart instance
let regionschart = am4core.create("regionschart", am4charts.PieChart);
console.log(this.dashboarddata);
// Add data
regionschart.data = this.$store.state.dashboarddata.dioceseData;

regionschart.innerRadius = am4core.percent(0);


regionschart.legend = new am4charts.Legend();
regionschart.legend.maxHeight = 80;
regionschart.legend.scrollable = true;
regionschart.legend.fontSize = 10;

// Add and configure Series
let pieSeries = regionschart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "groupCount";
pieSeries.dataFields.category = "diocese";
pieSeries.slices.template.stroke = am4core.color("#fff");
pieSeries.slices.template.strokeWidth = 2;
pieSeries.slices.template.strokeOpacity = 1;

pieSeries.labels.template.disabled = true;

pieSeries.hiddenState.properties.opacity = 1;
pieSeries.hiddenState.properties.endAngle = -90;
pieSeries.hiddenState.properties.startAngle = -90;

    

},

methods: {
    
  }
};
</script>