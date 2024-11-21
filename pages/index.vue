<script setup lang="ts">
const isOpen = ref(false);
const file = ref<File>();
const selection = ref();

const content = ref(
  'Dit voorbeeld van _silly example_{lang=en} duurde langer om te verzinnen dan de plugin installeren.',
);

const list = [
  {
    id: 1,
    name: 'First item',
  },
  {
    id: 2,
    name: 'Second item',
  },
  {
    id: 3,
    name: 'Third item',
  },
];
</script>

<template>
  <div>
    <!-- <MarkdownPreview :content="content" /> -->

    <!-- <Select
      v-model="selection"
      label="Select"
      :options="list"
      label-key="name"
      value-key="id"
    /> -->

    <!-- <Tooltip>
      <div>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
        architecto eligendi deserunt dicta similique enim, quibusdam officiis
        quos quis quisquam amet doloribus explicabo iste nisi perferendis ut non
        distinctio numquam.
      </div>
    </Tooltip> -->

    <!-- <Popover>
      <template #content>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi quidem
        sequi autem eum dolore cupiditate blanditiis ipsam. Assumenda quas
        incidunt doloribus ad, dicta, aliquam pariatur quisquam quos iusto ipsam
        eum.
      </template>
    </Popover> -->

    <!-- <Table>
      <thead>
        <tr>
          <th>Header column A</th>
          <th>Header column B</th>
          <th>Header column C</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            repudiandae praesentium, eius, numquam blanditiis enim ullam dolorem
            dicta et magnam reiciendis quisquam rerum ab repellat voluptatem!
            Dolores voluptatibus molestias ad.
          </td>
          <td>Lorem ipsum dolor sit amet</td>
          <td>
            Eligendi repudiandae praesentium, eius, numquam blanditiis enim
            ullam dolorem dicta et magnam reiciendis quisquam rerum ab repellat
            voluptatem! Dolores voluptatibus molestias ad.
          </td>
        </tr>
      </tbody>
    </Table> -->

    <!-- <Details>
      <template #summary>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa impedit,
        maiores inventore at quaerat suscipit obcaecati amet minus iste
        voluptate ex eveniet debitis animi fugit nulla et placeat modi? Nemo!
      </template>
      <template #default>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa impedit,
        maiores inventore at quaerat suscipit obcaecati amet minus iste
        voluptate ex eveniet debitis animi fugit nulla et placeat modi? Nemo!
      </template>
    </Details> -->

    <!-- <Accordion v-model="isOpen" arrow>
      <template #trigger>Accordion Trigger</template>

      <template #content>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa omnis id
        odio! Esse veritatis modi quaerat non praesentium, voluptatibus
        repudiandae quae quos autem doloribus ad perspiciatis eos recusandae
        sapiente nisi.
      </template>
    </Accordion> -->

    <Form @submit="(e) => console.log(e)">
      <!-- <MultiSelect
        v-model="selection"
        required
        searchable
        :options="list"
        value-key="id"
        label-key="name"
        label="MultiSelect Label"
      /> -->

      <!-- <Input required label="Input" /> -->

      <FileInput v-model="file" required name="file" label="File Upload" />

      <Button type="submit" label="Submit" />
    </Form>
  </div>
</template>
