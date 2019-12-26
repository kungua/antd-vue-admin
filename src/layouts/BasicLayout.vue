<template>
  <div>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider :trigger="null" collapsible v-model="collapsed">
        <div class="logo" />
        <sider-menu />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
            class="trigger"
          />
          <site-header />
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view />
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <site-footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import SiteHeader from "./SiteHeader";
import SiderMenu from "./SiderMenu";
import SiteFooter from "./SiteFooter";

export default {
  name: "BasicLayout",
  components: {
    SiteHeader,
    SiderMenu,
    SiteFooter
  },
  data() {
    return {
      collapsed: false
    };
  }
};
</script>

<style lang="less" scoped>
.trigger {
  padding: 0 20px;
  line-height: 64px;
  font-size: 20px;

  &:hover {
    background: #eee;
  }
}
</style>
