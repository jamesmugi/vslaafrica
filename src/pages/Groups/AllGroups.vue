<template >
  <div class="tables-basic" >
      <h1 class="page-title"> All Groups&nbsp;</h1>
      <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Sort"
          label-for="sort-by-select"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
          v-slot="{ ariaDescribedby }"
        >
          <b-input-group size="sm">
            <b-form-select
              id="sort-by-select"
              v-model="sortBy"
              :options="sortOptions"
              :aria-describedby="ariaDescribedby"
              class="w-75 white-input-text"
            >
              <template #first>
                <option value="">-- none --</option>
              </template>
            </b-form-select>

            <b-form-select
              v-model="sortDesc"
              :disabled="!sortBy"
              :aria-describedby="ariaDescribedby"
              size="sm"
              class="w-25"
            >
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>


      <b-col lg="6" class="my-1">
        <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filter-input"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
              class="white-input-text"
            ></b-form-input>

            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col lg="6" class="my-1 dark-text white-text-background">
        <b-form-group
          v-model="sortDirection"
          label="Filter On"
          description="Leave all unchecked to filter on all data"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0 white-text-background"
          v-slot="{ ariaDescribedby }"
        >
          <b-form-checkbox-group
            v-model="filterOn"
            :aria-describedby="ariaDescribedby"
            class="mt-1 white-text-background"
          >
            <b-form-checkbox value="province">Province</b-form-checkbox>
            <b-form-checkbox value="country">Country</b-form-checkbox>
            <b-form-checkbox value="diocese">Diocese</b-form-checkbox>
            <b-form-checkbox value="isLegallyRegistered">Legally registered</b-form-checkbox>
            <b-form-checkbox value="hasConstitution">Has constitution</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>

      <b-col sm="5" md="6" class="my-1">
        <b-form-group
          label="Per page"
          label-for="per-page-select"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
          label-align-sm="right"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
            class="white-input-text"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>
      <Widget
        >
        <div class="table-resposive">
        <b-table responsive striped hover :items="groups" :fields="fields" :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filter-included-fields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      stacked="md"
      show-empty>
            <template #cell(actions)="data">
            <b-button class="round-button" variant="outline-primary" @click="viewGroup(data.item.id)">View</b-button><br>
            <!-- <b-button class="round-button" variant="outline-success" @click="editGroup(data.item.id)">Edit</b-button> -->

          </template>
        </b-table>
        </div>
    </Widget>
  </div>
</template>

<script>
import axios  from 'axios';

  export default {
    data() {
      return {
    fields : [
      { key: 'group_name', label: 'Group name', sortable: true, sortDirection: 'desc' },
      { key: 'province', label: 'Province', sortable: true },
      { key: 'country', label: 'Country', sortable: true },
      { key: 'male_members', label: 'Male members'},
      { key: 'female_members', label: 'Female members'},
      { key: 'diocese', label: 'Diocese', sortable: true },
      { key: 'category', label: 'Category', sortable: true },
      { key: 'isLegallyRegistered', label: 'Legally registered', sortable: true },
      { key: 'hasConstitution', label: 'Has Constitution', sortable: true },
      { key: 'actions', label: 'Actions' }
      ],
    groups: [],
    apiUrl: 'https://api.vsla.africa/api/',
    totalRows: 1,
    currentPage: 1,
    perPage: 100,
    pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
    sortBy: '',
    sortDesc: false,
    sortDirection: 'asc',
    filter: null,
    filterOn: [],
    infoModal: {
      id: 'info-modal',
      title: '',
      content: ''
    }
  }
},
mounted() {
this.GetGroups();
},
computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },

  methods: {
    GetGroups(){
      if(this.$session.get("role_level") === 3){
        axios.post(this.apiUrl + 'Registration/GetGroups', {country_id: this.$session.get("country_id")}).then( response => {
        
        this.groups = response.data.response_data
      })
      } else if(this.$session.get("role_level") === 4){
        console.log(this.$session.get("country_id"), this.$session.get("diocese_id"))
        axios.post(this.apiUrl + 'Registration/GetGroups', {country_id: this.$session.get("country_id"), diocese_id: this.$session.get("diocese_id")}).then( response => {
        
        this.groups = response.data.response_data
        console.log(this.groups)
        })} else {
          console.log(this.$session.get("country_id"))
          axios.post(this.apiUrl + 'Registration/GetGroups', {}).then( response => {
        
        this.groups = response.data.response_data
      })
      }
      
    },
    viewGroup(group_id){
        console.log(group_id);
      this.$router.push({name:'viewgroup', params:{group_id:group_id}});
    },
    editGroup(group_id){
        console.log(group_id);
      this.$router.push({name:'editgroup', params:{group_id:group_id}});
    },
    onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      }

  }
  }
</script>
<style src="./AllGroups.scss" lang="scss"></style>