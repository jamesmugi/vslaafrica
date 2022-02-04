<template>
  <div>
    <div class="utilizationchart" ref="utilizationchart">

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
let utilizationchart = am4core.create("utilizationchart", am4charts.PieChart);
console.log(this.dashboarddata);
// Add data
utilizationchart.data = this.$store.state.dashboarddata.loan_utilization;

utilizationchart.innerRadius = am4core.percent(40);


utilizationchart.legend = new am4charts.Legend();
utilizationchart.legend.maxHeight = 80;
utilizationchart.legend.scrollable = true;
utilizationchart.legend.fontSize = 10;

// Add and configure Series
let pieSeries = utilizationchart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "group_count";
pieSeries.dataFields.category = "loan_utilization";
pieSeries.slices.template.stroke = am4core.color("#fff");
pieSeries.slices.template.strokeWidth = 2;
pieSeries.slices.template.strokeOpacity = 1;
// pieSeries.radius = am4core.percent(100);

// pieSeries.alignLabels = false;

pieSeries.labels.template.disabled = true;
// pieSeries.labels.template.fontSize = 10;

// pieSeries.labels.template.wrap = true;
// pieSeries.labels.template.maxWidth = 30;

// pieSeries.alignLabels = false;


// This creates initial animation
pieSeries.hiddenState.properties.opacity = 1;
pieSeries.hiddenState.properties.endAngle = -90;
pieSeries.hiddenState.properties.startAngle = -90;

    

},

methods: {
    
  }
};
</script>