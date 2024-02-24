<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-text">PV: {{ pv }}</div>
    <div class="dashboard-text">UV: {{ uv }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { wechatPageList, wechatPagePV, wechatPageUV, pageView } from '../../api/page'

export default {
  name: 'Dashboard',
  data() {
    return {
      pv: 0,
      uv: 0
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.pageView()
    this.listWechatPageList()
    this.getWechatPagePV()
    this.getWechatPageUV()
  },
  methods: {
    listWechatPageList() {
      wechatPageList().then(res => {
        console.log(res)
      })
    },
    getWechatPagePV() {
      wechatPagePV(0).then(res => {
        this.pv = res
      })
    },
    getWechatPageUV() {
      wechatPageUV(0).then(res => {
        this.uv = res
      })
    },
    pageView() {
      pageView(0).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
