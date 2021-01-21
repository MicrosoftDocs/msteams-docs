---
title: Overview of device capabilities
description:  Overview of native device  capabilities.
keywords: camera image media microphone capabilities native device permissions 
author: rajeshwari.V 
ms.author: surbhi gupta 
ms.topic: overview
---
# What are device capabilities? 

Use your device's media capability, such as mobile and desktop along with the Microsoft Teams platform for a rich collaborative experience. You must follow a two-step process if you want to use device capabilities.

In the first step, get permission to access the device's features, such as camera, microphone, location, QR code, and notification. For more information, see [how to request device permissions](../native-device-permissions.md).

In the second step, integrate the media capabilities within Teams desktop and mobile app. For more information on integrating media capabilities, see [Camera and image capabilities in Teams](/mobile-camera-image-permissions.md). 

Also, see [Error handling](#error-handling) to understand and handle the API response error codes generated, while working with the APIs for media capabilities.

## Error handling

You must understand the API response error codes and handle them appropriately. The Teams platform returns the following error codes: 

|Error code |  Error Name     | Condition|
| --- | --- | --- |
| **100** | NOT_SUPPORTED_ON_PLATFORM | API is not supported on the current platform.|
| **404** | FILE_NOT_FOUND | File specified is not found in the given location.|
| **500** | INTERNAL_ERROR | Internal error is encountered while performing the required operation.|
| **1000** | PERMISSION_DENIED |Permission is denied by the user.|
| **2000** |NETWORK_ERROR | Network issue.|
| **3000** | NO_HW_SUPPORT | Underlying hardware doesn't support the capability.|
| **4000**| INVALID_ARGUMENTS | One or more arguments are invalid.|
| **5000** | UNAUTHORIZED_USER_OPERATION | User is not authorized to complete this operation.|
| **6000** |INSUFFICIENT_RESOURCES | Operation couldn't be completed due to insufficient resources.|
|**7000** | THROTTLE | Platform throttles the request because the API is invoked too frequently.|
|  **8000** | USER_ABORT |User aborts the operation.|
| **9000**| OLD_PLATFORM | Platform code is outdated and doesn't implement this API.|
| **10000**| SIZE_EXCEEDED |  Return value is too big and has exceeded the platform size boundaries.|
