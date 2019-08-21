<script>
export default {
  name: "componentMixin",
  props: ["data"],
  computed: {
    currentComponentId() {
      return this.data.id;
    },
    componentDataMap() {
      return this.$store.getters.componentDataMap || {};
    },
    currentComponentData() {
      return this.componentDataMap[this.currentComponentId] || {};
    }
  },
  created(){
      this.decoration && this.decoration();
  },
  watch: {
      data: {
        handler(newValue) {
          this.decoration && this.decoration();
        },
        deep: true
      },
      'currentComponentData.data.ids': { 
        handler(newValue) {
            this.fetch && this.fetch();
        },
        deep: true
      }
    },
};
</script>	
