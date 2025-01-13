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
          Ullam reiciendis voluptatibus eaque delectus accusamus possimus illo
          harum accusantium praesentium. Est dolor enim quod ipsa voluptatibus
          exercitationem expedita quo ipsum. Aperiam facere, asperiores deserunt
          dicta porro minima reprehenderit provident unde, assumenda eligendi
          itaque doloribus.
        </template>
      </Details>

      <Accordion v-model="isAccordionOpen" arrow>
        <template #trigger>Accordion with CSS</template>

        <template #content>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
          veritatis modi quaerat non praesentium, voluptatibus repudiandae quae
          quos autem doloribus ad perspiciatis eos recusandae sapiente nisi.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
          reiciendis earum tempore dolorum fugit saepe laborum suscipit ipsum
          doloremque amet praesentium expedita consequuntur perspiciatis culpa,
          odio voluptates error dolor eligendi. id odio!
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
}
</style>
