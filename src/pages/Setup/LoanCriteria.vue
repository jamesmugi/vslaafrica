<template>
  <div>
      <div sm="12">
      <b-row class="mb-3">
          <div class="col-sm-12 col-lg-6">
                <h3 class="page-title float-left"> Loan criteria&nbsp;</h3>
          </div>
          <div class="col-sm-12 col-lg-6">
              <b-button class="float-right round-button" variant="outline-primary" v-b-modal.modal-1>Add loan criterion</b-button>
          </div>
          <b-modal id="modal-1" title="Add loan criterion" @ok="addEntry">
            <b-form>


              <b-col class="mt-4" >
                      <label class=" form-label" for="country">Enter the name</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                      <b-form-input label="Enter the name " class="mb-3 white-input-text" id="amount" v-model="form.name" type="text" placeholder="Enter the name" required ></b-form-input>
                      </b-input-group>

              </b-col>
              
             
            </b-form>
          </b-modal>
      </b-row>
       </div>

      <div sm="12" class="mt-4">
          <h4>Loan criteria</h4>
            <b-table responsive striped hover :items="loancriteria" :fields="fields">
                
            </b-table>
        </div>
  </div>
</template>


<script>
import axios  from 'axios';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4plugins_timeline from "@amcharts/amcharts4/plugins/timeline";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

  export default {
    data() {
      return {
        loancriteria:[],
        fields : ['name'    ],
        entries: [],
        apiUrl: 'https://api.vsla.africa/api/',
        form: {
          name: '',
          
        }
        }
    },
    mounted() {

    this.GetLoanCriteria();

  },
  methods: {
    
    GetLoanCriteria(){
      axios.get(this.apiUrl + 'Setup/GetLoanCriteria').then( response => {
        this.loancriteria = response.data.response_data
      })
    },
    addEntry()
    {
      axios.post(this.apiUrl + 'Setup/AddLoanCriterion', this.form).then( response => {
        if(response.data.status_code == 200)
        {
          this.GetLoanCriteria();
        }
        else{
          alert('Failed');
        }
      })
    }

  }
  }
</script>

