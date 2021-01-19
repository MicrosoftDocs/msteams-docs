---
title: Overview of device capabilities
description: Learn how to access native device capabilities and integrate into Microsoft Teams apps.
keywords: camera image microphone capabilities native device permissions media capabilities
ms.author: surbhi gupta 
ms.topic: overview
---
# Device capabilities - Overview

The app developers get an overview of how to request the user's device permissions and integrate the capabilities within their Teams mobile app to enrich the Tab. 

Enrich the tab with features that require access to native device functionalities such as: 
* Camera 
* Microphone 
* Location 
* Notification

You must perform the following tasks to enrich the Tab: 

1. Request the device permission.
1. Integrate the media capabilities within Teams desktop and mobile app.

In addition to that, see [Error handling](#error-handling) to understand the API response error codes generated, while working with APIs for device capabilities. 

## Device permissions

Update the app manifest with **media permission** so that the Teams knows the list of device capabilities the app requires to access. For more information, see [update your app manifest](../tabs/how-to/native-device-permissions?tabs=mobile#properties)

Access an end user’s device permissions that allows you to: 

* Record and share short videos. 
* Record short audio memos and save them for later use.
* Use the location information of the user to display relevant information. 

The process of getting the **device permission** is the same for both mobile and desktop clients.
For more information, see [how to request device permissions](../native-device-permissions.md).
 
## Media capabilities

Currently, the Teams supports the following media capabilities for desktop and mobile clients:
* Camera
* Image
* Microphone

Integrate the media capabilities within the Teams app, using [Camera and image capabilities in Teams](/mobile-camera-image-permissions.md). 

## Error handling

You must understand the API response error codes and handle them appropriately. The Teams platform returns following error codes: 

|Error code |  Error Name     | Condition|
| --- | --- | --- |
| **100** | NOT_SUPPORTED_ON_PLATFORM | API is not supported on the current platform.|
| **404** | FILE_NOT_FOUND | The file specified was not found in the given location.|
| **500** | INTERNAL_ERROR | Internal error was encountered while performing the required operation.|
| **1000** | PERMISSION_DENIED |Permission was denied by the user.|
| **2000** |NETWORK_ERROR | Network issue.|
| **3000** | NO_HW_SUPPORT | Underlying hardware doesn't support the capability.|
| **4000**| INVALID_ARGUMENTS | One or more arguments are invalid.|
| **5000** | UNAUTHORIZED_USER_OPERATION | User is not authorized to complete this operation.|
| **6000** |INSUFFICIENT_RESOURCES | The operation couldn't be completed due to insufficient resources.|
|**7000** | THROTTLE | The platform throttled the request because the API was invoked too frequently.|
|  **8000** | USER_ABORT |The user aborted the operation.|
| **9000**| OLD_PLATFORM | The platform code is outdated and doesn't implement this API.|
| **10000**| SIZE_EXCEEDED |  The return value is too big and has exceeded the platform size boundaries.|
