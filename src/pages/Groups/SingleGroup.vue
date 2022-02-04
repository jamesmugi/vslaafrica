<template>
  <div>
      <div sm="12">
      <b-row class="mb-3">
          <div class="col-sm-12 col-lg-6">
                <h2 class="page-title float-left"> {{group_data.groupName}}'s details&nbsp;</h2>
          </div>
          <div class="col-sm-12 col-lg-6">
              <b-button class="float-right round-button" variant="outline-primary" @click="addMember()">Add member</b-button>
          </div>
      </b-row>
       </div>
      
      <div sm="12" class="mb-5">
          <b-card-group deck>
            <b-card title="Savings deposited" class="text-center card-color">
            <b-card-text>
                <v-icon name="piggy-bank" scale="3"></v-icon>
                <br>
                <h5 class="mt-3 text-white">
                     ${{group_data.savingsDeposited}}
                </h5>
                
            </b-card-text>
            
            </b-card>
            <b-card title="Savings withdrawn" class="text-center card-color">
            <b-card-text>
                <v-icon name="seedling" scale="3"></v-icon>
                <br>
                <h5 class="mt-3 text-white">
                   ${{group_data.savingsWithdrawn}}
               </h5>
                
            </b-card-text>
            <template #footer>
            </template>
            </b-card>

            <b-card title="Loans disbursed" class="text-center card-color">
            <b-card-text>
                <v-icon name="hand-holding-usd" scale="3"></v-icon>
                <br>
                <h5 class="mt-3 text-white">
                     ${{group_data.loansDisbursed}}
                </h5>
                
            </b-card-text>
           
            </b-card>

            

            <b-card title="Loans repaid" class="text-center card-color">
            <b-card-text>
                <v-icon name="seedling" scale="3"></v-icon>
                <br>
                <h5 class="mt-3 text-white">
                    ${{group_data.loansRepaid}}
               </h5>
                
            </b-card-text>
            <template #footer>
            </template>
            </b-card>


        </b-card-group>
      </div>
      <div class="mt-4" sm="12">
          <h4 class="text-center"><b>Group information</b></h4>
          <hr>
          <b-row class="mt-2 ">
              <b-col class="" sm="4">
                <h5><b>Group category</b></h5>
                <p  class="text-dark">{{group_data.groupCategory}}</p>
              </b-col>
              <b-col class="" sm="4">
                <h5><b>Group Activities</b></h5>
                  <ul class="text-dark" id="example-1">
                    <li v-for="activity in group_data.groupActivities" :key="activity.id">
                      {{ activity.activity_name }}
                    </li>
                  </ul>
              </b-col>
              <b-col class="" sm="4">
                <h5><b>Formalization</b></h5>
                <ul class="text-dark" id="example-1">
                    <li v-for="(legal, name) in group_data.checkList" :key="legal.id">
                     {{name}} -  {{ legal }}
                    </li>
                  </ul>
              </b-col>
          </b-row>
          <b-row class="mt-2 ">
              <b-col class="" sm="4">
                <h5><b>Gender distribution</b></h5>
                <p  class="text-dark">Male members : {{group_data.noOfMaleMembers}}</p>

                <p  class="text-dark">Female members : {{group_data.noOfFemaleMembers}}</p>
              </b-col>
              <b-col class="" sm="4">
                <h5><b>Record keeping</b></h5>
                  <ul class="text-dark" id="example-1">
                    <li v-for="record in group_data.groupRecordTypes" :key="record.record_type_id">
                      {{ record.record_type }}
                    </li>
                  </ul>
              </b-col>
              <b-col class="" sm="4">
                <h5><b>Education level</b></h5>
                <!-- <ul class="text-dark" id="example-1">
                    <li v-for="(legal, name) in group_data.checkList" :key="legal.id">
                     {{name}} -  {{ legal }}
                    </li>
                  </ul> -->
              </b-col>
          </b-row>
            
        </div>

        <div class="mt-4" sm="12">
          <h4 class="text-center"><b>Group dynamics</b></h4>
          <hr>
          <b-row class="mt-2 ">
              
              <b-col class="" sm="4" v-for="rating in group_data.scales" :key="rating.key">
                 <p class="text-dark">
                 <b>{{ rating.key }} </b> <b-form-rating name="record-keeping" inline :value="rating.value" variant="warning" class="star-size mb-2 readonly"></b-form-rating>
                 </p>
              </b-col>
              <b-col class="" sm="4">
                <h5><b>Education level</b></h5>
                <!-- <ul class="text-dark" id="example-1">
                    <li v-for="(legal, name) in group_data.checkList" :key="legal.id">
                     {{name}} -  {{ legal }}
                    </li>
                  </ul> -->
              </b-col>
          </b-row>
        </div>
        <hr>
      <div sm="12" class="mt-4">
          <h4>Members list</h4>
            <b-table responsive striped hover :items="members" :fields="fields">
                <template #cell(actions)="data">
                <b-button class="round-button" variant="outline-primary" @click="viewMemberActivity(data.item.id)">Activity logs</b-button>
            </template>
            </b-table>
        </div>
  </div>
