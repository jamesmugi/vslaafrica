<template>
  <div>
      <div sm="12">
      <b-row class="mb-3">
          <div class="col-sm-12 col-lg-6">
                <h3 class="page-title float-left"> Dioceses&nbsp;</h3>
          </div>
          <div class="col-sm-12 col-lg-6">
              <b-button class="float-right round-button" variant="outline-primary" v-b-modal.modal-1>Add diocese</b-button>
          </div>
          <b-modal id="modal-1" title="Add diocese" @ok="addEntry">
            <b-form>


              <b-col class="mt-4  col-sm-12" >
                      <label class=" form-label" for="diocese">Enter the name</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                      <b-form-input label="Enter the name " class="mb-3 white-input-text" id="amount" v-model="form.name" type="text" placeholder="Enter the name" required ></b-form-input>
                      </b-input-group>

              </b-col>

              <b-col class="mt-4">
                      <label class=" form-label" for="province">Select province</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                <multiselect track-by="id"  v-model="form.province_id"  :options="provinces.map(credit => credit.id)" :custom-label="opt => provinces.find(x => x.id == opt).name"></multiselect>
                      </b-input-group>

              </b-col>
             
            </b-form>
          </b-modal>
      </b-row>
       </div>

      <div sm="12" class="mt-4">
          <h4>Dioceses</h4>
            <b-table responsive striped hover :items="Dioceses" :fields="fields">
                
            </b-table>
        </div>
  </div>
</template>


<script>
import axios  from 'axios';


  export default {
    data() {
      return {
        dioceses:[],
        provinces:[],
        fields : ['name', 'province_name'],
        apiUrl: 'https://api.vsla.africa/api/',
        form: {
          name: '',
          
        }
        }
    },
    mounted() {

    this.GetDioceses();
    this.GetProvinces();

  },
  methods: {

    GetDioceses(){
      axios.get(this.apiUrl + 'Setup/GetDioceses').then( response => {
        this.dioceses = response.data.response_data
      })
    },
    GetProvinces(){
      axios.get(this.apiUrl + 'Setup/GetProvinces').then( response => {
        this.provinces = response.data.response_data
      })
    },
    addEntry()
    {
      axios.post(this.apiUrl + 'Setup/Adddiocese', this.form).then( response => {
         
        if(response.data.status_code == 200)
        {
          this.GetDioceses();
        }
        else{
          alert('Failed');
        }
      })
    }

  }
  }
</script>

