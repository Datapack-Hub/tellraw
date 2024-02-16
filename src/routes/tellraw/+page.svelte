<script lang="ts">
    import IconBold from "~icons/tabler/Bold.svelte";
    import IconCheck from "~icons/tabler/Check.svelte";
    import IconClick from "~icons/tabler/Click.svelte";
    import IconDeviceFloppy from "~icons/tabler/DeviceFloppy.svelte";
    import IconItalic from "~icons/tabler/Italic.svelte";
    import IconLanguage from "~icons/tabler/Language.svelte";
    import IconMouse from "~icons/tabler/Mouse.svelte";
    import IconPalette from "~icons/tabler/Palette.svelte";
    import IconSquareFilled from "~icons/tabler/SquareFilled.svelte";
    import IconStrikethrough from "~icons/tabler/Strikethrough.svelte";
    import IconUnderline from "~icons/tabler/Underline.svelte";
    import IconUpload from "~icons/tabler/Upload.svelte";
    import {tippy} from 'svelte-tippy';

    var import_text: string;
    var edit_box: HTMLParagraphElement;
    var col: HTMLInputElement;
    
    var output: string | null = null
    
    function load(){
        edit_box.innerHTML = ""
        var parsed = JSON.parse(import_text) as Array<any>
        console.log(parsed)

        parsed.forEach(item => {
            if(item == "") return
            if(item["text"] == undefined) return
            var el = document.createElement("span")

            el.innerHTML = item["text"].replace("\n","<br />").replace("\\n","<br />")

            // Decoration
            el.style.textDecoration = ""
            if(item["bold"] == true) el.style.fontWeight = "700"
            if(item["underlined"] == true) el.style.textDecoration += "underline"
            if(item["italic"] == true) el.style.fontStyle = "italic"
            if(item["strikethrough"] == true) el.style.textDecoration += "line_through"

            // Color
            switch(item["color"]){
                case "dark_red":
                    el.style.color = "#AA0000"
                    break;
                case "red":
                    el.style.color = "#FF5555"
                    break;
                case "gold":
                    el.style.color = "#FFAA00"
                    break;
                case "yellow":
                    el.style.color = "#FFFF55"
                    break;
                case "dark_green":
                    el.style.color = "#00AA00"
                    break;
                case "green":
                    el.style.color = "#55FF55"
                    break;
                case "aqua":
                    el.style.color = "#55FFFF"
                    break;
                case "dark_aqua":
                    el.style.color = "#00AAAA"
                    break;
                case "dark_blue":
                    el.style.color = "#0000AA"
                    break;
                case "blue":
                    el.style.color = "#5555FF"
                    break;
                case "light_purple":
                    el.style.color = "#FF55FF"
                    break;
                case "dark_purple":
                    el.style.color = "#AA00AA"
                    break;
                case "white":
                    el.style.color = "#FFFFFF"
                    break;
                case "gray":
                    el.style.color = "#AAAAAA"
                    break;
                case "dark_gray":
                    el.style.color = "#555555"
                    break;
                case "black":
                    el.style.color = "#000000"
                    break;
                default:
                    el.style.color = item["color"]
            }
            edit_box.appendChild(el)
        });
    }

    function textNodesUnder(el: Node) {
        el.normalize()
        const children = [] // Type: Node[]
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
        while(walker.nextNode()) {
            walker.currentNode.parentElement?.normalize()
            let parent = walker.currentNode.parentElement
            if(parent) {
                children.push(walker.currentNode)
            }
        }
        return children
    }
    

    const rgba2hex = (rgba: string): string => {
        const match = rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (!match) {
            throw new Error('Invalid RGBA string');
        }

        const [r, g, b] = match.slice(1).map(n => parseInt(n, 10).toString(16).padStart(2, '0'));

        let out_hex = `#${r}${g}${b}`

        var color = out_hex

        switch(out_hex.toUpperCase()){
            case "#AA0000":
                color = "dark_red";
                break;
            case "#FF5555":
                color = "red";
                break;
            case "#FFAA00":
                color = "gold";
                break;
            case "#FFFF55":
                color = "yellow";
                break;
            case "#00AA00":
                color = "dark_green";
                break;
            case "#55FF55":
                color = "green";
                break;
            case "#55FFFF":
                color = "aqua";
                break;
            case "#00AAAA":
                color = "dark_aqua";
                break;
            case "#0000AA":
                color = "dark_blue";
                break;
            case "#5555FF":
                color = "blue";
                break;
            case "#FF55FF":
                color = "light_purple";
                break;
            case "#AA00AA":
                color = "dark_purple";
                break;
            case "#FFFFFF":
                color = "white";
                break;
            case "#AAAAAA":
                color = "gray";
                break;
            case "#555555":
                color = "dark_gray";
                break;
            case "#000000":
                color = "black";
                break;
        }
        return color;
    };

    interface TextDecorationResult {
        underline: boolean;
        strikethrough: boolean;
    }

    function getTextDecoration(element: HTMLElement | null): TextDecorationResult {
        const result: TextDecorationResult = {
            underline: false,
            strikethrough: false,
        };

        if (!element) {
            return result;
        }

        const computedStyle = window.getComputedStyle(element);
        const textDecoration = computedStyle.textDecoration;

        // Check if underline is present in the text-decoration
        result.underline = textDecoration.includes("underline");

        // Check if line-through is present in the text-decoration
        result.strikethrough = textDecoration.includes("line-through");

        // Recursively check the parent element
        const parentResult = getTextDecoration(element.parentElement);

        // Merge the results with the current element's results
        return {
            underline: result.underline || parentResult.underline,
            strikethrough: result.strikethrough || parentResult.strikethrough,
        };
    }


    function mergeWhitespaceTextNodes(nodes: Node[]): Node[] {
        const output: Node[] = [];
        let prevNode: Node | null = null;

        for (let i =  0; i < nodes.length; i++) {
            const node = nodes[i];
            if (node.nodeType === Node.TEXT_NODE && node.textContent!.trim() === '') {
                // If the node is a text node with only whitespace and there is a previous node,
                // append the whitespace to the previous node's text content.
                if (prevNode && prevNode.nodeType === Node.TEXT_NODE) {
                    prevNode.textContent += node.textContent;
                } else {
                    // If there is no previous node, keep the current node as is.
                    output.push(node);
                }
            } else {
                // If the node is not a whitespace text node, add it to the output array.
                output.push(node);
                prevNode = node;
            }
        }

        return output;
    }

    function generate(){
        let parts = textNodesUnder(edit_box)
        parts = mergeWhitespaceTextNodes(parts)
        let output_array = []
        for (var item of parts){
            if(item.parentElement){
                let style = getComputedStyle(item.parentElement)
                let out = {}

                out["text"] = item.textContent,
                out["color"] = rgba2hex(style.color)

                let deco = getTextDecoration(item.parentElement)
                if(deco.underline) out["underlined"] = "true"
                if(deco.strikethrough) out["strikethrough"] = "true"

                if(Number(style.fontWeight) > 600) out["bold"] = "true"

                output_array.push(out)
            }
        }
        const highlightedCode = hljs.highlight(
            JSON.stringify(output_array),
        { language: 'json' }
        ).value
        output = highlightedCode

    }
    
    function customcolor(){
        edit_box.focus()
        document.execCommand("foreColor", undefined, col.value)
    }

    function opencolorpicker(){
        col.click()
    }
