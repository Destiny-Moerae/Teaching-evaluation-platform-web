<template>
  <div class="container">
    <div class="header panel">

      <div class="avatar">
        <a-avatar trigger-type="mask" :size="80">
          <img alt="avatar"
            src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp" />
          <template #trigger-icon>
            <IconEdit />
          </template>
        </a-avatar>
      </div>
      <div class="name">
        王立群
      </div>
      <div class="info">
        <span class="college"><icon-user />杭州电子科技大学</span>
      </div>


    </div>
    <div class="body">
      <div class="left-side panel">
        <a-collapse :default-active-key="['1', 2]" style="width:400px">
          <a-collapse-item header="个人信息" key="1">
            <div>姓名：王立群</div>
            <div>工号：21052211</div>
            <div>所属组织：杭州电子科技大学</div>
          </a-collapse-item>
          <a-collapse-item header="Beijing Toutiao Technology Co., Ltd." :key="2">
            <div>Beijing Toutiao Technology Co., Ltd.</div>
            <div>Beijing Toutiao Technology Co., Ltd.</div>
            <div>Beijing Toutiao Technology Co., Ltd.</div>
          </a-collapse-item>
          <a-collapse-item header="Beijing Toutiao Technology Co., Ltd." key="3">
            <div>Beijing Toutiao Technology Co., Ltd.</div>
            <div>Beijing Toutiao Technology Co., Ltd.</div>
            <div>Beijing Toutiao Technology Co., Ltd.</div>
          </a-collapse-item>
        </a-collapse>
      </div>
      <div class="right-side panel">
        55
      </div>
    </div>

  </div>
</template>
<script>
export default {

  setup () {


  },
}
</script>
<style scoped>
.container {
  background-color: var(--color-fill-2);
  padding: 16px 20px;
  padding-bottom: 0;
}

.panel {
  background-color: var(--color-bg-2);
  border-radius: 4px;
  overflow: auto;
}

.header {
  height: 190px;
  width: 100%;
  background-color: rgb(22, 93, 255);
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
}

.avatar {
  margin-top: 25px;
}

.name {
  margin-top: 10px;
  color: aliceblue;
  font-size: 18px;
}

.info {
  margin-top: 15px;
  color: aliceblue;
  font-size: 13px;
}

.body {
  display: flex;
}

.left-side {
  flex: 1;
  padding: 20px 20px;
}

.right-side {
  width: 280px;
}
</style>