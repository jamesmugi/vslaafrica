<template>
  <div class="visits-page">
    <b-col sm="12" class="title-position">
    <b><h2 class="page-title title-position "> Groups Statistics - {{this.$store.state.country}}&nbsp;</h2></b>
    </b-col>
    <b-row>
      <b-col sm="12" lg="4">
        <Widget class="" v-if="this.$session.get('role_level') !== 4">
          <Map />
        </Widget>
        <Widget class="" title="<h5><span class='fw-semi-bold'>&nbsp;Regions/diocese distribution chart</span></h5>"
             customHeader v-if="this.$session.get('role_level') == 4">
          <RegionsChart/>
        </Widget>
      </b-col>

      <b-col sm="12" lg="8">
        <b-col lg="12">
        <Widget
          class=""
          title="<h5><span class='fw-semi-bold'>&nbsp;Statistics</span></h5>"
             customHeader
        >
          <!-- <p>Status: <strong>Active</strong></p> -->
          <p class="text-black">
            <span class="circle bg-primary text-black"><i class="la la-map-marker" /></span> &nbsp;
            {{this.$store.state.dashboarddata.static_data.total_groups}} groups, {{this.$store.state.dashboarddata.static_data.total_members}}  members                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
          </p>
          <div class="row progress-stats">
            <div class="col-3">
              <h6 class="name">Total savings deposit</h6>
              <p class="description  mb-xs"><strong>${{(this.$store.state.dashboarddata.static_data.total_savings_deposit).toLocaleString()}}</strong> </p>
            </div>
            <div class="col-3">
              <h6 class="name">Total savings withdrawn</h6>
              <p class="description  mb-xs"><strong>${{this.$store.state.dashboarddata.static_data.total_savings_withdrawal.toLocaleString()}}</strong> </p>
            </div>
            <div class="col-3">
              <h6 class="name">Total loans disbursed</h6>
              <p class="description deemphasize mb-xs"><strong>${{this.$store.state.dashboarddata.static_data.total_loans_disbursed.toLocaleString()}}</strong></p>
              <!-- <b-progress variant="danger" :value="39" :max="100" class="progress-xs" /> -->
            </div>
            <div class="col-3">
              <h6 class="name">Total loans repaid </h6>
              <p class="description deemphasize mb-xs"><strong>${{this.$store.state.dashboarddata.static_data.total_loans_repaid.toLocaleString()}}</strong>  </p>
              <!-- <b-progress variant="success" :value="80" :max="100" class="progress-xs" /> -->
            </div>
            
          </div>
          
        </Widget>
      </b-col>

      <b-col sm="12" >
        
        <b-row>
            
          
           <b-col sm="12" md="6" lg="6">
 
             <Widget class="" title="<h5><span class='fw-semi-bold'>&nbsp;Gender distribution chart</span></h5>" customHeader>

         
         <PieChart :key="(this.$store.state.dashboarddata.activity)"/>

             </Widget>
          
          </b-col> 
          <b-col sm="12" md="6" lg="6">
         <Widget class="" title="<h5><span class='fw-semi-bold'>&nbsp;Loan utilization chart</span></h5>" customHeader>
         
         <CategoryChart :key="(this.$store.state.dashboarddata.activity)"/>

         </Widget>
        
      </b-col>
      
        </b-row>
       
    </b-col>


      
      </b-col>
    </b-row>
    
       

    <b-col sm="12">
    <b-row>
       <b-col sm="12" md="6" lg="6">
        <Widget
          class=""
          title="<h5><span class='fw-semi-bold'>&nbsp;Group activities chart</span></h5>"
             customHeader
        >

         
         <BarChart :key="(this.$store.state.dashboarddata.activity)" />

         
          
        </Widget>
      </b-col>
      <b-col sm="12" md="6" lg="6">
        <Widget
          class=""
          title="<h5><span class='fw-semi-bold'>&nbsp;Group categories chart</span></h5>"
             customHeader
        >

         
        <GroupCategory :key="(this.$store.state.dashboarddata.activity)"/>
          
        </Widget>
      </b-col>
    </b-row>
    </b-col>

    <b-row>
      <b-col sm="12" md="6" lg="6">
        <Widget 
          title="<h6 class='text-bold text-center'> Level of formalization</h6>"
            customHeader
        >
          <div class="stats-row"  v-for="item in this.$store.state.dashboarddata.checkListData" :key="item.key">
            <div class="stat-item col-sm-12">
              <p class="value">{{item.key}}</p>
              <b-progress height="12px" variant="success" :value="(item.true_count/dashboarddata.static_data.total_groups)*100" show-progress class="mb-2"></b-progress>

            </div>
              <!-- <b-form-rating id="rating-lg" value="3" readonly variant="warning" size="sm"></b-form-rating> -->
              <!-- <div class="stat-item col-sm-10" :key="item.key">
                   <b-progress height="12px" variant="success" :value="(item.true_count/dashboarddata.static_data.total_groups)*100" show-progress class="mb-2"></b-progress>
            </div> -->
          </div>
          

        </Widget>
      </b-col>

      <b-col sm="12" md="6" lg="6">
        <Widget
          class=""
          title="<h5><span class='fw-semi-bold'>&nbsp;Support agency / institution chart</span></h5>"
             customHeader
        >

         
        <CoverChart :key="(this.$store.state.dashboarddata.activity)"/>
          
        </Widget>
      </b-col>
      
    </b-row>
    <b-row>
      <b-col sm="12" xl="12" xs="12">
        <Widget
          title="<h6> Group dynamics </h6>"
            customHeader
        >
        <div class="stats-row">
          <div class="stat-item col-sm-2">
              <strong><h6 class="name"></h6></strong>
            </div>
            <div class="stat-item col-sm-2">
              <strong><b-form-rating id="rating-sm-no-border" inline value="1"  readonly variant="warning" size="sm"></b-form-rating></strong>
            </div>
            <div class="stat-item col-sm-2">
              <strong><b-form-rating id="rating-sm-no-border" inline value="2" readonly variant="warning" size="sm"></b-form-rating></strong>
            </div>
            <div class="stat-item col-sm-2">
              <strong><b-form-rating id="rating-sm-no-border" inline value="3" readonly variant="warning" size="sm"></b-form-rating></strong>
            </div>
            <div class="stat-item col-sm-2">
              <strong><b-form-rating id="rating-sm-no-border" inline value="4" readonly variant="warning" size="sm"></b-form-rating></strong>
            </div>
            <div class="stat-item col-sm-2">
              <strong><b-form-rating id="rating-sm-no-border" inline value="5" readonly variant="warning" size="sm"></b-form-rating></strong>
            </div>
          </div>
          <div class="stats-row" v-for="item in dashboarddata.ratings" :key="item.key">
            <div class="stat-item col-sm-2">
              <p class="value">{{item.key}}</p>
            </div>
              <!-- <b-form-rating id="rating-lg" value="3" readonly variant="warning" size="sm"></b-form-rating> -->
              <div class="stat-item col-sm-2" v-for="listing in item.data" :key="listing.key">
              <p class="value">{{listing.count}}</p>
            </div>
              </div>
          

        </Widget>
      </b-col>
      
    </b-row>

  </div>
