<template>
  <div class="navbar">
    <div class="navbar-item">[ 新零售-电商豪华版 ] 剩余有效期</div>
    <div class="navbar-item"></div>
    <div class="right-menu">
      <!-- <i class="el-icon-s-custom"/> -->
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          {{(userInfo && userInfo.userName) || '用户名称' }}
          <!-- <img :src="avatar+'?imageView2/1/w/80/h/80'" class="user-avatar"> -->
          <i class="el-icon-caret-bottom"/>
        </div>
        <el-dropdown-menu slot="dropdown">
          <!--<router-link to="/">-->
            <!--<el-dropdown-item>-->
              <!--{{ $t('navbar.dashboard') }}-->
            <!--</el-dropdown-item>-->
          <!--</router-link>-->
          <!--<el-dropdown-item >-->
            <!--<router-link to="/profile/password">-->
              <!--资质认证-->
            <!--</router-link>-->
          <!--</el-dropdown-item>-->

          <!-- <el-dropdown-item>
            <router-link to="/profile/password">
              密码修改
            </router-link>
          </el-dropdown-item> -->
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Hamburger,
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'device'
    ])
  },
  computed: {
    'userInfo'() {
      return this.$store.getters.userInfo
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 60px;
  width: 100%;
  line-height: 64px;
  border-radius: 0px !important;
  background:#fff;
  color: #92929B;
  padding-left: 20px;
  font-size:14px;
  position: fixed;
  left: 120px;
  top: 0;
  z-index: 1000;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    display: none;
    float: right;
    height: 100%;
    margin-right: 20px;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
