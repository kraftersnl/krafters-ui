<script setup lang="ts">
useHead({ title: 'Form inputs | Krafters UI' });

const file = ref<File>();

const singleSelection = ref('');
const multiSelection = ref([]);
const selectedCheckboxes = ref([]);
const isTrue = ref(false);
const selectedRadio = ref();
const raw = ref();

const multiselectMode = ref('multiple');

const selectOptions = [
  {
    id: 'option-1',
    name: 'Option 1',
  },
  {
    id: 'option-2',
    name: 'Option 2',
  },
  {
    id: 'option-3',
    name: 'Option 3',
  },
];

const multiSelectOptions = [
  {
    id: 'option-1',
    name: 'Option 1',
  },
  {
    id: 'option-2',
    name: 'Option 2',
  },
  {
    id: 'option-3',
    name: 'Option 3',
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

function handleSubmit(formData: FormData) {
  console.log(formData);
  raw.value = JSON.stringify(Object.fromEntries(formData));
}
</script>

<template>
  <div class="demo-page">
    <h1>Form inputs</h1>

    <Card>
      <Form class="demo-form" @submit="handleSubmit" @reset="raw = ''">
        <Input
          label="First name"
          name="first-name"
          style="--col-width: var(--col-width-25)"
        />

        <Input
          required
          label="Last name"
          name="last-name"
          style="--col-width: var(--col-width-25)"
        />

        <Select
          v-model="singleSelection"
          required
          label="Select"
          placeholder="Choose an option"
          name="select"
          :options="selectOptions"
          label-key="name"
          value-key="id"
          style="--col-width: var(--col-width-50)"
        />

        <CheckboxGroup
          v-model="selectedCheckboxes"
          :options="checkboxOptions"
          label="Checkbox group"
          style="--col-width: var(--col-width-auto)"
        />

        <RadioGroup
          v-model="selectedRadio"
          :options="radioOptions"
          label="Radio buttons group"
          name="radio-group"
          style="--col-width: var(--col-width-50)"
        />

        <div class="button-group">
          <Button type="submit" variant="primary" label="Submit" />

          <Button type="reset" label="Reset" />
        </div>
      </Form>

      <template v-if="raw">
        <hr class="demo-divider" />
        <code>{{ raw }}</code>
      </template>
    </Card>

    <Card>
      <h2>Switch</h2>
      <Switch v-model="isTrue" label="Enable setting" class="demo-switch" />
    </Card>

    <Card>
      <div class="section-topbar">
        <h2>MultiSelect</h2>

        <Popover icon="cog" hide-label :max-width="480">
          <div class="popover-settings-content">
            <h2>MultiSelect Props</h2>

            <div class="props-wrapper">
              <Select
                v-model="multiselectMode"
                :options="multiselectModes"
                label="mode"
                size="sm"
              />

              <code>{{ `<MultiSelect :mode="${multiselectMode}" />` }}</code>
            </div>
          </div>
        </Popover>
      </div>

      <MultiSelect
        v-model="multiSelection"
        searchable
        :options="multiSelectOptions"
        :mode="multiselectMode"
        name="multiselect"
        value-key="id"
        label-key="name"
        label="MultiSelect"
        placeholder="Choose one or more options"
        class="demo-multiselect"
      />
    </Card>

    <Card>
      <h2>File Input</h2>

      <FileInput
        v-model="file"
        required
        name="file"
        label="File Upload"
        style="--col-width: var(--col-width-33)"
      />
    </Card>
  </div>
</template>

<style>
.demo-form {
  .button {
    flex-basis: 8rem;
  }
}

.demo-multiselect {
  min-width: 285px;
}
</style>
