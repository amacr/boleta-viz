import { CatPrinter } from './node_modules/@opuu/cat-printer/dist/cat-printer.js';

// Create a new instance with debug logging enabled
const printer = new CatPrinter({ debug: true, speed: 48, energy: 3000});

    var write = document.getElementById("graph2");
    var data = [10, 15, 9, 5];
    var label = ["sola", "pareja", "familia", "amigos"];
    var unit = "▓";
    var space = " ";
    var line = "-";
    var newLine ="\n"
    var el = 0;
    var title1 = "Comidas compartidas por grupo"+newLine;
    var graph = "";
    var printText = "";
    var text = []; 

// Código visualización 

// Devuelve el n° de caracteres del string más largo
    function maxLength (x){
        var maxL = Math.max(...x.map(el => el.length));
        return maxL
    };

    function drawGraph (x) {
        var graphDraw = document.createTextNode(x);
        write.appendChild(graphDraw);
    }

    function barGraph () {
        for (let i=0; i < data.length; i++) {
        const labels = label[i];
        const l = labels.length; 
        const lSpace = maxLength(label) - l; 
        graph = labels+space.repeat(lSpace)+"|"+unit.repeat(data[i])+newLine;
        drawGraph(graph);
        printGraph(graph); 
        };
    };
    
    var title = document.createTextNode(title1+line.repeat(title1.length)+newLine);
    write.appendChild(title)
    barGraph ();

    function printGraph (x) {
        text.push(x);
        return text; 
    }

    printText = text.join("");
    console.log(write.textContent);

// Connect to the printer
async function connectPrinter() {
        try {
                await printer.connect();
                console.log('Connected to printer!');
                
                // Print text with custom options
                await printer.printText(printText, { 
                        fontFamily: 'Monospace',
                        fontSize: 20, 
                        fontWeight: 'normal',
                        align: 'start',
                        lineSpacing: 20
                });
                
                /*// Print an image using Floyd-Steinberg dithering
                await printer.printImage('prueba.jpg', {
                        dither: 'floyd-steinberg'
                });*/
                console.log("print ready")
                
                // Feed the paper to finalize the printing job
                await printer.feed(100);
                
                // Disconnect when the job is done
                await printer.disconnect();
        } catch (error) {
                console.error('Error during printing:', error);
        }
}

// Bind the connect function to a button click event
document.getElementById('connectButton').addEventListener('click', connectPrinter);