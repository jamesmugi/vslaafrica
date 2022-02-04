<template>
  <div>
    <!-- Tabs with card integration -->
      <b-tabs v-model="tabIndex" fill>
        <b-form inline class="ml-3 mr-3">
              <b-tab title="Group details" active>
                    
                      <strong class="text-underline">This section captures your group information.</strong>
                      <b-row>
                      <b-col class="mt-4" sm="4">
                        <label class=" form-label " for="country">Country</label>
                        <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                              <multiselect @input="GetDioceses()"  v-model="form.country_id" v-validate="'required'" name="country"
                              :options="countries.map(country => country.id)" :custom-label="opt => countries.find(x => x.id == opt).name"></multiselect>
                        </b-input-group>
                        <span class="red-input-text">{{ errors.first('country') }}</span>
                      </b-col>

                      <b-col class="mt-4" sm="4">
                        <label class=" form-label " for="diocese">Diocese/Region</label>
                        <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                              <multiselect v-model="form.diocese_id" v-validate="'required'" name="diocese"
                              :options="dioceses.map(diocese => diocese.id)" :custom-label="opt => dioceses.find(x => x.id == opt).name"></multiselect>
                        </b-input-group>
                        <span class="red-input-text">{{ errors.first('diocese') }}</span>
                      </b-col>

                      <b-col class="mt-4" sm="4">
                        <label class=" form-label" for="country">Group category</label>
                        <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                            <multiselect v-validate="'required'" name="group-category"  v-model="form.category_id" :options="groupcategories.map(category => category.id)" :custom-label="opt => groupcategories.find(x => x.id == opt).group_category"></multiselect>
                        </b-input-group>
                        <span class="red-input-text">{{ errors.first('group-category') }}</span>
                      </b-col>

                      
                      
                      <b-col class="mt-4" sm="4">
                        <label class=" form-label" for="inline-form-input-name">Group name</label>
                      <b-form-group>
                        <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                        <b-form-input  v-validate="'required'" name="group-name" v-model="form.group_name" class="white-input-text" id="inline-form-input-name" placeholder="Group name"></b-form-input>
                      </b-input-group>

                       <span class="red-input-text">{{ errors.first('group-name') }}</span>

                      </b-form-group>
                      
                      </b-col>
                      
                      <b-col class="mt-4" sm="4">
                        <label class=" form-label" for="inline-form-input-sponso">Supporting agency/institution</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                        <b-form-input v-validate="'required'" name="cover-sponsor" v-model="form.cover_sponsor" class="white-input-text" id="inline-form-input-sponsor" placeholder="Supporting agency/institution"></b-form-input>
                      </b-input-group>
                      <span class="red-input-text">{{ errors.first('cover-sponsor') }}</span>
                      </b-col>

                      <b-col class="mt-4" sm="4">
                        <label class=" form-label" for="inline-form-input-males">No of males in the group</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                        <b-form-input  v-validate="'required'" name="male-members" v-model="form.male_members_count" type="number" class="white-input-text" id="inline-form-input-males" placeholder="Number of males"></b-form-input>
                      </b-input-group>
                      <span class="red-input-text">{{ errors.first('male-members') }}</span>
                      </b-col>

                      <b-col class="mt-4" sm="4">
                        <label class=" form-label" for="inline-form-input-females">No of females in the group</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                        <b-form-input v-validate="'required'" name="female-members" v-model="form.female_members_count" type="number" class="white-input-text" id="inline-form-input-females" placeholder="Number of females"></b-form-input>
                      </b-input-group>
                      <span class="red-input-text">{{ errors.first('female-members') }}</span>
                      </b-col>

                      <!-- <b-col class="mt-4" sm="4">
                        <label class=" form-label" for="inline-form-input-members">Total no of members</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                        <b-form-input v-model="form.group_members_count" type="number" class="white-input-text" id="inline-form-input-members" placeholder="Number of members"></b-form-input>
                      </b-input-group>
                      </b-col> -->

                      <!-- <b-col class="mt-4" sm="4">
                        <label class=" form-label" for="inline-form-input-members">Longitude</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                        <b-form-input v-model="form.longitude" type="text" class="white-input-text" id="inline-form-input-members" placeholder="Longitude of nearest city"></b-form-input>
                      </b-input-group>
                      </b-col>

                      <b-col class="mt-4" sm="4">
                        <label class=" form-label" for="inline-form-input-members">Latitude</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                        <b-form-input v-model="form.latitude" type="text" class="white-input-text" id="inline-form-input-members" placeholder="Latitude of nearest city"></b-form-input>
                      </b-input-group>
                      </b-col> -->

                      <b-col class="mt-4 w-100" sm="4">
                        <label class=" form-label" for="inline-form-input-members">When was the group formed?</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 text-white input-class  w-100" >
                        <!-- <b-form-input v-model="form.date_formed" type="text" class="white-input-text" id="inline-form-input-members" placeholder="Year of formation"></b-form-input> -->
                        <datepicker v-validate="'required'" class="text-white  w-100" placeholder="Select date" v-model="form.date_formed" input-class name="date-formed" :bootstrap-styling=false format="yyyy-MM-dd"	></datepicker>

                      </b-input-group>
                      <span class="red-input-text">{{ errors.first('date-formed') }}</span>
                      </b-col>

                      <b-col sm="12" class="mt-2 mb-3">
                          <strong class="text-underline">Group's contact person's details</strong>
                        </b-col>

                          <b-col class="mt-4" sm="4">
                              <label class=" form-label" for="inline-form-input-firstname">First name</label>
                            <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                              <b-form-input v-validate="'required'" name="first-name" v-model="form.group_admin_first_name" class="white-input-text" id="inline-form-input-firstname" placeholder="Contact person name"></b-form-input>
                            </b-input-group>
                            <span class="red-input-text">{{ errors.first('first-name') }}</span>
                          </b-col>

                          <b-col class="mt-4" sm="4">
                              <label class=" form-label" for="inline-form-input-middlename">Middle name</label>
                            <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                              <b-form-input v-model="form.group_admin_middle_name" class="white-input-text" id="inline-form-input-middlename" placeholder="Contact person name"></b-form-input>
                            </b-input-group>
                          </b-col>

                          <b-col class="mt-4" sm="4">
                              <label class=" form-label" for="inline-form-input-lastname">Last name</label>
                            <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                              <b-form-input  v-validate="'required'" name="last-name" v-model="form.group_admin_last_name" class="white-input-text" id="inline-form-input-lastname" placeholder="Contact person name"></b-form-input>
                            </b-input-group>
                            <span class="red-input-text">{{ errors.first('last-name') }}</span>
                          </b-col>

                          <b-col class="mt-4" sm="4">
                              <label class=" form-label" for="inline-form-input-email">Email</label>
                            <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                              <b-form-input v-validate="'required|email'" name="admin-email" v-model="form.group_admin_email" class="white-input-text" id="inline-form-input-email" placeholder="Contact person's email"></b-form-input>
                            </b-input-group>
                            <span class="red-input-text">{{ errors.first('admin-email') }}</span>
                          </b-col>

                          <b-col class="mt-4" sm="4">
                              <label class=" form-label" for="inline-form-input-phone">Phone</label>
                            <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                              <b-form-input v-validate="'required'" name="admin-phone" v-model="form.group_admin_phone_no" class="white-input-text" id="inline-form-input-phone" placeholder="Contact person's phone"></b-form-input>
                            </b-input-group>
                            <span class="red-input-text">{{ errors.first('admin-phone') }}</span>
                          </b-col>

                          <b-col class="mt-4" sm="4">
                              <label class=" form-label" for="inline-form-input-identification">Identification number</label>
                            <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                              <b-form-input v-validate="'required'" name="admin-id" v-model="form.group_admin_identification_no" class="white-input-text" id="inline-form-input-identification" placeholder="Contact person's identification number"></b-form-input>
                            </b-input-group>
                            <span class="red-input-text">{{ errors.first('admin-id') }}</span>
                          </b-col>

                      </b-row>
                    
              </b-tab>
              <b-tab title="Level of formalization">                
                      <b-row>
                        <b-col class="col-sm-12 mt-5 mb-3" sm="12">
                          <strong class="text-underline">Accounting systems</strong>
                        </b-col>


                          <b-col class="" sm="6">
                                <label class=" form-label" for="country">Record types</label>
                                <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                                    <multiselect v-validate="'required'" name="group-records" :multiple="true" v-model="form.group_record_types" :options="records.map(record => record.id)" :custom-label="opt => records.find(x => x.id == opt).record_type"></multiselect>
                                </b-input-group>
                                <span class="red-input-text">{{ errors.first('group-records') }}</span>
                                <b-form-text class="text-dark" id="inline-form-input-salary ">Select the ways record keeping is done in the group.</b-form-text>

                          </b-col>
                        <b-col class="col-sm-12 mt-5 mb-3" sm="12">
                          <strong class="text-underline">Other details (<small>check the box if true.</small>)</strong>
                        </b-col>
                        <b-col class="mt-4" sm="12">
                             <b-input-group class="mb-3 mr-1 mb-sm-3 ml-4"> 
                           <input id="has_digital_platforms" class="form-check-input mr-2" type="checkbox" v-model="form.has_digital_platforms"  true-value="true" false-value="false">
                            <label class="mr-2" for="has_digital_platforms"> Has digital presence</label>
                            
                            <input id="has_Full_time_employees" class="form-check-input mr-2" type="checkbox" v-model="form.has_Full_time_employees"  true-value="true" false-value="false">
                            <label class="mr-2" for="has_Full_time_employees"> Has full time employees</label>

                            <input id="has_mission_vision_statement" class="form-check-input mr-2" type="checkbox" v-model="form.has_mission_vision_statement"  true-value="true" false-value="false">
                            <label class="mr-2" for="has_mission_vision_statement"> Has mission and vision</label>
                            
                          </b-input-group>
                        </b-col>

                       
                      </b-row>

                      <b-row>
                        <b-col class="col-sm-12 mt-5 mb-3" sm="12">
                          <strong class="text-underline">Legal compliance (<small>check the box if true.</small>)</strong>
                        </b-col>

                        <b-col class="mt-2" sm="12">
                        <label class=" form-label" for="inline-form-input-username"></label>
                          <b-input-group class="mb-3 mr-1 mb-sm-3 "> 
                            <input id="has_constitution" class="form-check-input mr-2" type="checkbox" v-model="form.has_constitution"  true-value="true" false-value="false">
                            <label class="mr-2" for="has_constitution"> Has constitution</label>

                            <input id="is_legally_registered" class="form-check-input mr-2" type="checkbox" v-model="form.is_legally_registered"  true-value="true" false-value="false">
                            <label class="mr-2" for="is_legally_registered"> Is legally registered</label>

                            
                           

                            <input id="has_been_audited" class="form-check-input mr-2" type="checkbox" v-model="form.has_been_audited"  true-value="true" false-value="false">
                            <label class="mr-2" for="has_been_audited"> Has been audited</label>
                          </b-input-group>
                        </b-col>

                        <b-col class="mt-4" sm="6">
                              <label class=" form-label" for="inline-form-input-identification">If company has been audited enter the year of audit</label>
                            <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                              <datepicker class="" v-model="form.auditing_date" name="auditing_date" input-class :bootstrap-styling=false format="yyyy-MM-dd"	></datepicker>

                            </b-input-group>
                          </b-col>
                      </b-row>
              </b-tab>
              <b-tab title="Savings and Loans">
                
              <strong class="mb-5">This section assesses how you manage loans</strong>
              <b-row>
                <b-col class="mt-4" sm="6">
                  <label class=" form-label" for="inline-form-input-salary">Salary percentage</label>
                <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                  <b-form-input v-validate="'required'" name="salary-percentage" v-model="form.salary_percentage" type="number" class="white-input-text" id="inline-form-input-username" placeholder="eg 30"></b-form-input>
                </b-input-group>
                <span class="red-input-text">{{ errors.first('salary-percentage') }}</span><br>
                <small id="inline-form-input-salary " class="text-dark">Enter the amount of income used for salaries as a percentage.</small>
                </b-col>

                <b-col class="mt-4" sm="6">
                      <label class=" form-label" for="criterion">Loan criterion</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                        <multiselect v-validate="'required'" name="loan-criteria" v-model="form.loan_criterion_id"
                        :options="loancriteria.map(criteria => criteria.id)" :custom-label="opt => loancriteria.find(x => x.id == opt).name"></multiselect>
                      </b-input-group>
                      <span class="red-input-text">{{ errors.first('loan-criteria') }}</span><br>
                  <small id="inline-form-input-salary" class="text-dark">Enter the amount of income used for salaries as a percentage.</small>

                </b-col>

                <b-col class="mt-4" sm="6">
                      <label class=" form-label" for="country">Loan utilization</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                          <multiselect v-validate="'required'" name="loan-utilization" :multiple="true" v-model="form.group_loan_utilizations" 
                          :options="loanutilizations.map(utilization => utilization.id)" :custom-label="opt => loanutilizations.find(x => x.id == opt).name"
                          ></multiselect>
                      </b-input-group>
                      <span class="red-input-text">{{ errors.first('loan-utilization') }}</span><br>
                      <small id="inline-form-input-salary" class="text-dark">Select the major ways loans are used by members.</small>

                </b-col>

                
                <b-col class="mt-4" sm="6">
                      <label class=" form-label" for="country">Group activities</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                          <multiselect v-validate="'required'" name="group-activities" :multiple="true"  v-model="form.group_activities" 
                          :options="group_activities.map(activity => activity.id)" :custom-label="opt => group_activities.find(x => x.id == opt).name"></multiselect>
                      </b-input-group>
                      <span class="red-input-text">{{ errors.first('group-activities') }}</span><br>
                      <small id="" class="text-dark">Select the main group activities.</small>

                </b-col>

              </b-row>

              </b-tab>

              <b-tab title="Group dynamics">
                <strong class="mb-5 mt-4">How is the group doing in the following areas? <small>(1- Very poor, 5 - Excellent)</small></strong>
                <b-row>

                  <b-col sm="4 mt-4">
                    <label class="form-label" for="inline-form-input-username">Leadership</label>
                  <b-input-group  class="mb-3 mr-1 mb-sm-3 ">
                    <!-- <vue-stars class="star-size" name="leadership-skills"  :max="5" :value="0" :readonly="false"/> -->
                        <b-form-rating name="leadership-skills" v-model="form.leadership_skills_scale" variant="warning" class="star-size mb-2"></b-form-rating>
                  </b-input-group>
                </b-col>

                <b-col sm="4 mt-4">
                    <label class="form-label" for="inline-form-input-username">Group stability</label>
                  <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                    <!-- <vue-stars class="star-size" name="group-dynamics"  :max="5" :value="1" :readonly="false"></vue-stars> -->
                    <b-form-rating name="group-dynamics" v-model="form.group_dynamics_scale" variant="warning" class="star-size mb-2"></b-form-rating>
                  </b-input-group>
                </b-col>

                <b-col sm="4 mt-4">
                    <label class="form-label text-underline" for="inline-form-input-username">Record keeping</label>
                  <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                    <!-- <vue-stars class="star-size" name="record-keeping"  :max="5" :value="1" :readonly="false"></vue-stars> -->
                    <b-form-rating name="record-keeping" v-model="form.record_keeping_scale" variant="warning" class="star-size mb-2"></b-form-rating>

                  </b-input-group>
                </b-col>

                <b-col sm="4 mt-4">
                    <label class="form-label" for="inline-form-input-username">Member Skills Development</label>
                  <b-input-group  class="mb-3 mr-1 mb-sm-3 ">
                    <!-- <vue-stars class="star-size" name="handicraft-training"  :max="5" :value="1" :readonly="false"></vue-stars> -->
                    <b-form-rating name="handicraft-training" v-model="form.handicraft_training_scale" variant="warning" class="star-size mb-2"></b-form-rating>

                  </b-input-group>
                </b-col>

                <b-col sm="4 mt-4">
                    <label class="form-label" for="inline-form-input-username">Enterprise development</label>
                  <b-input-group  class="mb-3 mr-1 mb-sm-3 ">
                    <!-- <vue-stars class="star-size" name="enterprise-development"  :max="5" :value="1" :readonly="false"></vue-stars> -->
                    <b-form-rating name="enterprise-development" v-model="form.enterprise_development_scale" variant="warning" class="star-size mb-2"></b-form-rating>
                  </b-input-group>
                  mt-5 mb-3
                </b-col>

                <b-col sm="4 mt-4">
                    <label class="form-label" for="inline-form-input-username">Financial management</label>
                  <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                    <!-- <vue-stars class="star-size" name="financial-development"  :max="5" :value="1" :readonly="false"></vue-stars> -->
                    <b-form-rating name="financial-development" v-model="form.financial_development_scale" variant="warning" class="star-size mb-2"></b-form-rating>

                  </b-input-group>
                </b-col>

                <b-col sm="4 mt-4">
                    <label class="form-label" for="inline-form-input-username">Governance</label>
                  <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                    <!-- <vue-stars class="star-size" name="governance"  :max="5" :value="1" :readonly="false"></vue-stars> -->
                   <b-form-rating name="governance" v-model="form.governance_scale" variant="warning" class="star-size mb-2"></b-form-rating>

                  </b-input-group>
                </b-col>

                <b-col sm="4 mt-4">
                    <label class="form-label" for="inline-form-input-username">Resource mobilization</label>
                  <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                    <!-- <vue-stars class="star-size" name="fund-raising"  :max="5" :value="1" :readonly="false"></vue-stars> -->
                   <b-form-rating name="fund-raising" v-model="form.fund_raising_scale" variant="warning" class="star-size mb-2"></b-form-rating>

                  </b-input-group>
                </b-col>

                <b-col sm="4 mt-4">
                    <label class="form-label" for="inline-form-input-username">Group Investments</label>
                  <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                    <!-- <vue-stars class="star-size" name="investment"  :max="5" :value="1" :readonly="false"></vue-stars> -->
                    <b-form-rating name="investment" v-model="form.investment_scale" variant="warning" class="star-size mb-2"></b-form-rating>

                  </b-input-group>
                </b-col>  

                </b-row>
                
              </b-tab>

              <b-tab title="Challenges and achievements" class="col-sm-12">

          <b-row>
                  <strong class="mb-3 col-sm-12">Achievements</strong>

                  
                  <b-col class="mb-4" sm="12" md="12" lg="12" v-for="(achievement, index) in achievements" :key="index">
                    <div class="row">
                      
                      <div class="form-group col-sm-5 w-100  d-none">
                          <label class="mr-2">Select</label>

                      <input v-model="achievement.type"  type="number" name="achievements[][type]" class="form-control white-input-text d-none">
                          

                      </div>
                      <div class="form-group col-sm-10 w-100">
                          <label class="mr-2">Details</label>
                          <input v-model="achievement.challenge_or_achievement" type="text" name="achievements[][challenge_or_achievement]" class="form-control white-input-text w-100" placeholder="Enter more details">
                      </div>
                      <div class="col-sm-2 w-100">
                          <label>&nbsp;</label>
                          <button type="button" v-on:click="removeAchievement(index)" class="btn btn-block btn-danger">
                              Remove
                          </button>
                      </div>
                  </div>
                  </b-col>
                  <b-col class="mb-3" sm="12" md="4" lg="4">

                    <button type="button" v-on:click="addNewAchievement" class="btn btn-block btn-info">
                    Add +
                    </button>
                  </b-col>
                  
          </b-row>

          <b-row>
                  <strong class="mb-3 col-sm-12">Challenges</strong>

                  
                  <b-col class="mb-4" sm="12" md="12" lg="12" v-for="(challenge, item) in challenges" :key="item">
                    <div class="row">
                      
                      <div class="form-group col-sm-5 w-100  d-none">
                          <label class="mr-2">Select</label>

                      <input v-model="challenge.type"  type="number" name="challenges[][type]" class="form-control white-input-text">
                          

                      </div>
                      <div class="form-group col-sm-10 w-100">
                          <label class="mr-2">Details</label>
                          <input v-model="challenge.challenge_or_achievement" type="text" name="challenges[][challenge_or_achievement]" class="form-control white-input-text w-100" placeholder="Enter more details">
                      </div>
                      <div class="col-sm-2 w-100">
                          <label>&nbsp;</label>
                          <button type="button" v-on:click="removeChallenge(item)" class="btn btn-block btn-danger">
                              Remove
                          </button>
                      </div>
                  </div>
                  </b-col>
                  <b-col class="mb-3" sm="12" md="4" lg="4">

                    <button type="button" v-on:click="addNewChallenge" class="btn btn-block btn-info">
                    Add +
                    </button>
                  </b-col>

          </b-row>

          <!-- <b-row>
            <b-col sm="12">
                <b-col class="mb-5 mt-5 " sm="12" md="6" lg="6">

                    <button type="button" v-on:click="saveChallenges" class="btn btn-block btn-success">
                    Save challenges and achievements
                    </button>
                  </b-col>
            </b-col>
          </b-row> -->

        </b-tab>

              <b-col sm="12">
                        <b-progress class="" variant="success" :value="tabIndex" :max="4" show-progress></b-progress>
                </b-col>
        </b-form>

        

      </b-tabs>

    <!-- Control buttons-->
    <div class="text-center">
      <b-button-group class="mt-2">
        <div v-if="tabIndex != 4">
        <b-button class="round-button mr-2" variant="info" @click="tabIndex--"><b>Prev</b></b-button>
        <b-button class="round-button mr-2" variant="info" @click="tabIndex++"><b>Next</b></b-button>
        </div>
      <div v-else>
        <b-button class="round-button mr-2" variant="info" @click="tabIndex--"><b>Prev</b></b-button>
        <b-button class="round-button mr-2" variant="info" @click="saveChallenges"><b>Submit</b></b-button>
        
      </div>        
      </b-button-group>

    </div>
  </div>
