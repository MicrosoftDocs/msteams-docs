---
title: Overview of device capabilities
description:  Overview of native device  capabilities.
keywords: camera image media microphone mic qr code qrcode bar code barcode scan scanner capabilities native device permissions 
ms.topic: overview
---

# Device capabilities 

Microsoft Teams platform is continuously enhancing developer capabilities aligning with built-in first-party experiences. The enhanced Teams platform allows partners to integrate device capabilities, such as camera, QR or barcode scanner, photo gallery, microphone, and location with their web apps. This integration reduces the barrier to app development, speeds-up development-cycle, and creates new scenarios or use-cases for the developer community.

## Native device capabilities

A mobile or desktop device has built-in devices, such as a camera and microphone, called capabilities. You can access the following device capabilities on mobile or desktop through dedicated APIs available in [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true):
* Media capabilities, such as
    * Camera
    * Microphone
    * Gallery
    * QR or barcode scanner
* Location

After getting access to the device capabilities, you can integrate them with Teams platform to enhance the collaborative experience. 

## Request device permissions

Use the tools present in [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true) to request the required  [permissions](native-device-permissions.md) for accessing the native device capabilities. While access to these capabilities is standard in modern web browsers, you must inform Teams about the capabilities that you are using by updating your app manifest. This update allows you to request permissions while your app runs on Teams mobile or desktop clients.
 
 ## Integrate device capabilities

After getting access to device capabilities, use Teams media capability APIs to [integrate media capabilities](mobile-camera-image-permissions.md) with Teams platform to enhance the user experience. These integrated capabilities allow your app to:

* Capture and share images
* Scan QR or barcode using [scanner control](qr-barcode-scanner-capability.md)
* Record audio through microphone
* Share the location information
