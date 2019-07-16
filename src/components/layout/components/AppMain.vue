<template>
  <section class="app-main">
    <div class="content-box">
      <div class="content-menu">
        <sidebar class="sidebar-righter" />
      </div>
      <div class="content-main">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="cachedViews">
            <router-view :key="key"/>
          </keep-alive>
        </transition>
      </div>
    </div>
  </section>
</template>

<script>
import Sidebar from './Sidebar'

export default {
  name: 'AppMain',
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.fullPath
    }
  },
  components: {
    Sidebar
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  min-height: calc(100vh - 84px);
  width: 100%;
  position: relative;
  overflow: hidden;
  .content-box {
    display: flex;
    .content-menu {
      margin-right: 15px;
    }
    .content-main {
      flex: 1;
    }
  }
}
</style>
<style>
.el-card.is-always-shadow{
  margin-bottom:24px;
  box-shadow:5px 5px 10px 0px rgba(229,239,255,1) !important;
  border-radius:20px !important;
}
</style>


