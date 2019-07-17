<template>
  <div class="righter-bar">
    <div class="righter-bar-content">
      <div v-for="item in sidebarItems" class="item">
        <template v-if="item.children">
          <h2>{{item.name}}</h2>
          <div v-for="child in item.children" class="item-child">
            <router-link active-class="active" :to="resolvePath(item.path, child.path)">{{child.name}}</router-link>
          </div>
        </template>
        <template v-else-if="item.tabTitle">
          <h2>{{item.tabTitle}}</h2>
          <div v-for="child in item.data" class="item-child">
            <router-link active-class="active" :to="resolvePath(child.path)">{{child.name}}</router-link>
          </div>
        </template>
        <template v-else>
          <router-link active-class="active" :to="resolvePath(item.path)">{{item.name}}</router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import path from 'path'

var isExternal = function(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export default {
  data() {
    return {
      sidebarItems: [],
      basePath: ''
    }
  },
  components: { },
  computed: {
    ...mapState({
      current: state => state.menu.current,
    }),
    ...mapGetters([
      'permission_routers',
      'permission_routers_tree',
    ]),
  },
  created() {
    this.setSidebarItems()
  },
  methods: {
    handleTabTitle(arr) {
      var map = {},
          dest = [];
      for(var i = 0; i < arr.length; i++){
          var ai = arr[i];
          if(!map[ai.meta.tabTitle]){
              dest.push({
            tabTitle: ai.meta.tabTitle,
                  id: ai.id,
                  name: ai.name,
                  data: [ai]
              });
              map[ai.meta.tabTitle] = ai;
          }else{
              for(var j = 0; j < dest.length; j++){
                  var dj = dest[j];
                  if(dj.tabTitle == ai.meta.tabTitle){
                      dj.data.push(ai);
                      break;
                  }
              }
          }
      }

      return dest
    },
    setSidebarItems() {
      let _permission_routers_tree = JSON.parse(JSON.stringify(this.permission_routers_tree))
      let _path = _permission_routers_tree[this.current].path
      let children = _permission_routers_tree[this.current].children

      children.forEach(val => {
        val.path = _path + '/' + val.path
      })

      if(children.some(val => val.meta.tabTitle)) {
        children = this.handleTabTitle(children)
      }
      this.sidebarItems = children
    },
    resolvePath(...routePath) {
      if (this.isExternalLink(routePath)) {
        return routePath
      }
      return path.resolve(this.basePath, ...routePath)
    },
    isExternalLink(routePath) {
      return isExternal(routePath)
    },
  },
  watch: {
    current() {
      this.setSidebarItems()
    }
  }
}
</script>

<style lang="scss" scoped>
  .righter-bar {
    .righter-bar-content {
      height: 680px;
      overflow-y: scroll;
    }
    font-size: 14px;
    border-top: 1px solid #f2f2f9;
    position: fixed;
    left: 120px;
    top: 60px;
    z-index: 10000;
    background-color: #fff;
    width: 122px;
    height: 100%;
    .item {
      border-bottom: 1px solid #f2f2f5;
      padding-top: 23px;
      padding-bottom: 20px;
      a {
        color: #92929B;
        padding: 8px;
        border-radius: 15px;
        &.active {
          background-color: #f0efff;
          color: #7f79ff;
        }
      }
      &:last-child {
        border: none;
      }
      h2, .item-child {
        padding: 10px 0;
      }
      h2 {
        font-family:PingFangSC-Medium;
        font-weight:bold;
        color:#161617;
        line-height:20px;
        font-size: 14px;
      }
      .item-child {
        margin-top: 10px;
        
      }
    }
  }
</style>

