<template>
  <div>
      <div sm="12">
      <b-row class="mb-3">
          <div class="col-sm-12 col-lg-6">
                <h3 class="page-title float-left"> Provinces&nbsp;</h3>
          </div>
          <div class="col-sm-12 col-lg-6">
              <b-button class="float-right round-button" variant="outline-primary" v-b-modal.modal-1>Add province</b-button>
          </div>
          <b-modal id="modal-1" title="Add province" @ok="addEntry">
            <b-form>


              <b-col class="mt-4  col-sm-12" >
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
          <h4>Provinces</h4>
            <b-table responsive striped hover :items="provinces" :fields="fields">
                
            </b-table>
        </div>
  </div>
</template>


<script>
import axios  from 'axios';


  export default {
    data() {
      return {
        provinces:[],
        fields : ['name'],
        credit_options:[{name:"For groups", id:0}, {name:"For members", id:1}],
        apiUrl: 'https://api.vsla.africa/api/',
        form: {
          name: '',
          
        }
        }
    },
    mounted() {

    this.GetProvinces();

  },
  methods: {

    GetProvinces(){
      axios.get(this.apiUrl + 'Setup/GetProvinces').then( response => {
        this.provinces = response.data.response_data
      })
    },
    addEntry()
    {
      axios.post(this.apiUrl + 'Setup/AddProvince', this.form).then( response => {
         
        if(response.data.status_code == 200)
        {
          this.GetProvinces();
        }
        else{
          alert('Failed');
        }
      })
    }

  }
  }
</script>

