---
title: Integrate QR code or Bar code scanner capability
description: How to use Teams JavaScript client SDK to enable QR or Bar code scanner capability
keywords: camera image microphone capabilities native device permissions media qr barcode scanner
ms.topic: conceptual
ms.author: lajanuar
---

# Integrate QR code or Bar code scanner capability 

Quick Response code or Bar code is a method of representing data in a visual, machine readable form. The mobile phone supports **QR code or Bar code scanner** feature from native camera. 
You can combine the scanner capability with the Teams platform through the process called integration.  
This document guides you on how to integrate QR or Bar code scanner capability of mobile phone with Teams platform. 

You can use [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true), that provides the tools necessary for your app to access the user’s [device permissions](native-device-permissions.md). Use **scanBarCode API** to integrate the scanner capability of native device with the Teams platform within your Microsoft Teams mobile app, and build a richer experience. 

## Advantage of integrating QR or Bar code scanner capability

* The main advantage of integrating device capabilities in your Teams apps is, it leverages native Teams controls to provide a rich and immersive experience to your users. Integration allows webapp developers on Teams platform to leverage Bar code and QR code scanning functionality with Teams Client JS SDK. This greatly reduces the barrier to third party app development, speeds-up the development-cycle, and creates  new scenarios or use-cases for the developer community. 
* User aligns QR or Bar code within a frame at the centre of the scanner UI and the code gets scanned automatically. The captured data present in the Bar code is displayed in the corresponding information field. This helps to avoid the inconvenience of entering the lengthy code manually resulting human errors. 
To integrate QR code or Bar code scanner capability, you must update the app manifest file and call the **`scanBarCode` API**. 

For effective integration, you must have a good understanding of [code snippets](#code-snippets) for calling the `scanBarCode` API, which allows you to use native QRcode or Barcode scanner capabilities. The API throws error in case of an unsupported barcode standard.
It is important to familiarize yourself with the [API response errors](mobile-camera-image-permissions.md#error-handling) to handle the errors in your Teams app.

> [!NOTE] 
> Currently, Microsoft Teams support for QR code or Barcode scanner capability is only available for mobile clients.

## Update manifest

Update your Teams app [manifest.json](../../resources/schema/manifest-schema.md#devicepermissions) file by adding the `devicePermissions` property and specifying `media`. This update allows your app to ask for requisite permissions from users before they use the QRcode or Barcode scanner for integration.

``` json
"devicePermissions": [
    "media",
],
```

> [!NOTE]
> The **Request Permissions** prompt is automatically displayed when a relevant Teams API is initiated. For more information, see [Request device permissions](native-device-permissions.md).

## `ScanBarCode` API

`ScanBarCode` API invokes scanner control that allows the user to scan different types of QR or Bar code and returns the scanned result as a string.
The steps to use QR or Bar code scanner API are as follows: 
1. Entry point or invoke: 
The entry point is the point from where a developer invokes `ScanBarCode` API. This point is a button with the label **Scan QR code**. 
1. Scanner user experience or execution: This comprises of the scanner experience provided by the API to the user as shown in the following section. The major elements include: 
    * Camera input stream with an overlay with a frame at the center. The frame directs the user to align the code as per the provided frame. 
    * Flash button to toggle flash on or off. 
    * Close **X** button on top-left to abort scanning operation. 
1. Exit or return:  
    * Successfully scanned a Bar code 
    * Scan timed out 
    * User pressed back button or closed the scanner UI 

**Web app experience for `ScanBarCode` API**
![web app experience for qr or bar code scanner capability](../../assets/images/tabs/qr-barcode-scanner-capability.png)

## Code snippets

**Calling `ScanBarCode()` API** for scanning QR code or Bar code using camera:

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