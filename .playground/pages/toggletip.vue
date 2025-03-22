<script setup lang="ts">
useHead({ title: 'Non modal dialog pattern' });

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
    <h1>Non modal dialog pattern</h1>

    <p>
      A common pattern on the web is to show content over top of other content,
      drawing the user's attention to specific important information or actions
      that need to be taken. This pattern can technically be described as a
      non-modal dialog or popover. Krafters UI offers 2 components: ToggleTip
      and MenuButton.
    </p>

    <p class="c-grey-text fs-xs mbe-2">
      Krafters UI uses
      <Button
        to="https://vue-tippy.netlify.app"
        label="VueTippy"
        variant="link"
        target="_blank"
        external
      />
      for these components. In the future this package could be replaced with
      the
      <Button
        to="https://developer.mozilla.org/en-US/docs/Web/API/Popover_API"
        label="Popover API"
        variant="link"
        target="_blank"
        external
      />
      when
      <Button
        to="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning"
        label="anchor positioning"
        variant="link"
        target="_blank"
        external
      />
      will be supported in all modern browsers.
    </p>

    <div class="demo-page-cols">
      <Card>
        <div class="text-content">
          <h2>ToggleTip</h2>

          <p class="c-grey-text">
            A tooltip is a popup that displays information related to an element
            when the element receives keyboard focus or the mouse hovers over
            it. To work by touch just as well as by mouse or keyboard,
            toggletips are revealed by click rather than by hover and focus.
            Krafters UI uses
            <Button
              to="https://inclusive-components.design/tooltips-toggletips"
              label="Toggletips with live regions"
              target="_blank"
              external
              variant="link"
            />.
          </p>

          <p class="c-grey-text fs-xxs">
            Note: the
            <Button
              label="Tooltip design pattern"
              to="https://www.w3.org/WAI/ARIA/apg/patterns/tooltip"
              external
              target="_blank"
              variant="link"
            />
            is work in progress; it does not yet have task force consensus.
          </p>
        </div>

        <div class="flex-wrapper">
          <Tooltip label="Toggletip label" :max-width="480" :hide-label="false">
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
          <ul class="a11y-list">
            <li>Use a <code>button</code> element to trigger the toggletip.</li>

            <li>
              The trigger element has the <code>aria-expanded</code> attribute.
              The value should align with the open state of the toggletip.
            </li>

            <li>
              The trigger element has the <code>aria-controls</code> attribute.
              The value should refer to the ID of the toggletip.
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
                The element that serves as the toggletip container has
                <code>role="tooltip"</code>.
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
        </div>
      </Card>

      <Card>
        <div class="text-content">
          <h2>Menu Button</h2>
          <p class="c-grey-text">
            A
            <Button
              label="menu button"
              to="https://www.w3.org/WAI/ARIA/apg/patterns/menu-button"
              variant="link"
              target="_blank"
              external
            />
            is a button that opens a menu, also referred to as popup or overflow
            menu.
          </p>
        </div>

        <div class="flex-wrapper">
          <Popover
            icon="hugeicons:popcorn"
            label="Popover label"
            size="lg"
            trigger-variant="secondary"
            :hide-label="false"
            :modal="false"
          >
            <template #content>
              <p style="padding: 1rem 1.5rem; min-width: 340px">
                <Button
                  label="ARIA Design Pattern for Menu Button"
                  to="https://www.w3.org/WAI/ARIA/apg/patterns/menu-button"
                  variant="link"
                  target="_blank"
                  external
                />
              </p>
            </template>
          </Popover>

          <Popover
            hide-label
            size="lg"
            :max-width="480"
            :list="popoverActions"
          />
        </div>

        <div class="text-content">
          <h3>Accessibility requirements</h3>

          <p>
            The Popover component is an interative toggletip. If the
            <code>list</code> prop is supplied, the component adds a
            <code>role="menu"</code> and <code>aria-has-popup="menu"</code> to
            the navigation menu.
          </p>

          <ul class="a11y-list">
            <li>
              Use a <code>button</code> element to open or close the menu.
            </li>

            <li>
              The trigger element has <code>aria-expanded</code> attribute. The
              value should align with the open state of the toggletip.
            </li>

            <li>
              The trigger element has an <code>aria-controls</code> attribute.
              The value should refer to the ID of the menu.
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
