<template>
  <div>
      <div sm="12">
      <b-row class="mb-3">
          <div class="col-sm-12 col-lg-6">
                <h3 class="page-title float-left"> System users&nbsp;</h3>
          </div>
          <div class="col-sm-12 col-lg-6">
              <b-button class="float-right round-button" variant="outline-primary" v-b-modal.modal-1>Create a new user</b-button>
          </div>
          <b-modal id="modal-1" title="Register a new user" @ok="addEntry">
            <b-form>

              <b-col class="mt-4" >
                      <label class=" form-label modal-label" for="first_name">First name</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                      <b-form-input label="Enter the user's first name" class="mb-3 white-input-text" id="amount" v-model="form.first_name" type="text" placeholder="Enter the user's first name" required ></b-form-input>
                      </b-input-group>

              </b-col>

              <b-col class="mt-4" >
                      <label class=" form-label modal-label" for="middle_name">Middle name</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                      <b-form-input label="Enter the  user's middle name " class="mb-3 white-input-text" id="amount" v-model="form.middle_name" type="text" placeholder="Enter the user's middle name" required ></b-form-input>
                      </b-input-group>

              </b-col>

              <b-col class="mt-4" >
                      <label class=" form-label modal-label" for="last_name">Last name</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                      <b-form-input label="Enter the  user's last name " class="mb-3 white-input-text" id="amount" v-model="form.last_name" type="text" placeholder="Enter the user's last name" required ></b-form-input>
                      </b-input-group>

              </b-col>

              <b-col class="mt-4" >
                      <label class=" form-label modal-label" for="email">Email</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                      <b-form-input label="Enter the  user's email" class="mb-3 white-input-text" id="amount" v-model="form.email" type="text" placeholder="Enter the user's email" required ></b-form-input>
                      </b-input-group>

              </b-col>

              <b-col class="mt-4" >
                      <label class=" form-label modal-label" for="phone">Phone number</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                      <b-form-input label="Enter the  user's phone number " class="mb-3 white-input-text" id="amount" v-model="form.phone_number" type="text" placeholder="Enter the user's phone number" required ></b-form-input>
                      </b-input-group>

              </b-col>

              <b-col class="mt-4">
                <label class=" form-label  modal-label" for="country">Country</label>
                  <b-form-select  class="mb-3 mr-1 mb-sm-3 white-input-text"  v-model="form.country_id" v-on:change="GetDioceses($event)">
                    <b-form-select-option :value="null">Please select an option</b-form-select-option>
                    <b-form-select-option  v-for="item in countries" :key="item.id" :value="item.id">{{item.name}}</b-form-select-option>
                  </b-form-select>
              </b-col>

              <b-col class="mt-4">
                      <label class=" form-label modal-label" for="role">Select a role</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                <multiselect :multiple="true"  v-model="form.roles_List"  :options="roles.map(role => role.roleName)" :custom-label="opt => roles.find(x => x.roleName == opt).roleName"></multiselect>
                      </b-input-group>

              </b-col>

              <b-col v-if="form.roles_List.includes('REGIONALCOORDINATOR')" class="mt-4">
                      <label class=" form-label modal-label" for="role">Select a diocese</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                        <b-form-select  class="mb-3 mr-1 mb-sm-3 white-input-text"  v-model="form.diocese_id">
                    <b-form-select-option :value="null">Please select an option</b-form-select-option>
                    <b-form-select-option  v-for="item in dioceses" :key="item.id" :value="item.id">{{item.name}}</b-form-select-option>
                  </b-form-select>
                <!-- <multiselect v-model="form.diocese_id"  :options="dioceses.map(diocese => diocese.id)" :custom-label="opt => dioceses.find(x => x.id == opt).name"></multiselect> -->
                      </b-input-group>

              </b-col>

              <b-col v-if="form.roles_List.includes('GROUPADMIN')" class="mt-4">
                <label class=" form-label  modal-label" for="country">Select a group</label>
                  <b-form-select class="mb-3 mr-1 mb-sm-3 white-input-text"  v-model="form.group_id" v-on:change="GetMembers($event)">
                    <b-form-select-option :value="null">Please select an option</b-form-select-option>
                    <b-form-select-option  v-for="item in groups" :key="item.id" :value="item.id">{{item.group_name}}</b-form-select-option>
                  </b-form-select>
              </b-col>

              <b-col v-if="form.group_id != 0 && form.roles_List.includes('GROUPADMIN')" class="mt-4">
                <label class=" form-label  modal-label" for="country">Select a member</label>
                  <b-form-select class="mb-3 mr-1 mb-sm-3 white-input-text"  v-model="form.member_id">
                    <b-form-select-option :value="null">Please select an option</b-form-select-option>
                    <b-form-select-option  v-for="item in members" :key="item.id" :value="item.id">{{item.name}}</b-form-select-option>
                  </b-form-select>
              </b-col>
             
            </b-form>
          </b-modal>
      </b-row>
       </div>
      
 
      <div sm="12" class="mt-4">
          <h4>List of users</h4>
            <b-table responsive striped hover :items="entries" :fields="fields">
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
import * as am4plugins_timeline from "@amcharts/amcharts4/plugins/timeline";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

  export default {
    data() {
      return {
        fields : ['user_full_names', 'user_email', 'phone_number', 'user_role'],
        entries: [],
        countries: [],
        roles:[],
        dioceses:[],
        groups: [],
        members: [],
        apiUrl: 'https://api.vsla.africa/api/',
        form: {
          first_name: '',
          middle_name: '',
          last_name: '',
          phone_number: '',
          email:'',
          national_id:'',
          roles_List: [],
          country_id:0,
          group_id:0,
          member_id:0,
          diocese_id:0

        }
        }
    },
    mounted() {
    this.getCountries();
    this.GetUsers();
    this.GetRoles();
    this.GetGroups();
    // this.addEntry();


  },
  methods: {
    GetMembers(event){
      axios.post(this.apiUrl + 'Registration/GetMembers', {group_id: event}).then( response => {
        
        this.members = response.data.response_data
        console.log(this.members);
      })
    },
    GetGroups(){
      const country_id = this.$session.get("country_id") == null ? 0 : this.$session.get("country_id");
      const diocese_id = this.$session.get("diocese_id") == null ? 0 : this.$session.get("diocese_id");
      console.log(this.$session.get("diocese_id"));
      console.log(diocese_id);
      axios.post(this.apiUrl + 'Registration/GetGroups', {country_id:country_id, diocese_id:diocese_id}).then( response => {
        
        this.groups = response.data.response_data
      })
    },
    getCountries() {
       axios.get(this.apiUrl + 'Setup/GetCountries').then( response => {
        this.countries = response.data.response_data
      })
    },
    GetUsers(){
      axios.post(this.apiUrl + 'Account/GetUsers', {user_types: ['SUPERADMINISTRATOR', 'REGIONALCOORDINATOR', 'COUNTRYCOORDINATOR']}).then( response => {

        this.entries = response.data.user_list
      })
    },
    GetRoles(){
      const user_id = this.$session.get("user_id")
      axios.get(this.apiUrl + 'Account/GetRolesByLevel?userId='+ user_id).then( response => {
        //   console.log(response);
        this.roles = response.data.response_data
      })
    },
    GetDioceses(event){
      console.log(event);
      axios.get(this.apiUrl + 'Setup/GetDioceses?country_id='+ event).then( response => {
        console.log(response);
        this.dioceses = response.data.response_data
        console.log(this.dioceses);
      })
    },
    addEntry()
    {
      console.log(this.form);
      axios.post(this.apiUrl + 'Account/Register', this.form).then( response => {
          console.log(response);
        if(response.data.status_code == 200)
        {
          this.GetUsers();
        }
        else{
          alert(response.data.message);
        }
      }).catch(error => {
      alert("Please fill in all the fields")
  })
    }

  }
  }
</script>


