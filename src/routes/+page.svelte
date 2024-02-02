<script lang="ts">
	import IconAlphabetLatin from "~icons/tabler/AlphabetLatin.svelte";
	import IconBook2 from "~icons/tabler/Book-2.svelte";
	import IconFileZip from "~icons/tabler/FileZip.svelte"
	import IconMountain from "~icons/tabler/Mountain.svelte"
	import IconPalette from "~icons/tabler/Palette.svelte"
	import IconSword from "~icons/tabler/Sword.svelte"
</script>

<main class="flex items-center w-full h-full">
	<main class="flex flex-col items-center space-y-4 w-full">
		<div class="flex items-center space-x-2">
			<img src="./dph.png" class="h-16" alt="DPH logo" />
			<h1 class="text-5xl"><b>Datapack Hub</b> Tools</h1>
		</div>
		<p>
			Objectively the best collection of tools for Minecraft Datapacks and
			Resource Packs.
		</p>
		<div>
			<p class="my-1 text-lg text-zinc-200">Popular Tools:</p>
			<div class="grid grid-cols-3 gap-2">
				<div class="card">
					<IconAlphabetLatin
						height={35}
						class="text-blue-500 group-hover:text-blue-400 transition-all" />
					<div>
						<h1 class="text-lg font-semibold">/tellraw Generator</h1>
					</div>
				</div>
				<div class="card">
					<IconBook2
						height={35}
						class="text-blue-500 group-hover:text-blue-400 transition-all" />
					<div>
						<h1 class="text-lg font-semibold">Book Generator</h1>
					</div>
				</div>
				<div class="card">
					<IconMountain
						height={35}
						class="text-green-600 group-hover:text-green-500 transition-all" />
					<div>
						<h1 class="text-lg font-semibold">Biome Generator</h1>
					</div>
				</div>
				<div class="card">
					<IconSword
						height={35}
						class="text-rose-600 group-hover:text-rose-500 transition-all" />
					<div>
						<h1 class="text-lg font-semibold">Loot Table Generator</h1>
					</div>
				</div>
				<div class="card">
					<IconPalette
						height={35}
						class="text-rose-600 group-hover:text-rose-500 transition-all" />
					<div>
						<h1 class="text-lg font-semibold">Recipe Generator</h1>
					</div>
				</div>
				<div class="card">
					<IconFileZip
						height={35}
						class="text-rose-600 group-hover:text-rose-500 transition-all" />
					<div>
						<h1 class="text-lg font-semibold">Template Generator</h1>
					</div>
				</div>
			</div>
		</div>
	</main>
</main>