</script>

<main class="ml-auto mr-auto block">
    <div class="flex mb-1 space-x-4">
        <div class="flex">
            <button class="btn" on:click={() => document.execCommand("bold")} use:tippy={{content:"Bold", placement:"bottom"}}><IconBold class="text-xl" /></button>
            <button class="btn" on:click={() => document.execCommand("italic")} use:tippy={{content:"Italic", placement:"bottom"}}><IconItalic class="text-xl" /></button>
            <button class="btn" on:click={() => document.execCommand("underline")} use:tippy={{content:"Underline", placement:"bottom"}}><IconUnderline class="text-xl" /></button>
            <button class="btn" on:click={() => document.execCommand("strikethrough")}  use:tippy={{content:"Strikethrough", placement:"bottom"}}><IconStrikethrough class="text-xl" /></button>
        </div>
        <div class="flex">
            <button use:tippy={{content:"Dark Red", placement:"bottom"}} on:click={() => document.execCommand("foreColor", undefined, "#aa0000")} class="btn text-red-800"><IconSquareFilled class="text-xl" /></button>
            <button use:tippy={{content:"Red", placement:"bottom"}} on:click={() => document.execCommand("foreColor", undefined, "#FF5555")} class="btn text-red-500"><IconSquareFilled class="text-xl" /></button>
            <button use:tippy={{content:"Gold", placement:"bottom"}} on:click={() => document.execCommand("foreColor", undefined, "#FFAA00")} class="btn text-orange-600"><IconSquareFilled class="text-xl" /></button>
            <button use:tippy={{content:"Yellow", placement:"bottom"}} on:click={() => document.execCommand("foreColor", undefined, "#FFFF55")} class="btn text-yellow-500"><IconSquareFilled class="text-xl" /></button>
            <button use:tippy={{content:"Dark Green", placement:"bottom"}} on:click={() => document.execCommand("foreColor", undefined, "#00aa00")} class="btn text-green-700"><IconSquareFilled class="text-xl" /></button>
            <button use:tippy={{content:"Green", placement:"bottom"}} on:click={() => document.execCommand("foreColor", undefined, "#55ff55")} class="btn text-green-500"><IconSquareFilled class="text-xl" /></button>
            <button use:tippy={{content:"Aqua", placement:"bottom"}} on:click={() => document.execCommand("foreColor", undefined, "#55ffff")} class="btn text-teal-400"><IconSquareFilled class="text-xl" /></button>
            <button use:tippy={{content:"Dark Aqua", placement:"bottom"}} on:click={() => document.execCommand("foreColor", undefined, "#00aaaa")} class="btn text-teal-500"><IconSquareFilled class="text-xl" /></button>
            <button use:tippy={{content:"Dark Blue", placement:"bottom"}} on:click={() => document.execCommand("foreColor", undefined, "#0000aa")} class="btn text-blue-700"><IconSquareFilled class="text-xl" /></button>
            <button use:tippy={{content:"Blue", placement:"bottom"}} on:click={() => document.execCommand("foreColor", undefined, "#5555ff")} class="btn text-blue-500"><IconSquareFilled class="text-xl" /></button>
            <button use:tippy={{content:"Light Purple", placement:"bottom"}} on:click={() => document.execCommand("foreColor", undefined, "#ff55ff")} class="btn text-pink-500"><IconSquareFilled class="text-xl" /></button>
            <button use:tippy={{content:"Dark Purple", placement:"bottom"}} on:click={() => document.execCommand("foreColor", undefined, "#aa00aa")} class="btn text-purple-800"><IconSquareFilled class="text-xl" /></button>
            <button use:tippy={{content:"White", placement:"bottom"}} on:click={() => document.execCommand("foreColor", undefined, "#ffffff")} class="btn text-white"><IconSquareFilled class="text-xl" /></button>
            <button use:tippy={{content:"Gray", placement:"bottom"}} on:click={() => document.execCommand("foreColor", undefined, "#aaaaaa")} class="btn text-gray-400"><IconSquareFilled class="text-xl" /></button>
            <button use:tippy={{content:"Dark Gray", placement:"bottom"}} on:click={() => document.execCommand("foreColor", undefined, "#555555")} class="btn text-gray-600"><IconSquareFilled class="text-xl" /></button>
            <button use:tippy={{content:"Black", placement:"bottom"}} on:click={() => document.execCommand("foreColor", undefined, "#000000")} class="btn text-black"><IconSquareFilled class="text-xl" /></button>
            <button on:click={opencolorpicker} use:tippy={{content:"Custom Colour", placement:"bottom"}} class="btn"><IconPalette class="text-xl" /></button>
            <input type="color" id="col" name="col" value="#ff0000" class="w-0 invisible" on:input={customcolor} bind:this={col}>
        </div>
        <div class="flex flex-grow">
            <button class="btn" use:tippy={{content:"Click Event", placement:"bottom"}}><IconClick class="text-xl" /></button>
            <button class="btn" use:tippy={{content:"Hover Event", placement:"bottom"}}><IconMouse class="text-xl" /></button>
            <button class="btn" use:tippy={{content:"Translate Key", placement:"bottom"}}><IconLanguage class="text-xl" /></button>
        </div>
        <div class="flex space-x-2">
            <button class="p-1 hover:bg-blue-500 rounded-md transition-all bg-blue-600 flex items-center space-x-1"><IconDeviceFloppy class="text-xl" /></button>
            <button class="p-1 hover:bg-orange-500 rounded-md transition-all bg-orange-600 flex items-center space-x-1"><IconUpload class="text-xl" /></button>
        </div>
    </div>
    <div class="rounded-lg bg-zinc-800 px-3 py-2 font-minecraft h-96 text-lg overflow-y-auto w-full" contenteditable="true" bind:this={edit_box} on:input={generate}>
        <div class="bg-blue-500/25 rounded-lg inline-flex items-center justify-self-center" contenteditable="false"><IconLanguage class="text-lg" /><span>some.translate.key</span></div> is my name
    </div>
    <!-- <div class="flex space-x-2 items-center mt-3">
        <input class="rounded-lg bg-zinc-800 px-3 py-2 font-minecraft flex-grow" placeholder="Import..." bind:value={import_text}>
        <button class="rounded-md bg-orange-600 hover:bg-orange-500 transition-all px-3 py-2" on:click={load}>Import</button>
    </div> -->
    <div class="mt-3">
        <div class="w-full bg-zinc-950 font-minecraft rounded-xl p-3">
            {#if output}
            <code>
                {@html output}
            </code>
            
            {:else}
            <span class="text-zinc-600">waiting for output...</span>
            {/if}
        </div>
    </div>
</main>