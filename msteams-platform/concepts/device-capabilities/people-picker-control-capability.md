---
title: Integrate People Picker control capability
author: Rajeshwari-v
description: How to use Teams JavaScript client SDK to integrate People Picker control capability
keywords:  people picker control
ms.topic: conceptual
localization_priority: Normal
ms.author: surbhigupta
---

# Integrate People Picker control capability 


People Picker is a control to search and pick people. This is a native capability available in Teams platform. You can integrate Teams’ native People Picker input control with your web apps. You can define search context, single or multi selection, and other configuration to search people within a chat, groups, channels, teams, and across the organization with AAD user list.

You can use [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true), which provides `People Picker` API to integrate the People Picker control capability within your web app. 

## Advantages of integrating People Picker control capability

* `People Picker` API enables you to add the People Picker control to your web apps, which  surfaces in a task module, as a tab or personal app. 
* This cross platform control allows users to select entities, such as users in a group, chat, channel.
* The People Picker control capability helps with task assignment, tagging, notifying a user, and so on. 

You must call the `People Picker` API to integrate People Picker control capability. For effective integration, you must have an understanding of [code snippet](#code-snippet) for calling the `People Picker` API. 
It is important to familiarize yourself with the [API response errors](#error-handling) to handle the errors in your web app.

> [!NOTE] 
> Currently, Microsoft Teams support for People Picker control capability is available for mobile clients only.

## People Picker API 

`People Picker` API enables you to add Teams’ native `People Picker input control` to your web apps. This API returns the information of picked users to the calling web app. 
You must use the following API to enable People Picker capability:

| API      | Description   |
| --- | --- |
|`selectPeople`|Launches a People Picker and allows the user to select one or more people from the list.<br/><br/>If the app is added to personal app scope, the People Picker is launched across the organization. If the app is added to a chat or channel, People Picker launch is limited to the members of that chat or channel.|

The `People Picker` API comes along with following input configurations:

|Configuration parameter|Type|Option|Description| Default value|
|-----|------|----------|--------------|------|
|`title`| String|Optional| Set title for the People Picker.| Add people|
|`setSelected`|String| Optional| AAD IDs of the users are pre-populated in the search box of People Picker control. With single select, only the first user in the list is pre-populated.| Null |
|`openOrgWideSearchInChatOrChannel`|Boolean | Optional|Launches the People Picker across the organization scope even if the app is added to a chat or channel. | False |
|`singleSelect`|Boolean| Optional| Launches the People Picker in which only one person is selected. | False|

The following image depicts web app experience of People Picker control capability:

![web app experience for People Picker control capability](../../assets/images/tabs/people-picker-control-capability.png)

### Code snippet

**Calling `selectPeople` API** for selecting people from a list:

```javascript
microsoftTeams.people.selectPeople((error, people) => {if (error) {
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
            }     );
```

## Error handling

You must ensure to handle the errors appropriately in your web app. The following table lists the error codes and the conditions under which the errors are generated: 

|Error code |  Error name     | Condition|
| --------- | --------------- | -------- |
| **100** | NOT_SUPPORTED_ON_PLATFORM | API is not supported on the current platform.|
| **500** | INTERNAL_ERROR | Internal error is encountered while launching People Picker.|
| **1000** | NETWORK_ERROR | Network issue.|
| **4000** | INVALID_ARGUMENTS | API is invoked with wrong or insufficient mandatory arguments.|
| **8000** | USER_ABORT |User cancelled the operation.|
| **9000** | OLD_PLATFORM | User is on old platform build where implementation of the API is not present. Upgrading the build should resolve the issue.|

## See also

* [Integrate media capabilities in Teams](mobile-camera-image-permissions.md)
* [Integrate QR code or barcode scanner capability in Teams](qr-barcode-scanner-capability.md)
* [Integrate location capabilities in Teams](location-capability.md)
