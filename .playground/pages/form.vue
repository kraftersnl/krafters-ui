<script setup lang="ts">
useHead({ title: 'Form inputs' });

const inputVariant = ref('krafters');
const singleSelection = ref('');
const multiSelection = ref<string | string[]>();
const rangeValue = ref(6);
const showTicks = ref(true);
const showOutput = ref(false);
const min = ref(6);
const max = ref(60);
const step = ref(6);
const date = ref();
const selectedCheckboxes = ref(['checkbox-a']);
const showOptionIcons = ref(true);
const disabled = ref(false);
const selectedRadio = ref();
const raw = ref();

const multiselectMode = ref<'single' | 'multiple' | 'tags'>('multiple');
const multiselectSize = ref<'md' | 'lg'>('lg');

const selectOptions = [
  {
    id: 'option-1',
    name: 'Long option 1',
  },
  {
    id: 'option-2',
    name: 'Longer text option 2',
  },
  {
    id: 'option-3',
    name: 'The longest text option 3',
  },
  {
    id: 'option-3',
    name: 'Disabled option',
    disabled: true,
  },
];

const multiSelectOptions = [
  {
    id: 'option-1',
    name: 'Long option 1',
  },
  {
    id: 'option-2',
    name: 'Longer text option 2',
  },
  {
    id: 'option-3',
    name: 'The longest text option 3 The longest text option 3 with way more tet that can possible fit anywhere in this drop dead gorgeous UI',
  },
];

const checkboxOptions = [
  {
    value: 'checkbox-a',
    label: 'checkbox a',
  },
  {
    value: 'checkbox-b',
    label: 'Checkbox B',
  },
  {
    value: 'checkbox-c',
    label: 'Checkbox C',
    disabled: true,
  },
];

const radioOptions = [
  {
    value: 'radio-a',
    label: 'Radio A',
  },
  {
    value: 'radio-b',
    label: 'Radio B',
  },
  {
    value: 'radio-c',
    label: 'Radio C',
    disabled: true,
  },
];

const multiselectModes = [
  {
    value: 'single',
    label: 'single',
  },
  {
    value: 'multiple',
    label: 'multiple',
  },
  {
    value: 'tags',
    label: 'tags',
  },
];

const multiselectSizes = [
  {
    value: 'md',
    label: 'md',
  },
  {
    value: 'lg',
    label: 'lg',
  },
];

const inputVariants = [
  {
    value: 'default',
    label: 'default',
  },
  {
    value: 'krafters',
    label: 'krafters',
  },
];

function handleSubmit(formData: FormData) {
  console.log(formData);
  raw.value = JSON.stringify(Object.fromEntries(formData));
}
</script>

