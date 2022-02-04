<template>
  <div>
    <!-- Tabs with card integration -->
      <b-tabs v-model="tabIndex" fill>
        <b-form inline class="ml-3 mr-3">
              <b-tab title="Member details" active>
                    
                      <strong class="text-underline">Capture the member's information.</strong>
                      <b-row>
                      <!-- <b-col class="mt-4" sm="4">
                      <label class=" form-label" for="country">Groups</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                          <multiselect track-by="id" v-model="form.group_id" 
                          :options="groups.map(group => group.id)" :custom-label="opt => groups.find(x => x.id == opt).group_name"></multiselect>
                      </b-input-group>
                      <b-form-text id="inline-form-input-salary">Select group the member belongs too..</b-form-text>

                    </b-col> -->



                      
                      <b-col class="mt-4" sm="4">
                        <label class=" form-label" for="inline-form-input-name">First name</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                        <b-form-input v-model="form.first_name" class="white-input-text" id="inline-form-input-name" placeholder="First name"></b-form-input>
                      </b-input-group>
                      </b-col>
                      
                      <b-col class="mt-4" sm="4">
                        <label class=" form-label" for="inline-form-input-sponsor">Other name</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                        <b-form-input v-model="form.other_names" class="white-input-text" id="inline-form-input-sponsor" placeholder="Other name"></b-form-input>
                      </b-input-group>
                      </b-col>

                      <b-col class="mt-4" sm="4">
                        <label class=" form-label" for="inline-form-input-sponso">Identification number</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                        <b-form-input v-model="form.identification_no" class="white-input-text" id="inline-form-input-sponsor" placeholder="Identification number"></b-form-input>
                      </b-input-group>
                      </b-col>

                      <b-col class="mt-4" sm="4">
                        <label class=" form-label" for="inline-form-input-sponso">Phone number</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                        <b-form-input v-model="form.phone_no" class="white-input-text" id="inline-form-input-sponsor" placeholder="Phone number"></b-form-input>
                      </b-input-group>
                      </b-col>

                      <b-col class="mt-4" sm="4">
                        <label class=" form-label" for="inline-form-input-sponso">Email</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                        <b-form-input v-model="form.email" class="white-input-text" id="inline-form-input-sponsor" placeholder="Email"></b-form-input>
                      </b-input-group>
                      </b-col>

                      <b-col class="mt-4 w-100" sm="4">
                        <label class=" form-label" for="inline-form-input-members">Date of birth</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 text-white">
                        <!-- <b-form-input></b-form-input> -->
                        <datepicker class="white-input-text" v-model="form.date_of_birth" name="date_of_birth" :bootstrap-styling=true format="yyyy-MM-dd"	></datepicker>

                      </b-input-group>
                      </b-col>

                      <b-col class="mt-4" sm="4">
                        <label class=" form-label" for="inline-form-input-sponsor">Physical address</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                        <b-form-input v-model="form.physical_address" class="white-input-text" id="inline-form-input-sponsor" placeholder="Physical address"></b-form-input>
                      </b-input-group>
                      </b-col>

                      <b-col class="mt-4" sm="4">
                        <label class=" form-label" for="inline-form-input-sponsor">Role in group</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                        <b-form-input v-model="form.role_in_group" class="white-input-text" id="inline-form-input-sponsor" placeholder="Member's role in group"></b-form-input>
                      </b-input-group>
                      </b-col>

                       <b-col class="mt-4">
                        <label class=" form-label" for="country">Select gender</label>
                                <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                          <multiselect track-by="id"  v-model="form.gender"  :options="gender_options.map(gender => gender.id)" :custom-label="opt => gender_options.find(x => x.id == opt).name"></multiselect>
                                </b-input-group>

                        </b-col>

                        <b-col class="mt-4 w-100" sm="4">
                        <label class=" form-label" for="inline-form-input-members">Date when member joined group</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 text-white">
                        <!-- <b-form-input></b-form-input> -->
                        <datepicker class="white-input-text" v-model="form.date_of_joining" name="date_of_joining" :bootstrap-styling=true format="yyyy-MM-dd"	></datepicker>

                      </b-input-group>
                      </b-col>

                      <b-col class="mt-4" sm="4">
                      <label class=" form-label" for="country">Member activities</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                          <multiselect :multiple="true"  v-model="form.group_activities" 
                          :options="group_activities.map(activity => activity.id)" :custom-label="opt => group_activities.find(x => x.id == opt).name"></multiselect>
                      </b-input-group>

                    </b-col>

                    <b-col class="mt-4" sm="4">
                      <label class=" form-label" for="country">Select education level</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                  <multiselect  v-model="form.education_level"  :options="education_levels.map(credit => credit.id)" :custom-label="opt => education_levels.find(x => x.id == opt).name"></multiselect>
                      </b-input-group>

                    </b-col>
                    <b-col class="mt-2" sm="12">
                        <label class=" form-label" for="inline-form-input-username"></label>
                          <b-input-group class="mb-3 mr-1 mb-sm-3 "> 
                            <input id="has_constitution" class="form-check-input mr-2" type="checkbox" v-model="form.create_admin_account"  true-value="true" false-value="false">
                            <label class="mr-2" for="has_constitution"> Is a group admin</label>

                            <input id="is_legally_registered" class="form-check-input mr-2" type="checkbox" v-model="form.is_member_in_another_group"  true-value="true" false-value="false">
                            <label class="mr-2" for="is_member_in_another_group"> Is member in another group</label>

                            
                           

                            <input id="has_been_audited" class="form-check-input mr-2" type="checkbox" v-model="form.does_member_have_bank_account"  true-value="true" false-value="false">
                            <label class="mr-2" for="does_member_have_bank_account"> Has bank account</label>
                          </b-input-group>
                        </b-col>


                      </b-row>
                    
              </b-tab>
        </b-form>

      </b-tabs>

    <!-- Control buttons-->
    <div class="text-center">
      <b-button-group class="mt-2">
        <b-button class="round-button mr-2" variant="info" @click="submitForm"><b>Submit</b></b-button>        
      </b-button-group>

    </div>
  </div>
