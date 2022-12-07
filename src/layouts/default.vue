<template>
  <layout-config-provider>
    <div class="wrap">
      <div class="wrap__inner">
        <slot />
      </div>
    </div>
  </layout-config-provider>
</template>

<style lang="scss">
.wrap {
  display: grid;
  grid-template-columns: 1fr;
  place-content: center;
  width: 100%;
  max-width: 430px;
  min-height: 100vh;
  padding: 32px;
  margin: 0 auto;
  background: var(--white);
}
</style>