<template>
  <div class="demo-page form-page">
    <div class="section-topbar">
      <h1>Form inputs</h1>

      <Popover
        icon="solar:settings-bold"
        :max-width="480"
        class="range-input-props"
      >
        <div class="popover-settings-content">
          <div class="props-wrapper">
            <Select
              v-model="inputVariant"
              :options="inputVariants"
              label="variant"
              size="sm"
            />
          </div>

          <h2>RangeInput Props</h2>

          <div class="props-wrapper">
            <Input v-model.number="min" type="number" label="min" size="sm" />
            <Input v-model.number="max" type="number" label="max" size="sm" />
            <Input v-model.number="step" type="number" label="step" size="sm" />

            <Switch v-model="showTicks" label="showTicks" />

            <Switch v-model="showOutput" label="showOutput" />

            <Select
              v-model="multiselectSize"
              :options="multiselectSizes"
              label="size"
              size="sm"
            />

            <code
              >{{`<RangeInput
                :min="${min}"
                :max="${max}"
                :step="${step}"
                :show-ticks="${showTicks}"
                :show-output="${showOutput}"
              />`}}</code
            >
          </div>
        </div>
      </Popover>
    </div>

    <Card>
      <Form @submit="handleSubmit" @reset="raw = ''">
        <Input
          label="First name"
          name="first-name"
          :variant="inputVariant"
          :disabled="disabled"
          style="--col-width: var(--col-width-25)"
        />

        <Input
          required
          label="Last name"
          name="last-name"
          :variant="inputVariant"
          :disabled="disabled"
          style="--col-width: var(--col-width-25)"
        />

        <Select
          v-model="singleSelection"
          required
          label="Selection"
          placeholder="Choose an option"
          name="selection"
          :variant="inputVariant"
          :options="selectOptions"
          :disabled="disabled"
          label-key="name"
          value-key="id"
          style="--col-width: var(--col-width-50)"
        />

        <Textarea
          label="Comments"
          name="comments"
          :variant="inputVariant"
          :disabled="disabled"
        />

        <CheckboxGroup
          v-model="selectedCheckboxes"
          :options="checkboxOptions"
          :variant="inputVariant"
          :disabled="disabled"
          label="Checkbox group"
          style="--col-width: var(--col-width-auto)"
        />

        <RadioGroup
          v-model="selectedRadio"
          :options="radioOptions"
          :variant="inputVariant"
          :disabled="disabled"
          label="Radio buttons group"
          name="radio-group"
          style="--col-width: var(--col-width-50)"
        />

        <RangeInput
          v-model.number="rangeValue"
          :min="min"
          :max="max"
          :step="step"
          label="Range Input"
          class="demo-range-input"
          :show-ticks="showTicks"
          :show-output="showOutput"
        />

        <div class="card-cols">
          <section>
            <div class="section-topbar">
              <h2>MultiSelect</h2>

              <Popover icon="solar:settings-bold" :max-width="480">
                <div class="popover-settings-content">
                  <h2>Props</h2>

                  <div class="props-wrapper">
                    <Select
                      v-model="multiselectMode"
                      :options="multiselectModes"
                      label="mode"
                      size="sm"
                      @update:model-value="multiSelection = undefined"
                    />

                    <Select
                      v-model="multiselectSize"
                      :options="multiselectSizes"
                      label="size"
                      size="sm"
                    />

                    <Switch v-model="showOptionIcons" label="showOptionIcons" />

                    <code
                      >{{`<MultiSelect
                        mode="${multiselectMode}"
                        size="${multiselectSize}"
                        show-option-icons="${showOptionIcons}"
                      />`}}</code
                    >
                  </div>
                </div>
              </Popover>
            </div>

            <p class="c-grey-text fs-sm mbe-2">
              Krafters UI uses
              <Button
                to="https://vueform.com/reference/multiselect-element"
                label="@vueform/multiselect"
                variant="link"
                target="_blank"
                external
              />
            </p>

            <MultiSelect
              v-model="multiSelection"
              :show-option-icons="showOptionIcons"
              required
              searchable
              create-option
              :options="multiSelectOptions"
              :mode="multiselectMode"
              :size="multiselectSize"
              name="multiselect"
              value-key="id"
              label-key="name"
              label="MultiSelect"
              placeholder="Make a selection"
              class="demo-multiselect"
            />
          </section>

          <section>
            <h2>DatePicker</h2>
            <p class="c-grey-text fs-sm mbe-2">
              Krafters UI uses
              <Button
                to="https://vue3datepicker.com"
                label="@vuepic/vue-datepicker"
                variant="link"
                target="_blank"
                external
              />
            </p>

            <DatePicker
              required
              v-model="date"
              label="DatePicker"
              placeholder="Pick a date"
              class="demo-datepicker"
            />
          </section>
        </div>

        <div class="card-cols">
          <section>
            <h2>Switch</h2>
            <Switch
              v-model="disabled"
              label="Disable form inputs"
              class="demo-switch"
            />
          </section>

          <section>
            <h2>File Input</h2>
            <DemoFileForm />
          </section>
        </div>

        <div class="form-bottom-row">
          <div class="button-group">
            <Button
              type="submit"
              icon="check"
              :loading="disabled"
              variant="primary"
              label="Submit"
            />

            <Button type="reset" label="Reset" :disabled="disabled" />
          </div>
        </div>
      </Form>

      <template v-if="raw">
        <hr class="demo-divider" />
        <MarkdownPreview :content="'```ts\n' + raw + '\n```'" />
      </template>
    </Card>
  </div>
</template>

<style>
.demo-page.form-page {
  .button[type='submit'] {
    flex-basis: auto;
  }

  section {
    padding-inline: 1rem;
    padding-block: 2rem;
  }

  .form-bottom-row {
    display: flex;
    justify-content: space-between;
  }
}

.demo-multiselect {
  min-width: 240px;
}

.demo-datepicker {
  max-width: 240px;
}
</style>
