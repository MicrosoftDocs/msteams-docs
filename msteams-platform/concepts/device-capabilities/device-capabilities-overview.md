---
title: Overview of device capabilities
description:  Overview of native device capabilities.
keywords: camera image media microphone capabilities native device permissions 
author: rajeshwari.V 
ms.author: surbhi gupta 
ms.topic: overview
---
# Device capabilities - Overview

The Microsoft Teams platform has extension points, called **capabilities**.
Use the capabilities to build apps in Teams. There are many core capabilities in Teams such as: 
* Tabs
* Bots 
* Messaging extensions

Tabs are one of the core capabilities in the Teams platform. 
Device capability is a feature that a device must have to perform certain functionalities. Use the device capability in Teams to get a rich collaborative experience. For using the device capabilities, you must follow two steps.

The first step is requesting the permission to access device features, such as camera, microphone, location, and notification. For more information, see [how to request device permissions](../native-device-permissions.md).

After accessing the user’s device permission, as the second step, integrate the media capabilities within Teams desktop and mobile app. For more information on how to integrate media capabilities, see [Camera and image capabilities in Teams](/mobile-camera-image-permissions.md). 

In addition to that, see [Error handling](#error-handling) to understand and handle the API response error codes generated, while working with the APIs for media capabilities.

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
