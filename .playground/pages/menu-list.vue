<script setup lang="ts">
useHead({ title: 'Menu pattern' });

// const buttonSize = ref();
// const fontSize = ref();
// const iconSize = ref();

const menuList = [
  { id: 'a', label: 'User profile', icon: 'hugeicons:user-account' },
  {
    id: 'b',
    label: 'Account settings',
    icon: 'hugeicons:account-setting-01',
    divider: true,
  },
  { id: 'c', label: 'Logout', icon: 'hugeicons:logout-04' },
];
</script>

<template>
  <div class="demo-page">
    <div class="section-topbar">
      <h1>MenuList</h1>

      <Popover icon="cog" hide-label :max-width="480">
        <div class="popover-settings-content">
          <h2>Props</h2>

          <div class="props-wrapper">
            <!-- <Input v-model.number="progress" type="number" label="value" />
            <Input v-model.number="max" type="number" label="max" /> -->

            <!-- <code
              >{{`<ProgressCircle :value="${progress}" :max="${max}" />`}}</code
            > -->
          </div>
        </div>
      </Popover>
    </div>

    <Card>
      <h2>Sidebar variant</h2>
      <MenuList
        button-variant="sidebar"
        button-size="xl"
        font-size="sm"
        icon-size="lg"
        :list="menuList"
      />

      <h2>Menu variant used in Popover component</h2>
      <Popover hide-label :list="menuList" style="justify-self: start" />
    </Card>
  </div>
</template>

<style></style>
