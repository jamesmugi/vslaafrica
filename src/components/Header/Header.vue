<template>
  <b-navbar toggleable="md" class="app-header d-print-none">
    <!-- <img class="image-size" src="/images/people/capa.png" alt="CAPA"> -->
    <b-navbar-nav class="navbar-nav-mobile ml-auto">
      <!-- <img class="" src="/images/people/ca2.png" alt="CAPA">
       -->
      <b><span class="ml-2 text-white"><strong class="text-white">Hello {{userName}}</strong></span></b>
      
        
        <!-- <b-nav-item-dropdown right menu-class="py-0">
          <template slot="button-content">
            <span class="small">Jeremy Kinyua</span>
          </template>
          <notifications />
        </b-nav-item-dropdown> -->

        <b-nav-item class="d-md-down-none" @click="logout">
          <i class="la la-power-off px-2" />
        </b-nav-item>
        <b-nav-item class="d-md-none" @click="switchSidebarMethod" >
          <i class="la la-navicon px-2" />
        </b-nav-item>
      </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Notifications from '@/components/Notifications/Notifications';

export default {
  name: 'Header',
  components: { Notifications },
  data() {
    return {
      showNavbarAlert: true,
      userName: this.$session.get("username")
    }
  },
  computed: {
    ...mapState({
      sidebarClose: state => state.sidebarClose,
      sidebarStatic: state => state.sidebarStatic,
    }),
  },
  methods: {
    ...mapActions(['toggleSidebar', 'toggleChat', 'switchSidebar', 'changeSidebarActive']),
    switchSidebarMethod() {
      if (!this.sidebarClose) {
        this.switchSidebar(true);
        this.changeSidebarActive(null);
      } else {
        this.switchSidebar(false);
        const paths = this.$route.fullPath.split('/');
        paths.pop();
        this.changeSidebarActive(paths.join('/'));
      }
    },
    logout() {
      // window.localStorage.setItem('authenticated', false);
      this.$session.set("authenticated", false);
      this.$router.push('/login');
    },
  },
};
</script>

<style src="./Header.scss" lang="scss" />
