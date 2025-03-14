<script setup lang="ts">
useHead({ title: 'Buttons | Krafters UI' });
</script>

<template>
  <div class="demo-page">
    <h1>Buttons</h1>

    <Card>
      <h2>Variants</h2>
      <div class="flex-wrapper">
        <Button variant="primary" label="Primary" />
        <Button variant="secondary" label="Secondary" />
        <Button variant="danger" label="Danger" />
        <Button variant="green" label="Green" />
        <Button variant="blue" label="Blue" />
        <Button variant="ghost" label="Ghost" />
        <Button variant="link" label="Link" />
      </div>

      <Spacer size="xl" />

      <h2>Sizes</h2>
      <div class="flex-wrapper">
        <Button size="xl" label="Extra Large" />
        <Button size="lg" label="Large" />
        <Button size="md" label="Medium" />
        <Button size="sm" label="Small" />
        <Button size="xs" label="Extra Small" />
      </div>

      <Spacer size="xl" />

      <h2>Font sizes</h2>
      <div class="flex-wrapper" style="--gap: 1rem">
        <Button variant="link" font-size="lg" label="Large link" />
        <Button variant="link" font-size="md" label="Medium link" />
        <Button variant="link" font-size="sm" label="Small link" />
        <Button variant="link" font-size="xs" label="XS link" />
        <Button variant="link" font-size="xxs" label="XXS link" />
      </div>

      <Spacer size="xl" />

      <h2>Icons</h2>
      <div class="flex-wrapper">
        <Button
          icon="cloud-download"
          font-size="lg"
          label="Download"
          variant="primary"
          hide-label
        />
        <Button icon="arrow-left" label="Previous" />
        <Button icon="arrow-right" icon-pos="end" label="Next" />
        <Button variant="ghost" icon="chevron-left" label="Back" />
        <Button
          variant="link"
          to="https://cardan.com"
          target="_blank"
          label="Cardan.com"
        />
      </div>

      <Spacer size="xl" />

      <h2>Border radius</h2>
      <div class="flex-wrapper">
        <Button
          radius="full"
          size="xl"
          icon="cloud-download"
          label="Download"
        />
        <Button
          radius="full"
          size="xl"
          font-size="xl"
          icon="cloud-download"
          hide-label
          label="Download"
        />
        <Button
          radius="md"
          size="xl"
          font-size="xl"
          icon="cloud-download"
          hide-label
          label="Download"
        />
        <Button
          radius="sm"
          size="lg"
          font-size="xl"
          icon="cloud-download"
          hide-label
          label="Download"
        />
        <Button
          radius="xs"
          size="sm"
          font-size="lg"
          icon="cloud-download"
          hide-label
          label="Download"
        />
      </div>

      <Spacer size="xl" />

      <h2>States</h2>
      <div class="flex-wrapper">
        <Button size="lg" loading label="Loading" />
        <Button size="lg" disabled label="Disabled" />
        <CopyButton size="lg" text="Demo Text" />
      </div>
    </Card>
  </div>
</template>

<style></style>