</template>


<script>
import axios  from 'axios';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

  export default {
    data() {
      return {
          group_id: this.$route.params.group_id,
          group_data:[],
          fields : ['name', 'identification_no','savings','currency','savings_lcy','loans_lcy', 'loans', 'phone_no', 'email','actions'],
          members: [],
          apiUrl: 'https://api.vsla.africa/api/',
        }
    },
    mounted() {
    this.GetMembers();
    // this.GetChartData();
    this.GetGroupData();
  },
  methods: {
    GetMembers(){
      axios.post(this.apiUrl + 'Registration/GetMembers', {group_id: this.group_id}).then( response => {
        
        this.members = response.data.response_data
      })
    },
    viewMemberActivity(member_id){
      this.$router.push({name:'memberactivity', params:{member_id:member_id, group_id:this.group_id}});
    },
    addMember()
    {
        this.$router.push({name:'memberregistration', params:{group_id:this.group_id}});
    },
    GetGroupData(){
      const t = this;
      axios.post(this.apiUrl + 'Registration/GetGroupData', {groupId: this.group_id}).then( response => {
        console.log(this.group_id);
        this.group_data = response.data.response_data;
        t.$store.commit('setCurrency', response.data.response_data.homeCurrency);
        t.$store.commit('setGroupId', response.data.response_data.groupId);
        console.log(this.$store.state.group_id);
      })
    },
    GetChartData(){
        am4core.useTheme(am4themes_animated);
        // Themes end

        // Create chart instance
        let chart = am4core.create("chart", am4charts.XYChart3D);
        // Add data
        chart.data = [{
        "name": 'Savings',
        "amount": 500000,
        "color": chart.colors.next()
        }, {
        "name": 'Loans',
        "amount": 300000,
        "color": chart.colors.next()
        }, {
        "name": 'Development Fund',
        "amount": 450000,
        "color": chart.colors.next()
        }];

        // Create axes
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "name";
        categoryAxis.renderer.labels.template.rotation = 270;
        categoryAxis.renderer.labels.template.hideOversized = false;
        categoryAxis.renderer.minGridDistance = 20;
        categoryAxis.renderer.labels.template.horizontalCenter = "right";
        categoryAxis.renderer.labels.template.verticalCenter = "middle";
        categoryAxis.tooltip.label.rotation = 270;
        categoryAxis.tooltip.label.horizontalCenter = "right";
        categoryAxis.tooltip.label.verticalCenter = "middle";
        categoryAxis.labelColorField = '#fff';

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Amount";
        valueAxis.title.fontWeight = "bold";

        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries3D());
        series.dataFields.valueY = "amount";
        series.dataFields.categoryX = "name";
        series.name = "Amount";
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

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.lineX.strokeOpacity = 0;
        chart.cursor.lineY.strokeOpacity = 0;




    }

  }
  }
</script>

<style src="./SingleGroup.scss" lang="scss"></style>
