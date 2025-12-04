import { CatPrinter } from './node_modules/@opuu/cat-printer/dist/cat-printer.js';

// Crea la instancia de CatPrinter
const printer = new CatPrinter({ debug: true, energy: 30000});

// Variables
var write = document.getElementById("graph2");
var write0 = document.getElementById("a0");
var write1 = document.getElementById("a1");
var write2 = document.getElementById("a2");
var write3 = document.getElementById("a3");
var write4 = document.getElementById("a4");
var write5 = document.getElementById("a5");
var graph = "";
var unit = "❯";
var space = " ";
var line = "-";
var newLine ="\n"
var star = "✰";
var el = 0;
var maxLabelLength = 20;
var fullWidth = 40; 
var text = [];
var printText = ""; 
var graphTitle = "";
var rName = ""; 
var rEmoti = ""; 
var rBody = ""; 
var barGraphR = "";
var barGraphC = "";
var rEval = ""; 
var printContent = "";

//Agrega los event listeners
write0.addEventListener('click', () => {
    printData(a0);
});
write1.addEventListener('click', () => {
    printData(a1);
});
write2.addEventListener('click', () => {
    printData(a2);
});
write3.addEventListener('click', () => {
    printData(a3);
});
write4.addEventListener('click', () => {
    printData(a4);
});
write5.addEventListener('click', () => {
    printData(a5);
});
console.log(data);

//Asigna los datos a dibujar
function printData (z) {
    var m0 = data.animo.ansioso.plato;
    var m1 = data.animo.triste.plato;
    var m2 = data.animo.desanimado.plato;
    var m3 = data.animo.apurado.plato;
    var m4 = data.animo.contento.plato;
    var m5 = data.animo.agripado.plato;
   // console.log(z);
    if ( z == a0){
        draw(m0); 
    }else if(z == a1){
        draw(m1); 
    }else if(z == a2){
        draw(m2); 
    }else if(z == a3){
        draw(m3); 
    }else if(z == a4){
        draw(m4); 
    }else if(z == a5){
        draw(m5); 
    };
}

// Dibuja gráfico de razón
function rbarGraphR (x) {
    text = [];
    var titleText = "Razón para comprar comida"+newLine;
    graphTitle = titleText+line.repeat(fullWidth)+newLine;
    for (let i=0; i < Object.keys(x.razon).length; i++) {
        const r = "r";
        const n = i+1;
        const key = r+n.toString();
        var labels = x.razon[key].label;
        const l = labels.length;
        const lSpace = maxLabelLength - l; 
        graph = labels+space.repeat(lSpace)+"|"+unit.repeat(x.razon[key].count)+newLine;
        printGraph(graph);
    };
    printText = text.join("");
    barGraphR = graphTitle + printText + newLine; 
    return barGraphR;  
}; 

function printGraph (x) {
    text.push(x);
    return text; 
};

//Dibuja gráfico de Comida
function rbarGraphC (x) {
    text = [];
    var titleText = "Mejor hora para comer "+newLine;
    graphTitle = titleText+line.repeat(fullWidth)+newLine;
    for (let i=0; i < Object.keys(x.comida).length; i++) {
        const c = "c";
        const n = i+1;
        const key = c+n.toString();
        var labels = x.comida[key].label;
        const l = labels.length;
        const lSpace = maxLabelLength - l; 
        graph = labels+space.repeat(lSpace)+"|"+unit.repeat(x.comida[key].count)+newLine;
        //drawGraph(graph);
        console.log(graph);
        printGraph(graph);
    };
    printText = text.join("");
    barGraphC = graphTitle + printText + newLine; 
    return barGraphC;
};

function rTitle (x) {
    rName = x.nombre+newLine+line.repeat(fullWidth)+newLine;
    return rName;
}

function rEmoji (x) {
    rEmoti = x.emoji+x.delta_animo.valor+newLine+line.repeat(fullWidth)+newLine;
    return rEmoti;
}

function rDescription (x) {
    rBody = x.descripcion+newLine+line.repeat(fullWidth)+newLine;
    return rBody;
}

function rEvaluation (x) {
    var evalTitle = "¿Que tan rico es?"
    rEval = evalTitle+newLine+line.repeat(fullWidth)+newLine+star.repeat(x.evaluacion.valor);
    return rEval;
}

//Pasa las variables de datos a sus respectivs funciones para ser dibujadas
function draw (x) {
    rTitle(x);
    rEmoji(x);
    rDescription(x);
    rbarGraphR(x);
    rbarGraphC(x);
    rEvaluation(x);
    printContent = rName + rEmoti + rBody + barGraphR + barGraphC + rEval;
    //console.log(printContent);
    connectPrinter(printContent);
};

//Connect to the printer
async function connectPrinter(x) {
        try {
                await printer.connect();
                console.log('Connected to printer!');
                console.log(x);
                
                // Print text with custom options
                await printer.printText(x, { 
                        fontFamily: 'Monospace',
                        fontSize: 14, 
                        fontWeight: 'normal',
                        align: 'start',
                        lineSpacing: 30
                });
                
                /* Print an image using Floyd-Steinberg dithering
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