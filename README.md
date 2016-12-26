# cowhub-cordova

This is a mobile frontend for CowHub written in ES6 javascript running in a platform independent webview on Cordova.
Native calls to the camera are handled using the EzAR Cordova plugin. The interface is powered by React + Redux , using
Onsen UI to produce native looking applications on Android (and with some extra work IOS).

## Getting Started

To setup a build environment, you will first need to install a version of cordova for your platform, 
and add android as a target platform.

An install guide can be found here: https://cordova.apache.org/docs/en/latest/guide/platforms/android/

You will also need a version of NPM.

The required dependancies can be quickly installed using 
```
npm install

```

## Build project for debugging

Ther are two ways of running the application for debugging. One way is to host the webview locally on the development
machine, and remotely connecting to it from a browser, or from the app running in an emulator or a real device. This has the advantage that changes can be instantly previewed on the device since hot-loading is enabled.

To start the local webserver, run 

```
npm start
```

This will host a local server at localhost:4000

Then run 

```
cordova run android
```

which will deploy a development version on the app that will access the webview at an ip specified in the package config files. If you have a real android device connected on usb the app will deploy there, otherwise it will run the emulator.
I recommend creating an Android version 6 x86 atom virtual device since it will have the best performance on a regular laptop.

The other way is to build a full release of the app (which is needed to test low-level features such as camera access) and then connecting to it using the chrome development tools.

## Build release version

Run
'''
npm build
'''.

For ios build, you may need to run 
'''
npm prepare
'''
which will copy the required build files into the ios directory but let you compile using Xcode etc.


## Debug using chromium

In chrome(ium) access chrome://devices

If you connect your android device on USB, and enable usb debugging (usually by tapping the kernel version in settings a bunch of times ) then when you start the app on the phone it will appear here as a webview, allowing you to view the js console.





