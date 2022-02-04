<template>
  <div>
      <div sm="12">
      <b-row class="mb-3">
          <div class="col-sm-12 col-lg-6">
                <h3 class="page-title float-left"> Money management&nbsp;</h3>
          </div>
          <div class="col-sm-12 col-lg-6">
              <b-button class="float-right round-button" variant="outline-primary" v-b-modal.modal-1>Add money management criterion</b-button>
          </div>
          <b-modal id="modal-1" title="Add money management criterion" @ok="addEntry">
            <b-form>


              <b-col class="mt-4  col-sm-12" >
                      <label class=" form-label" for="country">Enter the name</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                      <b-form-input label="Enter the name " class="mb-3 white-input-text" id="amount" v-model="form.name" type="text" placeholder="Enter the name" required ></b-form-input>
                      </b-input-group>

              </b-col>

              <b-col class="mt-4  col-sm-12" >
                      <label class=" form-label" for="country">Enter a description</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                      <b-form-input label="Enter a description " class="mb-3 white-input-text" id="amount" v-model="form.description" type="text" placeholder="Enter a description" required ></b-form-input>
                      </b-input-group>

              </b-col>
             
            </b-form>
          </b-modal>
      </b-row>
       </div>

      <div sm="12" class="mt-4">
          <h4>Money management criteria</h4>
            <b-table responsive striped hover :items="moneymanagement" :fields="fields">
                
            </b-table>
        </div>
  </div>
</template>


<script>
import axios  from 'axios';


  export default {
    data() {
      return {
        moneymanagement:[],
        fields : ['name', 'description'],
        apiUrl: 'https://api.vsla.africa/api/',
        form: {
          name: '',
          
        }
        }
    },
    mounted() {

    this.GetMoneyManagement();

  },
  methods: {

    GetMoneyManagement(){
      axios.post(this.apiUrl + 'Setup/GetMoneyManagementCriteria').then( response => {
        this.moneymanagement = response.data.response_data
      })
    },
    addEntry()
    {
      axios.post(this.apiUrl + 'Setup/AddMoneyManagementCriterion', this.form).then( response => {
         
        if(response.data.status_code == 200)
        {
          this.GetMoneyManagement();
        }
        else{
          alert('Failed');
        }
      })
    }

  }
  }
</script>

