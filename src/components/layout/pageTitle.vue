<template>
  <div class="page-info">
    <div
      v-if="props.iconName"
      class="page-info__icon"
    >
      <svg-icons
        :name="props.iconName"
        :size="props.iconSize"
        color="var(--gray-900)"
      />
    </div>
    <h1
      class="page-info__title"
      v-html="props.title"
    >
    </h1>
    <div
      class="page-info__content"
      v-html="props.content"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: '타이틀 설명'
  },
  content: {
    type: String,
    default: ''
  },
  iconName: {
    type: String,
    default: null
  },
  iconSize: {
    type: Number,
    default: 24
  }
})
</script>

<style lang="scss">
.page-info {
  margin: 0 -16px 40px;
  text-align: center;

  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 52px;
    height: 52px;
    margin-bottom: 24px;
    background-color: var(--gray-50);
    border-radius: 50%;
  }

  &__title {
    margin-bottom: 12px;
    font-size: 20px;
    font-weight: 700;
    color: var(--gray-900);
  }

  &__content {
    font-size: 14px;
    font-weight: 400;
    color: var(--gray-500);
  }

  .second-description {
    @apply text-zinc-400 text-sm leading-5;
  }
}
</style>
