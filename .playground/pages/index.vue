<script setup lang="ts">
useHead({ title: 'Changelog | Krafters UI' });
</script>

<template>
  <div class="demo-page changelog-page">
    <h1>Changelog</h1>

    <ChangelogEntry v="1.1.0" date="2025-02-11">
      <ul>
        <li>
          <strong>Breaking</strong>: rename Details to AccordionDetails
          component
          <ul>
            <li>Change summary slot to trigger slot</li>
            <li>Change default slot to content slot</li>
          </ul>
        </li>
        <li>Add <code>labelLink</code> prop to MenuList component</li>
        <li>
          Add <code>mdc-unwrap="p"</code> attribute to slot of several
          components (Card, Callout, Accordion, Chip, Ellipsis)
        </li>
        <li>Add size design tokens</li>
        <li>Add size options to circle variant in Skeleton component</li>
        <li>Add <code>iconLib</code> prop to MobileMenu component</li>
        <li>Add <code>order</code> argument to sort function</li>
        <li>Fix flashing hidden content in Accordion component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.0.21" date="2025-02-09">
      <ul>
        <li>Add Skeleton and Spacer components</li>
        <li>Add <code>iconLib</code> prop to MobileMenu component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.0.20" date="2025-02-08">
      <ul>
        <li>
          Add outline option to <code>triggerVariant</code> prop in Popover
          component
        </li>
        <li>Fix secondary button color in Popover component</li>
        <li>Fix text truncation in MultiSelect component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.0.19" date="2025-02-07">
      <ul>
        <li>Add <code>triggerVariant</code> to Popover component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.0.18" date="2025-02-06">
      <ul>
        <li>Fix whitespace for Checkbox component</li>
        <li>Remove visually hidden comma from required label in form inputs</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.0.17" date="2025-02-05">
      <ul>
        <li>Fix tooltip icon size in Chip component</li>
        <li>Fix formatting for i18n <code>datetimeLong</code> option</li>
        <li>Increase gap in <code>.table-cell</code> helper class</li>
        <li>Add transition to LogoCardan component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.0.16" date="2025-02-05">
      <ul>
        <li>Fix border-radius in MenuList component</li>
        <li>Fix z-index issue for caret in MultiSelect component</li>
        <li>Translations update for password reset</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.0.15" date="2025-02-03">
      <ul>
        <li>Translations fix</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.0.14" date="2025-01-31">
      <ul>
        <li>Add <code>autofocus</code> prop to MarkdownEditor component</li>
        <li>Improve styling for Callout component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.0.13" date="2025-01-30">
      <ul>
        <li>Add <code>hideExternalIcon</code> prop to Button component</li>
        <li>
          Add <code>lg</code> option to <code>size</code> prop in Table
          component
        </li>
        <li>Fix hover styles for disabled buttons in Popover component</li>
        <li>Add translations</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.0.12" date="2025-01-29">
      <ul>
        <li>Add more validation options for Input component</li>
        <li>Fix icon support for Input component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.0.11" date="2025-01-28">
      <ul>
        <li>Fix loading prop when Button component is rendered as NuxtLink</li>
        <li>Add <code>title</code> prop to Tooltip component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.0.10" date="2025-01-27">
      <ul>
        <li>
          Breaking: rename <code>focusFn</code> prop to
          <code>invalidFocusFn</code> in Form component
        </li>
        <li>Add <code>hideLabel</code> prop to MarkdownEditor component</li>
        <li>
          Expose <code>focusElement</code> function in MultiSelect component
        </li>
        <li>Improve styling for MenuList component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.0.9" date="2025-01-26">
      <ul>
        <li>Add <code>triggerClass</code> prop to MobileMenu component</li>
        <li>Improve <code>required</code> prop for MarkdownEditor component</li>
        <li>
          Add <code>.label</code> helper class for easy swapping with native
          <code>label</code> element
        </li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.0.8" date="2025-01-24">
      <ul>
        <li>
          Add <code>label</code> and <code>hTag</code> props to MenuList
          component
        </li>
        <li>Add icon support for Tabs component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.0.7" date="2025-01-24">
      <ul>
        <li>Increase size for links in MobileMenu component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.0.6" date="2025-01-24">
      <ul>
        <li>Add <code>hideLabel</code> prop to Checkbox component</li>
        <li>Fix: show label in FileInput component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.0.5" date="2025-01-23">
      <ul>
        <li>
          Breaking: rename <code>navList</code> prop to <code>list</code> in
          MobileMenu component
        </li>
        <li>Add <code>placeholderUrl</code> prop to FileInput component</li>
        <li>Expose <code>focusElement</code> in Input component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.0.4" date="2025-01-22">
      <ul>
        <li>Add <code>iconSize</code> prop to Tooltip component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.0.3" date="2025-01-22">
      <ul>
        <li>
          Publish <code>@krafters/ui</code> package to
          <NuxtLink
            to="https://www.npmjs.com/package/@krafters/ui"
            target="_blank"
            external
            >NPM</NuxtLink
          >
        </li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.0.2" date="2025-01-20">
      <ul>
        <li>Add <code>position</code> prop to Dialog component</li>
        <li>Add animations to Dialog component</li>
        <li>Add <code>loading</code> prop to Popover component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.0.1" date="2025-01-09">
      <ul>
        <li>Fix aria-live for FileInput component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.0.0" date="2025-01-07">
      <ul>
        <li>Add documentation for existing components</li>
        <li>Add RadioGroup component</li>
        <li>Add <code>is</code> prop to Card component</li>
        <li>Add <code>size</code> prop to MultiSelect component</li>
        <li>
          Add <code>@mdit/plugin-mark</code> to MarkdownEditor and
          MarkdownPreview components
        </li>
      </ul>
    </ChangelogEntry>
  </div>
</template>

<style>
.changelog-page {
  ul {
    ul {
      font-size: var(--font-size-sm);
      margin-block-end: 0.25rem;
    }
  }
}
</style>
