---
title: Device capabilities - Overview
author: Rajeshwari-v
description: Learn how to integrate native device capabilities, such as, location and media (camera, microphone, gallery, QR or barcode scanner) with Microsoft Teams app.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
---

# Device capabilities

Microsoft Teams platform is continuously enhancing developer capabilities aligning with built-in first-party experiences. The enhanced Teams platform allows partners to integrate device capabilities, such as camera, QR or barcode scanner, photo gallery, microphone, and location with their web apps. This integration reduces the barrier to app development, speeds up development cycle, and creates new scenarios or use-cases for the developer community.

Device permissions are different in the browser. Previously, browser handled how to grant access permissions and now these permissions are handled in Teams. For more information, see [browser device permissions](browser-device-permissions.md).

## Native device capabilities

A mobile or desktop has built-in devices, such as camera and microphone, called capabilities. You can access the following device capabilities on mobile or desktop through dedicated APIs available in [Microsoft Teams JavaScript client library](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true):

* Media capabilities, such as
  * Camera
  * Microphone
  * Gallery
  * QR or barcode scanner
* Location

After getting access to the device capabilities, you can integrate them with the Teams platform to enhance the collaborative experience.

## Request device permissions

Use the tools present in [Microsoft Teams JavaScript client library](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true) to request the required  [permissions](native-device-permissions.md) for accessing the native device capabilities. While access to these capabilities is standard in modern web browsers, you must inform Teams about the capabilities that you are using by updating your app manifest. This update allows you to request permissions while your app runs on Teams mobile or desktop clients.

## Integrate device capabilities

After getting access to device capabilities, use Teams media capability APIs to [integrate media capabilities](media-capabilities.md) with the Teams platform to enhance the user experience. These integrated capabilities allow your app to:

* Capture and share images.
* Scan QR or barcode using [scanner control](qr-barcode-scanner-capability.md).
* Record audio through microphone.
* Share location using [location picker](location-capability.md).

Also, you can integrate the Teams native [people picker control](people-picker-capability.md) that allows users to search and select people in the web app experience.

## Code sample

| Sample Name           | Description | Node.js    |
|:---------------------|:--------------|:---------|
|Device permissions | Describes how to demonstrate Teams tab sample app for device permissions. |[View](<https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-device-permissions/nodejs>)|
