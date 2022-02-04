<template>
  <div>
    <div class="barchart barchart-height" ref="barchart">

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
        let chart = am4core.create("barchart", am4charts.XYChart3D);
        // Add data
        chart.data = this.$store.state.dashboarddata.activity;

        // Create axes
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "activity";
        categoryAxis.renderer.labels.template.rotation = 270;
        categoryAxis.renderer.labels.template.hideOversized = false;
        categoryAxis.renderer.minGridDistance = 20;
        categoryAxis.renderer.labels.template.horizontalCenter = "right";
        categoryAxis.renderer.labels.template.verticalCenter = "middle";
        categoryAxis.tooltip.label.rotation = 270;
        categoryAxis.tooltip.label.horizontalCenter = "right";
        categoryAxis.tooltip.label.verticalCenter = "middle";
        categoryAxis.labelColorField = '#fff';
        categoryAxis.renderer.inside = true;
        categoryAxis.renderer.labels.template.valign = "top";
        categoryAxis.renderer.labels.template.fontSize = 10;


        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Number";
        valueAxis.title.fontWeight = "bold";

        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries3D());
        series.dataFields.valueY = "group_count";
        series.dataFields.categoryX = "activity";
        series.name = "Number";
        series.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = .8;

        let columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 1;
        columnTemplate.width = am4core.percent(30)
        columnTemplate.strokeOpacity = 1;
        columnTemplate.stroke = am4core.color("#FFFFFF");

        columnTemplate.adapter.add("fill", function(fill, target) {
        return chart.colors.getIndex(target.dataItem.index);
        })

        columnTemplate.adapter.add("stroke", function(stroke, target) {
        return chart.colors.getIndex(target.dataItem.index);
        })

        let label = categoryAxis.renderer.labels.template;
        label.truncate = true;
        label.maxWidth = 120;

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.lineX.strokeOpacity = 0;
        chart.cursor.lineY.strokeOpacity = 0;

    

},

methods: {
    
  }
};
</script>

<style src="./AreaChart.scss" lang="scss" />
