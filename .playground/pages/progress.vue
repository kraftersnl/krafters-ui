<script setup lang="ts">
useHead({ title: 'Progress | Krafters UI' });

const progress = ref(50);
const max = ref(100);
</script>

<template>
  <div class="demo-page">
    <div class="section-topbar">
      <h1>Progress</h1>

      <Popover icon="cog" hide-label :max-width="480">
        <div class="popover-settings-content">
          <h2>Skeleton Props</h2>

          <div class="props-wrapper">
            <Input v-model.number="progress" type="number" label="value" />
            <Input v-model.number="max" type="number" label="max" />

            <code
              >{{`<ProgressCircle :value="${progress}" :max="${max}" />`}}</code
            >
            <code
              >{{`<ProgressMeter :value="${progress}" :max="${max}" />`}}</code
            >
          </div>
        </div>
      </Popover>
    </div>

    <Card>
      <h2>Progress Circle</h2>
      <div class="flex-wrapper" style="--gap: 2rem">
        <ProgressCircle :value="progress" :max="max" size="xl" />
        <ProgressCircle :value="progress" :max="max" size="lg" />
        <ProgressCircle :value="progress" :max="max" size="md" />
        <ProgressCircle :value="progress" :max="max" size="sm" />
        <ProgressCircle :value="progress" :max="max" size="xs" />
      </div>
    </Card>

    <Card>
      <h2>Progress Meter</h2>
      <div class="grid-wrapper" style="--gap: 2rem">
        <ProgressMeter :value="progress" :max="max" size="lg" />
        <ProgressMeter :value="progress" :max="max" size="md" />
        <ProgressMeter :value="progress" :max="max" size="sm" />
      </div>
    </Card>
  </div>
</template>

<style></style>
