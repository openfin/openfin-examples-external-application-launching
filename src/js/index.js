document.addEventListener("DOMContentLoaded", function(){
    init();
});

function init(){
    try{
        fin.desktop.main(function(){
            initWithOpenFin();
        })
    }catch(err){
        initNoOpenFin();
        console.log(err);
    }
};

const runtimeVersionDiv = document.getElementById('runtime-version');
const convertPdfButton = document.getElementById('convert-pdf');
const inputpdfDisplay = document.getElementById('input-pdf');
const outputHtmlDisplay = document.getElementById('output-html');

function initWithOpenFin(){
    runtimeVersionDiv.innerText = `Runtime Version ${fin.desktop.getVersion()}`;
    convertPdfButton.addEventListener('click', launchPackagedExecutable);
    document.querySelector('#path').addEventListener('input', onPathChanged);
}

function initNoOpenFin(){
    runtimeVersionDiv.innerText = 'OpenFin is not available - you are probably running in a browser.';
}

let _pdfPath = '';
let _outputPath = "";

function onPathChanged(evt){
    // Here we'll do some string interpolation to turn the input path into something javascript can use
    if (evt.target.value.length > 0) {
        const _pathString = String(evt.target.value);
        _pdfPath = '"'+_pathString.split("\\").join("\\\\")+'"';
        const _trimmedOutput = _pathString.split("\\");
        const pdfName = _trimmedOutput.pop();
        _trimmedOutput.push("html_output");
        _outputPath = '"'+String(_trimmedOutput.join("\\\\"))+'"';
        inputpdfDisplay.innerText = _pdfPath;
        outputHtmlDisplay.innerText = _outputPath;    
    } else {
        inputpdfDisplay.innerText = '';
        outputHtmlDisplay.innerText = ''; 
    }
}

function launchPackagedExecutable(){
    fin.desktop.System.launchExternalProcess({
        alias: 'pdftohtml-alias',
        arguments: _pdfPath+" "+_outputPath,
        listener: function(event){
            const statusDiv = document.getElementById('status');
            if(event.topic === "exited" && event.exitCode === 0) {
                console.log('External process event listener fired');
                console.log(event);
                statusDiv.innerText = 'PDF Process Exited with Code 0';
            } else if (event.topic === "exited" && event.exitCode === 1) {
                console.log('External process event listener fired');
                console.log(event);
                statusDiv.innerText = 'Error Converting PDF - Please provide valid file path.';
            } else {
                console.log("Running External Process");
            }
        }
    });
}


