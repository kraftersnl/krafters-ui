<script setup lang="ts">
useHead({ title: 'Tabs navigation | Krafters UI' });

const tabs = [
  { value: 'a', label: 'Tab A' },
  { value: 'b', label: 'Tab b' },
];

const activeTab = ref('a');

const tabSize = ref('md');
const tabVariant = ref('default');

const tabSizes = [
  {
    value: 'md',
    label: 'md',
  },
  {
    value: 'sm',
    label: 'sm',
  },
  {
    value: 'xs',
    label: 'xs',
  },
];

const tabVariants = [
  {
    value: 'default',
    label: 'default',
  },
  {
    value: 'minimal',
    label: 'minimal',
  },
];
</script>

<template>
  <div class="demo-page">
    <div class="section-topbar">
      <h1>Tabs navigation</h1>

      <Popover icon="cog" hide-label :max-width="480">
        <div class="popover-settings-content">
          <h2>Tabs Props</h2>
          <div class="props-wrapper">
            <Select
              v-model="tabSize"
              :options="tabSizes"
              size="sm"
              label="size"
            />
            <Select
              v-model="tabVariant"
              :options="tabVariants"
              size="sm"
              label="variant"
            />
            <code
              >{{`<Tabs size="${tabSize}" variant="${tabVariant}" />` }}</code
            >
          </div>
        </div>
      </Popover>
    </div>

    <Card>
      <Tabs
        v-model="activeTab"
        :size="tabSize"
        :variant="tabVariant"
        :tabs="tabs"
      >
        <template #a>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            sed nisi voluptatem perferendis facilis ab, aperiam mollitia neque
            deserunt expedita ea! Repudiandae quaerat, unde cupiditate libero
            fuga excepturi obcaecati. Sunt? Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Cum, fuga. Nihil iste enim expedita
            repellat consequuntur officiis sequi illo provident ducimus
            voluptatem aliquam corrupti sapiente adipisci ex, fugit rerum
            necessitatibus.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum, fuga.
            Nihil iste enim expedita repellat consequuntur officiis sequi illo
            provident ducimus voluptatem aliquam corrupti sapiente adipisci ex,
            fugit rerum necessitatibus. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Alias, magnam? Ad aperiam quaerat adipisci atque
            dolores? Sapiente, distinctio accusantium, laudantium numquam ut
            perferendis laborum harum molestias magnam saepe eius! Molestias.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
            accusamus illum voluptas soluta error blanditiis facere expedita
            nihil hic possimus rem repellendus, vero a iste nesciunt. Aperiam
            veritatis modi sint. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Architecto nisi perferendis ad laboriosam culpa
            eaque asperiores tenetur earum, id saepe cupiditate laudantium!
            Saepe obcaecati autem, quaerat nostrum laborum unde perferendis!
          </p>
        </template>

        <template #b>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum, fuga.
            Nihil iste enim expedita repellat consequuntur officiis sequi illo
            provident ducimus voluptatem alqiquam corrupti sapiente adipisci ex,
            fugit rerum necessitatibus. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Alias, magnam? Ad aperiam quaerat adipisci atque
            dolores? Sapiente, distinctio accusantium, laudantium numquam ut
            perferendis laborum harum molestias magnam saepe eius! Molestias.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
            accusamus illum voluptas soluta error blanditiis facere expedita
            nihil hic possimus rem repellendus, vero a iste nesciunt. Aperiam
            veritatis modi sint. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Architecto nisi perferendis ad laboriosam culpa
            eaque asperiores tenetur earum, id saepe cupiditate laudantium!
            Saepe obcaecati autem, quaerat nostrum laborum unde perferendis!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            sed nisi voluptatem perferendis facilis ab, aperiam mollitia neque
            deserunt expedita ea! Repudiandae quaerat, unde cupiditate libero
            fuga excepturi obcaecati. Sunt? Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Cum, fuga. Nihil iste enim expedita
            repellat consequuntur officiis sequi illo provident ducimus
            voluptatem aliquam corrupti sapiente adipisci ex, fugit rerum
            necessitatibus.
          </p>
        </template>
      </Tabs>
    </Card>
  </div>
</template>

<style></style>
