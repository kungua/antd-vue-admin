<template>
  <div style="width: 256px">
    <a-menu
      :defaultSelectedKeys="['1']"
      :defaultOpenKeys="['2']"
      :theme="theme"
      :inlineCollapsed="collapsed"
      mode="inline"
    >
      <template v-for="item in menuData">
        <a-menu-item v-if="!item.children" :key="item.path">
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
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      collapsed: false,
      list: [],
      menuData
    };
  },
  methods: {
    getMenuData(routes) {
      const menuData = [];
      console.log(routes);
      routes.forEach(route => {
        if (route.name && !route.hideInMenu) {
          console.log("路由自己有名字, 并且子路由也需要显示");
          console.log(route);
          const newItem = {...route};
          delete newItem.children;
          if (route.children && !route.hideChildrenMenu) {
            newItem.children = this.getMenuData(route.children);
          }
          menuData.push(newItem);
        } else if (
          !route.hideInMenu &&
          !route.hideChildrenMenu &&
          route.children
        ) {
          console.log("路由自己没有名字, 但是子路由需要显示");
          console.log(route);
          menuData.push(...this.getMenuData(route.children));
        }
      });
      return menuData;
    }
  }
};
</script>
