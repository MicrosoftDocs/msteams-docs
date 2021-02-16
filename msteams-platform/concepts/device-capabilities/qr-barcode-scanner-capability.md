---
title: Integrate QR or barcode scanner capability
description: How to use Teams JavaScript client SDK to enable QR or bar code scanner capability
keywords: camera image microphone capabilities native device permissions media qr barcode scanner
ms.topic: conceptual
ms.author: lajanuar
---

# Integrate QR or barcode scanner capability 

Quick Response code, called **QR code or barcode** is a method of representing data in a visual, machine-readable form. Generally, the barcode contains the information about a product, such as type, size, manufacturer and country of origin in the form of bars and spaces. You can read the code with an optical scanner feature of the native device camera. For richer collaborative experience, you can combine the QR or barcode scanner capability of native device camera with the Teams platform through the integration process. This document guides you on how to integrate QR or barcode scanner capability of the mobile phone with Teams platform. 

You can use [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true), that provides the tools necessary for your app to access the user’s [device permissions](native-device-permissions.md). After getting the device-camera access, use **scanBarCode API** to integrate the scanner capability of the native device with Teams within your Microsoft Teams mobile app, and build a richer experience. 

## Advantage of integrating QR or barcode scanner capability

* User aligns a QR or barcode within a frame at the centre of the scanner UI and the code gets scanned automatically. The stored data is displayed instantly in the corresponding information field. This method avoids inconvenience and human-errors of entering the lengthy product code and other relevant information manually. 
To integrate QR or barcode scanner capability, you must update the app manifest file and call the **`scanBarCode` API**. 
* The integration allows webapp developers on Teams platform to leverage QR or barcode scanning functionality with Teams JavaScript Client SDK.

For effective integration, you must have a good understanding of [code snippets](#code-snippets) for calling the `scanBarCode` API, which allows you to use native QR or barcode scanner capability. The API throws error in case of an unsupported barcode standard.
It is important to familiarize yourself with the [API response errors](mobile-camera-image-permissions.md#error-handling) to handle the errors that arise, while calling the API in your Teams app.

> [!NOTE] 
> Currently, Microsoft Teams support for QR or barcode scanner capability is available for mobile clients only.

## Update manifest

Update your Teams app [manifest.json](../../resources/schema/manifest-schema.md#devicepermissions) file by adding the `devicePermissions` property and specifying `media`. This file update allows your app to ask for requisite permissions from users before they use the QR or barcode scanner for integration.

``` json
"devicePermissions": [
    "media",
],
```

> [!NOTE]
> The **Request Permissions** prompt is automatically displayed when a relevant Teams API is initiated. For more information, see [Request device permissions](native-device-permissions.md).

## Scanner capability API

`ScanBarCode` API invokes scanner control that allows the user to scan different types of QR or barcode and returns the scanned result as a string.
The steps to use QR or barcode scanner capability API are as follows: 
1. Entry point or invoke: 
The entry point is the point from where a developer invokes `ScanBarCode` API. This point is a button with the label **Scan QR code**. 
1. Scanner user experience or execution: This comprises of the scanner experience provided by the API to the user as shown in the following section. The major elements include: 
    * Camera input stream with an overlay, with a frame at the center. The frame directs the user to align the code as per the provided frame. 
    * Flash button to toggle flash on or off. 
    * Close **X** button on top-left to abort scanning operation. 
1. Exit or return:  
    * Successfully scanned a barcode 
    * Scan timed out 
    * User pressed back button or closed the scanner UI 

**Web app experience for `ScanBarCode` API for QR or barcode scanner capability**
![web app experience for qr or barcode scanner capability](../../assets/images/tabs/qr-barcode-scanner-capability.png)

## Code snippets

**Calling `ScanBarCode()` API** for scanning QR or barcode using camera:

```javascript
const config: microsoftTeams.media.BarCodeConfig = {
  timeOutIntervalInSec: 30};
microsoftTeams.media.scanBarCode((error: microsoftTeams.SdkError, decodedText: string) => {
  if (error) {
    if (error.message) {
      output(" ErrorCode: " + error.errorCode + error.message);
    } else {
      output(" ErrorCode: " + error.errorCode);
    }
  } else if (decodedText) {
    output(decodedText);
  }
}, config);
```