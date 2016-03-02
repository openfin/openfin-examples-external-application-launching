document.addEventListener("DOMContentLoaded", function(){
    init();
});

function init(){
    console.log("Dom Loaded ", this);
    try{
        fin.desktop.main(function(){
            initWithOpenFin();
        })
    }catch(err){
        initNoOpenFin();
    }
};

var _pdfPath = "", _outputPath = "", inputpdfDisplay, outputHtmlDisplay;


function initWithOpenFin(){
    // Your OpenFin specific code to go here...
    document.querySelector('#launch-no-args').addEventListener('click', launchExtWithNoArguments);
    document.querySelector('#launch-with-args').addEventListener('click', launchExtWithArguments);
    document.querySelector('#path').addEventListener('change', onPathChanged);
    inputpdfDisplay = document.querySelector("#input-pdf");
    outputHtmlDisplay = document.querySelector("#output-html");
}

function initNoOpenFin(){
    alert("OpenFin is not available - you are probably running in a browser.");
}

function onPathChanged(evt){

    var _pathString = String(evt.target.value);
    //Wrap the arguments in double quotes - particularly if you have spaces in them.
    // Escape all backslashes with double backslashes
    _pdfPath = '"'+_pathString.split("\\").join("\\\\")+'"';
    // get rid of the name of the pdf file on the output string
    var _trimmedOutput = _pathString.split("\\");
    var pdfName = _trimmedOutput.pop();
    //...and add the output file name you require
    _trimmedOutput.push("html_output");
    // Join back into a single string to pass as an argument
    _outputPath = '"'+String(_trimmedOutput.join("\\\\"))+'"';
// Display results
    inputpdfDisplay.innerHTML = _pdfPath;
    outputHtmlDisplay.innerHTML = _outputPath;
}

/* When 'fin.desktop.System.launchExternalProcess' is called,
if no arguments are passed then the arguments (if any)
are taken from the 'app.json' file, from the  'args' parameter
of the 'appAssets' Object with the relevant 'alias'.
See the 'app.json' file.
 */
function launchExtWithNoArguments(){
    fin.desktop.System.launchExternalProcess({
        alias: 'pdftohtml-alias',
        listener: function(event){
            // react to close event
            if(event.topic === "exited" && event.exitCode === MY_KNOWN_BAD_STATE) {
                // your desired logic here
                console.log("Exited External Process");
            }else{
                console.log("Running External Process");
            }
        }
    });
}

/*
If 'arguments' is passed as a parameter it takes precedence
over any 'args' set in the 'app.json'.
In the function below we pass the two variables, '_pdfPath' and  '_outputPath'
created in the 'onPathChanged' function, fired when the path string is changed in the input field.
 */

function launchExtWithArguments(){
    fin.desktop.System.launchExternalProcess({
        alias: 'pdftohtml-alias',
        arguments: _pdfPath+" "+_outputPath,
        listener: function(event){
            // react to close event
            if(event.topic === "exited" && event.exitCode === MY_KNOWN_BAD_STATE) {
                // your desired logic here
                console.log("Exited External Process");
            }else{
                console.log("Running External Process");
            }
        }
    });
}


