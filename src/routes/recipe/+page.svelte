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

    interface TextSection {
        text: string;
        styles: CSSStyleDeclaration;
    }

    function getAllTextSectionsWithStyles(node: Node, textSections: TextSection[] = []): TextSection[] {
        if (node.nodeType === Node.TEXT_NODE) {
            // If the node is a text node, add its content and computed styles to the array
            const styles = window.getComputedStyle(node.parentElement!);
            textSections.push({
                text: node.textContent?.trim() || '',
                styles: styles,
            });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // If the node is an element node, recursively check its children
            node.childNodes.forEach(child => {
                getAllTextSectionsWithStyles(child, textSections);
            });
        }
        return textSections;
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

    function generate(){
        var temp_out: Array<any> = [""]
        const all = getAllTextSectionsWithStyles(edit_box)
        for (var item of all){
            let out = {}

            out["text"] = item.text,
            out["color"] = rgba2hex(item.styles.color)

            if(!item.styles.textDecoration.search("underline")) out["underlined"] = "true"
            if(!item.styles.textDecoration.search("line-through")) out["strikethrough"] = "true"

            temp_out.push(out)
            
        }

        output = JSON.stringify(temp_out)
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
    
</main>