</template>

  <script>

// <style src="vue-multiselect/dist/vue-multiselect.min.css"></style>


import Vue from 'vue';
import axios  from 'axios';
import 'vue-multiselect/dist/vue-multiselect.min.css';
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";



    export default {
      mixins: [validationMixin],
      data() {
      return {
        
        countries: [],
        groupcategories: [],
        loancriteria: [],
        loanutilizations: [],
        records: [],
        group_activities:[],
        tabIndex: 0,
        challenges: [],
        achievements: [],
        dioceses:[],
        challenge: {
          challenge_or_achievement: '',
          type: 2
        },
        achievement: {
          challenge_or_achievement: '',
          type: 1
        },
        
        groupActivityId: 0,
        dropdownSelection: {},
        apiUrl: 'https://api.vsla.africa/api/',
        validations: {
          form :{
            group_name: {required, minLength: minLength(3)},
          }
        },

        form: {
          country_id: '',
          category_id: '',
          money_management_id:1,  
          group_name: '',
          cover_sponsor:'',
          longitude:0,
          latitude:0,
          group_admin_first_name:'',
          group_admin_middle_name:'',
          group_admin_last_name:'',
          group_admin_email: '',
          group_admin_phone_no: '',
          group_admin_identification_no: '',
          male_members_count: 0,
          female_members_count:0,
          has_constitution: "false",
          is_legally_registered: "false",
          has_mission_vision_statement:"false",
          has_digital_platforms: "false",
          has_Full_time_employees:"false",
          has_been_audited:"false",
          salary_percentage: 0,
          loan_criterion_id: "",
          group_dynamics_scale: 1,
          leadership_skills_scale: 1,
          record_keeping_scale: 1,
          handicraft_training_scale: 1,
          enterprise_development_scale: 1,
          financial_development_scale: 1,
          governance_scale: 1,
          fund_raising_scale: 1,
          investment_scale: 1,
          group_activities: [],
          group_loan_utilizations: [],
          group_record_types: [],
          challenges_and_achievements:[],
          group_product_types:[1,2],
          date_formed:'',
          auditing_date:''



        }
      }
    },
  mounted() {
    this.getCountries();
    this.GetGroupCategories();
    this.GetLoanCriteria();
    this.GetLoanUtilizations();
    this.GetRecordTypes();
    this.GetGroupActivities();
  
  },
  methods: {
    getCountries() {
       axios.get(this.apiUrl + 'Setup/GetCountries').then( response => {
        this.countries = response.data.response_data
      })
    },
    GetGroupCategories(){
      axios.get(this.apiUrl + 'Setup/GetGroupCategories').then( response => {
        this.groupcategories = response.data.response_data
      })
    },
    GetLoanCriteria(){
      axios.get(this.apiUrl + 'Setup/GetLoanCriteria').then( response => {
        this.loancriteria = response.data.response_data
      })
    },
    GetLoanUtilizations(){
      axios.get(this.apiUrl + 'Setup/GetLoanutilizations').then( response => {
        this.loanutilizations = response.data.response_data
      })
    },
    GetRecordTypes(){
      axios.get(this.apiUrl + 'Setup/GetRecordTypes').then( response => {
        this.records   = response.data.response_data
      })
    },
    GetGroupActivities(){
      axios.get(this.apiUrl + 'Setup/GetActivities?activity_type='+ this.groupActivityId).then( response => {
        this.group_activities   = response.data.response_data
      })
    },
    GetDioceses(){
      axios.get(this.apiUrl + 'Setup/GetDioceses?country_id='+ this.form.country_id).then( response => {
        this.dioceses = response.data.response_data
      })
    },
    addNewAchievement: function () {
      // this.form.challenges_and_achievements.push(Vue.util.extend({}, this.achievement));
      this.achievements.push(Vue.util.extend({}, this.achievement));
      console.log(this.form.challenges_and_achievements);
    },
    addNewChallenge: function () {
      // this.form.challenges_and_achievements.push(Vue.util.extend({}, this.achievement));
      this.challenges.push(Vue.util.extend({}, this.challenge));
      console.log(this.form.challenges_and_achievements);
    },
    removeChallenge: function (index) {
      // Vue.delete(this.form.challenges_and_achievements, index);
      Vue.delete(this.challenges, index);
    },
     removeAchievement: function (index) {
      // Vue.delete(this.form.challenges_and_achievements, index);
      Vue.delete(this.achievements, index);
    },
    saveChallenges: function () {
      this.form.challenges_and_achievements = [];
      if(this.challenges.length >0)
      {
        for(var i=0;i<this.challenges.length;i++)
        {
            this.form.challenges_and_achievements.push(this.challenges[i]);
        }
              
      }
      if(this.achievements.length >0)
      {
        for(var i=0;i<this.challenges.length;i++) {
              this.form.challenges_and_achievements.push(this.achievements[i]);
        }
      }
      console.log(this.form.challenges_and_achievements);

      this.validateBeforeSubmit();

    },
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.submitForm();
          return;
        }

        alert('Some information is missing! Kindly check for unfilled required fields.');
      });
    },
    submitForm(){
      console.log(this.form);

      axios.post(this.apiUrl+'Registration/RegisterNewGroup', this.form)
      .then( response => {
        if(response.data.status_code == 200)
        {
            this.$router.push({name:'allgroups'})
        }
        else
        {
          // console.log(error);
          alert(response.data.message);
        }
        
      })
      .catch((error) => {
        // error.response.status Check status code
        console.log(error);
        alert(error.title);
      });
    }

  }

  }
</script>

<style src="./GroupRegistration.scss" lang="scss"></style>
<!-- <style src="./vue-select.css"></style> -->


