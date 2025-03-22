<script setup lang="ts">
useHead({ title: 'Meter Pattern | Krafters UI' });

const progress = ref(50);
const max = ref(100);
</script>

<template>
  <div class="demo-page">
    <h1>Meter Pattern</h1>
    <p>
      A meter is a graphical display of a numeric value that varies within a
      defined range. For example, a meter could be used to depict a device's
      current battery percentage or a car's fuel level.
    </p>

    <p class="font-size-xxs">
      Source:
      <Button
        to="https://www.w3.org/WAI/ARIA/apg/patterns/meter/"
        label="ARIA Design Patterns"
        variant="link"
        target="_blank"
        external
      />
    </p>

    <Card>
      <div class="section-topbar">
        <h2>Progress Circle</h2>

        <Popover icon="cog" hide-label :max-width="480">
          <div class="popover-settings-content">
            <h2>Props</h2>

            <div class="props-wrapper">
              <Input v-model.number="progress" type="number" label="value" />
              <Input v-model.number="max" type="number" label="max" />

              <code
                >{{`<ProgressCircle
                  :value="${progress}"
                  :max="${max}"
                />`}}</code
              >
              <code
                >{{`<ProgressMeter
                  :value="${progress}"
                  :max="${max}"
                />`}}</code
              >
            </div>
          </div>
        </Popover>
      </div>

      <div class="flex-wrapper" style="--gap: 2rem">
        <ProgressCircle :value="progress" :max="max" size="xl" font-size="xl" />
        <ProgressCircle :value="progress" :max="max" size="lg" font-size="lg" />
        <ProgressCircle :value="progress" :max="max" size="md" font-size="md" />
        <ProgressCircle :value="progress" :max="max" size="sm" font-size="sm" />
        <ProgressCircle
          :value="progress"
          :max="max"
          size="xs"
          font-size="xxxs"
        />
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

    <Card>
      <h2>Accessibility Requirements</h2>
      <ul>
        <li>
          The element serving as the meter has a role of <code>meter</code>.
        </li>
        <li>The meter has <code>aria-valuenow</code> set.</li>
        <li>The meter has <code>aria-valuemin</code> set.</li>
        <li>The meter has <code>aria-valuemax</code> set.</li>
        <li>
          If the meter has a visible label, it is referenced by aria-labelledby
          on the element with role meter. Otherwise, the element with role meter
          has a label provided by aria-label.
        </li>
      </ul>
    </Card>
  </div>
</template>

<style></style>
