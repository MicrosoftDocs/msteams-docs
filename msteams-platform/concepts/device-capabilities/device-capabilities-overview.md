---
title: Overview of device capabilities
description:  Overview of native device  capabilities.
keywords: camera image media microphone capabilities native device permissions 
ms.topic: overview
---

# Device capabilities 

Microsoft Teams platform is continuously enhancing developer capabilities aligning with built-in first-party experiences. The enhanced Teams platform allows partners to integrate device capabilities, such as camera, photo gallery, microphone, and location, with their web apps. This integration reduces the barrier to app development, speeds-up development-cycle, and creates new scenarios or use-cases for the developer community.

## Native device capabilities

A mobile or desktop device has built-in devices, such as a camera and microphone, called capabilities. You can access the following device capabilities on mobile or desktop through dedicated APIs available in [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true):
* Media capabilities, such as
    * Camera
    * Microphone
    * Gallery
* Location

After getting access to the device capabilities, you can integrate them with Teams platform to enhance the collaborative experience. 

## Request device permissions

You must request the required [permissions](native-device-permissions.md) to access the native device capabilities. While access to these features is standard in modern web browsers, you must inform Teams about the features that you are using by updating your app manifest. This update  allows you to request permissions, while your app is running on Teams mobile or desktop clients.
 
 ## Integrate device capabilities

After getting access to device capabilities, use [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true) to [integrate the capabilities](mobile-camera-image-permissions.md) with Teams platform to enhance the user experience. These functionalities allow your app to:

* Capture and share images
* Record audio through microphone
* Share the location information


