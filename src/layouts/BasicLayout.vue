<template>
  <div>
    <site-header />
    <sider-menu />
    <router-view />
    <site-footer />
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
  }
};
</script>

<style scoped></style>
