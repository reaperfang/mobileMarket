<script>
import "../decorate.scss";
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
  }
};
</script>	
