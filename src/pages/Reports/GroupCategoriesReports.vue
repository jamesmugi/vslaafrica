<template>
  <div class="tables-basic">
    <b-breadcrumb>
      <!-- <b-breadcrumb-item>YOU ARE HERE</b-breadcrumb-item> -->
      <!-- <b-breadcrumb-item active>Tables Basic</b-breadcrumb-item> -->
    </b-breadcrumb>
    <h2 class="page-title">Group categories reports</h2>
    <b-row>
      <b-col>
        <Widget
           
        >
          <div class="table-resposive">
            <table class="table">
              <thead>
                <tr>
                  <th class="hidden-sm-down">#</th>
                  <th>Category name</th>
                  <th>No. of groups</th>

                </tr>
              </thead>
              <tbody>
                <tr v-for="row in reports" :key="row.id">
                  <td>{{row.id}}</td>
                  <td>
                    {{row.category_name}}
                  </td>

                  <td>
                    {{row.count}}
                  </td>

                </tr>
              </tbody>
            </table>
          </div>

        </Widget>
      </b-col>
    </b-row>
    <b-row>

   </b-row>
  </div>
</template>

<script>
import Vue from 'vue';
import Widget from '@/components/Widget/Widget';
import Sparklines from '../../components/Sparklines/Sparklines'
import axios  from 'axios';

export default {
  name: 'Tables',
  components: { Widget, Sparklines },
  data() {
    return {
      reports: [],
      apiUrl: 'https://api.vsla.africa/api/',
      checkboxes1: [false, false, false, false],
      checkboxes2: [false, false, false, false, false, false],
      checkboxes3: [false, false, false, false, false, false],
    };
  },
  mounted()
  {
    this.GetReports();
  },
  methods: {
    parseDate(date) {
      const dateSet = date.toDateString().split(' ');
      return `${date.toLocaleString('en-us', { month: 'long' })} ${dateSet[2]}, ${dateSet[3]}`;
    },
    checkAll(ev, checkbox) {
      const checkboxArr = (new Array(this[checkbox].length)).fill(ev.target.checked);
      Vue.set(this, checkbox, checkboxArr);
    },
    changeCheck(ev, checkbox, id) {
      this[checkbox][id] = ev.target.checked;
      if (!ev.target.checked) {
        this[checkbox][0] = false;
      }
    },
    getRandomData() {
      const result = [];

      for (let i = 0; i <= 8; i += 1) {
        result.push(Math.floor(Math.random() * 20) + 1);
      }

      return [{data: result}];
    },
    getRandomColor() {
      const colors = ['#547fff', '#9964e3', '#f55d5d', '#ffc247', '#3abf94'];
      return {colors: [colors[Math.floor(Math.random() * colors.length)]]}
    },
    GetReports(){
      axios.post(this.apiUrl + 'Report/GroupCategoriesReport').then( response => {
        this.reports = response.data.response_data
      })
    },
  },
};
</script>

<style src="./Tables.scss" lang="scss" scoped />
