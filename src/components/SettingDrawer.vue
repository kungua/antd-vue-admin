<template>
  <div>
    <a-drawer
      :visible="visible"
      :closable="false"
      @close="onClose"
      width="300px"
      placement="right"
    >
      <template v-slot:handle>
        <div @click="visible = !visible" class="handle">
          <a-icon :type="visible ? 'close' : 'setting'" />
        </div>
      </template>

      <h2>整体风格定制</h2>
      <a-radio-group
        :value="$route.query.navTheme || 'dark'"
        @change="e => handleSettingChange('navTheme', e.target.value)"
      >
        <a-radio value="dark">黑色</a-radio>
        <a-radio value="light">白色</a-radio>
      </a-radio-group>
      <h2>导航模式定制</h2>
      <a-radio-group
        :value="$route.query.navLayout || 'left'"
        @change="e => handleSettingChange('navLayout', e.target.value)"
      >
        <a-radio value="left">左侧</a-radio>
        <a-radio value="top">顶部</a-radio>
      </a-radio-group>
    </a-drawer>
  </div>
</template>

<script>
export default {
  name: "SettingDrawer",
  data() {
    return {
      visible: false
    };
  },
  methods: {
    onClose() {
      this.visible = false;
    },
    handleSettingChange(type, value) {
      this.$router.push({ query: { ...this.$route.query, [type]: value } });
    }
  }
};
</script>

<style lang="less" scoped>
.handle {
  position: absolute;
  top: 240px;
  right: 300px;
  width: 48px;
  height: 48px;
  background: #1890ff;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 48px;
  border-radius: 3px 0 0 3px;
}
</style>
