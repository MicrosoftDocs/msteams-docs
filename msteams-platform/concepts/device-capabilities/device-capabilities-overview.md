---
title: Overview of device capabilities
description:  Overview of native device  capabilities.
keywords: camera image media microphone capabilities native device permissions 
ms.topic: overview
---

# Device capabilities 

Microsoft Teams platform is continuously enhancing developer capabilities aligning with built-in first-party  experiences. With the same vision, Teams platform has been enhanced to allow partners to integrate device capabilities, such as camera, photo gallery, microphone, and location into their webapps easily. This integration greatly reduces the barrier to app development, speeds-up development-cycle, and creates new scenarios or use-cases for the developer community.

## Native device capabilities

A mobile or desktop device has additional built-in devices, such as camera and microphone, called capabilities. You can access these devices and integrate with Microsoft Teams platform to enhance the collaborative experience. You must request for access to the capabilities to proceed further.

Microsoft Teams allow you to access the following device capabilities on mobile or desktop through dedicated APIs available in [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true):
* Media capabilities, such as
    * Camera
    * Microphone
    * Gallery
* Location

## Request device permissions

You must request for the required [permissions](native-device-permissions.md) to access the native device capabilities. While access to these features is standard in most of the modern web browsers, you must inform Teams about the features that you are using by updating your app manifest. This allows you to ask for permissions, while your app is running on Teams mobile or desktop clients.
 
 ## Integrate device capabilities

After getting access to device capabilities, [integrate the capabilities](mobile-camera-image-permissions.md) with Teams platform to enhance the user experience. These functionalities allows your app to:

* Capture and share images
* Record audio through microphone
* Share the location information


