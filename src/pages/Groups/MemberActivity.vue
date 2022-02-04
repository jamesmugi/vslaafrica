<template>
  <div>
      <div sm="12">
      <b-row class="mb-3">
          <div class="col-sm-12 col-lg-6">
                <h3 class="page-title float-left"> {{entries.name}}'s details&nbsp;</h3>
          </div>
          <div class="col-sm-12 col-lg-6">
              <b-button class="float-right round-button" variant="outline-primary" v-b-modal.modal-1>Add product entry</b-button>
          </div>
          <b-modal id="modal-1" title="Add product entry" @ok="addEntry">
            <b-form>
              <b-col class="mt-4">
                      <label class=" form-label modal-label" for="country">Select product type</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                      <multiselect @select="onSelectedOption($event)" track-by="id"  :options="product_types" label="name"></multiselect>
                      </b-input-group>

              </b-col>

              <b-col class="mt-4" v-if="productType==1">
                      <label class=" form-label modal-label" for="country">Select entry type</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                        <multiselect track-by="id"  v-model="form.debit_credit"  :options="credit_options.map(credit => credit.id)" :custom-label="opt => credit_options.find(x => x.id == opt).name"></multiselect>
                      </b-input-group>

              </b-col>

              <b-col class="mt-4" v-if="productType==2">
                      <label class=" form-label modal-label" for="country">Select entry type</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                        <multiselect track-by="id"  v-model="form.debit_credit"  :options="debit_options.map(debit => debit.id)" :custom-label="opt => debit_options.find(x => x.id == opt).name"></multiselect>
                      </b-input-group>

              </b-col>

              <b-col class="mt-4" v-if="form.product_id == 1 && form.debit_credit == 1">
                      <label class=" form-label modal-label" for="country">Select what the loan will be used for</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                      <multiselect :multiple="true" v-model="form.loan_utilization_id" :options="loanutilizations.map(utilization => utilization.id)" :custom-label="opt => loanutilizations.find(x => x.id == opt).name"></multiselect>                      </b-input-group>

              </b-col>

              <b-col class="mt-4" >
                      <label class=" form-label modal-label" for="country">Currency</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                      <b-form-input readonly label="Enter the amount " class="mb-3 white-input-text" id="amount" v-model="form.currency_abbreviation" type="text" placeholder="Enter the amount" required ></b-form-input>
                      </b-input-group>

              </b-col>

              <b-col class="mt-4" >
                      <label class=" form-label modal-label" for="country">Enter the amount</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                      <b-form-input label="Enter the amount " class="mb-3 white-input-text" id="amount" v-model="form.amount" type="text" placeholder="Enter the amount" required ></b-form-input>
                      </b-input-group>

              </b-col>

              <b-col class="mt-4">
                      <label class=" form-label modal-label" for="country">Enter a description</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                      <b-form-input label="Enter a description " class="mb-3 white-input-text" id="description" v-model="form.description" type="text" placeholder="Enter a description for this product entry" required ></b-form-input>
                      </b-input-group>

              </b-col>


          

              <b-col class="mt-4 ">
                      <label class=" form-label modal-label" for="country">Select the date of the product entry</label>
                      <b-input-group class="mb-3 mr-1 mb-sm-3 ">
                          <datepicker class="" v-model="form.transaction_date" name="transaction_date" :bootstrap-styling=true format="yyyy-MM-dd"	></datepicker>
                      </b-input-group>

              </b-col>
             
            </b-form>
          </b-modal>
      </b-row>
       </div>
      
      <div sm="12" class="mb-5">
          <b-card-group deck>
            <b-card title="Total deposits" class="text-center card-color">
            <b-card-text>
                <v-icon name="piggy-bank" scale="3"></v-icon>
                <br>
                <h5 class="mt-3 text-white">
                    ${{ Number(entries.total_credit).toLocaleString() }}
                </h5>
                
            </b-card-text>
            <template #footer>
                <!-- <small class="text-muted">Last updated 3 mins ago</small> -->
            </template>
            </b-card>

            <b-card title="Total withdrawals" class="text-center card-color">
            <b-card-text>
                <v-icon name="hand-holding-usd" scale="3"></v-icon>
                <br>
                <h5 class="mt-3 text-white">
                    ${{ Number(entries.total_debit).toLocaleString() }}
                </h5>
                
            </b-card-text>
            <template #footer>
                <!-- <small class="text-muted">Last updated 3 mins ago</small> -->
            </template>
            </b-card>

        </b-card-group>
      </div>
      <div sm="12" class="mt-4">
          <h4>Ministatement</h4>
            <b-table responsive striped hover :items="entries.ministatement" :fields="options">
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
        t : this,
        product_types:[],
        productType: 1,
        group_id:this.$route.params.group_id,
        currencies: [],
        credit_options:[{name:"Repayment", id:2}, {name:"Request", id:1}],
        debit_options:[{name:"Deposit", id:2}, {name:"Withdrawal", id:1}],
        loanutilizations:[],
        member_id: this.$route.params.member_id,
        options : ['product_type', 'description','amount','currency','amount_lcy', 'date'],
        entries: [],
        apiUrl: 'https://api.vsla.africa/api/',
        form: {
          amount: '',
          debit_credit: '',
          loan_utilization_id: 0,
          transaction_date: '',
          member_id:this.$route.params.member_id,
          product_id:'',
          description:'',
          currency_abbreviation:this.$store.state.currency
        }
        }
    },
    mounted() {
    this.GetMember();
    // this.GetChartData();
    this.GetProductTypes(); 
    this.GetLoanUtilizations();
    this.GetCurrencies();

  },
  methods: {
    GetCurrencies() {
      axios.post(this.apiUrl + 'Registration/GetMember', {member_id: this.member_id}).then( response => {
        this.entries = response.data.response_data
      })
    },
    GetMember(){
      axios.post(this.apiUrl + 'Registration/GetMember', {member_id: this.member_id}).then( response => {
        this.entries = response.data.response_data
      })
    },
    GetProductTypes() {
      console.log(this.group_id);
      axios.get(this.apiUrl + 'Setup/GetProductTypes?group_id=' +this.group_id).then( response => {
        this.product_types = response.data.response_data;
        console.log(this.product_types);
      })
    },
    viewMemberActivity(id){
      this.$router.push('/app/groups/view/:id');
    },
    GetLoanUtilizations(){
      axios.get(this.apiUrl + 'Setup/GetLoanutilizations').then( response => {
        this.loanutilizations = response.data.response_data
      })
    },
    addEntry()
    {
      console.log(this.form)
      axios.post(this.apiUrl + 'Loan/AddProductEntry', this.form).then( response => {
        if(response.data.status_code == 200)
        {
          this.GetMember();
        }
        else{
          alert('Failed');
        }
      })
    },
    onSelectedOption(selectedOption){
        console.log(selectedOption);
        this.form.product_id = selectedOption.id;
        console.log(this.form.product_id)

        if(selectedOption.type === 1)
        {
          this.productType = 1;

        }
        else{
          this.productType = 2
        }

    }

  }
  }
</script>

<style src="./MemberActivity.scss" lang="scss"></style>
