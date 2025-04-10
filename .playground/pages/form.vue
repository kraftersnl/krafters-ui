<script setup lang="ts">
useHead({ title: 'Form inputs' });

const singleSelection = ref('');
const multiSelection = ref<string | string[]>();
const date = ref();
const selectedCheckboxes = ref([]);
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
    name: 'The longest text option 3',
  },
];

const checkboxOptions = [
  {
    value: 'checkbox-a',
    label: 'Checkbox A',
  },
  {
    value: 'checkbox-b',
    label: 'Checkbox B',
  },
  {
    value: 'checkbox-c',
    label: 'Checkbox C',
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

function handleSubmit(formData: FormData) {
  console.log(formData);
  raw.value = JSON.stringify(Object.fromEntries(formData));
}
</script>

<template>
  <div class="demo-page form-page">
    <h1>Form inputs</h1>

    <Card>
      <Form @submit="handleSubmit" @reset="raw = ''">
        <Input
          label="First name"
          name="first-name"
          :disabled="disabled"
          style="--col-width: var(--col-width-25)"
        />

        <Input
          required
          label="Last name"
          name="last-name"
          :disabled="disabled"
          style="--col-width: var(--col-width-25)"
        />

        <Select
          v-model="singleSelection"
          required
          label="Selection"
          placeholder="Choose an option"
          name="selection"
          :options="selectOptions"
          :disabled="disabled"
          label-key="name"
          value-key="id"
          style="--col-width: var(--col-width-50)"
        />

        <Textarea label="Comments" name="comments" :disabled="disabled" />

        <CheckboxGroup
          v-model="selectedCheckboxes"
          :options="checkboxOptions"
          :disabled="disabled"
          label="Checkbox group"
          style="--col-width: var(--col-width-auto)"
        />

        <RadioGroup
          v-model="selectedRadio"
          :options="radioOptions"
          :disabled="disabled"
          label="Radio buttons group"
          name="radio-group"
          style="--col-width: var(--col-width-50)"
        />

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
      </Form>

      <template v-if="raw">
        <hr class="demo-divider" />
        <MarkdownPreview :content="'```ts\n' + raw + '\n```'" />
      </template>
    </Card>

    <Card>
      <h2>Switch</h2>
      <Switch
        v-model="disabled"
        label="Disable form inputs"
        class="demo-switch"
      />
    </Card>

    <div class="card-cols">
      <Card>
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

                <code
                  >{{`<MultiSelect
                    mode="${multiselectMode}"
                    size="${multiselectSize}"
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
      </Card>

      <Card>
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
          v-model="date"
          label="DatePicker"
          placeholder="Pick a date"
          class="demo-datepicker"
        />
      </Card>
    </div>

    <Card>
      <h2>File Input</h2>
      <DemoFileForm />
    </Card>
  </div>
</template>

<style>
.demo-page.form-page {
  .button[type='submit'] {
    flex-basis: auto;
  }
}

.demo-multiselect {
  min-width: 240px;
}

.demo-datepicker {
  max-width: 240px;
}
</style>
