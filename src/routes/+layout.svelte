<script>
	import autoAnimate from "@formkit/auto-animate";
	import IconAlphabetLatin from "~icons/tabler/AlphabetLatin.svelte";
	import IconBook2 from "~icons/tabler/Book-2.svelte";
	import IconHome from "~icons/tabler/Home.svelte";
	import tippy from "tippy.js";
	import "tippy.js/dist/tippy.css";
	import "../app.css";
	import "../fonts.css";
</script>

<div class="font-lexend bg-zinc-800 text-white min-h-screen h-full">
	<div class="flex items-center space-x-2 p-4 bg-zinc-800">
		<div class="flex items-center space-x-2 flex-grow">
			<img src="/dph.png" class="h-8" alt="DPH logo" />
			<h1 class="text-2xl"><b>Datapack Hub</b> Tools</h1>
		</div>
		<a href="https://datapackhub.net" class="text-blue-300"
			>To datapackhub.net ->
		</a>
	</div>
	<div class="flex flex-grow h-[92vh]">
		<div class="flex flex-col space-y-2 bg-zinc-800 p-2">
			<a
				href="/"
				class="p-2 bg-zinc-700 rounded-lg group"
				use:tippy={{ content: "Home", placement: "right" }}>
				<IconHome
					height={45}
					class="text-orange-500 group-hover:text-orange-400 transition-all" />
			</a>
			<a
				href="tellraw"
				class="p-2 bg-zinc-700 rounded-lg group"
				use:tippy={{ content: "/tellraw generator", placement: "right" }}>
				<IconAlphabetLatin
					height={45}
					class="text-blue-500 group-hover:text-blue-400 transition-all" />
			</a>
			<a
				href="#book_generator_link"
				class="p-2 bg-zinc-700 rounded-lg group"
				use:tippy={{ content: "Book generator", placement: "right" }}>
				<IconBook2
					height={45}
					class="text-blue-500 group-hover:text-blue-400 transition-all" />
			</a>
		</div>
		<div
			class="bg-zinc-900 p-3 mr-2 rounded-lg flex-grow overflow-y-auto"
			use:autoAnimate>
			<slot />
		</div>
	</div>
</div>
