<template>
  <div class="container">
    <Breadcrumb :items="['menu.list', 'menu.list.informationTable']" />
    <a-card class="general-card" :title="$t('menu.list.informationTable')">
      <a-row>
        <a-col :flex="1">
          <a-form
            :model="formModel"
            :label-col-props="{ span: 6 }"
            :wrapper-col-props="{ span: 18 }"
            label-align="left"
          >
            <a-row :gutter="16">
              <a-col :span="8">
                <a-form-item
                  field="number"
                  :label="$t('informationTable.form.number')"
                >
                  <a-input
                    v-model="formModel.number"
                    :placeholder="$t('informationTable.form.number.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item field="name" :label="$t('informationTable.form.name')">
                  <a-input
                    v-model="formModel.name"
                    :placeholder="$t('informationTable.form.name.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="worknumber"
                  :label="$t('informationTable.form.worknumber')"
                >
                  <a-input
                    v-model="formModel.worknumber"
                    :placeholder="$t('informationTable.form.worknumber.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="contentType"
                  :label="$t('informationTable.form.contentType')"
                >
                  <a-select
                    v-model="formModel.contentType"
                    :options="contentTypeOptions"
                    :placeholder="$t('informationTable.form.selectDefault')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="createdTime"
                  :label="$t('informationTable.form.createdTime')"
                >
                  <a-range-picker
                    v-model="formModel.createdTime"
                    style="width: 100%"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="8">
                <a-form-item
                  field="status"
                  :label="$t('informationTable.form.status')"
                >
                  <a-select
                    v-model="formModel.status"
                    :options="statusOptions"
                    :placeholder="$t('informationTable.form.selectDefault')"
                  />
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="search">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('informationTable.form.search') }}
            </a-button>
            <a-button @click="reset">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('informationTable.form.reset') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-row style="margin-bottom: 16px">
        <a-col :span="12">
          <a-space>
            <a-button type="primary">
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('informationTable.operation.create') }}
            </a-button>
            <!-- 导入按钮 -->
            <!-- <a-upload action="/">
              <template #upload-button>
                <a-button>
                  {{ $t('informationTable.operation.import') }}
                </a-button>
              </template>
            </a-upload> -->
          </a-space>
        </a-col>
        <a-col
          :span="12"
          style="display: flex; align-items: center; justify-content: end"
        >
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            {{ $t('informationTable.operation.download') }}
          </a-button>
          <a-tooltip :content="$t('informationTable.actions.refresh')">
            <div class="action-icon" @click="search"
              ><icon-refresh size="18"
            /></div>
          </a-tooltip>
          <a-dropdown @select="handleSelectDensity">
            <a-tooltip :content="$t('informationTable.actions.density')">
              <div class="action-icon"><icon-line-height size="18" /></div>
            </a-tooltip>
            <template #content>
              <a-doption
                v-for="item in densityList"
                :key="item.value"
                :value="item.value"
                :class="{ active: item.value === size }"
              >
                <span>{{ item.name }}</span>
              </a-doption>
            </template>
          </a-dropdown>
          <a-tooltip :content="$t('informationTable.actions.columnSetting')">
            <a-popover
              trigger="click"
              position="bl"
              @popup-visible-change="popupVisibleChange"
            >
              <div class="action-icon"><icon-settings size="18" /></div>
              <template #content>
                <div id="tableSetting">
                  <div
                    v-for="(item, index) in showColumns"
                    :key="item.dataIndex"
                    class="setting"
                  >
                    <div style="margin-right: 4px; cursor: move">
                      <icon-drag-arrow />
                    </div>
                    <div>
                      <a-checkbox
                        v-model="item.checked"
                        @change="
                          handleChange($event, item as TableColumnData, index)
                        "
                      >
                      </a-checkbox>
                    </div>
                    <div class="title">
                      {{ item.title === '#' ? '序列号' : item.title }}
                    </div>
                  </div>
                </div>
              </template>
            </a-popover>
          </a-tooltip>
        </a-col>
      </a-row>
      <a-table
        row-key="id"
        :loading="loading"
        :pagination="pagination"
        :columns="(cloneColumns as TableColumnData[])"
        :data="renderData"
        :bordered="false"
        :size="size"
        @page-change="onPageChange"
        
      >
        <template #index="{ rowIndex }">
          {{ rowIndex + 1 + (pagination.current - 1) * pagination.pageSize }}
        </template>
        <template #contentType="{ record }">
          <a-space>
            <a-avatar
              v-if="record.contentType === 'img'"
              :size="16"
              shape="square"
            >
              <img
                alt="avatar"
                src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/581b17753093199839f2e327e726b157.svg~tplv-49unhts6dw-image.image"
              />
            </a-avatar>
            <a-avatar
              v-else-if="record.contentType === 'horizontalVideo'"
              :size="16"
              shape="square"
            >
              <img
                alt="avatar"
                src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/77721e365eb2ab786c889682cbc721c1.svg~tplv-49unhts6dw-image.image"
              />
            </a-avatar>
            <a-avatar v-else :size="16" shape="square">
              <img
                alt="avatar"
                src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/ea8b09190046da0ea7e070d83c5d1731.svg~tplv-49unhts6dw-image.image"
              />
            </a-avatar>
            {{ $t(`informationTable.form.contentType.${record.contentType}`) }}
          </a-space>
        </template>
        <template #worknumber="{ record }">
          {{ $t(`informationTable.form.worknumber.${record.worknumber}`) }}
        </template>
        <template #level="{ record }">
          <span v-if="record.level === 'A'" class="circle" style="background-color: deepskyblue;"></span>
          <span v-else-if="record.level === 'B'" class="circle"></span>
          <div style="te">{{ $t(`informationTable.form.level.${record.level}`) }}</div>
        </template>
        <template #operations>
          <a-button v-permission="['admin']" type="text" size="small" @click="handleClick">
            {{ $t('informationTable.columns.operations.change') }}
          </a-button>
          <!-- //模态弹窗 -->
         
          <a-modal :mask-style="{backgroundColor: 'rgba(50, 50, 50, 0.1)',}" v-model:visible="visible" title="划拨申请信息" @before-ok="handleBeforeOk" @cancel="handleCancel"  >
            <a-form :model="form">
              <a-form-item field="person" label="人员">
                <a-tag size="medium">{{ form.person.name }}</a-tag>
              </a-form-item>
              <a-form-item field="check" label="评估等级调整">
                <a-radio-group type="button">
                  <a-radio value="A">A</a-radio>
                  <a-radio value="B">B</a-radio>
                  <a-radio value="C">C</a-radio>
                  <a-radio value="D">D</a-radio>
                </a-radio-group>
              </a-form-item>
              <center>
                <a-button type="primary" shape="round" >提交</a-button>
              </center>
            </a-form>
            <template #footer>
              <!-- 自定义按钮或其他内容 -->
              <!-- 例如，去掉全部按钮 -->
              <div></div>
            </template>
          </a-modal>
          
        </template>
      </a-table>
    </a-card>
  </div>
  
