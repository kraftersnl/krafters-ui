<script setup lang="ts">
useHead({ title: 'Toggletip and Popover | Krafters UI' });

const { t } = useI18n();

const popoverActions = [
  {
    id: 'edit',
    label: t('general.edit'),
    icon: 'pencil',
  },
  {
    id: 'duplicate',
    label: t('general.duplicate'),
    icon: 'duplicate',
    divider: true,
  },
  {
    id: 'delete',
    label: t('general.delete'),
    icon: 'trash',
  },
];
</script>

<template>
  <div class="demo-page">
    <h1>Toggletip and Popover</h1>

    <div class="demo-page-cols">
      <Card>
        <h2>Toggletip</h2>

        <div class="flex-wrapper">
          <Tooltip label="Toggletip" :max-width="480" :hide-label="false">
            <p>
              Live regions are used to present changes in web content that occur
              after a web page has loaded. Typical uses include presenting news
              feeds, feedback and error messages, or live chat output to screen
              readers, which would otherwise not know about this content
              changing or being added to a web page already rendered.
            </p>
          </Tooltip>

          <Tooltip label="Live regions" icon-size="xl" :max-width="480">
            <p>
              Live regions are used to present changes in web content that occur
              after a web page has loaded. Typical uses include presenting news
              feeds, feedback and error messages, or live chat output to screen
              readers, which would otherwise not know about this content
              changing or being added to a web page already rendered.
            </p>
          </Tooltip>
        </div>

        <div class="text-content">
          <h3>Accessibility requirements</h3>
          <p>
            Krafters UI uses Toggletips with live regions. For more information,
            visit
            <Button
              to="https://inclusive-components.design/tooltips-toggletips/"
              label="Tooltips & Toggletips"
              target="_blank"
              external
              variant="link"
            />.
          </p>

          <ul>
            <li>Use a <code>button</code> element to trigger the toggletip.</li>

            <li>
              The trigger element has an <code>aria-controls</code> attribute.
              The value should refer to the ID of the toggletip.
            </li>

            <li>
              The trigger element has <code>aria-expanded</code> attribute. The
              value should align with the open state of the toggletip.
            </li>

            <li>
              Focus stays on the triggering element while the toggletip is
              displayed.
            </li>

            <li>The toggletip can be hidden with the <kbd>Escape</kbd> key.</li>

            <li>
              <s>
                The element that triggers the toggletip references the toggletip
                element with aria-describedby.
              </s>
              <ul>
                <li>
                  Don't describe toggletips with aria-describedby. It makes the
                  trigger button non-functional to screen reader users.
                </li>
              </ul>
            </li>

            <li>
              <s>
                The element that serves as the toggletip container has role
                <code>tooltip</code>.
              </s>
              <ul>
                <li>
                  The <code>role="tooltip"</code> attribute is not applicable
                  since we are using <code>role="status"</code> for the live
                  region.
                </li>
              </ul>
            </li>
          </ul>

          <p>
            <small>
              Note: the
              <Button
                to="https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/"
                target="_blank"
                external
                font-size="xs"
                label="Tooltip pattern"
                variant="link"
              />
              on ARIA Authoring Practices Guide has been work in progress since
              2016.
            </small>
          </p>
        </div>
      </Card>

      <Card>
        <h2>Popover</h2>

        <div class="flex-wrapper">
          <Popover
            :list="popoverActions"
            icon="hugeicons:popcorn"
            label="Popover label"
            size="lg"
            trigger-variant="secondary"
            :hide-label="false"
          />

          <Popover hide-label size="lg" :max-width="480">
            <template #content>
              <p style="padding: 1rem 1.5rem; min-width: 340px">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi quidem sequi autem eum dolore cupiditate blanditiis
                ipsam. Assumenda quas incidunt doloribus ad, dicta, aliquam
                pariatur quisquam quos iusto ipsam eum.
              </p>
            </template>
          </Popover>
        </div>

        <div class="text-content">
          <h3>Accessibility requirements</h3>
          <p>
            The Popover component is an interative toggletip. If the
            <code>list</code> prop is supplied, the component adds a
            <code>role="menu"</code> and <code>aria-has-popup="menu"</code> to
            the navigation menu.
          </p>

          <ul>
            <li>
              Use a <code>button</code> element to open or close the menu.
            </li>

            <li>
              The trigger element has an <code>aria-controls</code> attribute.
              The value should refer to the ID of the menu.
            </li>

            <li>
              The trigger element has <code>aria-expanded</code> attribute. The
              value should align with the open state of the toggletip.
            </li>

            <li>Focus is trapped inside the menu.</li>

            <li>The menu can be closed with the <kbd>Escape</kbd> key.</li>
          </ul>
        </div>
      </Card>
    </div>
  </div>
</template>

<style>
.demo-page-cols {
  .flex-wrapper {
    gap: 1.5rem;
    margin-block-end: 1.5rem;
  }

  .card {
    display: grid;
    gap: 1rem;
  }
}
</style>
