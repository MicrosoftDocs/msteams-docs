---
title: Integrate QR or Barcode scanner capability
description: How to use Teams JavaScript client SDK to enable QR or Barcode scanner capability
keywords: camera image microphone capabilities native device permissions media qr barcode scanner
ms.topic: conceptual
ms.author: lajanuar
---

# Integrate QRcode or Barcode scanner capability 

Quick Response code or Bar code is a method of representing data in a visual, machine readable form. The mobile phone supports QRcode or Barcode scanner feature from native camera. You can combine the **QRcode or Barcode scanner** capability with the Teams platform with the process called integration.  
This document guides you on how to integrate QRcode or Barcode scanner capability of mobile phone with Teams platform. 

You can use [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true), that provides the tools necessary for your app to access a user’s [device permissions](native-device-permissions.md). Use **scanner API** to integrate the QRcode or Barcode scanner capability of native device with the Teams platform within your Microsoft Teams mobile app, and build a richer experience. 

## Advantage of integrating QR or Barcode scanner capability

The main advantage of integrating device capabilities in your Teams apps is, it leverages native Teams controls to provide a rich and immersive experience to your users. Integration allows webapp developers on Teams platform to leverage Barcode and QR code scanning functionality with Teams Client JS SDK. This greatly reduces the barrier to third party app development, speeds-up the development-cycle, and creates  new scenarios or use-cases for the developer community.
To integrate QRcode or Barcode scanner capability, you must update the app manifest file and call the **`scanner` API**. 

For effective integration, you must have a good understanding of [code snippets](#code-snippets) for calling the `scanner` API, which allows you to use native QRcode or Barcode scanner capabilities.

It is important to familiarize yourself with the [API response errors](#error-handling) to handle the errors in your Teams app.

> [!NOTE] 
> Currently, Microsoft Teams support for QRcode or Barcode scanner capability is only available for mobile clients.

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

`ScanBarCode` API invokes scanner control that allows the user to scan different types of QRcode or Barcode and returns the scanned result as a string.
There are three steps to use QRcode or Barcode scanner API: 
1.	Entry point or invoke: This is the point from where a developer invokes this API. For example, this could be a button with the label “Scan QR code”. 
1.	Scanner user experience or execution: This comprises of the scanner experience provided by the API as shown in the following section. The major elements include: 
    * Camera input stream with overlay with a frame at the center. The frame directs user to align the code as per the provided frame. 
    * Flash button to toggle flash on or off. 
    * Close **X** button on top-left to abort scanning operation. 
1.	Exit or return:  
    * Successfully scanned a Barcode 
    * Scan timed out 
    * User pressed back button or closed the scanner UI 

**Web app experience for `ScanBarCode` API**
![web app experience for qrcode or barcode scanner capability](../../assets/images/tabs/qr-barcode-scanner-capability.png)

## Code snippets

**Calling `ScanBarCode()` API** for scanning QRcode or Barcode using camera:

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