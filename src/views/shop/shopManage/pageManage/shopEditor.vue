<template>
  <div class="editor-wrapper">
    <widgetView></widgetView>
    <editView></editView>
    <propView></propView>
  </div>
</template>

<script>
import widgetView from '../../decorate/widgetView';
import editView from '../../decorate/editView';
import propView from '../../decorate/propView';
export default {
  name: "shopEditor",
  components: {widgetView, editView, propView},
  data() {
    return {
    };
  },
  mounted() {
  },
  watch:{

  }
};
</script>

<style lang="scss" scoped>
.editor-wrapper{
  display:flex;
  flex-direction: row;
}
</style>
