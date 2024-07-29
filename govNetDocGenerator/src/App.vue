<template>
  <div>
    <header>
      <div class="header-content">
        <h4 class="title">DOCUMENT GENERATOR</h4>
      </div>
      <div class="nav-bar">
        <img alt="Vue logo" class="logo" src="@/assets/logo.png" />
        <nav class="filter">
          <RouterLink to="/">Data Upload</RouterLink>
          <RouterLink to="/uploaded-data">Uploaded Data</RouterLink>
          <RouterLink to="/generated-files">Generated Files</RouterLink>
        </nav>
      </div>
    </header>
    <aside class="sidebar bg-warning bg-light pt-5">
      <!-- Your sidebar HTML code goes here -->
      <ul class="sidebar-nav">
        <li class="nav-item">
          <router-link
          
            to="/"
            class="router-link-active router-link-exact-active "
            style="font-size: 15px"
            >Data Upload</router-link
          >
        </li>
        <br />
        <li class="nav-item">
          <router-link
                       to="/uploaded-data"
            class="btn btn-danger btn-block text-light"
            style="font-size: 15px"
            >Uploaded Files</router-link
          >
        </li>
        <br />
        <li class="nav-item">
          <router-link
                       to="/generated-files"
            class="btn btn-danger btn-block text-light"
            style="font-size: 15px"
            >Generated Files</router-link
          >
        </li>
      </ul>
    </aside>
    <RouterView />
  </div>
</template>

<style scoped>
nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}
aside ul a.router-link-exact-active {
  color: var(--color-text);
}

aside ul a.router-link-exact-active:hover {
  background-color: transparent;
}

aside ul a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

aside ul{
  list-style: none;
}
aside ul a{
  text-decoration: none;
}
/* @media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
