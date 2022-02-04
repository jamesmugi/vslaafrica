<template>
  <b-collapse class="sidebar-collapse" id="sidebar-collapse" :visible="sidebarOpened">
  <nav
    :class="{sidebar: true}"
  >
    <header class="logo">
      <img class="image-size mr-2" src="/images/people/capa.png" alt="CAPA">
      <img class="" src="/images/people/ca2.png" alt="CAPA">
      <br>    
    </header>
    <ul v-if="role != 'GROUPADMIN' " class="nav">


      <NavLink
              :activeItem="activeItem"
              header="Dashboard"
              link="/app/dashboard"
              iconName="flaticon-home"
              index="dashboard"
              isHeader
      />
      <!-- <h5 class="navTitle">Navigation</h5> -->

      <NavLink
              :activeItem="activeItem"
              header="Reports"
              link="/app/reports"
              index="reports"
              :childrenLinks="[
              { header: 'Regional', link: '/app/reports/regional' },
              { header: 'Periodical', link: '/app/reports/periodical' },
              { header: 'Group category', link: '/app/reports/groupcategories' },
              { header: 'Loan utilizations', link: '/app/reports/grouploanutilizations' },
              { header: 'Record keeping', link: '/app/reports/recordkeeping' },
              { header: 'Group activities', link: '/app/reports/groupactivities' },
              { header: 'Member education level', link: '/app/reports/membereducationlevel' }

        ]"
      />
      

      <NavLink
              :activeItem="activeItem"
              header="Groups"
              link="/app/groups"
              index="groups"
              :childrenLinks="[
              { header: 'All groups', link: '/app/groups/all' },
              { header: 'Group Registration', link: '/app/groups/registration' },
        ]"
      />
      <NavLink
              :activeItem="activeItem"
              header="Setup"
              link="/app/setup"
              index="setup"
              :childrenLinks="[
              { header: 'Loan utilizations', link: '/app/setup/loanutilizations' },
              { header: 'Loan criteria', link: '/app/setup/loancriteria' },
              { header: 'Record types', link: '/app/setup/recordtypes' },
              { header: 'Product types', link: '/app/setup/producttypes' },
              { header: 'Group activities', link: '/app/setup/groupactivities' },
              { header: 'Group categories', link: '/app/setup/groupcategories' },
              { header: 'Money management', link: '/app/setup/moneymanagement' },
              ]"
      />

      <NavLink
              :activeItem="activeItem"
              header="All users"
              link="/app/users"
              index="users"
              :childrenLinks="[
              { header: 'Users', link: '/app/users/'},
        ]"
      />

    </ul>


  </nav>
  </b-collapse>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import NavLink from './NavLink/NavLink';

export default {
  name: 'Sidebar',
  components: { NavLink },
  data() {
    return {
      alerts: [
        {
          id: 0,
          title: 'Sales Report',
          value: 15,
          footer: 'Calculating x-axis bias... 65%',
          color: 'primary',
        },
        {
          id: 1,
          title: 'Personal Responsibility',
          value: 20,
          footer: 'Provide required notes',
          color: 'danger',
        },
      ],
      userName: this.$session.get("username"),
      role : this.$session.get("role"),
    };
  },
  methods: {
    ...mapActions(['changeSidebarActive', 'switchSidebar']),
    setActiveByRoute() {
      const paths = this.$route.fullPath.split('/');
      paths.pop();
      this.changeSidebarActive(paths.join('/'));
    },
  },
  created() {
    this.setActiveByRoute();
  },
  computed: {
    ...mapState({
      sidebarOpened: state => !state.sidebarClose,
      activeItem: state => state.sidebarActiveElement,
    }),
  },
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
