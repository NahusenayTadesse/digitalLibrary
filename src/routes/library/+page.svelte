<script lang="ts">
	import { fly } from 'svelte/transition';
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import { ChevronDown, ExternalLink } from '@lucide/svelte';


 let {data} = $props();

  let pdfs = $state(data.pdfs);   // now: { title: string, path: string }[]

  



   let searchQuery = $state('');
    let filteredHelps = $derived(pdfs); // Add this

  

    function filterHelps(query: string) {
        console.log('Filtering helps with query:', query, query.length);
        if (!query) {
            filteredHelps = pdfs; // Reset to original
            return;
        }

        const queryTerms = query.trim().toLowerCase().split(/\s+/).filter(term => term.length > 0);
        if (queryTerms.length === 0) {
            filteredHelps = pdfs;
            return;
        }

        filteredHelps = pdfs.filter(pdf => {
            const search = `${pdf.title ?? ''} ${pdf.author ?? ''} ${pdf.category ?? ''}`.toLowerCase();
            return queryTerms.some(term => search.includes(term));
        });
    }



  function filterCats(cat: string) {
        const term = String(cat ?? '').trim().toLowerCase();
        if (!term) {
          filteredHelps = pdfs;
          return;
        }

        filteredHelps = pdfs.filter(pdf => {
          const val = pdf.category;
          if (!val) return false;

          if (Array.isArray(val)) {
            return val.some(c => String(c).toLowerCase().includes(term));
          }

          return String(val).toLowerCase().includes(term);
        });
      }

     function filterAuthor(cat: string) {
        const term = String(cat ?? '').trim().toLowerCase();
        if (!term) {
          filteredHelps = pdfs;
          return;
        }

        filteredHelps = pdfs.filter(pdf => {
          const val = pdf.author;
          if (!val) return false;

          if (Array.isArray(val)) {
            return val.some(c => String(c).toLowerCase().includes(term));
          }

          return String(val).toLowerCase().includes(term);
        });
      }




</script>
<svelte:head>
	<title>Library</title>
	<meta name="description" content="Lovely Plus Beauty College Library" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Lovely Plus Beauty College Library" />
	<meta property="og:description" content="Lovely Plus Beauty College Library" />
	<meta property="og:image" content="/logopng.png" />
	<meta property="og:image:alt" content="Lovely Plus Beauty College logo" />
	<meta property="og:url" content="/" />
	<meta property="og:site_name" content="Lovely Plus Beauty College" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="Lovely Plus Beauty College Library" />
	<meta name="twitter:description" content="Lovely Plus Beauty College Library" />
	<meta name="twitter:image" content="/logopng.png" />
	<meta name="twitter:image:alt" content="Lovely Plus Beauty College logo" />

	<meta name="theme-color" content="#f472b6" />
</svelte:head>

  <div class="grid lg:grid-cols-3 grid-col-1 justify-center sticky top-4 right-4 w-full justify-self-center gap-4 py-8 px-4">
<input 
    type="search" 
    bind:value={searchQuery} 
    oninput={() => filterHelps(searchQuery)} 
    placeholder="Search help..." 
    class="shadow-md border border-dark/20 rounded-lg bg-white z-10 
    p-2 lg:w-sm max-w-sm m-4 focus:border-white focus:ring-1 
    focus:ring-pink/50 focus:shadow-pink/30 focus:outline-none
     transition-all duration-300 ease-in-out justify-self-end"
/>

<DropdownMenu.Root>
  <DropdownMenu.Trigger title="Filter By Category" class="flex flex-row max-w-sm 
  rounded-full bg-linear-to-r from-pink-300 via-pink-400 to-pink-500 text-white px-4 py-0 
  shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105
   transition-all duration-200 items-center justify-center gap-2 select-none 
   focus:outline-none focus:ring-4 focus:ring-pink-200">
    Categories
    <ChevronDown class="w-4 h-4 ml-1"/>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Label>Categories</DropdownMenu.Label>
      <DropdownMenu.Separator />
      {#each filteredHelps  as cat}
        <DropdownMenu.Item onclick={()=>filterCats(cat?.category)} > {cat.category}</DropdownMenu.Item>
      {/each}
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>

<DropdownMenu.Root>
  <DropdownMenu.Trigger title="Filter By Author" class="flex flex-row max-w-sm
  rounded-full bg-linear-to-r from-pink-300 via-pink-400 to-pink-500 text-white px-4 py-0 
  shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105
   transition-all duration-200 items-center justify-center gap-2 select-none 
   focus:outline-none focus:ring-4 focus:ring-pink-200">
   Authors
    <ChevronDown class="w-4 h-4 ml-1"/>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Label>Authors</DropdownMenu.Label>
      <DropdownMenu.Separator />
      {#each filteredHelps  as cat}
        <DropdownMenu.Item onclick={()=>filterAuthor(cat?.author)} > {cat.author}</DropdownMenu.Item>
      {/each}
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>


</div>

<!-- same pink grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6">
  
  {#each filteredHelps as pdf}

    
   <div class="flex flex-col gap-2 justify-start items-start shadow-sm hover:shadow-lg rounded-lg"
    transition:fly={{y:-200, duration:200}}
   >
      <!-- preview still uses the /preview endpoint -->
      
   
  <iframe
    src="/preview/{encodeURIComponent(pdf.path)}#toolbar=0&navpanes=0&scrollbar=0"
    width="100%"
    height="400"
    title="Pdf"
    class="border-0"
   
      aria-roledescription="Company policy PDF viewer"

  ></iframe>
 


      <div class="p-4">
        <a
          href={"/library/" + pdf?.id}
          class="bg-radial-to-r from-pink-400 via-pink-500 to-pink-600 text-black  font-extrabold rounded-md px-4 py-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition inline-flex items-center gap-3 truncate"
          aria-label={"Open " + (pdf?.title || "PDF")}
        >
          <span class="text-xl">💖</span>
          <span class="text-lg wrap-break-words text-balance whitespace-normal">Title: {pdf.title}</span>
          <ExternalLink class="w-8 h-8" />  
        </a>

        <div class="mt-3 flex flex-wrap gap-2">
          <span class="text-pink-700 bg-pink-50 border border-pink-100 font-semibold uppercase text-xs px-2 py-1 rounded-full truncate">
            Written by: {pdf.author}
          </span>
          <span class="text-pink-700 bg-pink-50 border border-pink-100 font-semibold uppercase text-xs px-2 py-1 rounded-full truncate">
            Category: {pdf.category}
          </span>
        </div>
      </div>
      <div class="absolute top-2 right-2 text-pink-300 group-hover:text-pink-500 transition">🌸</div>
    
   </div>
  {/each}
</div>