</template>

<script>
import Vue from 'vue';
import Widget from '@/components/Widget/Widget';
import Map from './components/Map/Map';
import Chart from '@/pages/Charts/Charts';
import Calendar from './components/Calendar/Calendar';
// import AreaChart from './components/AreaChart/AreaChart';
import PieChart from './components/AreaChart/PieChart';
import BarChart from './components/AreaChart/BarChart';
import CategoryChart from './components/AreaChart/CategoryChart';
import CoverChart from './components/AreaChart/CoverChart';
import RegionsChart from './components/AreaChart/RegionsChart';
import GroupCategory from './components/AreaChart/GroupCategory';
import AnimatedNumber from "animated-number-vue";

import axios from 'axios';

import { mapState, mapActions } from 'vuex';



export default {
  name: 'Visits',
  components: {
    Widget, Map, Calendar, AnimatedNumber, Chart, PieChart, BarChart, GroupCategory, CategoryChart, CoverChart, RegionsChart
  },
  data() {
    return {
      dashboarddata : this.$store.state.dashboarddata,
      country: "Africa",
      apiUrl: 'https://api.vsla.africa/api/',
      animateNumberOptions: {
        duration: 2000,
        easing: 'easeInQuad',
        formatValue(value) {
          return value.toFixed(0);
        }
      },
      checkedArr: [false, false, false],
      dataCollection: null,
      barChartKey:this.$store.state.dashboarddata
    };
  },
  beforeMount()
  {
    console.log(this.$session.get("authenticated"));
    if (this.$session.get("authenticated") != true) {
      this.$router.push({name:'Login'});
    }
    this.GetDashboardData();

    
    
  },
  methods: {

    GetDashboardData(){
      const t = this;
      if(this.$session.get("role_level") == 4){
          axios.post(this.apiUrl + 'Report/Dashboard', {'province_name':this.$session.get("country")}).then( response => {
        
        t.$store.commit("increment", response.data.response_data);

        t.$store.commit("update", this.$session.get("country"));

        
        this.dashboarddata = t.$store.state.dashboarddata;

        this.country = t.$store.state.country;

      })
      } else {
        axios.post(this.apiUrl + 'Report/Dashboard', {'province_name':''}).then( response => {
        
        //
        t.$store.commit("increment", response.data.response_data);

        t.$store.commit("update", 'Africa');

        
        this.dashboarddata = t.$store.state.dashboarddata;

        this.country = t.$store.state.country;

       //Vue.forceUpdate();
        
      })
      }
      
    },

    checkTable(id) {
      let arr = [];
      if (id === 0) {
        const val = !this.checkedArr[0];
        for (let i = 0; i < this.checkedArr.length; i += 1) {
          arr[i] = val;
        }
      } else {
        arr = this.checkedArr;
        arr[id] = !arr[id];
      }
      if (arr[0]) {
        let count = 1;
        for (let i = 1; i < arr.length; i += 1) {
          if (arr[i]) {
            count += 1;
          }
        }
        if (count !== arr.length) {
          arr[0] = !arr[0];
        }
      }
      Vue.set(this, 'checkedArr', arr);
    },
    fillData () {
      this.dataCollection = {
        labels: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#1870DC',
            borderColor: 'transparent',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          }, {
            label: 'Data Two',
            backgroundColor: '#F45722',
            borderColor: 'transparent',
            data: [this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt(), this.getRandomInt()]
          }
        ]
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
   
  },
  mounted () {
    this.fillData();
    console.log(this.$session.get("authenticated"));
    if (this.$session.get("authenticated") != true) {
      this.$router.push({name:'Login'});
    }
    // this.GetDashboardData();

    }
    
  
};
</script>

<style src="./Visits.scss" lang="scss" />
