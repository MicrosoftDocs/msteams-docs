---
title: Integrate QR/barcode scanner capabilities 
description: How to use Teams JavaScript client SDK to enable QR/barcode scanner capabilities
keywords: camera image microphone capabilities native device permissions media qr barcode scanner
ms.topic: conceptual
ms.author: lajanuar
---

# Integrate QR/barcode scanner capabilities 

This document guides you on how to integrate QR/barcode scanner capabilities. This integration combines the native device capability, such as **QR/barcode scanner** with the Teams platform.  

You can use [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true), that provides the tools necessary for your app to access a user’s [device permissions](native-device-permissions.md). Use **QR/barcode scanner capability API** to integrate the QR/barcode scannercapability of native device with the Teams platform within your Microsoft Teams mobile app, and build a richer experience. 

## Advantage of integrating QR/barcode scanner capability

The main advantage of integrating device capabilities in your Teams apps is it leverages native Teams controls to provide a rich and immersive experience to your users.
To integrate QR/barcode scanner capability you must update the app manifest file and call the media capability APIs. 

For effective integration, you must have a good understanding of [code snippets](#code-snippets) for calling the QR/barcode scanner APIs, which allow you to use native media capabilities.

It is important to familiarize yourself with the [API response errors](#error-handling) to handle the errors in your Teams app.

> [!NOTE] 
> Currently, Microsoft Teams support for QR/barcode scanner capability is only available for mobile clients.

## Update manifest

Update your Teams app [manifest.json](../../resources/schema/manifest-schema.md#devicepermissions) file by adding the `devicePermissions` property and specifying `media`. It allows your app to ask for requisite permissions from users before they start using  the QR/barcode scanner for

``` json
"devicePermissions": [
    "media",
],
```

> [!NOTE]
> The **Request Permissions** prompt is automatically displayed when a relevant Teams API is initiated. For more information, see [Request device permissions](native-device-permissions.md).
## QR/barcode scanner capability API

**Web app experience for QR/barcode scanner capability API

There are three steps to usage of QR/Bar code scanner API: 
1.	Entry point / Invoke: This is the point form where a developer would invoke this API. For example, this could be a button with the label “Scan QR code”. 
2.	Scanner UX / Execution: This comprises of the scanner experience provided by the API as shown below. The major elements include: 
a.	Camera input stream with overlay with a frame at the center. The frame is set to direct user to align the code as per the provided frame. 
b.	Flash button – to toggle flash on or off. 
c.	Close “X” button on top-left to abort scanning operation. 
  
Scanner UI provided by Office Lens SDK 
3.	Exit / Return:  
a.	Successfully scanned a barcode 
b.	Scan timed out 
c.	User presses back button or closed the scanner UI 
## Code snippets
**Calling `QR/barcode scanner` API** for scanning QR/bar code