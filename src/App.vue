<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const pageSizes = [1, 2, 3, 5]; // Available options for the number of items per page
const pageSize = ref(1); // Default number of items per page is set to 1

const route = useRoute(); // Access the current route
const router = useRouter(); // Access the router instance

// Check the query parameters of the route when the component is created
if (route.query.pageSize) {
  pageSize.value = Number(route.query.pageSize); // If pageSize exists in query, set pageSize to that value
}

// Watch for changes in pageSize and update the route accordingly
watch(pageSize, (newSize) => {
  router.push({ query: { ...route.query, pageSize: newSize, page: 1 } }); // Update query parameters and reset to the first page
});

</script>


<template>
  <div id="layout">
    <header>
      <div class="wrapper">
        <nav style="display: flex; flex-direction: column; align-items: center;"> 
          <div style="display: flex; justify-content: center; margin-bottom: 10px;">
          <RouterLink :to="{ name: 'event-list-view' }">Event</RouterLink> |
          <RouterLink :to="{ name: 'about' }">About</RouterLink> |
          <RouterLink :to="{ name: 'student' }">Student</RouterLink> 
          </div>
          <div style="display: flex; align-items: center;">
            <label for="pageSize" style="margin-right: 10px;">Items per page:</label>
            <select id="pageSize" v-model="pageSize">
              <option v-for="size in pageSizes" :key="size" :value="size">
                {{ size }}
              </option>
            </select>
          </div>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style >
#layout {
  font-family: Avenir,Helventica,Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding:30px;
}

nav a {
  font-weight:bold;
  color: #2c3e50;
}
nav a.router-link-exact-active{
  color: #42b983;
}
h2 {
  font-size: 20px;
}
/* Wrapper for the dropdown */
.select-wrapper {
  position: relative; /* Relative positioning for containing the absolutely positioned arrow */
  display: inline-block; /* Display as an inline-block element */
}

/* Dropdown styles */
select {
  appearance: none; /* Remove the default dropdown arrow */
  width: 80px; /* Set the width of the dropdown */
  padding: 6px; /* Inner spacing inside the dropdown */
  margin: 5px 0; /* Outer spacing (margin) */
  border: 1px solid #b43d3d; /* Solid border with a reddish color */
  border-radius: 5px; /* Rounded corners */
  background-color: #07c117; /* Background color of the dropdown */
  color: #0149ff; /* Text color inside the dropdown */
  font-size: 14px; /* Font size for the dropdown text */
  cursor: pointer; /* Change cursor to pointer on hover */
  transition: border-color 0.3s ease; /* Smooth transition for border color changes */
}

/* Focused state styles */
select:focus {
  border-color: #42b983; /* Change border color on focus */
  outline: none; /* Remove default outline */
}

/* Custom dropdown arrow */
.select-wrapper:after {
  content: '▼'; /* Use a downward arrow character */
  position: absolute; /* Absolutely position the arrow */
  top: 50%; /* Vertically center the arrow */
  right: 10px; /* Position the arrow 10px from the right */
  transform: translateY(-50%); /* Adjust to truly center the arrow vertically */
  pointer-events: none; /* Ensure the arrow does not capture mouse events */
  color: #aaa; /* Color of the arrow */
}

/* Hover state styles */
select:hover {
  border-color: #b94248; /* Change border color when hovered */
}

</style>
