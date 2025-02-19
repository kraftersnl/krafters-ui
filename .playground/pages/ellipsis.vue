<script setup lang="ts">
useHead({ title: 'Ellipsis | Krafters UI' });

const lines = ref(1);
const text = ref('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sequi est, amet quae placeat odit officia inventore rerum ad pariatur a minima quos ut deleniti aperiam qui eligendi id dolores distinctio. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa consectetur corrupti ad blanditiis ratione tempora modi labore, esse facilis in eos distinctio aperiam repellendus ab earum qui commodi officiis eveniet. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Labore similique ex quisquam ab eum deserunt odit ipsum, natus maiores dignissimos ratione nemo. Ab rem laborum ratione nobis nihil dolor quia.');
</script>

<template>
  <div class="demo-page">
    <div class="section-topbar">
      <h1>Ellipsis</h1>

      <Popover icon="cog" hide-label :max-width="480">
        <div class="popover-settings-content">
          <h2>Ellipsis Props</h2>

          <div class="props-wrapper">
            <Input v-model.number="lines" type="number" label="lines" />
            <Textarea v-model="text" label="text" />
            <code
              >{{`<Ellipsis :lines="${lines}"/></Ellipsis>`}}</code>
          </div>
        </div>
      </Popover>
    </div>

    <Card>
        <Ellipsis :lines="lines">{{ text }}</Ellipsis>
    </Card>

  </div>
</template>

<style></style>