</template>

  <script>

// <style src="vue-multiselect/dist/vue-multiselect.min.css"></style>


    
import axios  from 'axios';
import 'vue-multiselect/dist/vue-multiselect.min.css';



    export default {
      data() {
      return {
        groups: [],
        identification:this.$route.params.group_id,
        group_activities:[],
        education_levels:[{name:"Primary school", id:0}, {name:"Secondary school", id:1},{name:"College/Vocational school", id:2},{name:"Undergraduate studies", id:3},{name:"Postgraduate studies", id:4}],
        tabIndex: 0,
        groupActivityId:0,
        gender_options:[{name:"Female", id:0}, {name:"Male", id:1}],
        apiUrl: 'https://api.vsla.africa/api/',
        form: {
          group_id: this.$route.params.group_id,
          first_name: '',
          other_names:'',
          phone_number:'',
          email:'',
          identification_no:'',
          member_activities: [],
          gender: '',
          date_of_birth: '',
          date_of_joining:'',
          role_in_group: '',
          is_member_in_another_group: 'false',
          does_member_have_bank_account: 'false',
          create_admin_account: 'false',
          role_name: ''
          
        }
      }
    },
  mounted() {
    this.GetGroups();
    this.GetGroupActivities();

  },
  methods: {
    GetGroups(){
      axios.post(this.apiUrl + 'Registration/GetGroups', {}).then( response => {
        this.groups = response.data.response_data
      })
    },
    GetGroupActivities(){
      axios.get(this.apiUrl + 'Setup/GetActivities?activity_type='+ this.groupActivityId).then( response => {
        this.group_activities   = response.data.response_data
      })
    },

    
    submitForm(){
      console.log(this.form);
      axios.post(this.apiUrl+'Registration/RegisterNewMember', this.form)
      .then( response => {
        // alert('success');
        this.$router.push({name:'viewgroup', params:{group_id: this.identification}});
      })
      .catch((error) => {
        // error.response.status Check status code
        alert(error.response.status + error.response.data);
      });
    }

  }

  }
</script>

<style src="./GroupRegistration.scss" lang="scss"></style>
<!-- <style src="./vue-select.css"></style> -->


