<template>
  <div class="auth-page">
    <b-container>
      
      <Widget class="widget-auth mx-auto" title="<h3 class='mt-0'></h3>" customHeader>
      <img class="auth-logo mb-3 " src="/images/people/capa.png" alt="CAPA">
      <img class=" float-right image-height" src="/images/people/caid.png" alt="CAPA">
      <h2 class="">Login</h2>
        <p class="widget-auth-info">
         <b> Use your email to sign in.</b>
        </p>
        <form class="mt" @submit.prevent="login">
          <b-alert class="alert-sm" variant="danger" :show="showErrorMessage">
            {{errorMessage}}
          </b-alert>
          <b-form-group label="Email" label-for="email">
            <b-input-group>
              <b-input-group-text slot="prepend"><i class="la la-user text-white"></i></b-input-group-text>
              <input id="email"
                     ref="email"
                     class="form-control input-transparent text-dark pl-3"
                     type="text"
                     required
                     placeholder="Email"/>
            </b-input-group>
          </b-form-group>
          <b-form-group label="Password" label-for="password">
            <b-input-group>
              <b-input-group-text slot="prepend"><i class="la la-lock text-white"></i></b-input-group-text>
              <input id="password"
                     ref="password"
                     class="form-control input-transparent text-dark pl-3"
                     type="password"
                     required
                     placeholder="Password"/>
            </b-input-group>
          </b-form-group>
          <div class="bg-widget auth-widget-footer">
            <b-button type="submit" variant="danger" class="auth-btn mb-3" size="sm">
              <!-- <span class="auth-btn-circle">
                <i class="la la-caret-right"></i>
              </span> -->
              Login
            </b-button>
            <router-link class="d-block text-center mb-4" to="forgotpassword">Forgot Password</router-link>
            <!-- <p class="widget-auth-info mt-4">
              Don't have an account? Sign up now!
            </p>
            <router-link class="d-block text-center mb-4" to="login">Create an Account</router-link>
            <div class="social-buttons">
              <b-button variant="primary" class="social-button">
                <i class="social-icon social-google"></i>
                <p class="social-text">GOOGLE</p>
              </b-button>
              <b-button variant="success" class="social-button">
                <i class="social-icon social-microsoft"></i>
                <p class="social-text">MICROSOFT</p>
              </b-button>
            </div> -->
          </div>
        </form>
      </Widget>
    </b-container>
    <footer class="auth-footer">
      <!-- Light Blue Vue Admin Dashboard Template - Made by <a href="https://flatlogic.com" target="_blank">Flatlogic</a> -->
    </footer>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import axios  from 'axios';


export default {
  name: 'LoginPage',
  components: { Widget },
  data() {
    return {
      router: this.$router,
      errorMessage: null,
      showErrorMessage: false,
      details:[]
    };
  },
  methods: {
    login() {
      const email = this.$refs.email.value;
      const password = this.$refs.password.value;
      const t = this;

      if (email.length !== 0 && password.length !== 0) {
        axios.post('https://api.vsla.africa/api/Account/GetToken', {
          user_name: email,
          password: password
        })
        .then(function (response) {

          if(response.data.status_code == 200) {
            
            // window.localStorage.setItem('authenticated', true);

            t.$session.set("authenticated", true);

            t.$session.set("username", response.data.user_full_name);

            t.$session.set("role", response.data.roles);

            t.$session.set("user_id", response.data.user_id);

            t.$session.set("country_id", response.data.country_id);

            t.$session.set("diocese_id", response.data.diocese_id);

            t.$session.set("role_level", response.data.role_level);

            t.$session.set("country", response.data.country);

            if(response.data.roles == 'SUPERADMINISTRATOR') {
                t.router.push({name:'Dashboard'});
            }
            else if(response.data.roles == 'GROUPADMIN')
            {
              t.$router.push({name:'viewgroup', params:{group_id:response.data.group_id}});
            }
            else
            {
              t.router.push({name:'Dashboard'});
            }
            

          }
          else {
            t.showErrorMessage = true;
            t.errorMessage = response.data.message;
          } 
        })
        .catch(function (response) {

        });
        
      }
          
    },
  },
  created() {
    //  const router = this.$router;
    if (this.$session.get("authenticated") == true) {
      this.$router.push({name:'Dashboard'});
    }
  },
};
</script>

<style src="./Login.scss" lang="scss" />

