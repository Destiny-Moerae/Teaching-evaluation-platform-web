<template>
  <a-card class="general-card" :title="$t('perfshow.docs')" :header-style="{ paddingBottom: 0 }"
    :body-style="{ paddingTop: 0 }" style="height: 166px">
    <template #extra>
      <a-link>{{ $t('perfshow.viewMore') }}</a-link>
    </template>
    <a-row>
      <a-col :span="12">
        <a-link>
          {{ $t('perfshow.docs.productOverview') }}
        </a-link>
      </a-col>
      <a-col :span="12">
        <a-link>
          {{ $t('perfshow.docs.userGuide') }}
        </a-link>
      </a-col>
      <a-col :span="12">
        <a-link>
          {{ $t('perfshow.docs.workflow') }}
        </a-link>
      </a-col>
      <a-col :span="12">
        <a-link>
          {{ $t('perfshow.docs.interfaceDocs') }}
        </a-link>
      </a-col>
    </a-row>
  </a-card>
</template>

<style lang="less" scoped>
.arco-card-body .arco-link {
  margin: 10px 0;
  color: rgb(var(--gray-8));
}
</style>
