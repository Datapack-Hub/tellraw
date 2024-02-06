<script>
	import IconHome from "~icons/tabler/Home.svelte";
    import IconBook2 from "~icons/tabler/Book.svelte";
    import IconAlphabetLatin from "~icons/tabler/AlphabetLatin.svelte";
    import IconFileZip from "~icons/tabler/FileZip.svelte";
    import IconX from "~icons/tabler/X.svelte";

    import autoAnimate from "@formkit/auto-animate"
    import "../app.css";
    import 'tippy.js/dist/tippy.css';
	import tippy from "tippy.js";
</script>

<div class="font-lexend bg-zinc-800 text-white min-h-screen h-full">
    <div class="flex items-center space-x-2 p-4 bg-zinc-800">
        <div class="flex items-center space-x-2 flex-grow">
            <img src="/dph.png" class="h-8"/>
            <h1 class="text-2xl"><b>Datapack Hub</b> Tools</h1>
        </div>
        <a href="https://datapackhub.net" class="text-blue-300">To datapackhub.net -> </a>
    </div>
    <div class="flex flex-grow h-[92vh]">
        <div class="flex flex-col space-y-2 bg-zinc-800 p-2">
            <a href="/" class="p-2 bg-zinc-700 rounded-lg group" use:tippy={{content:"Home", placement:"right",}}>
                <IconHome class="text-3xl text-orange-500 group-hover:text-orange-400 transition-all"/>
            </a>
            <a href="tellraw" class="p-2 bg-zinc-700 rounded-lg group" use:tippy={{content:"/tellraw generator", placement:"right",}}>
                <IconAlphabetLatin class="text-3xl text-blue-500 group-hover:text-blue-400 transition-all"/>
            </a>
            <a href="#recipe" class="p-2 bg-zinc-700 rounded-lg group" use:tippy={{content:"Recipe generator", placement:"right",}}>
                <IconFileZip class="text-3xl text-rose-500 group-hover:text-rose-400 transition-all"/>
            </a>
            <a href="template" class="p-2 bg-zinc-700 rounded-lg group" use:tippy={{content:"Template generator", placement:"right",}}>
                <IconFileZip class="text-3xl text-rose-500 group-hover:text-rose-400 transition-all"/>
            </a>
        </div>
        <div class="flex-grow flex flex-col overflow-y-auto space-y-1" use:autoAnimate>
            <!-- <div class="flex space-x-1">
                <div class="h-8 rounded-md p-1 px-2 bg-zinc-900 flex items-center space-x-2">
                    <IconHome class="text-orange-500 text-sm" />
                    <span>Home</span>
                    <IconX />
                </div>
                <div class="h-8 rounded-md p-1 px-2 bg-zinc-900 flex items-center space-x-2">
                    <IconAlphabetLatin class="text-orange-500" />
                    <span>Tellraw Generator</span>
                    <IconX />
                </div>
            </div> -->
            <div class="bg-zinc-900 p-3 mr-2 rounded-lg h-full" use:autoAnimate>
                <slot />
            </div>
            
        </div>
    </div>
    
    
    
</div>
