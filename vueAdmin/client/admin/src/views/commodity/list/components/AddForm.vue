<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" size="mini">
        <el-form-item label="商品名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="商品描述名称">
            <el-input type="textarea" v-model="form.describe"></el-input>
        </el-form-item>
        <el-form-item label="价格">
            <el-input-number :min="1" :max="10" label="描述文字" v-model="form.price"></el-input-number>
        </el-form-item>
        <el-form-item label="商品数量">
            <el-input-number :min="1" :max="10" label="描述文字"  v-model="form.stock"></el-input-number>
        </el-form-item>
        <el-form-item label="商品banner">
            <el-upload
              action="/api/base/upload"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="bannerSuccess"
            >
            <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
        </el-form-item>
        <el-form-item label="商品缩略图">
            <el-upload
              v-model="form.picture"
              class="avatar-uploader"
              action="/api/base/upload"
              :on-success="handleAvatarSuccess"
              :show-file-list="false"
            >
                <img v-if="form.picture" :src="form.picture" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>

        <el-form-item label="配料">
            <el-transfer :titles="['配料列表', '使用配料']" :data="data" v-model="form.ingredient"></el-transfer>
        </el-form-item>

        <el-form-item label="规格">
            <InputGroup v-model="form.spec"/>
        </el-form-item>

        <el-form-item label="详情描述">
            <quillEditor :options="editorOption" v-model="form.content"></quillEditor>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">发布</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
import InputGroup from './InputGroup'
export default {
  data() {
    const generateData = _ => {
      let data = '生牛乳（＞80%）、蓝纹芝士酱（再制干酪）（添加量≥10%）、白砂糖、保加利亚乳杆菌、嗜热链球菌、乳双歧杆菌';
      data = data.split('、').map((item) => {
        return {
          key: item,
          label: item
        }
      })
      return data;
    };
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      imageUrl: "",
      data: generateData(),
      editorOption:{
          modules:{
            toolbar:[
              ['bold', 'italic', 'underline', 'strike', 'image'],        // toggled buttons
              ['blockquote', 'code-block']
            ]
          }
      },
      form: {
        id:'',
        name: '',
        describe: '',
        background: '',
        picture: '',
        price: '',
        spec: '[{"label":"阿斯顿","value":"阿斯顿"},{"label":"重量","value":"100"}]',
        content: '',
        constituent: '',
        ingredient: [],
        stock: ''
      }
    };
  },
  watch: {
    'form.spec' (newVal) {
      console.log(newVal)
    }
  },
  components: {
    quillEditor,
    InputGroup
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.form.picture = res.data;
    },
    onSubmit() {
      console.log(this.form);
      // fetch('/api/product/add', {
      //   method: 'post',
      //   headers: {
      //     "Accept":"application/json",
      //     "Content-Type":"application/json"
      //   },
      //   body: JSON.stringify(this.form)
      // }).then((res) => {
      //   return res.json()
      // }).then((res) => {
      //   console.log(res)
      // })
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log('aaaaaa')
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    bannerSuccess (response, file, fileList) {
      console.log(fileList)
      this.form.background = fileList.map((item, index) => {
        return item.response.data
      }).join(',')
    }
  }
};
</script>

<style scoped>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>