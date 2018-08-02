<template>
<el-aside width="180px" style="background-color: #fff" class="admin-menu">
    <div class="logo">
        <img src="http://www.lechun.cc/images/index/lechun_logo.png" />
        <span>后台管理系统</span>
    </div>
    <el-menu :default-active="$route.path" :router="true">
        <template v-for="(item, index) in routes">
            <el-menu-item
                v-if="!item.children"
                :key="index"
                :index="item.path"
                :route="{name: item.name}"
            >
                <i class="el-icon-menu"></i>
                {{item.meta.title}}
            </el-menu-item>
            <el-submenu v-else :index="item.path" :key="index">
                <template slot="title"><i class="el-icon-menu"></i>{{item.meta.title}}</template>
                <el-menu-item
                    v-for="(item2, index2) in item.children"
                    :key="index2"
                    :index="item.path+'/'+item2.path"
                    :route="{name: item2.name}"
                >{{item2.meta.title}}</el-menu-item>
            </el-submenu>
        </template>
    </el-menu>
</el-aside>
</template>

<script>
export default {
  props:  {
    routes: {
      type: Array,
      default () {
        return []
      }
    }
  }
}
</script>

<style lang="less">
.admin-menu {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    overflow: hidden;
    .logo {
        width: 100%;
        text-align: center;
        padding: 20px 0;
        img {
            display: block;
            width: 60px;
            margin: 0 auto;
        }
        span {
            font-size: 18px;
            color: #f00;
            font-weight: bold;
            line-height: 2;
        }
    }
    .el-menu {
        border-right: 0;
        .el-menu-item{
            font-size: 12px;
        }
        .el-submenu {
            div {
                font-size: 12px;
            }
        }
    }

}
</style>