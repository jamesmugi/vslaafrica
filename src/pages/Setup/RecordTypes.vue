<template>
  <div>
      <div sm="12">
      <b-row class="mb-3">
          <div class="col-sm-12 col-lg-6">
                <h3 class="page-title float-left"> Record types&nbsp;</h3>
          </div>
          <div class="col-sm-12 col-lg-6">
              <b-button class="float-right round-button" variant="outline-primary" v-b-modal.modal-1>Add record type</b-button>
          </div>
          <b-modal id="modal-1" title="Add record type" @ok="addEntry">
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
          <h4>Record types</h4>
            <b-table responsive striped hover :items="recordtypes" :fields="fields">
                
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
        recordtypes:[],
        fields : ['record_type'],
        entries: [],
        apiUrl: 'https://api.vsla.africa/api/',
        form: {
          name: '',
          
        }
        }
    },
    mounted() {

    this.GetRecordTypes();

  },
  methods: {
    
    GetRecordTypes(){
      axios.get(this.apiUrl + 'Setup/GetRecordTypes').then( response => {
        this.recordtypes = response.data.response_data
      })
    },
    addEntry()
    {
      axios.post(this.apiUrl + 'Setup/AddRecordType', this.form).then( response => {
        if(response.data.status_code == 200)
        {
          this.GetRecordTypes();
        }
        else{
          alert('Failed');
        }
      })
    }

  }
  }
</script>

