<script>
	import { enhance } from '$app/forms';
	import SelectComp from '$lib/components/SelectComp.svelte';

  // props from server
 let { form, data} = $props();         // page data (not used here)

  /* ---------- reactive state (runes) ---------- */
  let bookName   = $state(form?.bookName ?? '');
  let fileInput  = $state(null);          // DOM node
  let uploading  = $state(false);
  let message    = $state('');

  let categories = $state(data.categories ?? []); // from server load function
  let selectedCategory = $state();

  $effect(() => {
    if (form?.success) {
      message   = `✨ “${form.bookName}” uploaded!`;
      bookName  = '';
      fileInput && (fileInput.value = ''); // reset
    } else if (form?.missingName) message = 'Book name is required 💔';
    else if (form?.missingFile)   message = 'PDF file is required 💔';
    else if (form?.invalidType)   message = 'Only PDF files allowed 💔';
  });
</script>

<svelte:head>
    <title>Add Book</title>
</svelte:head>

{#snippet fe(labeler="", type="", name="", placeholder="", required=true)}
    <label class="block">
        <span class="text-sm font-medium text-pink-700">{labeler} 💕</span>
        <input
          name={name}
          type={type}
          {required}
          placeholder={placeholder}
          class="w-full mt-1 px-4 py-3 rounded-2xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none bg-pink-50/50 placeholder-pink-300 text-pink-800"
        />
      </label>
{/snippet}


<!-- same pretty markup you already had -->
<div class="min-h-screen bg-linear-to-br from-pink-100 via-rose-50 to-purple-100 flex items-center justify-center p-4">
  <div class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md border border-pink-200">

    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold bg-linear-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-2">
        📚 Add Your Book
      </h1>
    </div>

    <!-- action endpoint is the same URL (add-book) -->
    <form
      method="POST"
      enctype="multipart/form-data"
      use:enhance={() => {
        uploading = true;
        message   = '';
        return async ({ result, update }) => {
          uploading = false;
          if (result.type === 'success') await update(); // re-run load function if you need
        };
      }}
      class="space-y-6"
    >
      <!-- Book name -->
 

      {@render fe("Book Title", "text", "title", "Add Book Title Here", true)}
      {@render fe("Author Name", "text", "author","Add Author Name Here", true)}

      <label class="block">
        <span class="text-sm font-medium text-pink-700"> Category 💕</span>
        <SelectComp name="category" items={categories} bind:value={selectedCategory} />     
        <input type="hidden" name="category" value={selectedCategory} />
      </label>

      <label class="block">
        <span class="text-sm font-medium text-pink-700"> Description 💕</span>
        <textarea
          name="description"
          rows="3"
          placeholder="Enter a brief description of the book..."
          class="w-full mt-1 px-4 py-3 rounded-2xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none bg-pink-50/50 placeholder-pink-300 text-pink-800 resize-none"
        ></textarea>
      </label>



      <!-- File -->
      <label class="block">
        <span class="text-sm font-medium text-pink-700">Upload Book 📖</span>
        <input
          name="book"
          type="file"
          accept=".pdf"
          bind:this={fileInput}
          required
          class="mt-1 block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-2xl file:border-0 file:text-sm file:font-semibold file:bg-pink-200 file:text-pink-700 hover:file:bg-pink-300 transition"
        />
      </label>

      <!-- Status -->
      {#if message}
        <p class="text-center text-sm text-pink-700 bg-pink-100 border border-pink-200 rounded-2xl p-3">
          {message}
        </p>
      {/if}

      <!-- Submit -->
      <button
        type="submit"
        disabled={uploading}
        class="w-full bg-pink-200 from-pink-400! border  to-purple-400! hover:from-pink-500! hover:to-purple-500! text-black! font-bold py-3 px-6 rounded-2xl transition transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
      >
        {uploading ? 'Uploading…' : 'Upload Book 🌸'}
      </button>
    </form>

    <!-- cute bouncing emojis -->
    <div class="mt-8 flex justify-center space-x-4 text-2xl">
      <span class="animate-bounce">💖</span>
      <span class="animate-bounce delay-100">✨</span>
      <span class="animate-bounce delay-200">🌸</span>
      <span class="animate-bounce delay-300">💫</span>
    </div>
  </div>
</div>

<style>
  /* same keyframes you already had */
  @keyframes bounce { 0%,100%{transform:translateY(-25%)} 50%{transform:translateY(0)} }
  .animate-bounce { animation:bounce 1s infinite }
  .delay-100 { animation-delay:.1s }
  .delay-200 { animation-delay:.2s }
  .delay-300 { animation-delay:.3s }
</style>