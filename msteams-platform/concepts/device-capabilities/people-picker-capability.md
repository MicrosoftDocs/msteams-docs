---
title: Integrate People Picker 
description: How to use Teams JavaScript client SDK to integrate People Picker control
keywords:  people picker control
ms.topic: conceptual
ms.localizationpriority: high
ms.author: surbhigupta
---

# Integrate People Picker

People Picker a native capability and control in Teams allows user to search and select people. Teams now integrates native People Picker input control with both web and desktop apps. You can select single or multiple configurations, such as limiting search within a chat, channels, or across the entire organization.

Use [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true), which provides `selectPeople` API to integrate People Picker within your web and desktop app.

## Advantages of integrating the native People Picker

* People Picker control works in all Teams surfaces, such as task module, a chat, channel, meeting tab, and personal app.
* This control allows you to search for and select users within a chat, channel, or the entire organization.
* People Picker helps with scenarios involving task assignment, tagging, notifying a user.
* You can use this available control in your web or desktop app. It saves the effort and time significantly to build such a control on your own.

You must call the `selectPeople` API to integrate People Picker control in your Teams app. For effective integration, you must have an understanding of [code snippet](#code-snippet) for calling the API.
It is important to familiarize yourself with the [API response errors](#error-handling) to handle the errors in your web or desktop app.

## `selectPeople` API

`selectPeople` API enables you to add Teams native `People Picker input control` to your web and desktop apps. The following table provides a description of the API:

| API | Description  |
| --- | --- |
|**selectPeople**|Launches a People Picker and allows the user to search and select one or more people from the list.<br/><br/>This API returns the ID, name and email address of selected users to the calling web and desktop app.<br/><br/>In case of a personal app, the control searches across the organization. If the app is added to a chat or channel, then the search context is configured depending on the scenario. The search is restricted within the members of that chat, channel, or made available across the organization.|

The `selectPeople` API comes with the following input configurations:

|Configuration parameter|Type|Description| Default value|
|-----|------|--------------|------|
|`title`|String| It is an optional parameter. It sets title for the People Picker control.|Select people|
|`setSelected`|String| It is an optional parameter. You must pass Microsoft Azure Active Directory (Azure AD) IDs of the people to be preselected. This parameter preselects people while launching the People Picker control. In case of single selection, only the first valid user is pre-populated ignoring the rest.|Null|
|`openOrgWideSearchInChatOrChannel`|Boolean| It is an optional parameter. When it is set to true, it launches the People Picker in organization wide scope even if the app is added to a chat or channel.|False|
|`singleSelect`|Boolean|It is an optional parameter. When it is set to true, it launches the People Picker restricting the selection to one user only.|False|

The following image depicts the experience of People Picker in a sample web app:

![Web app experience of People Picker](../../assets/images/tabs/people-picker-control-capability.png)

The following image depicts the experience of People Picker in a sample desktop app:

<!-- ![Desktop app experience of People Picker]() Image for desktop app to be added here.-->

:::image type="content" source="select-people-desktop.png" alt-text="people picker desktop ":::

:::image type="content" source="select-people-desktop-email.png" alt-text="dektop email":::
### Code snippet

**Calling `selectPeople` API** to select people from a list:

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

Ensure to handle the errors appropriately in your web and desktop app. The following table lists the error codes and the conditions under which the errors are generated:

|Error code |  Error name     | Condition|
| --------- | --------------- | -------- |
| **100** | NOT_SUPPORTED_ON_PLATFORM | API is not supported on the current platform.|
| **500** | INTERNAL_ERROR | Internal error is encountered while launching People Picker.|
| **4000** | INVALID_ARGUMENTS | API is invoked with wrong or insufficient mandatory arguments.|
| **8000** | USER_ABORT |User cancelled the operation.|
| **9000** | OLD_PLATFORM | User is on old platform build where implementation of the API is not present.  Upgrading the build resolves the issue.|

## See also

* [Integrate media capabilities in Teams](mobile-camera-image-permissions.md)
* [Integrate QR code or barcode scanner capability in Teams](qr-barcode-scanner-capability.md)
* [Integrate location capabilities in Teams](location-capability.md)
