<script setup lang="ts">
import logoGithub from '@/assets/logos/github.png';
import logoItchIo from '@/assets/logos/itchio.png';
</script>

<template>
  <div id="navbar">
    <h1 id="title">EchoFinder</h1>
    <ul>
      <li>About EchoFinder</li>
      <li>
        <a href="https://pirategonzalezgames.itch.io/beacon-ttrpg"><img :src="logoItchIo" class="logo" />Beacon RPG</a>
      </li>
      <li>
        <a href="https://github.com/nimoooos"><img :src="logoGithub" class="logo" />@nimoooos</a>
      </li>
    </ul>
  </div>
  <div class="wrapper">
    <!-- <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav> -->
  </div>
</template>

<style scoped>
#navbar {
  width: 100%;
  background-color: var(--color-accent-bold);
  padding-left: 1rem;
  margin-bottom: 3em;
  border-bottom-right-radius: 3em;
  border: 9px double var(--color-background);
}

#title {
  color: var(--color-background-soft);
  font-weight: 600;
  display: inline-block;
}

ul {
  display: inline-block;
}

li {
  display: inline-block;
  padding: 1rem;
}

a {
  color: var(--color-background-mute);
  transition: 0.3s;
}

a:hover {
  color: var(--color-text-mute);
  transition: 0.3s;
}

.logo {
  height: 16px;
  width: 16px;
}

.logo:hover {
  transition: 0.3s;
}
</style>
