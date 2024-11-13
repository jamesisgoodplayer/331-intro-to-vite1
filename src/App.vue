<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useMessageStore } from '@/stores/message';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const store = useMessageStore();
const { message } = storeToRefs(store);

const pageSizes = [1, 2, 3, 4, 5, 6,10, 20, 30, 40, 50, 100]; // Available options for the number of items per page
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
  <SpeedInsights/>
  <div class="text-center font-sans text-gray-700 antialias">
    <header>
      <div id="flashMessage" class="animate-fade" v-if="message">
        <h4>{{ message }}</h4>
      </div>
      <h1>Deploy with Vercel</h1>
      <div class="wrapper">
        <nav class="py-6" style="display: flex; flex-direction: column; align-items: center;">
  <div style="display: flex; justify-content: center; margin-bottom: 10px;">
    
<RouterLink 
           class="font-bold text-gray-700" 
           exact-active-class="text-green-500" 
           :to="{ name: 'event-list-view' }" 
           >Event</RouterLink 
         > 
         | 
         <RouterLink 
           class="font-bold text-gray-700" 
           exact-active-class="text-green-500" 
           :to="{ name: 'about' }" 
           >About</RouterLink 
         > 
         | 
         <RouterLink 
           class="font-bold text-gray-700" 
           exact-active-class="text-green-500" 
           :to="{ name: 'organizer-list' }" 
           >Organizer</RouterLink 
         > 
         |
         <RouterLink 
           class="font-bold text-gray-700" 
           exact-active-class="text-green-500" 
           :to="{ name: 'student' }" 
           >Student</RouterLink 
         > 
         |
         <RouterLink 
           class="font-bold text-gray-700" 
           exact-active-class="text-green-500" 
           :to="{ name: 'add-event' }" 
           >New Event</RouterLink 
         > 
         |
         <RouterLink 
           class="font-bold text-gray-700" 
           exact-active-class="text-green-500" 
           :to="{ name: 'add-organizer' }" 
           >New organizer</RouterLink 
         > 
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



/* NProgress */
#nprogress {
  pointer-events: none;
}

#nprogress .bar {
  background: rgb(232, 6, 6); 
  position: fixed;
  z-index: 1031; 
  top: 0; 
  width: 100%; 
  height: 2px; 
}

#nprogress .peg {
  display: block;
  position: absolute;
  right: 0; 
  width: 100%; 
  height: 100%;
  box-shadow: 0 0 10px #29d, 0 0 5px #29d; 
}
</style>
