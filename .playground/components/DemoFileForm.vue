<script setup lang="ts">
const file = ref<File>();
const fileInputRef = useTemplateRef<FileInputComponent>('fileInput');
const showInvalid = ref(false);
const buttonIsDisabled = ref(true);

function handleFileInput(file: File) {
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
  <div class="file-form">
    <Form ref="fileForm" @submit="uploadFile">
      <FileInput
        ref="fileInput"
        v-model="file"
        required
        :label="$t('general.files')"
        :show-invalid="showInvalid"
        name="file"
        @update:model-value="handleFileInput"
      />

      <Button
        type="submit"
        :label="$t('general.upload')"
        :disabled="buttonIsDisabled"
        :title="$t('general.upload')"
        icon="cloud-upload"
      />
    </Form>
  </div>
</template>

<style></style>
