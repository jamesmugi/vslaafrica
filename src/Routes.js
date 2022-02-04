import Vue from 'vue';
import Router from 'vue-router';
import Vuex from 'vuex';
import vSelect from 'vue-select';
import { VueStars } from "vue-stars";
import 'vue-awesome/icons';
import Icon from 'vue-awesome/components/Icon';
import Datepicker from 'vuejs-datepicker';
import VueCloneya from 'vue-cloneya'


import Layout from '@/components/Layout/Layout';
import LayoutDashboard from '@/components/Layout/LayoutDashboard';
import Typography from '@/pages/Typography/Typography';
import Tables from '@/pages/Tables/Tables';
import Notifications from '@/pages/Notifications/Notifications';
import Icons from '@/pages/Icons/Icons';
import Maps from '@/pages/Maps/Maps';
import Charts from '@/pages/Charts/Charts';
import Dashboard from '@/pages/Visits/Visits';
import Login from '@/pages/Login/Login';
import ForgotPassword from '@/pages/Login/ForgotPassword';
import ErrorPage from '@/pages/Error/Error';
import GroupRegistration from '@/pages/Groups/GroupRegistration';
import MemberRegistration from '@/pages/Groups/MemberRegistration';
import AllGroups from '@/pages/Groups/AllGroups';
import SingleGroup from '@/pages/Groups/SingleGroup';
import EditGroup from '@/pages/Groups/EditGroup';
import MemberActivity from '@/pages/Groups/MemberActivity';
import RegionalReports from '@/pages/Reports/RegionalReports';
import PeriodicalReports from '@/pages/Reports/PeriodicalReports';
import GroupCategoriesReports from '@/pages/Reports/GroupCategoriesReports';
import RecordTypesReports from '@/pages/Reports/RecordTypesReports';
import GroupActivitiesReports from '@/pages/Reports/GroupActivitiesReports';
import LoanUtilizationsReports from '@/pages/Reports/LoanUtilizationsReports';
import MemberEducationReports from '@/pages/Reports/MemberEducationReports';
import Countries from '@/pages/Setup/Countries';
import Dioceses from '@/pages/Setup/Dioceses';
import ProductTypes from '@/pages/Setup/ProductTypes';
import Provinces from '@/pages/Setup/Provinces';
import LoanCriteria from '@/pages/Setup/LoanCriteria';
import GroupActivities from '@/pages/Setup/GroupActivities';
import LoanUtilizations from '@/pages/Setup/LoanUtilizations';
import MoneyManagement from '@/pages/Setup/MoneyManagement';
import RecordTypes from '@/pages/Setup/RecordTypes';
import GroupCategories from '@/pages/Setup/GroupCategories';
import Users from '@/pages/Users/Users';




import Multiselect from 'vue-multiselect';

Vue.use(Vuex)


Vue.use(Router);
// Vue.use(VueCloneya);

Vue.component("vue-stars", VueStars);
Vue.component('v-select', vSelect);
Vue.component('multiselect', Multiselect);
Vue.component('v-icon', Icon);
Vue.component('datepicker', Datepicker);





export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/forgotpassword',
      name: 'ForgotPassword',
      component: ForgotPassword,
    },
    {
      path: '/error',
      name: 'Error',
      component: ErrorPage,
    },
    // {
    //   path: '/app/dashboard',
    //   name: 'dashboard',
    //   component: LayoutDashboard,
    // },
    {
      path: '/app',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
        },
        {
          path: 'users',
          name: 'Users',
          component: Users,
        },
        {
          path: 'typography',
          name: 'Typography',
          component: Typography,
        },
        {
          path: 'tables',
          name: 'Tables',
          component: Tables,
        },
        {
          path: 'notifications',
          name: 'Notifications',
          component: Notifications,
        },
        {
          path: 'components/icons',
          name: 'Icons',
          component: Icons,
        },
        {
          path: 'components/maps',
          name: 'Maps',
          component: Maps,
        },
        {
          path: 'components/charts',
          name: 'Charts',
          component: Charts,
        },
        {
          path: 'groups/registration',
          name: 'Group Registration',
          component: GroupRegistration
        },
        
        {
          path: 'groups/members/registration/:group_id',
          name: 'memberregistration',
          component: MemberRegistration,
          props:true
        },
        {
          path: 'groups/all',
          name: 'allgroups',
          component: AllGroups
        },
        {
          path: 'groups/view/:group_id',
          name: 'viewgroup',
          component: SingleGroup,
          props:true
        },
        {
          path: 'groups/edit/:group_id',
          name: 'editgroup',
          component: EditGroup,
          props:true
        },
        {
          path: 'groups/view/members/:group_id/:member_id',
          name: 'memberactivity',
          component: MemberActivity,
          props:true
        },
        {
          path: 'setup/loanutilizations',
          name: 'loanutilizations',
          component: LoanUtilizations,
        },
        {
          path: 'setup/loancriteria',
          name: 'loancriteria',
          component: LoanCriteria,
        },
        {
          path: 'setup/producttypes',
          name: 'producttypes',
          component: ProductTypes,
        },
        {
          path: 'setup/recordtypes',
          name: 'recordtypes',
          component: RecordTypes,
        },
        {
          path: 'setup/groupactivities',
          name: 'groupactivities',
          component: GroupActivities,
        },
        {
          path: 'setup/groupcategories',
          name: 'groupcategories',
          component: GroupCategories,
        },
        {
          path: 'setup/moneymanagement',
          name: 'moneymanagement',
          component: MoneyManagement,
        },
        {
          path: 'setup/provinces',
          name: 'provinces',
          component: Provinces,
        },
        {
          path: 'setup/countries',
          name: 'countries',
          component: Countries,
        },
        {
          path: 'setup/dioceses',
          name: 'dioceses',
          component: Dioceses,
        },

        // reports

        {
          path: 'reports/regional',
          name: 'regionalreports',
          component: RegionalReports,
        },
        {
          path: 'reports/periodical',
          name: 'periodicalreports',
          component: PeriodicalReports,
        },
        {
          path: 'reports/groupcategories',
          name: 'groupcategoriesreports',
          component: GroupCategoriesReports,
        },

        {
          path: 'reports/grouploanutilizations',
          name: 'grouploanutilizationsreports',
          component: LoanUtilizationsReports,
        },

        {
          path: 'reports/recordkeeping',
          name: 'recordkeepingreports',
          component: RecordTypesReports,
        },

        {
          path: 'reports/groupactivities',
          name: 'groupactivitiesreports',
          component: GroupActivitiesReports,
        },

        {
          path: 'reports/membereducationlevel',
          name: 'membereducationreports',
          component: MemberEducationReports,
        },
        
      ],
    },
   
    {
      path: '*',
      name: 'Login',
      component: Login,
    },
    
  ],
});
