---
title: Integrate people picker control capability
author: Rajeshwari-v
description: How to use Teams JavaScript client SDK to integrate people picker control capability
keywords:  people picker control
ms.topic: conceptual
localization_priority: Normal
ms.author: surbhigupta
---

# Integrate people picker control capability 

This document guides you on how to integrate people picker control capability of Teams platform with your Teams app.  
You can use [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true), which provides `People Picker` API to integrate the people picker control capability within your web app. 

## Advantages of integrating people picker control capability

* `People Picker` API enables you to add the people picker control to your web apps, which can be surfaced in a task module, as a tab or personal app. 
* This cross platform control allows users to select entities, such as users in a group, chat, channel, or add users through composite entities, such as DLs, SGs and tags. 
* The people picker control capability helps  task assignment, tagging, notifying a user, and so on easier. 

You must call the people picker API to integrate people picker control capability. For effective integration, you must have an understanding of [code snippet](#code-snippet) for calling the `People Picker` API. 
It is important to familiarize yourself with the [API response errors](#error-handling) to handle the errors in your Teams app.

> [!NOTE] 
> Currently, Microsoft Teams support for people picker control capability is available for mobile clients only.

## People Picker API 

`People Picker` API enables you to add Teams’ native `People Picker input control` to your webapps. This API returns information of picked users to the calling webapp. 
You must use the following API to enable people picker capability:

| API      | Description   |
| --- | --- |
|`selectPeople`|Launches a people picker and allows the user to select one or more people from the list.<br/><br/>If the app is added to personal app scope, the people picker is launched across the organization. If the app is added to a chat or channel, people picker launch is limited to the members of that chat or channel.|

The `People Picker` API comes along with following input configurations:

|Configuration parameter|Type|Option|Description| Default value|
|-----|------|----------|--------------|------|
|`title`| String|Optional| Set title for the people picker.| Add people|
|`setSelected`|String| Optional| AAD IDs of the users are pre-populated in the search box of people picker control. With single select, only the first user in the list is pre-populated.| Null |
|`openOrgWideSearchInChatOrChannel`|Boolean | Optional|Launches the people picker across the organization scope even if the app is added to a chat or channel. | False |
|`singleSelect`|Boolean| Optional| Launches the people picker in which only one person is selected. | False|

The following image depicts web app experience for people picker control capability:

![web app experience for people picker control capability](../../assets/images/tabs/people-picker-control-capability.png)

## Error handling

You must ensure to handle the errors appropriately in your Teams app. The following table lists the error codes and the conditions under which the errors are generated: 

|Error code |  Error name     | Condition|
| --------- | --------------- | -------- |
| **100** | NOT_SUPPORTED_ON_PLATFORM | API is not supported on the current platform.|
| **500** | INTERNAL_ERROR | Internal error is encountered while launching people picker.|
| **1000** | NETWORK_ERROR | Network issue.|
| **4000** | INVALID_ARGUMENTS | API is invoked with wrong or insufficient mandatory arguments.|
| **8000** | USER_ABORT |User cancelled the operation.|
| **9000** | OLD_PLATFORM | User is on old platform build where implementation of the API is not present. Upgrading the build should resolve the issue.|

## Code snippet

**Calling `selectPeople` API** for selecting people from a list:

```javascript
microsoftTeams.people.selectPeople((error, people) => {                    if (error) {
                        if (error.message) {
                            alert(" ErrorCode: " + error.errorCode + error.message);
                        }
                        else {
                            alert(" ErrorCode: " + error.errorCode);
                        }
                    }
                    if (people) {
                        output(" People length: " + people.length + " " + JSON.stringify(people));
                    }
                });
```
## See also

* [Integrate media capabilities in Teams](mobile-camera-image-permissions.md)
* [Integrate QR code or barcode scanner capability in Teams](qr-barcode-scanner-capability.md)
* [Integrate location capabilities in Teams](location-capability.md)
