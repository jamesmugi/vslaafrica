<template>
  <div>
    <div class="map" ref="map">

    </div>
    <div class="stats">
      <!-- <h6 class="mt-1">GEO-LOCATIONS</h6> -->
      <!-- <p class="h3 m-0">
      <span class="mr-xs fw-normal"><AnimatedNumber value="1656843"
                                                    v-bind="animateNumberOptions"></AnimatedNumber></span>
        <i class="fa fa-map-marker"/>
      </p> -->
    </div>
  </div>

</template>


<script>
import AnimatedNumber from "animated-number-vue";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4geodata_data_countries2 from "@amcharts/amcharts4-geodata/data/countries2";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

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
const t = this;

axios.post(this.apiUrl + 'Registration/GetGroups', {}).then( response => {

      //
        
        this.groups = response.data.response_data;


am4core.useTheme(am4themes_animated);
// Themes end

let continents = {
  "EU": 0,
  "AN": 1,
  "AF": 2,
  "AS": 3,
  "NA": 4,
  "OC": 5,
  "SA": 6
}

let myCountryCodes = {
  "KE":0,
  "TZ":1
}

// Create map instance
let chart = am4core.create("map", am4maps.MapChart);
chart.projection = new am4maps.projections.Orthographic();
chart.deltaLatitude = 5;
chart.deltaLongitude = -25;

// Create map polygon series for world map
let worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
worldSeries.useGeodata = true;
worldSeries.geodata = am4geodata_worldLow;
worldSeries.exclude = ["AQ"];

let worldPolygon = worldSeries.mapPolygons.template;
worldPolygon.tooltipText = "{name}";
worldPolygon.nonScalingStroke = true;
worldPolygon.strokeOpacity = 0.8;
worldPolygon.fill = am4core.color("#eee");
worldPolygon.propertyFields.fill = "color";
// worldPolygon.fill = worldPolygon.states.getKey();

let hs = worldPolygon.states.create("hover");
hs.properties.fill = chart.colors.getIndex(9);


// Create country specific series (but hide it for now)
let countrySeries = chart.series.push(new am4maps.MapPolygonSeries());
countrySeries.useGeodata = true;
countrySeries.hide();
countrySeries.geodataSource.events.on("done", function() {
  worldSeries.hide();
  countrySeries.show();
});

let countryPolygon = countrySeries.mapPolygons.template;
countryPolygon.tooltipText = "{name}";
countryPolygon.nonScalingStroke = true;
countryPolygon.strokeOpacity = 0.5;
countryPolygon.fill = am4core.color("#4d013d");

let hp = countryPolygon.states.create("hover");
hp.properties.fill = chart.colors.getIndex(9);

// console.log( countryPolygon.states.getPolygonById('KE'));

// Set up click events
worldPolygon.events.on("hit", function(ev) {
  ev.target.series.chart.zoomToMapObject(ev.target);
  let map = ev.target.dataItem.dataContext.map;
  let region = ev.target.dataItem.dataContext.name;
  // let chart = t.$parent.$parent.$children[2];
  console.log(t);
  if (map) {
    axios.post(t.apiUrl + 'Report/Dashboard', {'province_name':region}).then( res => {
      console.log(res);
      t.$store.commit("increment", res.data.response_data);
      t.$store.commit("update", region);
      ev.target.isHover = false;
    countrySeries.geodataSource.url = "https://www.amcharts.com/lib/4/geodata/json/" + map + ".json";
    countrySeries.geodataSource.load();
    chart.validateData();

    });

    
  }
});

// Set up data for countries
let data = [];
for(var id in am4geodata_data_countries2) {
  if (am4geodata_data_countries2.hasOwnProperty(id)) {
    let country = am4geodata_data_countries2[id];
    
    // if(country.country.includes("Tanzania")){
    // console.log(country);}
    if (country.country==='Kenya'||country.country==='Tanzania, United Republic of'||country.country==='Burundi'||country.country==='Ghana'||country.country==='Zimbabwe') {
      data.push({
        id: id,
        color: '#6794dc',
        map: country.maps[0]
      });
    }
    else// if (country.maps.length) {
      if(country.continent_code==='AF'){
        data.push({
          id: id,
          // color: chart.colors.getIndex(continents[country.continent_code]),
          color: '#4d013d',
          // map: country.maps[0]
        });
      }
    
  }
}
worldSeries.data = data;

// Zoom control
chart.zoomControl = new am4maps.ZoomControl();
chart.homeZoomLevel = 1.5;
chart.homeGeoPoint = {
  latitude: 1.0700,
  longitude: 25.4359
};



let homeButton = new am4core.Button();
homeButton.events.on("hit", function() {
  axios.post(t.apiUrl + 'Report/Dashboard', {'province_name':''}).then( res => {
      t.$store.commit("increment", res.data.response_data);
      t.$store.commit("update", "Africa");
    worldSeries.show();
    countrySeries.hide();
    chart.goHome();
  });
});

homeButton.icon = new am4core.Sprite();
homeButton.padding(7, 5, 7, 5);
homeButton.width = 30;
homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
homeButton.marginBottom = 10;
homeButton.parent = chart.zoomControl;
homeButton.insertBefore(chart.zoomControl.plusButton);

// Add image series
let imageSeries = chart.series.push(new am4maps.MapImageSeries());
imageSeries.mapImages.template.propertyFields.longitude = "longitude";
imageSeries.mapImages.template.propertyFields.latitude = "latitude";
imageSeries.mapImages.template.tooltipText = "{group_name}";
imageSeries.mapImages.template.propertyFields.url = "url";

let circle = imageSeries.mapImages.template.createChild(am4core.Circle);
circle.radius = 3.0;
circle.propertyFields.fill = "color";
circle.fill = am4core.color("#fc035e");



let colorSet = new am4core.ColorSet();


imageSeries.data = response.data.response_data;

    this.map = chart;
});
},

methods: {
    GetGroups(){
      axios.post(t.apiUrl + 'Registration/GetGroups', {}).then( response => {
        
        this.groups = response.data.response_data
      })
    },

  }
};
</script>


<style src="./Map.scss" lang="scss" />
