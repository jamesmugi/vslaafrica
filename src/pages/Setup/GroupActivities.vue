<template>
  <div>
      <div sm="12">
      <b-row class="mb-3">
          <div class="col-sm-12 col-lg-6">
                <h3 class="page-title float-left"> Group activities&nbsp;</h3>
          </div>
          <div class="col-sm-12 col-lg-6">
              <b-button class="float-right round-button" variant="outline-primary" v-b-modal.modal-1>Add group activity</b-button>
          </div>
          <b-modal id="modal-1" title="Add group activity" @ok="addEntry">
            <b-form>


              <b-col class="mt-4  col-sm-12" >
                      <label class=" form-label" for="country">Enter the name</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                      <b-form-input label="Enter the name " class="mb-3 white-input-text" id="amount" v-model="form.name" type="text" placeholder="Enter the name" required ></b-form-input>
                      </b-input-group>

              </b-col>



                <b-col class="mt-4">
                      <label class=" form-label" for="country">Select activity type</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                <multiselect  v-model="form.activity_type"  :options="credit_options.map(credit => credit.id)" :custom-label="opt => credit_options.find(x => x.id == opt).name"></multiselect>
                      </b-input-group>

              </b-col>
             
            </b-form>
          </b-modal>
      </b-row>
       </div>

      <div sm="12" class="mt-4">
          <h4>Activities</h4>
            <b-table responsive striped hover :items="groupactivities" :fields="fields">
                
            </b-table>
        </div>
  </div>
</template>


<script>
import axios  from 'axios';


  export default {
    data() {
      return {
        groupactivities:[],
        fields : ['name'],
        credit_options:[{name:"For groups", id:0}, {name:"For members", id:1}],
        apiUrl: 'https://api.vsla.africa/api/',
        form: {
          name: '',
          type: '',
          
        }
        }
    },
    mounted() {

    this.GetGroupActivities();

  },
  methods: {

    GetGroupActivities(){
      axios.get(this.apiUrl + 'Setup/GetActivities').then( response => {
        this.groupactivities = response.data.response_data
      })
    },
    addEntry()
    {
      axios.post(this.apiUrl + 'Setup/AddActivity', this.form).then( response => {
         
        if(response.data.status_code == 200)
        {
          this.GetGroupActivities();
        }
        else{
          alert('Failed');
        }
      })
    }

  }
  }
</script>

