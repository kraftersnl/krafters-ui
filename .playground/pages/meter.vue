<script setup lang="ts">
useHead({ title: 'Meter pattern' });

const role = ref<'meter' | 'progressbar'>('meter');
const hideLabel = ref(true);
const showPercentage = ref(false);
const progress = ref(50);
const max = ref(100);

const roleOptions = [
  { value: 'meter', label: 'meter' },
  { value: 'progressbar', label: 'progressbar' },
];
</script>

<template>
  <div class="demo-page meter">
    <h1>Meter pattern</h1>

    <blockquote>
      <p>
        "A meter is a graphical display of a numeric value that varies within a
        defined range. For example, a meter could be used to depict a device's
        current battery percentage or a car's fuel level.
      </p>
      <p>
        Note: a meter should not be used to represent a value like the current
        world population since it does not have a meaningful maximum limit. The
        meter should not be used to indicate progress, such as loading or
        percent completion of a task. To communicate progress, use the
        <Button
          to="https://w3c.github.io/aria/#progressbar"
          label="progressbar role"
          variant="link"
          target="_blank"
          external
        />
        instead."
      </p>

      <p class="fs-xs mbe-2">
        Source:
        <Button
          to="https://www.w3.org/WAI/ARIA/apg/patterns/meter"
          label="ARIA Design Patterns"
          variant="link"
          target="_blank"
          external
        />
      </p>
    </blockquote>

    <div class="card-cols">
      <Card class="progress-meter-card">
        <div class="section-topbar mbe-2">
          <h2>Progress Meter</h2>

          <Popover icon="material-symbols:settings-rounded">
            <div class="popover-settings-content">
              <h2 class="mbe-1">Props</h2>

              <div class="props-wrapper">
                <Select
                  v-model.number="role"
                  label="role"
                  :options="roleOptions"
                />
                <Input v-model.number="progress" type="number" label="value" />
                <Input v-model.number="max" type="number" label="max" />

                <Switch v-model="hideLabel" label="hideLabel" />
                <Switch v-model="showPercentage" label="showPercentage" />

                <code
                  >{{`<ProgressMeter
                    :value="${progress}"
                    :max="${max}"
                    :role="${role}"
                    :hide-label="${hideLabel}"
                    :show-percentage="${showPercentage}"
                  />`}}</code
                >
                <code
                  >{{`<ProgressCircle
                    :value="${progress}"
                    :max="${max}"
                    :role="${role}"
                    :hide-label="${hideLabel}"
                    :show-percentage="${showPercentage}"
                  />`}}</code
                >
              </div>
            </div>
          </Popover>
        </div>

        <div class="grid-wrapper" style="--gap: 2rem">
          <ProgressMeter
            label="Progress"
            :hide-label="hideLabel"
            :show-percentage="showPercentage"
            :value="progress"
            :max="max"
            :role="role"
            size="lg"
          />
          <ProgressMeter
            label="Progress"
            :hide-label="hideLabel"
            :show-percentage="showPercentage"
            :value="progress"
            :max="max"
            :role="role"
            size="md"
          />
          <ProgressMeter
            label="Progress"
            :hide-label="hideLabel"
            :show-percentage="showPercentage"
            :value="progress"
            :max="max"
            :role="role"
            size="sm"
          />
        </div>
      </Card>

      <Card class="progress-circle-card">
        <h2 class="mbe-2">Progress Circle</h2>

        <div class="flex-wrapper" style="--gap: 1.5rem">
          <ProgressCircle
            :value="progress"
            :max="max"
            :role="role"
            size="xl"
            font-size="xl"
          />
          <ProgressCircle
            :value="progress"
            :max="max"
            :role="role"
            size="lg"
            font-size="lg"
          />
          <ProgressCircle
            :value="progress"
            :max="max"
            :role="role"
            size="md"
            font-size="md"
          />
          <ProgressCircle
            :value="progress"
            :max="max"
            :role="role"
            size="sm"
            font-size="sm"
          />
          <ProgressCircle
            :value="progress"
            :max="max"
            :role="role"
            size="xs"
            font-size="xxxs"
          />
        </div>
      </Card>
    </div>

    <Card>
      <h2>Accessibility Requirements</h2>
      <ul class="a11y-list">
        <li>The meter has a label, either visible or for screen readers.</li>
        <li>The meter element has <code>role="meter"</code>.</li>
        <li>The meter has <code>aria-valuenow</code> set.</li>
        <li>The meter has <code>aria-valuemin</code> set.</li>
        <li>The meter has <code>aria-valuemax</code> set.</li>
      </ul>
    </Card>
  </div>
</template>

<style>
.demo-page.meter {
  .progress-meter-card {
    max-width: 420px;
  }
}
</style>
