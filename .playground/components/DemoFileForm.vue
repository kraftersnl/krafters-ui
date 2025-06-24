<script setup lang="ts">
defineProps<{ disabled?: boolean }>();

const file = ref<File>();
const fileInputRef = useTemplateRef<FileInputComponent>('fileInput');
const showInvalid = ref(false);
const buttonIsDisabled = ref(true);

function handleFileInput(file?: File) {
  if (!file) {
    buttonIsDisabled.value = true;
    showInvalid.value = false;

    if (fileInputRef.value) {
      fileInputRef.value.validity = true;
    }
    return;
  }

  if (!fileInputRef.value?.validity) {
    buttonIsDisabled.value = true;
    showInvalid.value = true;
  } else {
    buttonIsDisabled.value = false;
    showInvalid.value = false;
  }
}

async function uploadFile(formData: FormData) {
  showInvalid.value = false;
  console.log(Object.fromEntries(formData));
}
</script>

<template>
  <Form ref="fileForm" class="demo-file-form" @submit="uploadFile">
    <FileInput
      ref="fileInput"
      v-model="file"
      required
      :label="$t('general.files')"
      :show-invalid="showInvalid"
      name="file"
      :disabled="disabled"
      @update:model-value="handleFileInput"
    />

    <Button
      type="submit"
      :label="$t('general.upload')"
      :disabled="buttonIsDisabled"
      :title="$t('general.upload')"
      icon="solar:cloud-upload-linear"
      size="lg"
    />
  </Form>
</template>

<style>
.demo-file-form {
  max-width: 300px;
}
</style>
