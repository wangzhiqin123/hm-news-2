<template>
  <div class="hm-input">
    <input
      :type="type"
      :class="{ success: status == 'success', error: status == 'error' }"
      :placeholder="placeholder"
      :value="value"
      @input="inputFn"
    />
    <div class="tips" v-show="status == 'error'">{{ message }}</div>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'text'
    },
    placeholder: {
      type: String,
      default: '请输入...'
    },
    value: String,
    rule: RegExp,
    message: String
  },
  data() {
    return {
      status: ''
    }
  },
  methods: {
    inputFn(e) {
      let value = e.target.value
      this.$emit('input', value)
      this.test(value)
    },
    test(value) {
      if (this.rule) {
        if (this.rule.test(value)) {
          this.status = 'success'
          return true
        } else {
          this.status = 'error'
          return false
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.hm-input {
  height: 50px;
  margin: 0 20px;
  input {
    height: 30px;
    line-height: 30px;
    // text-align: center;
    width: 100%;
    outline: none;
    border: none;
    border-bottom: 1px solid #ccc;
    font-size: 16px;
    &.success {
      border-color: green;
    }

    &.error {
      border-color: red;
    }
  }
  .tips {
    color: red;
    font-size: 6px;
  }
}
</style>
