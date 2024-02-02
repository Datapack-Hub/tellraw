<script lang="ts">
	import IconBold from "~icons/tabler/Bold.svelte"
	import IconCheck from "~icons/tabler/Check.svelte"
	import IconClick from "~icons/tabler/Click.svelte"
	import IconDeviceFloppy from "~icons/tabler/DeviceFloppy.svelte"
	import IconItalic from "~icons/tabler/Italic.svelte"
	import IconLanguage from "~icons/tabler/Language.svelte"
	import IconMouse from "~icons/tabler/Mouse.svelte"
	import IconPalette from "~icons/tabler/Palette.svelte"
	import IconSquareFilled from "~icons/tabler/SquareFilled.svelte"
	import IconStrikethrough from "~icons/tabler/Strikethrough.svelte"
	import IconUnderline from "~icons/tabler/Underline.svelte"
	import { tippy } from "svelte-tippy";

	let importText: string;
	let editBox: HTMLParagraphElement;
	let col: HTMLInputElement;
	let textExport = "";

	function load() {
		editBox.innerHTML = "";
		let parsed = JSON.parse(importText) as Array<any>;
		console.log(parsed);

		parsed.forEach((item) => {
			if (item == "") return;
			if (item.text == undefined) return;
			let el = document.createElement("span");

			// possibly unsafe!
			el.innerHTML = item.text.replace("\n", "<br />").replace("\\n", "<br />");

			// Decoration
			el.style.textDecoration = "";
			if (item.bold == true) el.style.fontWeight = "700";
			if (item.underlined == true) el.style.textDecoration += "underline";
			if (item.italic == true) el.style.fontStyle = "italic";
			if (item.strikethrough == true) el.style.textDecoration += "line_through";

			// Color
			switch (item.color) {
				case "dark_red":
					el.style.color = "#AA0000";
					break;
				case "red":
					el.style.color = "#FF5555";
					break;
				case "gold":
					el.style.color = "#FFAA00";
					break;
				case "yellow":
					el.style.color = "#FFFF55";
					break;
				case "dark_green":
					el.style.color = "#00AA00";
					break;
				case "green":
					el.style.color = "#55FF55";
					break;
				case "aqua":
					el.style.color = "#55FFFF";
					break;
				case "dark_aqua":
					el.style.color = "#00AAAA";
					break;
				case "dark_blue":
					el.style.color = "#0000AA";
					break;
				case "blue":
					el.style.color = "#5555FF";
					break;
				case "light_purple":
					el.style.color = "#FF55FF";
					break;
				case "dark_purple":
					el.style.color = "#AA00AA";
					break;
				case "white":
					el.style.color = "#FFFFFF";
					break;
				case "gray":
					el.style.color = "#AAAAAA";
					break;
				case "dark_gray":
					el.style.color = "#555555";
					break;
				case "black":
					el.style.color = "#000000";
					break;
				default:
					el.style.color = item.color;
			}
			editBox.appendChild(el);
		});
	}

	type StyledText = {
		text: string;
		bold?: boolean;
		italic?: boolean;
		underlined?: boolean;
		strikethrough?: boolean;
		color?: string;
	};

	function getAllTextSectionsWithStyles(root: Node): StyledText[] {
		const styledTextArray: StyledText[] = [];

		function findAllTextNodes(
			node: Node | null,
			textNodes: Node[] = [],
		): Node[] {
			if (node === null) {
				return textNodes;
			}
			if (node.nodeName === "#text") {
				textNodes.push(node);
			}
			if (node.childNodes) {
				for (const child of node.childNodes) {
					findAllTextNodes(child, textNodes);
				}
			}
			return textNodes;
		}

		function nodeToHTMLElement(node: Node): HTMLElement | null {
			const tempDiv = document.createElement("span");
			tempDiv.appendChild(node.cloneNode(true));

			const htmlString = tempDiv.innerHTML;

			const parser = new DOMParser();
			const parsedDoc = parser.parseFromString(htmlString, "text/html");

			if (parsedDoc.body && parsedDoc.body.children.length > 0) {
				return parsedDoc.body.children[0] as HTMLElement;
			}

			return null;
		}

		function findFormatTags(node: Node | null, tags: string[] = []): string[] {
			if (node === null) {
				return tags;
			}
			if (["i", "b", "u", "s", "span"].includes(node.nodeName.toLowerCase())) {
				if (node.nodeName.length > 1) {
					let element = nodeToHTMLElement(node);
					tags.push(element!.style.color!);
				} else {
					tags.push(node.nodeName.toLowerCase());
				}
			}
			return findFormatTags(node.parentNode, tags);
		}

		function applyTags(text: string, tags: string[]): StyledText {
			let deDupedTags = new Set(tags);
			let styledText: StyledText = { text };
			let lastTagWasColor = false;
			console.log(tags);
			for (let tag of deDupedTags) {
				if (tag == "i") {
					styledText.italic = true;
					lastTagWasColor = false;
				} else if (tag == "b") {
					styledText.bold = true;
					lastTagWasColor = false;
				} else if (tag == "s") {
					styledText.strikethrough = true;
					lastTagWasColor = false;
				} else if (tag == "u") {
					styledText.underlined = true;
					lastTagWasColor = false;
				} else {
					if (!lastTagWasColor) {
						styledText.color = tag;
					}
					lastTagWasColor = true;
				}
			}
			return styledText;
		}

		let textNodes = findAllTextNodes(root);

		textNodes = textNodes.filter((n) => n.textContent != "");

		for (let node of textNodes) {
			let stylingTags = findFormatTags(node);
			let styledText = applyTags(node.textContent!, stylingTags);
			styledTextArray.push(styledText);
		}

		return styledTextArray;
	}

	const rgba2hex = (rgba: string): string => {
		const match = rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
		if (!match) {
			throw new Error("Invalid RGBA string");
		}

		const [r, g, b] = match
			.slice(1)
			.map((n) => parseInt(n, 10).toString(16).padStart(2, "0"));
		return `#${r}${g}${b}`;
	};

	function generate() {
		let output: StyledText[] = [];
		const all = getAllTextSectionsWithStyles(editBox);
		for (let item of all) {
			// console.log(item);
			let out: StyledText = { ...item };
			(out.text = item.text),
				(out.color = rgba2hex(item.color || "rgba(255, 255, 255)"));

			output.push(out);
		}
		// post-generate clean
		output = output.filter((v) => v.text != "");

		textExport = JSON.stringify(output);
	}

	function customColor() {
		editBox.focus();
		colorize(col.value);
	}

	function openColorPicker() {
		col.click();
	}

	function createSelectionFromNodes(nodes: Node[]): Selection {
		const range = document.createRange();
		range.setStartBefore(nodes[0]);
		range.setEndAfter(nodes[nodes.length - 1]);

		const selection = window.getSelection();
		selection?.removeAllRanges();
		selection?.addRange(range);

		return selection || new Selection();
	}

	function surround(tag: string) {
		createSelectionFromNodes(
			Array.from(
				document.getSelection()?.anchorNode?.parentNode?.childNodes || [],
			).filter((node) => node.nodeType === Node.TEXT_NODE),
		)
			.getRangeAt(0)
			.surroundContents(document.createElement(tag));
	}

	function colorize(color: string) {
		let span = document.createElement("span");
		span.style.color = color;
		document.getSelection()?.getRangeAt(0).surroundContents(span);
	}
