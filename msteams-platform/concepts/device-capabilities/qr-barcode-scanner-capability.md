---
title: Integrate QR or barcode scanner capability
description: How to use Teams JavaScript client SDK to enable QR or bar code scanner capability
keywords: camera image microphone capabilities native device permissions media qr barcode scanner
ms.topic: conceptual
ms.author: lajanuar
---

# Integrate QR or barcode scanner capability 

This document guides you on how to integrate the  QR or barcode scanner capability of the mobile phone with the Teams platform. You can access the stored information in the QR or barcode with an optical scanner of the native device camera.  

You can use [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true), which provides the tools necessary for your app to access the user’s [device permissions](native-device-permissions.md). After getting access to the device's camera, use `scanBarCode`  API to integrate the scanner capability with Teams within your Microsoft Teams mobile app, and build a richer experience. 

## Advantage of integrating QR or barcode scanner capability

The main advantage of integrating QR or barcode scanner capability in your Teams apps is to help you on Teams platform to leverage QR or barcode scanning functionality with Teams JavaScript Client SDK.

To integrate QR or barcode scanner capability, you must update the app manifest file and call the `scanBarCode` API. For effective integration, you must have a good understanding of [code snippets](#code-snippets) for calling the `scanBarCode` API, which allows you to use native QR or barcode scanner capability. The API gives an error for an unsupported barcode standard.
It is important to familiarize yourself with the [API response errors](#error-handling) to handle the errors in your Teams app.

> [!NOTE] 
> Currently, Microsoft Teams support for QR or barcode scanner capability is only available for mobile clients.

## Update manifest

Update your Teams app [manifest.json](../../resources/schema/manifest-schema.md#devicepermissions) file by adding the `devicePermissions` property and specifying `media`. It allows your app to ask for requisite permissions from users before they start using  the QR or barcode scanner for integration.

``` json
"devicePermissions": [
    "media",
],
```

> [!NOTE]
> The **Request Permissions** prompt is automatically displayed when a relevant Teams API is initiated. For more information, see [Request device permissions](native-device-permissions.md).

## ScanBarCode API

The `ScanBarCode` API invokes scanner control that enables the user to scan different types of QR or barcode, and returns the scanned result as a string.
Following are the three main steps to use the QR or barcode scanner capability API:

1. **Entry point or invoke:** 
It is the point from where you invoke `ScanBarCode` API. This point is a button with the label **Scan barcode**. 
1. **User experience of scanner or execution:** 
It is the scanner experience provided by the API to the user. Following are the three major elements of the scanner:
    * **Frame** directs the user to align the barcode with the frame to scan. 
    * **Flash button** to toggle flash **ON** or **OFF**.
    * **Close button** on top-left to abort the scanning operation.
	
1. **Exit or return:**
Following are the conditions under which the scanner stops scanning: 
    * After completing the scan of a barcode 
    * Scan times out 
    * User selects back button or closes the scanner UI 

**Web app experience for `ScanBarCode` API for QR or barcode scanner capability**
![web app experience for qr or barcode scanner capability](../../assets/images/tabs/qr-barcode-scanner-capability.png)

Following are the steps to scan an asset code in an app: 
1. Select the barcode button in an incident reporting workflow.
1. After the scanner opens, align the barcode within the central frame for scanning.
1. After successful scan, the asset code is shared back with the app. 

## Error handling

You must ensure to handle these errors appropriately in your Teams app. The following table lists the error codes and the conditions under which the errors are generated: 

|Error code |  Error name     | Condition|
| --------- | --------------- | -------- |
| **100** | NOT_SUPPORTED_ON_PLATFORM | API is not supported on the current platform.|
| **404** | FILE_NOT_FOUND | File specified is not found in the given location.|
| **500** | INTERNAL_ERROR | Internal error is encountered while performing the required operation.|
| **1000** | PERMISSION_DENIED |Permission is denied by the user.|
|  **8000** | USER_ABORT |User aborts the operation.|

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

## See also

> [!div class="nextstepaction"]
> [Integrate media capabilities in Teams](mobile-camera-image-permissions.md)