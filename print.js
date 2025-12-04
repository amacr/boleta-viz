import { CatPrinter } from './node_modules/@opuu/cat-printer/dist/cat-printer.js';

// Crea la instancia de CatPrinter
const printer = new CatPrinter({ debug: true, energy: 30000});

// Variables globales

//importar json
var jsonurl = "datos.json";
var misdatos = "";

//Se importa json
document.addEventListener("DOMContentLoaded", function api() {
    fetch( jsonurl )
    .then(res => res.json())
    .then(data => {
        misdatos = data;
        console.log(misdatos);
        displayData();
    });
});

var write = document.getElementById("graph2");
var write0 = document.getElementById("a0");
var write1 = document.getElementById("a1");
var write2 = document.getElementById("a2");
var write3 = document.getElementById("a3");
var write4 = document.getElementById("a4");
var write5 = document.getElementById("a5");

write0.addEventListener('click', () => {
    printData("a0");
});
write1.addEventListener('click', () => {
    printData("a1");
});
write2.addEventListener('click', () => {
    printData("a2");
});
write3.addEventListener('click', () => {
    printData("a3");
});
write4.addEventListener('click', () => {
    printData("a4");
});
write5.addEventListener('click', () => {
    printData("a5");
});

function printData (z) {
    console.log(z);
    if ( z == a0){
        //barGraph(a0); 
        console.log("click a0");
    }else if(z == a1){
        //barGraph(a1); 
        console.log("click a1");
    }else if(z == a2){
        //barGraph(a2); 
        console.log("click a2");
    }else if(z == a3){
        //barGraph(a3); 
        console.log("click a3");
    }else if(z == a4){
        //barGraph(a4); 
        console.log("click a4");
    }else if(z == a5){
        //barGraph(a5); 
        console.log("click a5");
    };
}

function displayData(data) {
    console.log(data);
}

//variables de gráfico
var data = [10, 15, 9, 5];
var label = ["sola", "pareja", "familia", "amigos"];
var unit = "❯";
var space = " ";
var line = "-";
var newLine ="\n"
var el = 0;
var title1 = "Comidas compartidas por grupo"+newLine;
var graph = "";
//var printText = "";
//var text = []; 

// Código visualización 

// Devuelve el n° de caracteres del string más largo
    function maxLength (x){
        var maxL = Math.max(...x.map(el => el.length));
        return maxL
    };

//Muestra el gráfico en el HTML
    function drawGraph (x) {
        var graphDraw = document.createTextNode(x);
        write.appendChild(graphDraw);
    }

// Pobla los datos del gráfico
    function barGraph (x) {
        const allLabels = x.razon.r[i].label; 
        console.log(allLabels);
        //maxLabel = maxLength(allLabels); 
        /*for (let i=0; i < Object.keys(x.razon).length; i++) {
            const labels = x.razon.r[i].label;
            console.log(labels);
            //const l = labels.length; 
            const lSpace = maxLength(label) - l; 
            //graph = labels+space.repeat(lSpace)+"|"+unit.repeat(x.razon.r[i].count)+newLine;
            //drawGraph(graph);
            //console.log(graph);
            //printGraph(graph); 
        };*/
    };    

    /*function printGraph (x) {
        text.push(x);
        return text; 
    }

    //printText = text.join("");
    console.log(write.textContent);

    // Pasa la variable del ID para pintar los gráficos
    var titleRazon = document.createTextNode(title1+line.repeat(title1.length)+newLine);
    write.appendChild(titleRazon)
   // barGraph();

Connect to the printer
async function connectPrinter() {
        try {
                await printer.connect();
                console.log('Connected to printer!');
                
                // Print text with custom options
                await printer.printText(write.textContent, { 
                        fontFamily: 'Monospace',
                        fontSize: 20, 
                        fontWeight: 'normal',
                        align: 'start',
                        lineSpacing: 30
                });
                
                // Print an image using Floyd-Steinberg dithering
                await printer.printImage('prueba.jpg', {
                        dither: 'floyd-steinberg'
                });
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
//document.getElementById('connectButton').addEventListener('click', connectPrinter);