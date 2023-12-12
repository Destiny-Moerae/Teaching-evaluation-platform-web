<template>
  <div>
    <a-card title="项目信息">
      <p>项目名称： {{ nodeData.title }}</p>
      <p>参与队员: {{ formattedMembers }}</p>
      <p>总分数: {{ nodeData.score }}</p>
      <p>参与人数：{{ this.count }}</p>
    </a-card>
    <a-card title="分数划拨" class="scoreassign">
      <div v-for="(slider, index) in sliders" :key="index" :style="{ width: '200px', margin: '10px' }">
        <p>{{ slider.name }}</p>
        <a-slider v-model="slider.value" show-input="true" :max="nodeData.score" />
      </div>
      <a-button type="primary" @click="onsubmit">提交</a-button>
      <a-button type="dashed" @click="onback">返回</a-button>
    </a-card>
  </div>
</template>
<script >
export default {
  data () {
    return {
      count: 0,
      sliders: [],
    }
  },
  // 在 props 中定义 nodeData
  props: {
    nodeData: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.countSum()
    this.nodeData.member.forEach((_, index) => {
      const slider = {
        defaultValue: index === 0 ? this.nodeData.score : 0, // 第一个成员默认满分，其他成员默认为0
        value: index === 0 ? this.nodeData.score : 0,
        name: this.nodeData.member[index]
      }
      this.sliders.push(slider)
    })

  },
  watch: {
    nodeData: {
      deep: true,
      handler (newData) {
        this.countSum()
        this.sliders = [] // 清空 sliders 数组

        newData.member.forEach((_, index) => {
          const slider = {
            defaultValue: index === 0 ? newData.score : 0,
            value: index === 0 ? newData.score : 0,
            name: newData.member[index]
          }
          this.sliders.push(slider)
        })
      }
    }
  },
  methods: {
    countSum () {
      this.count = this.nodeData.member.length
    },
    countSliders () {
      console.log(this.sliders)
    },
    onback () {
      this.$emit('update:isAssign', false)
    },
    onsubmit () {
      const sum = this.sliders.reduce((total, slider) => total + slider.value, 0)
      if (sum > this.nodeData.score) {
        this.$message.error('错误：数值超过!')
      } else if (sum < this.nodeData.score) {
        this.$message.warning('尚未分配完成!')
      } else {
        this.$message.success('提交成功!')
        this.$emit('update:isAssign', false)
      }
    }
  },
  computed: {
    formattedMembers () {
      return this.nodeData.member.join(', ')
    }
  }
}

</script>