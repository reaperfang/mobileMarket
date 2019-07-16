<template>
  <div :class="classObj" class="app-wrapper">
    <!-- <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"/> -->
    <!-- <sidebar class="sidebar-container"/> -->
    <div class="sidebar-lefter">
      <div class="logo-con">
        <img :src="require('@/assets/images/logo.png')" class="logo">
      </div>
      <ul>
        <li :class="{active: index == current}" @click="menuHandler(index)" v-if="!item.hidden && item.children" 
          v-for="(item, index) in permission_routers_tree">
          <i :class="{[item.meta.icon]: true, 'el-icon-setting': true}"></i>
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="main-container">
      <navbar/>
      <!-- <tags-view/> -->
      <app-main/>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain, TagsView } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Layout',
  data() {
    return {
      
    }
  },
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TagsView
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      current: state => state.menu.current,
    }),
    ...mapGetters([
      'permission_routers_tree',
    ]),
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    ...mapMutations(['SETCURRENT']),
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    },
    menuHandler(index) {
      this.SETCURRENT(index)
      console.log(this.$store.state.menu.current)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    .sidebar-lefter {
      background-color: #2c2d53;
      width: 120px;
      height: 100%;
      position: fixed;
      left: 0;
      top: 0;
      color: #9596a9;
      font-size:16px;
      ul li {
        padding: 20px 0 20px 17px;
        display: flex;
        align-items: center;
        &.active {
          border-left: 4px solid #655eff;
          background-color: #4b4c6c;
        }
        i {
          margin-right: 9px;
        }
        span {
          overflow:hidden;
          text-overflow:ellipsis;
          padding-right: 5px;
        }
        &:first-child {
          margin-top: 15px;
        }
      }
      &.active {
        color: #fff;
        border-left: 4px solid #655eff;
      }
      .logo-con{
        display: flex;
        justify-content: center;
        margin-top: 17px;
      }
      .logo{
        width: 60px;
      }
    }
    .main-container {
      flex: 1;
    }
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
</style>
