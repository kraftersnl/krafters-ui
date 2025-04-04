<script setup lang="ts">
useHead({ title: 'Changelog' });
</script>

<template>
  <div class="demo-page changelog-page">
    <h1>Changelog</h1>
    <p class="mbe-2">Release notes for new features and bug fixes.</p>

    <ChangelogEntry v="1.4.1" date="2025-04-04">
      <ul>
        <li>
          Breaking: rename focusTrigger to <code>focusElement</code> in Popover
          component
        </li>
        <li>Expose <code>focusElement</code> in Button component</li>
        <li>Increase minimum click area to 24px for Tooltip component</li>
        <li>
          Add <code>ellipsisLines</code> prop to MarkdownPreview component
        </li>
        <li>Add <code>buttonFontSize</code> prop to MobileMenu component</li>
        <li>Add <code>fontSize</code> prop to ThemeToggle component</li>
        <li>Add solar icon set</li>
        <li>Fix default icon sizes for Button component</li>
        <li>Refactor: Pagination component</li>
        <li>Refactor: class and style bindings</li>
        <li>
          Refactor: replace <code>withDefaults()</code> with destructured props
          syntax
        </li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.4.0" date="2025-03-30">
      <ul>
        <li>Breaking: rename props for MobileMenu component</li>
        <li>
          Breaking: rename <code>triggerVariant</code> to
          <code>buttonVariant</code> prop in Popover component
        </li>
        <li>
          Change implementation of aria-hidden to <code>inert</code> in
          FocusLoop component
        </li>
        <li>Add <code>is</code> prop to FocusLoop component</li>
        <li>
          Add <code>modal</code> prop to FocusLoop, Popover and Dialog
          components
        </li>
        <li>Fix issue with animations for Dialog and MobileMenu components</li>
        <li>
          Fix accessibility issue with using <kbd>Escape</kbd> key to close
          Dialog component
        </li>
        <li>Add <code>role</code> prop to Dialog component</li>
        <li>
          Add <code>label</code> and <code>clickOutside</code> props to
          MobileMenu component
        </li>
        <li>
          Improve accessibility for ProgressMeter and ProgressCircle components
        </li>
        <li>
          Add <code>fontSize</code> and <code>role</code> props to ProgressMeter
          and ProgressCircle components
        </li>
        <li>
          Add <code>borderRadius</code>, <code>padding</code> and
          <code>mobilePadding</code> props to Card component
        </li>
        <li>Reduce specificity of CSS reset rules</li>
        <li>Improve docs with accessibility requirements</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.3.8" date="2025-03-20">
      <ul>
        <li>Improve accessibility for Tooltip and Popover components</li>
        <li>
          Improve docs for ToggleTip, Popover, Dialog and MobileMenu components
        </li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.3.7" date="2025-03-20">
      <ul>
        <li>Move tests to playground</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.3.6" date="2025-03-20">
      <ul>
        <li>Remove <code>@nuxt/test-utils/module</code> from nuxt config</li>
        <li>Update to Nuxt 3.16.1</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.3.5" date="2025-03-19">
      <ul>
        <li>Update to Nuxt 3.16.0</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.3.4" date="2025-03-19">
      <ul>
        <li>Automation test</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.3.3" date="2025-03-19">
      <ul>
        <li>Add accessibility tests and Axe Popup component for development</li>
        <li>
          set <code>detectBrowserLanguage</code> to false to fix default locale
          bug
        </li>
        <li>change reset icon in Search component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.3.2" date="2025-03-18">
      <ul>
        <li>Remove animation from Dialog component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.3.1" date="2025-03-14">
      <ul>
        <li>Move locales folder to root i18n folder</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.3.0" date="2025-03-11">
      <ul>
        <li>
          Breaking: replace <code>datetime()</code> function with
          <code>d()</code> to replace <code>$d()</code> from vue-i18n
        </li>
        <li>Add <code>readonly</code> prop to Input and Textarea components</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.2.7" date="2025-03-07">
      <ul>
        <li>Add VideoPlayer component</li>
        <li>Add CopyButton component</li>
        <li>Add ThemeToggle component</li>
        <li>Add <code>ariaLabel</code> prop to Callout component</li>
        <li>Add <code>iconPos</code> prop to Popover component</li>
        <li>Add <code>inline</code> prop to MenuList component</li>
        <li>
          Add design tokens for <code>--font-weight-regular</code>,
          <code>--font-weight-medium</code> and <code>--font-weight-bold</code>
        </li>
        <li>Fix word break in Ellipsis component</li>
        <li>Fix z-index issue with close button in MobileMenu component</li>
        <li>Fix table overflow issue with visuallyhidden text</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.2.6" date="2025-02-28">
      <ul>
        <li>
          Add <code>skeleton</code>, <code>skeletonRows</code> and
          <code>skeletonCols</code> props to Table component
        </li>
        <li>Add <code>word-break: all</code> to Ellipsis component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.2.5" date="2025-02-25">
      <ul>
        <li>Fix wrapping for code examples in MarkdownPreview component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.2.4" date="2025-02-24">
      <ul>
        <li>Add <code>iconSize</code> prop to Callout component</li>
        <li>Fix: add video element to CSS reset</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.2.3" date="2025-02-23">
      <ul>
        <li>Improve accessibility for Tooltip and Popover components</li>
        <li>Improve styling for Callout component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.2.2" date="2025-02-21">
      <ul>
        <li>Change: remove <code>cursor: pointer</code> from buttons</li>
        <li>Add ghost variant to Popover component and set to default</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.2.1" date="2025-02-21">
      <ul>
        <li>
          Fix: set <code>overflow: visible</code> if content is visible in
          Accordion component
        </li>
        <li>
          Add <code>tabindex</code> prop to Input, Checkbox, CheckboxGroup,
          RadioGroup, Select and MultiSelect components
        </li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.2.0" date="2025-02-20">
      <ul>
        <li>Feature: improve <code>icon</code> prop in components</li>
        <li>
          Breaking: remove support for <code>iconLib</code> prop in components
        </li>
        <li>Breaking: rename Meter to ProgressMeter component</li>
        <li>Fix <code>--font-size</code> design token for Button component</li>
        <li>Fix text overflow in link variant for Button component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.1.8" date="2025-02-19">
      <ul>
        <li>Add <code>max</code>prop to ProgressCircle component</li>
        <li>Fix placeholder color for DatePicker component</li>
        <li>Fix background color of Markdown components</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.1.7" date="2025-02-18">
      <ul>
        <li>Add <code>borderWidth</code>prop to Card component</li>
        <li>Add <code>hideLabel</code>prop to Meter component</li>
        <li>Remove background color from MarkdownPreview component</li>
        <li>Fix styling in <code>menu</code> variant for Button component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.1.6" date="2025-02-17">
      <ul>
        <li>Fix overflow issue for code blocks in MarkdownPreview component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.1.5" date="2025-02-17">
      <ul>
        <li>
          Improve logic for <code>icon</code> and <code>iconLib</code> props in
          Button component
        </li>
        <li>
          Add <code>autofocus</code>, <code>autocomplete</code> andd
          <code>hideSubmitButton</code> props to Search component
        </li>
        <li>Fix whitespace issue in Popover menu</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.1.4" date="2025-02-16">
      <ul>
        <li>Add <code>iconSize</code> prop to Button component</li>
        <li>
          Add <code>fontSize</code>, <code>iconSize</code> and
          <code>labelIcon</code> props to MenuList component
        </li>
        <li>Add <code>datetime()</code> helper function</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.1.3" date="2025-02-16">
      <ul>
        <li>Add ProgressCircle component</li>
        <li>
          Remove <code>mdc-unwrap="p"</code> attribute from Card, Accordion and
          AccordionDetails components
        </li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.1.2" date="2025-02-14">
      <ul>
        <li>Add <code>--animation-shake</code> design token</li>
        <li>Add <code>loading</code> prop to Table component</li>
        <li>Add <code>radius</code> prop to Chip component</li>
      </ul>
    </ChangelogEntry>

    <ChangelogEntry v="1.1.1" date="2025-02-14">
      <ul>
        <li>Add <code>fontSize</code> prop to Button component</li>
        <li>Add <code>fontSize</code> prop to Callout component</li>
        <li>Expose <code>focusTabpanel()</code> function in Tabs component</li>
        <li>
          Remove <code>--app-max-width</code> design token to prevent flashing
          layout
        </li>
        <li>Improve types</li>
      </ul>
    </ChangelogEntry>

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
          Add <code>mdc-unwrap="p"</code> attribute to slot Accordion,
          AccordionDetails, Card, Callout, Chip and Ellipsis components
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
          Expose <code>focusElement()</code> function in MultiSelect component
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
    > li {
      margin-bottom: 0.125rem;

      &::marker {
        color: var(--color-accent);
      }
    }

    ul {
      font-size: var(--font-size-sm);
      margin-block-end: 0.25rem;
    }
  }
}
</style>