</script>

<svelte:head>
	<title>Tellraw Generator | Datapack Hub</title>
	<meta
		name="description"
		content="The best tellraw generator you'll ever see!!" />
</svelte:head>

<main class="ml-auto mr-auto block">
	<div class="flex mb-1 space-x-4">
		<div class="flex">
			<button
				class="btn"
				on:click={() => surround("b")}
				use:tippy={{ content: "Bold", placement: "bottom" }}
				><IconBold /></button>
			<button
				class="btn"
				on:click={() => surround("i")}
				use:tippy={{ content: "Italic", placement: "bottom" }}
				><IconItalic /></button>
			<button
				class="btn"
				on:click={() => surround("u")}
				use:tippy={{ content: "Underline", placement: "bottom" }}
				><IconUnderline /></button>
			<button
				class="btn"
				on:click={() => surround("s")}
				use:tippy={{ content: "Strikethrough", placement: "bottom" }}
				><IconStrikethrough /></button>
		</div>
		<div class="flex">
			<button
				use:tippy={{ content: "Dark Red", placement: "bottom" }}
				on:click={() => colorize("#aa0000")}
				class="btn text-red-800"><IconSquareFilled /></button>
			<button
				use:tippy={{ content: "Red", placement: "bottom" }}
				on:click={() => colorize("#FF5555")}
				class="btn text-red-500"><IconSquareFilled /></button>
			<button
				use:tippy={{ content: "Gold", placement: "bottom" }}
				on:click={() => colorize("#FFAA00")}
				class="btn text-orange-600"><IconSquareFilled /></button>
			<button
				use:tippy={{ content: "Yellow", placement: "bottom" }}
				on:click={() => colorize("#FFFF55")}
				class="btn text-yellow-500"><IconSquareFilled /></button>
			<button
				use:tippy={{ content: "Dark Green", placement: "bottom" }}
				on:click={() => colorize("#00aa00")}
				class="btn text-green-700"><IconSquareFilled /></button>
			<button
				use:tippy={{ content: "Green", placement: "bottom" }}
				on:click={() => colorize("#55ff55")}
				class="btn text-green-500"><IconSquareFilled /></button>
			<button
				use:tippy={{ content: "Aqua", placement: "bottom" }}
				on:click={() => colorize("#55ffff")}
				class="btn text-teal-400"><IconSquareFilled /></button>
			<button
				use:tippy={{ content: "Dark Aqua", placement: "bottom" }}
				on:click={() => colorize("#00aaaa")}
				class="btn text-teal-500"><IconSquareFilled /></button>
			<button
				use:tippy={{ content: "Dark Blue", placement: "bottom" }}
				on:click={() => colorize("#0000aa")}
				class="btn text-blue-700"><IconSquareFilled /></button>
			<button
				use:tippy={{ content: "Blue", placement: "bottom" }}
				on:click={() => colorize("#5555ff")}
				class="btn text-blue-500"><IconSquareFilled /></button>
			<button
				use:tippy={{ content: "Light Purple", placement: "bottom" }}
				on:click={() => colorize("#ff55ff")}
				class="btn text-pink-500"><IconSquareFilled /></button>
			<button
				use:tippy={{ content: "Dark Purple", placement: "bottom" }}
				on:click={() => colorize("#aa00aa")}
				class="btn text-purple-800"><IconSquareFilled /></button>
			<button
				use:tippy={{ content: "White", placement: "bottom" }}
				on:click={() => colorize("#ffffff")}
				class="btn text-white"><IconSquareFilled /></button>
			<button
				use:tippy={{ content: "Gray", placement: "bottom" }}
				on:click={() => colorize("#aaaaaa")}
				class="btn text-gray-400"><IconSquareFilled /></button>
			<button
				use:tippy={{ content: "Dark Gray", placement: "bottom" }}
				on:click={() => colorize("#555555")}
				class="btn text-gray-600"><IconSquareFilled /></button>
			<button
				use:tippy={{ content: "Black", placement: "bottom" }}
				on:click={() => colorize("#000000")}
				class="btn text-black"><IconSquareFilled /></button>
			<button
				on:click={openColorPicker}
				use:tippy={{ content: "Custom Colour", placement: "bottom" }}
				class="btn"><IconPalette /></button>
			<input
				type="color"
				id="col"
				name="col"
				value="#ff0000"
				class="w-0 invisible"
				on:input={customColor}
				bind:this={col} />
		</div>
		<div class="flex flex-grow">
			<button
				class="btn"
				use:tippy={{ content: "Click Event", placement: "bottom" }}
				><IconClick /></button>
			<button
				class="btn"
				use:tippy={{ content: "Hover Event", placement: "bottom" }}
				><IconMouse /></button>
			<button
				class="btn"
				use:tippy={{ content: "Translate Key", placement: "bottom" }}
				><IconLanguage /></button>
		</div>
		<div class="flex space-x-2">
			<button
				class="p-1 hover:bg-blue-500 rounded-md transition-all bg-blue-600 flex items-center space-x-1"
				><IconDeviceFloppy /></button>
			<button
				class="p-1 px-2 hover:bg-green-500 rounded-md transition-all bg-green-600 flex items-center space-x-1"
				on:click={generate}><IconCheck /><span>Generate</span></button>
		</div>
	</div>
	<div
		class="rounded-lg bg-zinc-800 px-3 py-2 font-minecraft h-96 text-lg overflow-y-auto w-full"
		contenteditable="true"
		bind:this={editBox}>
	</div>
	<div class="flex space-x-2 items-center mt-3">
		<input
			class="rounded-lg bg-zinc-800 px-3 py-2 font-minecraft flex-grow"
			placeholder="Import..."
			bind:value={importText} />
		<button
			class="rounded-md bg-orange-600 hover:bg-orange-500 transition-all px-3 py-2"
			on:click={load}>Import</button>
	</div>
	<div
		class="border-white border-2 p-2 bg-black text-gray-300 font-minecraft mt-4">
		/tellraw &lt;selector&gt; {textExport}
	</div>
</main>
