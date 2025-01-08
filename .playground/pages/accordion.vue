<script setup lang="ts">
useHead({ title: 'Accordion | Krafters UI' });

const isDetailsOpen = ref(true);
const isAccordionOpen = ref(true);
</script>

<template>
  <div class="demo-page">
    <h1>Accordion</h1>
    <p>
      <NuxtLink
        to="https://www.w3.org/WAI/ARIA/apg/patterns/accordion/"
        target="_blank"
        external
      >
        Accordion Pattern
      </NuxtLink>
    </p>

    <div class="details-demo-cols">
      <Details :open="isDetailsOpen" class="details-demo">
        <template #summary>Accordion with HTML</template>
        <template #default>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa
          impedit, maiores inventore at quaerat suscipit obcaecati amet minus
          iste voluptate ex eveniet debitis animi fugit nulla et placeat modi?
          Nemo!
        </template>
      </Details>

      <Accordion v-model="isAccordionOpen" arrow>
        <template #trigger>Accordion with CSS</template>

        <template #content>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa omnis
          id odio! Esse veritatis modi quaerat non praesentium, voluptatibus
          repudiandae quae quos autem doloribus ad perspiciatis eos recusandae
          sapiente nisi.
        </template>
      </Accordion>
    </div>
  </div>
</template>

<style>
.details-demo {
  .summary {
    font-size: var(--font-size-s);
    font-weight: 600;
  }
}

.details-demo-cols {
  margin-block: 2rem;
  display: grid;
  gap: 2rem;

  @media (min-width: 480px) {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
