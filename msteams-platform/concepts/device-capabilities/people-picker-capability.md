---
title: Integrate People Picker
description: In this article, learn how to use Teams JavaScript client library to integrate People Picker control and advantages of using people picker.
ms.topic: conceptual
ms.localizationpriority: high
ms.author: surbhigupta
---

# Integrate People Picker

People Picker is an input control in Teams that allows users to search and select people. You can integrate People Picker input control in a web app, which allows end users to perform different functions such as, search and select people in a chat, channel, or across the organization within Teams. The People Picker control is available across all Teams clients, such as web, desktop, and mobile.

You can use [Microsoft Teams JavaScript client library](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true), which provides the `selectPeople` API to integrate the People Picker input control in your web app.

## Advantages of using People Picker

* Works on all Teams capabilities, such as task module, chat, channel, meeting tab, and personal app.
* Allows the user to search and select people in a chat, channel, or the entire organization within Teams.
* Helps in scenarios involving task assignment, tagging, and notifying user.
* Saves significant time and effort in comparison to building any similar control.

To integrate People Picker input control in your Teams app, use the [`selectPeople`](#selectpeople-api) API. To integrate and call the API, you must have a good understanding of accompanying [code snippet](#code-snippet). You also need familiarity with [API response errors](#error-handling).

## `selectPeople` API

The `selectPeople` API enables you to add Teams People Picker input control to the web apps and also helps you with the following:

* Allows the user to search and select one or more people from the list.
* Returns the ID, name, and email address of selected users to the web app.

In a personal app, the control searches for name or email ID across the organization within Teams. If the app is added to a chat or channel, then the search context is configured based on the scenario. The search is restricted within the members of that chat or channel.

The `selectPeople` API comes with the following input configurations:

|Configuration parameter|Type|Description| Default value|
|-----|------|--------------|------|
|`title`|String| It's an optional parameter and sets the title for the People Picker control.|`selectPeople`|
|`setSelected`|String| It's an optional parameter. You must pass Microsoft Azure Active Directory (Azure AD) IDs of the people to be preselected. This parameter preselects people while launching the People Picker input control. In a single selection, only the first valid user is pre-populated ignoring the rest.|**Null**|
|`openOrgWideSearchInChatOrChannel`|Boolean| It's an optional parameter and when set to true, it launches the People Picker in organization wide scope even if the app is added to a chat or channel.|**False**|
|`singleSelect`|Boolean|It's an optional parameter and when set to true, it launches the People Picker and restricts the selection to only one user.|**False**|

The following image displays the experience of People Picker on mobile and desktop:

# [Mobile](#tab/Samplemobileapp)

The People Picker input control allows the user to search and add people using the following steps:

1. Type the name of the required person. The list appears with name suggestions.
1. Select the name of the required person from the list.

   :::image type="content" source="../../assets/images/tabs/people-picker-control-capability-mobile-updated.png" alt-text="Picker Picker mobile":::

# [Desktop](#tab/Sampledesktop)

The People Picker control on web or desktop is launched in a modal window on top of your web app and to add people use the following steps:

1. Type the name of the required person. The list appears with name suggestions.
1. Select the name of the required person from the list.

   :::image type="content" source="../../assets/images/tabs/select-people-picker-byname.png" alt-text="People picker by name desktop":::

---

## Code snippet

The following code snippet displays use of the `selectPeople` API people from a list:

# [TeamsJS v2](#tab/teamsjs-v2)

```javascript
people.selectPeople({ setSelected: ["aad id"], openOrgWideSearchInChatOrChannel: true, singleSelect: false, title: true}).then(people) => 
 {
    output(" People length: " + people.length + " " + JSON.stringify(people));
 }).catch((error) => { /*Unsuccessful operation*/ });
```

# [TeamsJS v1](#tab/teamsjs-v1)

```javascript
people.selectPeople((error: microsoftTeams.SdkError, people: microsoftTeams.people.PeoplePickerResult[]) => 
 {
    if (error) 
    {
        if (error.message) 
           {
             alert(" ErrorCode: " + error.errorCode + error.message);
           }
            else 
            {
              alert(" ErrorCode: " + error.errorCode);
            }
      }
    if (people)
     {
            output(" People length: " + people.length + " " + JSON.stringify(people));
      }
  },{ setSelected: ["aad id"], openOrgWideSearchInChatOrChannel: true, singleSelect: false, title: true});
```

***

## Error handling

The following table lists the error codes and their descriptions:

|Error code |  Error name     | Description|
| --------- | --------------- | --------- |
| **100** | NOT_SUPPORTED_ON_PLATFORM | API isn't supported on the current platform.|
| **500** | INTERNAL_ERROR | Internal error encountered while launching People Picker.|
| **4000** | INVALID_ARGUMENTS | API is invoked with wrong or insufficient mandatory arguments.|
| **8000** | USER_ABORT |User canceled the operation.|
| **9000** | OLD_PLATFORM | User is on an old platform build where implementation of the API is unavailable. Upgrade to the latest version of the build to resolve the issue.|

## Code sample

| Sample name           | Description | .NET |Node.js    | Manifest
|:---------------------|:--------------|:---------|:---------|:---------|
|Tab people picker | Sample tab app which shows the feature of people picker using teams js client sdk. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-people-picker/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-people-picker/nodejs)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-people-picker/csharp/demo-manifest/Tab-People-Picker.zip)

## See also

* [Integrate web apps](../../samples/integrate-web-apps-overview.md)
* [Integrate media capabilities](~/concepts/device-capabilities/media-capabilities.md)
* [Integrate QR code or barcode scanner capability in Teams](qr-barcode-scanner-capability.md)
* [Integrate location capabilities in Teams](location-capability.md)
* [People picker component in Microsoft Graph Toolkit](/graph/toolkit/components/people-picker)
