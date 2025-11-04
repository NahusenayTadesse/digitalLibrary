<script lang="ts">
  let {data} = $props()
 </script>

<svelte:head>
  <title>{data.book.name} · Library 💖</title>
</svelte:head>

<!-- full-screen pink wrapper -->
<div class="min-h-screen bg-linear-to-br from-pink-100 via-rose-50 to-purple-100 flex flex-col items-center p-6">

  <!-- cute header -->
  <div class="w-full max-w-5xl mb-6">
    <a
      href="/library"
      class="inline-flex items-center space-x-2 text-pink-600 hover:text-pink-800 transition"
    >
      <span>←</span>
      <span>back to library</span>
    </a>
    <h1 class="mt-3 text-3xl font-bold bg-linear-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
      {data.book.name}
    </h1>
    <h3 class="mt-4 text-xl font-semibold text-pink-700">
     Author: {data.book.author}
    </h3>

    <h3 class="mt-2 text-xl font-semibold text-pink-700">
      Category: {data.book.category}
    </h3>
   <div class="p-3 shadow-lg rounded-sm shadow-pink-400/20 px-4">
    <h2 class="mt-2 text-xl text-center font-semibold text-pink-700">
      Description
    </h2>


    <p class="mt-2 text-lg text-gray-700">
      {data.book.description}
    </p>
    </div>
  </div>

  <!-- pdf viewer card -->
  <div class="w-full max-w-5xl h-screen bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-pink-200 overflow-hidden">
   <iframe
    src="/preview/{encodeURIComponent(data.book.address)}#toolbar=0&navpanes=0&scrollbar=0"
    width="100%"
    height="100%"
    title="Pdf"
    class="border-0"
   
      aria-roledescription="Company policy PDF viewer"

  ></iframe>
  </div>

  <!-- decorative footer -->
  <div class="mt-6 flex space-x-3 text-2xl">
    <span class="animate-bounce">💖</span>
    <span class="animate-bounce delay-100">✨</span>
    <span class="animate-bounce delay-200">🌸</span>
  </div>
</div>

<style>
  @keyframes bounce {
    0%,100%{transform:translateY(-25%)}
    50%{transform:translateY(0)}
  }
  .animate-bounce{animation:bounce 1s infinite}
  .delay-100{animation-delay:.1s}
  .delay-200{animation-delay:.2s}
</style>