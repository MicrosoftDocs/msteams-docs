---
title: Integrate People Picker 
description: How to use Teams JavaScript client SDK to integrate People Picker control
keywords:  people picker control
ms.topic: conceptual
ms.localizationpriority: high
ms.author: surbhigupta
---

# People Picker control

People Picker is a native capability and control in Teams that allows user to search and select people. Teams app developers can integrate the People Picker input control in their web app, which allows end users to perform different functions like search and select people within a chat, a channel, or across the organization. The People Picker capability is available across all Teams clients - web, desktop, and mobile.

You can use [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true), which provides `selectPeople` API to integrate People Picker within your web app.

## Advantages of using People Picker control

* People Picker control works on all Teams platforms, such as task module, a chat, a channel, meeting tab, and personal app.
* The control allows the user to search and select user in a chat, channel, or the entire organization.
* People Picker helps in scenarios involving task assignment, tagging, and notifying the user.
* The control saves the effort and time significantly to build a similar control.

To integrate People Picker control in your Teams app select the API, `selectPeople`. To integrate and call the API, you must know about [code snippet](#code-snippet). You also need familiarity with [API response errors](#error-handling) to handle any errors in the web app.

## `selectPeople` API

The `selectPeople` API enables you to add Teams native `People Picker input control` to web apps. The following table provides description of the API:

| API | Description  |
| --- | --- |
|`selectPeople`| • Launches People Picker, allows the user to search and select one or more people from the list.<br/>  • This API returns the ID, name, and email address of selected users to the web app.<br/> • In case of a personal app, the control searches across the organization. If the app is added to a chat or channel, then the search context is configured based on the scenario. The search is restricted within the members of that chat, channel, or made available across the organization.|

The `selectPeople` API comes with the following input configurations:

|Configuration parameter|Type|Description| Default value|
|-----|------|--------------|------|
|`title`|String| It's an optional parameter and sets the title for the People Picker control.|Select people|
|`setSelected`|String| It's an optional parameter. You must pass Microsoft Azure Active Directory (Azure AD) IDs of the people to be preselected. This parameter preselects people while launching the People Picker control. In case of a single selection, only the first valid user is pre-populated ignoring the rest.|Null|
|`openOrgWideSearchInChatOrChannel`|Boolean| It's an optional parameter and when set to true, it launches the People Picker in organization wide scope even if the app is added to a chat or channel.|False|
|`singleSelect`|Boolean|It's an optional parameter. When set to true it launches the People Picker and restricts the selection to only one user.|False|

The following image displays the experience of People Picker on mobile and desktop:

# [Mobile experience](#tab/Samplemobileapp)

:::image type="content" source="../../assets/images/tabs/people-picker-control-capability.png" alt-text="People picker control capability mobile":::

# [Desktop experience](#tab/Sampledesktop)

The People Picker control on web or desktop is launched in a modal window on top of your web app.

:::image type="content" source="../../assets/images/tabs/select-people-picker-byname.png" alt-text="People picker by name" border="true":::

---

## Code snippet

The following code snippet displays use of `selectPeople` API to select people from a list:

```javascript
 microsoftTeams.people.selectPeople((error: microsoftTeams.SdkError, people: microsoftTeams.people.PeoplePickerResult[]) => 
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
  });
```

## Error handling

The following table lists the error codes and the conditions under which the errors are generated:

|Error code |  Error name     | Condition|
| --------- | --------------- | --------- |
| **100** | NOT_SUPPORTED_ON_PLATFORM | API is not supported on the current platform.|
| **500** | INTERNAL_ERROR | Internal error encountered while launching People Picker.|
| **4000** | INVALID_ARGUMENTS | API is invoked with wrong or insufficient mandatory arguments.|
| **8000** | USER_ABORT |User cancelled the operation.|
| **9000** | OLD_PLATFORM | User is on an old platform build where implementation of the API is unavailable. Upgrading the build resolves the issue.|

## See also

* [Integrate media capabilities in Teams](mobile-camera-image-permissions.md)
* [Integrate QR code or barcode scanner capability in Teams](qr-barcode-scanner-capability.md)
* [Integrate location capabilities in Teams](location-capability.md)