</template>

<script lang="ts" setup>
  import { computed, ref, reactive, watch, nextTick } from 'vue';
  import { useI18n } from 'vue-i18n';
  import useLoading from '@/hooks/loading';
  import { queryPolicyList, PolicyRecord, PolicyParams } from '@/api/list';
  import { Pagination } from '@/types/global';
  import type { SelectOptionData } from '@arco-design/web-vue/es/select/interface';
  import type { TableColumnData } from '@arco-design/web-vue/es/table/interface';
  import cloneDeep from 'lodash/cloneDeep';
  import Sortable from 'sortablejs';

  type SizeProps = 'mini' | 'small' | 'medium' | 'large';
  type Column = TableColumnData & { checked?: true };

  const generateFormModel = () => {
    return {
      number: '',
      name: '',
      contentType: '',
      worknumber: '',
      createdTime: [],
      status: '',
    };
  };
  const { loading, setLoading } = useLoading(true);
  const { t } = useI18n();
  const renderData = ref<PolicyRecord[]>([]);
  const formModel = ref(generateFormModel());
  const cloneColumns = ref<Column[]>([]);
  const showColumns = ref<Column[]>([]);

  const size = ref<SizeProps>('medium');

  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const pagination = reactive({
    ...basePagination,
  });
  const densityList = computed(() => [
    {
      name: t('informationTable.size.mini'),
      value: 'mini',
    },
    {
      name: t('informationTable.size.small'),
      value: 'small',
    },
    {
      name: t('informationTable.size.medium'),
      value: 'medium',
    },
    {
      name: t('informationTable.size.large'),
      value: 'large',
    },
  ]);
  const columns = computed<TableColumnData[]>(() => [
    {
      title: t('informationTable.columns.index'),
      dataIndex: 'index',
      slotName: 'index',
      align:'center',
    },
    // {
    //   title: t('informationTable.columns.number'),
    //   dataIndex: 'number',
    //   align:'center',
    // },
    {
      title: t('informationTable.columns.worknumber'),
      dataIndex: 'worknumber',
      align:'center',
    },
    {
      title: t('informationTable.columns.name'),
      dataIndex: 'name',
      align:'center',
    },
    
    // {
    //   title: t('informationTable.columns.contentType'),
    //   dataIndex: 'contentType',
    //   slotName: 'contentType',
    //   align:'center',
    // },
   
    // {
    //   title: t('informationTable.columns.count'),
    //   dataIndex: 'count',
    // },
    // {
    //   title: t('informationTable.columns.createdTime'),
    //   dataIndex: 'createdTime',
    //   align:'center',
    // }, 
    {
      title: t('informationTable.columns.index1'),
      dataIndex: 'index1',
      slotName: 'index1',
      align:'center',
    },
    {
      title: t('informationTable.columns.index2'),
      dataIndex: 'index2',
      slotName: 'index2',
      align:'center',
    },
    {
      title: t('informationTable.columns.index3'),
      dataIndex: 'index3',
      slotName: 'index3',
      align:'center',
    },
    {
      title: t('informationTable.columns.level'),
      dataIndex: 'level',
      slotName: 'level',
      align:'center',
    },
    {
      title: t('informationTable.columns.operations'),
      dataIndex: 'operations',
      slotName: 'operations',
      align:'center',
    },
  ]);
  const contentTypeOptions = computed<SelectOptionData[]>(() => [
    {
      label: t('informationTable.form.contentType.img'),
      value: 'img',
    },
    {
      label: t('informationTable.form.contentType.horizontalVideo'),
      value: 'horizontalVideo',
    },
    {
      label: t('informationTable.form.contentType.verticalVideo'),
      value: 'verticalVideo',
    },
  ]);
  const worknumberOptions = computed<SelectOptionData[]>(() => [
    {
      label: t('informationTable.form.worknumber.artificial'),
      value: 'artificial',
    },
    {
      label: t('informationTable.form.worknumber.rules'),
      value: 'rules',
    },
  ]);
  const statusOptions = computed<SelectOptionData[]>(() => [
    {
      label: t('informationTable.form.status.online'),
      value: 'online',
    },
    {
      label: t('informationTable.form.status.offline'),
      value: 'offline',
    },
  ]);
  const fetchData = async (
    params: PolicyParams = { current: 1, pageSize: 20 }
  ) => {
    setLoading(true);
    try {
      const { data } = await queryPolicyList(params);
      renderData.value = data.list;
      pagination.current = params.current;
      pagination.total = data.total;
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      setLoading(false);
    }
  };

  const search = () => {
    fetchData({
      ...basePagination,
      ...formModel.value,
    } as unknown as PolicyParams);
  };
  const onPageChange = (current: number) => {
    fetchData({ ...basePagination, current });
  };

  fetchData();
  const reset = () => {
    formModel.value = generateFormModel();
  };

  const handleSelectDensity = (
    val: string | number | Record<string, any> | undefined,
    e: Event
  ) => {
    size.value = val as SizeProps;
  };

  const handleChange = (
    checked: boolean | (string | boolean | number)[],
    column: Column,
    index: number
  ) => {
    if (!checked) {
      cloneColumns.value = showColumns.value.filter(
        (item) => item.dataIndex !== column.dataIndex
      );
    } else {
      cloneColumns.value.splice(index, 0, column);
    }
  };

  const exchangeArray = <T extends Array<any>>(
    array: T,
    beforeIdx: number,
    newIdx: number,
    isDeep = false
  ): T => {
    const newArray = isDeep ? cloneDeep(array) : array;
    if (beforeIdx > -1 && newIdx > -1) {
      // 先替换后面的，然后拿到替换的结果替换前面的
      newArray.splice(
        beforeIdx,
        1,
        newArray.splice(newIdx, 1, newArray[beforeIdx]).pop()
      );
    }
    return newArray;
  };

  const popupVisibleChange = (val: boolean) => {
    if (val) {
      nextTick(() => {
        const el = document.getElementById('tableSetting') as HTMLElement;
        const sortable = new Sortable(el, {
          onEnd(e: any) {
            const { oldIndex, newIndex } = e;
            exchangeArray(cloneColumns.value, oldIndex, newIndex);
            exchangeArray(showColumns.value, oldIndex, newIndex);
          },
        });
      });
    }
  };

  watch(
    () => columns.value,
    (val) => {
      cloneColumns.value = cloneDeep(val);
      cloneColumns.value.forEach((item, index) => {
        item.checked = true;
      });
      showColumns.value = cloneDeep(cloneColumns.value);
    },
    { deep: true, immediate: true }
  );


  const visible = ref(false);
    const form = reactive({
      name: '服务外包大赛指导',
      person:{
        name:'张三 214545',
        ratio:'60%'
      },
      member:[
        { person: '张四 224515',ratio:'20%'}, 
        { person: '张五 212542',ratio:'20%'}
      ],
      ratio:'20% 20%',
      post: ''
    });

    const handleClick = () => {
      visible.value = true;
    };
    const handleBeforeOk = (done: (closed: boolean) => void) => {
      console.log(form)
      window.setTimeout(() => {
        // prevent close
        done(false)
      }, 3000)
    };
    const handleCancel = () => {
      visible.value = false;
    }
</script>



<script lang="ts">
export default {
    name: 'informationTable',
};
</script>

<style scoped lang="less">
  .container {
    padding: 0 20px 20px 20px;
  }
  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
  .action-icon {
    margin-left: 12px;
    cursor: pointer;
  }
  .active {
    color: #0960bd;
    background-color: #e3f4fc;
  }
  .setting {
    display: flex;
    align-items: center;
    width: 200px;
    .title {
      margin-left: 12px;
      cursor: pointer;
    }
  }


</style>
