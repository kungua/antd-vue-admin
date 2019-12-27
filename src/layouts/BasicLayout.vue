<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        v-if="navLayout === 'left'"
        v-model="collapsed"
        :trigger="null"
        :theme="navTheme"
        width="256px"
        collapsible
      >
        <div class="logo">Admin</div>
        <sider-menu :theme="navTheme" />
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
    <setting-drawer />
  </div>
</template>

<script>
import SiteHeader from "./SiteHeader";
import SiderMenu from "./SiderMenu";
import SiteFooter from "./SiteFooter";
import SettingDrawer from "../components/SettingDrawer";

export default {
  name: "BasicLayout",
  components: {
    SiteHeader,
    SiderMenu,
    SiteFooter,
    SettingDrawer
  },
  data() {
    return {
      collapsed: false
    };
  },
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    }
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

.logo {
  height: 64px;
  line-height: 64px;
  text-align: center;
  overflow: hidden;
}

.nav-theme-dark {
  .logo {
    color: #fff;
  }
}
</style>
