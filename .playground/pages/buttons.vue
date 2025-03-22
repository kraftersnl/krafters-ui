<script setup lang="ts">
useHead({ title: 'Buttons & Links' });
</script>

<template>
  <div class="demo-page">
    <h1>Buttons & Links</h1>

    <blockquote>
      <p>
        "A
        <Button
          label="button"
          to="https://www.w3.org/WAI/ARIA/apg/patterns/button"
          variant="link"
          target="_blank"
          external
        />
        is a widget that enables users to trigger an action or event, such as
        submitting a form, opening a dialog, canceling an action, or performing
        a delete operation.
      </p>

      <p>
        A
        <Button
          label="link"
          to="https://www.w3.org/WAI/ARIA/apg/patterns/link"
          variant="link"
          target="_blank"
          external
        />
        provides an interactive reference to a resource. The target resource can
        be either external or local, i.e., either outside or within the current
        page or application."
      </p>
    </blockquote>

    <p class="bold mbe-2">If you set the <code>to</code> or <code>href</code> prop, this component will be rendered as a <code>{{`<NuxtLink>`}}</code> component.</p>

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
          to="https://krafters.nl"
          target="_blank"
          label="Krafters.nl"
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
