# Tutorial: Launch External Process

## Overview

OpenFin allows developers to package native applications along with their web based applications. In this tutorial, you'll launch a co-deployed .exe with the OpenFin Javascript API.

### Assumptions

* Windows Only (this repo packages an .exe)

### Features

* Packaging an executable as an asset in your application manifest
* Launching the asset from your OpenFin Application
* Listen to lifecycle events on the executable

## Launch

### Installer

[OpenFin Installer](https://openfin.github.io/openfin-examples-external-application-launching/External%20Application%20Tutorial.zip)

### Run Locally

```bash
npm install
npm start
```

## Getting Started

Native assets are include as `appAssets` in your Application Manifest.
```
  "appAssets": [
    {
      "src": "http://localhost:9966/assets/dist.zip",
      "alias": "pdftohtml-alias",
      "target": "pdftohtml.exe",
      "version": "0.0.1"
    }
  ]
```
[See In Source](https://github.com/openfin/openfin-examples-external-application-launching/blob/repo-cleanup/src/local-app.json#L21)

* `src` Path to a hosted .zip containing the executable
* `alias` Name to use when invoking the .exe
* `target` .exe contained in the .zip file
*  `version` asset version number. Updating the version number will tell your application to fetch a new version of the asset.

In this repo, the executable is launched using the input from the app as an argument. Optionally, you can include an `args` field in your `appAsset` object which will be passed along when invoking.

After including the asset, you can launch using the `fin.desktop.System.launchExternalProcess` call. [See In Source](https://github.com/openfin/openfin-examples-external-application-launching/blob/repo-cleanup/src/js/index.js#L53)

## API Documentation

[.launchExternalProcess](http://cdn.openfin.co/jsdocs/stable/tutorial-system.launchExternalProcess.html)

## Disclaimers

This is a starter example and intended to demonstrate to app providers a sample of how to approach an implementation.

## License

By downloading OpenFin, you agree to the terms of our Developer License.

## Support

Please enter an issue in the repo for any questions or problems.
