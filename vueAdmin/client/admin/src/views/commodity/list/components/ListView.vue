<template>
  <div class="content-box">
      <!-- <el-row :gutter="20">
          <el-col
              :span="6"
              v-for="(item, index) in tableData" 
              :key="index"
          >
              <el-card :body-style="{ padding: '0px' }">
                  <img :src="item.picture" class="image">
                  <div style="padding: 14px;">
                      <span>{{item.name}}</span>
                      <div class="bottom clearfix">
                          <time class="time">{{ item.describe }}</time>
                          <el-button type="text" class="button">操作按钮</el-button>
                      </div>
                  </div>
              </el-card>
          </el-col>
      </el-row> -->
    <el-table
        :data="tableData"
        style="width: 100%"
        height="10000"
        max-height="450px"
        size="mini"
        :highlight-current-row="true"
        header-cell-class-name="table-header"
        :header-cell-style="{backgroundColor:'#eee', 'font-size':'12px'}"
    >
    <el-table-column
        fixed
        prop="date"
        label="商品信息"
    >
        <template slot-scope="scope">
            <dl class="commodity-info">
                <dt><img :src="scope.row.picture" class="image"/></dt>
                <dd>
                    <h3>{{scope.row.name}}</h3>
                    <p>ID：{{scope.row.id}}</p>
                </dd>
            </dl>
        </template>
    </el-table-column>
    <el-table-column prop="price" label="金额（元）" width="120" />
    <el-table-column prop="stock" label="库存" width="120" />
    <el-table-column prop="startTime" label="时间" width="120" />
    <el-table-column prop="status" label="状态" width="120" />
    <el-table-column
        label="操作"
    >
        <template slot-scope="scope">
            <el-button  type="text" size="small">上架</el-button>
            <el-button  type="text" size="small">编辑</el-button>
            <el-button  type="text" size="small">删除</el-button>
        </template>
    </el-table-column>
    </el-table>
      <el-pagination
          layout="prev, pager, next"
          :total="50">
      </el-pagination>
  </div>
</template>

<script>
  export default {
    props: {
      tableData: {
        type: Array,
        default () {
          return [];
        }
      }
    }
  }
</script>

<style scoped lang="less">
.commodity-info {

    dt {
        width: 100px;
        float: left;
        img {
            display: block;
            width: 100%;
        }
    }
    dd {
        float: left;
        padding: 10px;
        h3 {
            font-size: 14px;
        }
        p {
            font-size: 12px;
            color: #ccc;
        }
    }
}
.table-header {
    font-size: 12px;
    background: #eee;
    div {
        font-size: 12px;
        font-weight: normal;
    }
}
</style>