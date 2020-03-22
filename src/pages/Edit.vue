<template>
  <div class="edit">
    <hm-header>编辑资料</hm-header>
    <div class="avator">
      <img :src="$axios.defaults.baseURL + info.head_img" alt />
      <van-uploader class="uploader" :before-read="beforeRead" :after-read="afterRead" />
    </div>
    <hm-navbar title="昵称" :content="info.nickname" @click="showNickname"></hm-navbar>
    <hm-navbar title="密码" :content="info.password.replace(/./g, '*')" @click="showPassword"></hm-navbar>
    <hm-navbar title="性别" :content="info.gender == 1 ? '男' : '女'" @click="showGender"></hm-navbar>
    <!-- 修改昵称的弹框 -->
    <van-dialog v-model="show" title="修改昵称" show-cancel-button @confirm="editNickname">
      <van-field v-model="nickname" placeholder="请输入用户昵称" />
    </van-dialog>
    <!-- 修改密码的弹框 -->
    <van-dialog v-model="show1" title="修改密码" show-cancel-button @confirm="editPassword">
      <van-field v-model="password" placeholder="请输入用户密码" />
    </van-dialog>
    <!-- 修改性别的弹框 -->
    <van-dialog v-model="show2" title="修改性别" show-cancel-button @confirm="editGender">
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="gender = 1">
            <van-radio slot="right-icon" :name="1" />
          </van-cell>
          <van-cell title="女" clickable @click="gender = 0">
            <van-radio slot="right-icon" :name="0" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
    <!-- 裁剪图片的遮罩页面 -->
    <div class="cropper-mask" v-show="showCropper">
      <vue-cropper
        ref="cropper"
        :img="img"
        :autoCrop="true"
        :autoCropWidth="150"
        :autoCropHeight="150"
        :fixed="true"
      ></vue-cropper>
      <van-button class="crop" type="primary" @click="crop">裁剪</van-button>
      <van-button class="cancel" type="info" @click="cancel">取消</van-button>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  data() {
    return {
      info: {
        password: ''
      },
      show: false,
      nickname: '',
      show1: false,
      password: '',
      show2: false,
      gender: '',
      showCropper: false,
      img: ''
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      const user_id = localStorage.getItem('user_id')
      const token = localStorage.getItem('token')
      const res = await this.$axios({
        method: 'get',
        url: `/user/${user_id}`
      })
      const { statusCode, data } = res.data
      if (statusCode == 200) {
        this.info = data
        // console.log(this.info)
      }
    },
    async editUser(data) {
      const user_id = localStorage.getItem('user_id')
      const token = localStorage.getItem('token')
      const res = await this.$axios({
        method: 'post',
        url: `/user_update/${user_id}`,
        data
      })
      // console.log(res)
      const { statusCode, message } = res.data
      if (statusCode == 200) {
        this.getInfo()
        this.$toast.success(message)
      }
    },
    showNickname() {
      this.show = true
      this.nickname = this.info.nickname
    },
    showPassword() {
      this.show1 = true
      this.password = this.info.password
    },
    showGender() {
      this.show2 = true
      this.gender = this.info.gender
    },
    editNickname() {
      this.editUser({
        nickname: this.nickname
      })
    },
    editPassword() {
      this.editUser({
        password: this.password
      })
    },
    editGender() {
      this.editUser({
        gender: this.gender
      })
    },
    afterRead(file) {
      // console.log(file)
      ;(this.showCropper = true), (this.img = file.content)
    },
    beforeRead(file) {
      // console.log(file)
      if (file.size / 1024 > 200) {
        this.$toast.fail('图片大小不能超过200kb')
        return false
      }
      if (file.type !== 'image/jpeg') {
        this.$toast.fail('文件必须是jpeg格式')
        return false
      }
      return true
    },
    cancel() {
      ;(this.showCropper = false), (this.img = '')
    },
    crop() {
      this.$refs.cropper.getCropBlob(async data => {
        console.log(data)
        const fd = new FormData()
        fd.append('file', data)
        const res = await this.$axios({
          method: 'post',
          url: '/upload',
          data: fd
        })
        // console.log(res)
        const { statusCode, data:data1 } = res.data
        if (statusCode == 200) {
          // 隐藏裁剪框
          this.showCropper = false
          // 把裁剪的图片地址清楚
          this.img = ''
          this.editUser({
            head_img: data1.url
          })
        }
      })
    }
  },
  components: {
    VueCropper
  }
}
</script>

<style lang="less" scoped>
.avator {
  img {
    width: 70px;
    height: 70px;
    display: block;
    border-radius: 50%;
    margin: 30px auto;
  }
  .van-dialog {
    padding: 0 10px;
  }
  .van-field {
    border: 1px solid #ccc;
    margin: 10px 0;
  }
  .van-uploader {
    position: absolute;
    left: 50%;
    top: 60px;
    transform: translate(-50%);
    opacity: 0;
  }
}
.cropper-mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}
.crop,
.cancel {
  position: absolute;
  top: 0;
}
.crop {
  left: 0;
}
.cancel {
  right: 0;
}
</style>
