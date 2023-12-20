<template>
  <a-card class="general-card" :title="$t('workplace.quick.operation')" :header-style="{ paddingBottom: '0' }"
    :body-style="{ padding: '24px 20px 0 20px' }">
    <!-- <template #extra>
      <a-link>{{ $t('workplace.quickOperation.setup') }}</a-link>
    </template>
    <a-row :gutter="8">
      <a-col v-for="link in links" :key="link.text" :span="8" class="wrapper">
        <div class="icon">
          <component :is="link.icon" />
        </div>
        <a-typography-paragraph class="text">
          {{ $t(link.text) }}
        </a-typography-paragraph>
      </a-col>
    </a-row>
    <a-divider class="split-line" style="margin: 0" /> -->

    <a-grid :cols="{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 }" :colGap="12" :rowGap="16" class="grid-demo-grid">
      <a-grid-item class="demo-item">
        <a-button @click="handleClick1" type="outline">添加一级指标</a-button>
        <a-modal v-model:visible="visible1" title="提交一级指标" @cancel="handleCancel1" @before-ok="handleBeforeOk1">
          <a-form :model="form1">
            <a-form-item field="name" label="节点名称">
              <a-input v-model="form1.name" />
            </a-form-item>
            <a-form-item field="value" label="权重">
              <a-input v-model="form1.value" />
            </a-form-item>
          </a-form>
        </a-modal>
      </a-grid-item>
      <a-grid-item class="demo-item">
        <a-button @click="handleClick2" type="outline">添加二级指标</a-button>
        <a-modal v-model:visible="visible2" title="提交二级指标" @cancel="handleCancel2" @before-ok="handleBeforeOk2">
          <a-form :model="form2">
            <a-form-item field="name" label="节点名称">
              <a-input v-model="form2.name" />
            </a-form-item>
            <a-form-item field="layer1" label="一级指标">
              <a-input v-model="form2.layer1" />
            </a-form-item>
            <a-form-item field="value" label="权重">
              <a-input v-model="form2.value" />
            </a-form-item>
          </a-form>
        </a-modal>
      </a-grid-item>

      <a-grid-item class="demo-item">
        <a-button @click="handleClick3" type="outline">添加三级指标</a-button>
        <a-modal v-model:visible="visible3" title="提交三级指标" @cancel="handleCancel3" @before-ok="handleBeforeOk3">
          <a-form :model="form3">
            <a-form-item field="name" label="节点名称">
              <a-input v-model="form3.name" />
            </a-form-item>
            <a-form-item field="layer1" label="一级指标">
              <a-input v-model="form3.layer1" />
            </a-form-item>
            <a-form-item field="layer2" label="二级指标">
              <a-input v-model="form3.layer2" />
            </a-form-item>
            <a-form-item field="value" label="权重">
              <a-input v-model="form3.value" />
            </a-form-item>

          </a-form>
        </a-modal>
      </a-grid-item>
      <a-grid-item class="demo-item">
        <a-button  type="outline" style="width: 114px;">初始化模板</a-button>
      </a-grid-item>

      <a-grid-item class="demo-item">
        <a-button  type="outline">各个学年模板</a-button>
      </a-grid-item>


    </a-grid>








  </a-card>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  setup() {

    const visible1 = ref(false);
    const visible2 = ref(false);
    const visible3 = ref(false);

    const form1 = reactive({
      name: '',
      value: '',
    });
    const form2 = reactive({
      name: '',
      layer1: '',
      value: '',
    });
    const form3 = reactive({
      name: '',
      layer1: '',
      layer2: '',
      value: '',
    });

    const handleClick1 = () => {
      visible1.value = true;
    };
    const handleBeforeOk1 = (done) => {
      console.log(form1)
      window.setTimeout(() => {
        done()
        // prevent close
        // done(false)
      }, 3000)
    };
    const handleCancel1 = () => {
      visible1.value = false;
    };

    const handleClick2 = () => {
      visible2.value = true;
    };
    const handleBeforeOk2 = (done) => {
      console.log(form2)
      window.setTimeout(() => {
        done()
        // prevent close
        // done(false)
      }, 3000)
    };
    const handleCancel2 = () => {
      visible2.value = false;
    }

    const handleClick3 = () => {
      visible3.value = true;
    };
    const handleBeforeOk3 = (done) => {
      console.log(form3)
      window.setTimeout(() => {
        done()
        // prevent close
        // done(false)
      }, 3000)
    };
    const handleCancel3 = () => {
      visible3.value = false;
    }

    return {
      visible1,
      form1,
      handleClick1,
      handleBeforeOk1,
      handleCancel1,
      visible2,
      form2,
      handleClick2,
      handleBeforeOk2,
      handleCancel2,
      visible3,
      form3,
      handleClick3,
      handleBeforeOk3,
      handleCancel3,
    }
  },
}
</script>

<style scoped lang="less"></style>
