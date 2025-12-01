---
title: Device capabilities - Overview
author: surbhigupta
description: Learn how to integrate native device capabilities, such as, location and media (camera, microphone, gallery, QR or barcode scanner) with Microsoft Teams app.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
ms.date: 02/08/2023
---

# Device capabilities

Microsoft Teams continuously enhances developer capabilities in alignment with built-in first-party experiences. The enhanced Teams platform enables partners to incorporate native device capabilities, such as camera, QR or barcode scanner, photo gallery, microphone, and location within their web apps. This integration reduces development barriers, accelerates development cycles, and creates new scenarios for the developer community.

Device permissions differ in the browser. Previously, browsers managed access permissions; Teams now controls these permissions. For more information, see [browser device permissions](browser-device-permissions.md).

## Native device capabilities

A mobile or desktop device includes built-in hardware, such as a camera and microphone, known as capabilities. Developers access the following device capabilities on mobile or desktop using dedicated APIs available in [Microsoft Teams JavaScript client library](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true):

* Media capabilities, such as:
  * Camera
  * Microphone
  * Gallery
  * QR or barcode scanner
* Location

Access to these capabilities allows integration with the Teams platform to enhance the collaborative experience.

## Request device permissions

Developers use tools in [Microsoft Teams JavaScript client library](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true) to request the required [permissions](native-device-permissions.md) for accessing native device capabilities. Although modern web browsers standardize such access, developers must inform Teams about the capabilities used by updating the app manifest. This update enables permission requests when the app runs on Teams mobile or desktop clients.

## Integrate device capabilities

After gaining access to device capabilities, developers use Teams media capability APIs to [integrate media capabilities](media-capabilities.md) with the Teams platform to enhance user experience. The integrated capabilities enable apps to:

* Capture and share images.
* Scan QR or barcode using [scanner control](qr-barcode-scanner-capability.md).
* Record audio through microphone.
* Share location using [location picker](location-capability.md).

Developers also integrate the Teams native [people picker control](people-picker-capability.md) to allow users to search for and select people within the web app.

## Code sample

| Sample name           | Description | Node.js    | Manifest|
|:---------------------|:--------------|:---------|:---------|
|Device permissions | This sample app for Microsoft Teams demonstrates how to handle device permissions, including audio, video, and geolocation, within a tab interface. It provides insights into device permission usage across desktop and mobile views, allowing developers to enhance user interactions effectively. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-device-permissions/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-device-permissions/nodejs/demo-manifest/tab-device-permissions.zip)