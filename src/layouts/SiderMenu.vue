<template>
  <div style="width: 256px">
    <a-menu
      :theme="theme"
      :inlineCollapsed="collapsed"
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="$router.push({ path: item.path, query: $route.query })"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path" />
      </template>
    </a-menu>
  </div>
</template>

<script>
/*
 * recommend SubMenu.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu.vue
 * SubMenu1.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu1.vue
 * */
import { check } from "../utils/auth";
import SubMenu from "./SubMenu";

export default {
  components: {
    "sub-menu": SubMenu
  },
  props: {
    theme: {
      type: String,
      default: "dark"
    }
  },
  data() {
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      collapsed: false,
      list: [],
      menuData,
      selectedKeys: this.selectedKeysMap[this.$route.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path]
    };
  },
  watch: {
    "$route.path": function(path) {
      console.log(this.selectedKeysMap);
      console.log(this.openKeysMap);
      this.selectedKeys = this.selectedKeysMap[path];
      this.openKeys = this.collapsed ? [] : this.openKeysMap[path];
    }
  },
  methods: {
    getMenuData(routes = [], parentKeys = [], selectedKeys) {
      const menuData = [];
      for (let route of routes) {
        if (
          route.meta &&
          route.meta.authority &&
          !check(route.meta.authority)
        ) {
          break;
        }
        if (route.name && !route.hideInMenu) {
          // 1
          this.openKeysMap[route.path] = parentKeys;
          this.selectedKeysMap[route.path] = [selectedKeys || route.path];

          const newItem = { ...route };
          delete newItem.children;
          if (route.children && !route.hideChildrenInMenu) {
            newItem.children = this.getMenuData(route.children, [
              ...parentKeys,
              route.path
            ]);
          } else {
            this.getMenuData(
              route.children,
              selectedKeys ? parentKeys : [...parentKeys, route.path],
              selectedKeys || route.path
            );
          }
          menuData.push(newItem);
        } else if (
          !route.hideInMenu &&
          !route.hideChildrenInMenu &&
          route.children
        ) {
          menuData.push(
            ...this.getMenuData(route.children, [...parentKeys, route.path])
          );
        }
      }
      return menuData;
    }
  }
};
</script>
