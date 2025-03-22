<script setup lang="ts">
useHead({ title: 'Meter pattern' });

const progress = ref(50);
const max = ref(100);
</script>

<template>
  <div class="demo-page meter">
    <h1>Meter Pattern</h1>

    <blockquote>
      <p>
        A meter is a graphical display of a numeric value that varies within a
        defined range.
      </p>

      <p class="fs-xxs mbe-2">
        Source:
        <Button
          to="https://www.w3.org/WAI/ARIA/apg/patterns/meter/"
          label="ARIA Design Patterns"
          variant="link"
          target="_blank"
          external
        />
      </p>
    </blockquote>

    <div class="card-cols">
      <Card>
        <h2>Progress Meter</h2>
        <div class="grid-wrapper" style="--gap: 2rem">
          <ProgressMeter
            label="Progress"
            :value="progress"
            :max="max"
            size="lg"
          />
          <ProgressMeter
            label="Progress"
            hide-label
            :value="progress"
            :max="max"
            size="md"
          />
          <ProgressMeter
            label="Progress"
            :value="progress"
            :max="max"
            size="sm"
          />
        </div>

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
      </Card>

      <Card>
        <h2>Progress Circle</h2>

        <div class="flex-wrapper" style="--gap: 1.5rem">
          <ProgressCircle
            :value="progress"
            :max="max"
            size="xl"
            font-size="xl"
          />
          <ProgressCircle
            :value="progress"
            :max="max"
            size="lg"
            font-size="lg"
          />
          <ProgressCircle
            :value="progress"
            :max="max"
            size="md"
            font-size="md"
          />
          <ProgressCircle
            :value="progress"
            :max="max"
            size="sm"
            font-size="sm"
          />
          <ProgressCircle
            :value="progress"
            :max="max"
            size="xs"
            font-size="xxxs"
          />
        </div>
      </Card>
    </div>

    <Card>
      <h2>Accessibility Requirements</h2>
      <ul class="a11y-list">
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

<style>
.demo-page.meter {
}
</style>
