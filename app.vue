<script setup lang="ts"></script>

<template>
  <div>
    <header>
      <nav>
        <ul role="list">
          <li>
            <NuxtLink to="/">Home</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/test">Different page</NuxtLink>
          </li>
        </ul>
      </nav>

      <ThemeSelect />
      <LanguageSelect />
    </header>
    <main>
      <h1 class="visuallyhidden">Playground</h1>

      <NuxtPage class="playground" />
    </main>
  </div>
</template>

<style>
header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 2rem;

  nav {
    ul {
      display: inline-flex;
      gap: 1rem;
      margin-block-end: 1rem;
    }

    a {
      &.router-link-active {
        color: var(--color-accent);
        text-decoration: none;
      }
    }
  }
}

main {
  margin: 2rem;
}
</style>
