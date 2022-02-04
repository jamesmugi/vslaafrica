<template>
  <div>
    <div class="chart genderchart" ref="chart" id="chart">

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
let piechart = am4core.create("chart", am4charts.PieChart);
// console.log(this.dashboarddata);
// Add data
piechart.data = [ {
  "name": "Females",
  "litres": this.$store.state.dashboarddata.static_data.total_female_members
}, {
  "name": "Males",
  "litres": this.$store.state.dashboarddata.static_data.total_male_members
}];

piechart.legend = new am4charts.Legend();
piechart.legend.maxHeight = 100;
piechart.legend.scrollable = true;
piechart.legend.fontSize = 10;

// Add and configure Series
let pieSeries = piechart.series.push(new am4charts.PieSeries());
pieSeries.dataFields.value = "litres";
pieSeries.dataFields.category = "name";
pieSeries.slices.template.stroke = am4core.color("#fff");
pieSeries.slices.template.strokeWidth = 2;
pieSeries.slices.template.strokeOpacity = 1;


// pieSeries.radius = am4core.percent(80);

// pieSeries.alignLabels = false;
pieSeries.labels.template.disabled = true;

pieSeries.labels.template.fontSize = 10;

pieSeries.labels.template.wrap = true;
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