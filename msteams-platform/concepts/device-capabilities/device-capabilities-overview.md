---
title: Overview of device capabilities
description:  Overview of native device  capabilities.
keywords: camera image media microphone capabilities native device permissions 
ms.topic: overview
---
# What are device capabilities? 

Device capabilities in Microsoft Teams allows you to access the media capabilities, such as camera and microphone of peripheral and internal devices(mobile or desktop). The integration of device capabilities within Teams is used to enhance the user experience. This integration enables users to connect and collaborate with other users or groups on the go.

Teams supports access to your device's media capabilities, such as `camera`, `microphone`, `gallery`, and `location` through native device capabilities and is available on all app constructs, such as messaging extensions, tabs, and personal apps.

> [!NOTE]
> Currently, the Microsoft Teams support for media capabilities, is only available for mobile clients.

To integrate the media capabilities within Teams, you must have the required [permissions](native-device-permissions.md) to access the capabilities of the devices, and then [integrate these capabilities](mobile-camera-image-permissions.md).

Before we proceed further, it is important to familiarize yourself with the [API response errors](#error-handling) that are generated and how you could handle them. 

## Error handling

The following table lists the error codes and the conditions under which they are generated:

|Error code |  Error Name     | Condition|
| --------- | --------------- | -------- |
| **100** | NOT_SUPPORTED_ON_PLATFORM | API is not supported on the current platform.|
| **404** | FILE_NOT_FOUND | File specified is not found in the given location.|
| **500** | INTERNAL_ERROR | Internal error is encountered while performing the required operation.|
| **1000** | PERMISSION_DENIED |Permission is denied by the user.|
| **2000** |NETWORK_ERROR | Network issue.|
| **3000** | NO_HW_SUPPORT | Underlying hardware doesn't support the capability.|
| **4000**| INVALID_ARGUMENTS | One or more arguments are invalid.|
| **5000** | UNAUTHORIZED_USER_OPERATION | User is not authorized to complete this operation.|
| **6000** |INSUFFICIENT_RESOURCES | Operation couldn't be completed due to insufficient resources.|
|**7000** | THROTTLE | Platform throttled the request as the API was invoked frequently.|
|  **8000** | USER_ABORT |User aborts the operation.|
| **9000**| OLD_PLATFORM | Platform code is outdated and does not implement this API.|
| **10000**| SIZE_EXCEEDED |  Return value is too big and has exceeded the platform size boundaries.|
