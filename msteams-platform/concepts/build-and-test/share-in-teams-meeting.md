---
title: Share in Teams Meeting
description: Learn to add the Share in Teams Meeting button on app and document to share in the meeting stage
ms.topic: reference
ms.localizationpriority: medium
keywords: Share in Teams Meeting
---
# Share in Teams meeting

Share in Teams meeting allows users to share any document or third-party app in the meeting stage and all the participants can interact and edit together.

Users can select **Share in Teams meeting** button and it launches the deep link to the meeting stage. If users haven't installed meeting extension, it requests users to install the meeting extension app for the third-party apps to control the meeting stage, and to have access to the meeting stage.

The following image shows the share in teams meeting experience:

:::image type="content" source="../../assets/images/share-in-teams-meeting/present.PNG" alt-text="share-in-teams-meeting":::

## Enable share in Teams meeting

Following are the different methods to enable share in teams meeting button:

### Method 1

The following scans your web page to locate any HTML Elements with the class name of type `teams-share-in-meeting-button` and dynamically generate Share in Teams Meeting buttons in your page.

1. Add the `launcher.js` script on your webpage.

   ```html
   <script async defer src="https://teams.microsoft.com/share/launcher.js"></script>
   ```

2. Add an HTML element on your webpage with the `teams-share-in-meeting-button` in the `class` attribute, the app ID (from manifest) in the `data-app-id` attribute, and the link to share in the `data-href` attribute. You can also include the `data-entity-name` and `data-description` attributes.

   ```html
   <div
     class="teams-share-in-meeting-button"
     data-href="https://<link-to-be-shared>"
     data-app-id="<app-id>"
     data-entity-name="<app-name>"
     data-entity-description="<app-content-description>"
     >
   </div>
   ```

3. Following are the other attributes to customize Share in Teams meeting button:
   * `data-button-type`: Specifies the background color of the button (`primaryShareInMeeting` or `secondaryShareInMeeting`).
   * `data-button-size`: Specifies the size of the button in pixel.
   * `data-target`: Specifies whether the link open in the same window, new tab, or new window.
   * `data-locale`: Specifies desired user language.

### Method 2

The `async shareToMicrosoftTeams.renderButtons(options)` renders all share buttons that have **teams-share-button** or **teams-share-in-meeting-button**, class name currently on the page. If an optional options object is supplied with a list of elements, those elements will be rendered into share buttons or Share in Teams meeting buttons.

**Args:**
options (optional): { elements?: HTMLElement[], shareInMeetingElements?: HTMLElement[] }

1. Add the `launcher.js` script on your webpage.

   ```html
   <script async defer src="https://teams.microsoft.com/share/launcher.js"></script>
   ```

2. Create an HTML Element and specify the required attributes.

   ```js
   const shareInMeetingButton = document.createElement("div");
   shareInMeetingButton.setAttribute("data-app-id", "<app-id>");
   shareInMeetingButton.textContent = "Share Test App"
   shareInMeetingButton.setAttribute("data-href", "<app-content-url>");
   shareInMeetingButton.setAttribute("data-button-type", "secondaryShareInMeeting");
   shareInMeetingButton.setAttribute("data-locale", "fr-CA");
   shareToMicrosoftTeams.renderButtons({elements: [], shareInMeetingElements: [shareInMeetingButton]});
   ```

### Method 3

The API `async shareInMeetingClickHandler(content: IShareInMeetingContent)` creates a callback handler for Share in Teams meeting button which can be executed on selection of a button or menu.

1. Add the `launcher.js` script on your webpage.

   ```html
   <script async defer src="https://teams.microsoft.com/share/launcher.js"></script>
   ```

2. Create an HTML Element and add the API `shareToMicrosoftTeams.shareInMeetingClickHandler` to its onClick attribute.

   ```js
   var customShareInMeetingButton = document.createElement("a");
   customShareInMeetingButton.onclick = shareToMicrosoftTeams.shareInMeetingClickHandler({
   url: "<app-content-url>",
   appId: "<app-id>",
   entityName: "<app-entity-name>",
   entityDescription: "<app-content-description>",
   });
   ```

### Full launcher.js definition

| Property | HTML attribute | Type | Required | Default | Description |
| -------------- | ---------------------- | --------------------- | ------- |  ------- |---------------------------------------------------------------------- |
| url | `data-href` | string | Yes | NA | The URL of the app content to share. |
| appId | `data-app-id` | string | Yes | NA | ID of the app to share. |
| entityName | `data-entity-name` | string | No | NA | App entity name. |
| entityDescription | `data-entity-description` | string | No | NA | Description of app content to share. |
| locale | `data-locale` | string | No | en-US | User preferred language. |
| target | `data-target` | string | No | self | Specifies whether the link open in the same window, new tab, or new window. |
| buttonType | `data-button-type` | string | No | primaryShareInMeeting | Specifies the button background color: `primaryShareInMeeting` or `secondaryShareInMeeting`. |
| buttonSize | `data-button-size` | string | No | NA | The size in pixels of the Share to Teams button to render. |

## Deep link format

When you select Share in Teams meeting button, it launches the deep link to the meeting stage. The following is the deep link format:

`msteams:/l/meeting-share?deeplinkId=GUID&fqdn=string&appContext={json}`

Deep link parameters:

* `msteams`: All deep links should start with **msteams**, so that Teams app recognizes it and can open the deep link.​

* `meeting-stage`: Verb that specifies the protocol type and the deep link type​.

* `deep link Id`: **GUID/UUID** used for telemetry correlation​.

* `fqdn`: FQDN is needed in Teams deep link service for tenant or for account checking.

  * When the meeting is scheduled with Teams for Life, then the fqdn should be: **teams.live.com**.

  * When the meeting is scheduled for Teams for business, then the fqdn should be: **teams.microsoft.com** or **team.microsoft.us** (for Gov) etc. Teams client will find the right linked identity and suggest switching to the right one.​

## Deep link example

`https://teams.microsoft.com/l/meeting-share?deeplinkId=ACCC6AFE-449D-4AF3-8D3E-E8A7B3AB1280&fqdn=teams.microsoft.com&appContext=`

Required:

```json
{ ​
"contentUrl" : "<URL to be opened in the meeting stage>", ​
"appID" : "<Unique ID of the app to be installed>"​
}
```

Optional:

```json
{ ​
"additionalInfo": "<Passed on further down for consumption as required>"
}
```

## End user experience on third-party apps

After you enable share in teams meeting on third-party apps, you can share the apps to the meeting stage. To access, follow the steps:

If meeting extension is installed:

1. Open web app in the browser and select **Share in Teams meeting** button.

   :::image type="content" source="../../assets/images/share-in-teams-meeting/web-app.PNG" alt-text="This screenshot shows share in teams meeting button on web app.":::

1. Select **Start sharing** button.

   :::image type="content" source="../../assets/images/share-in-teams-meeting/share.PNG" alt-text="This screenshot shows how to share apps in teams meeting.":::

1. Web app is shared to meeting stage and all the participants can interact and edit together.

   :::image type="content" source="../../assets/images/share-in-teams-meeting/share-stage.PNG" alt-text="This screenshot shows app shared to the teams meeting stage.":::

If meeting extension isn't installed:

1. Open web app in the browser and select **Share in Teams meeting** button.

   :::image type="content" source="../../assets/images/share-in-teams-meeting/web-app.PNG" alt-text="This screenshot shows share in teams meeting button on web app in meeting.":::

1. Select **Add** to install meeting extension app.

   :::image type="content" source="../../assets/images/share-in-teams-meeting/meeting-extension-app.PNG" alt-text="This screenshot shows add button to install meeting extension app.":::

1. Select **Start sharing** button.

   :::image type="content" source="../../assets/images/share-in-teams-meeting/share.PNG" alt-text="This screenshot shows start sharing button to share your app in meeting.":::

1. Web app is shared to meeting stage and all the participants can interact and edit together.

   :::image type="content" source="../../assets/images/share-in-teams-meeting/share-stage.PNG" alt-text="This screenshot shows app shared to the teams meeting stage experience.":::

## See also

* [Share to Teams from personal app or tab](share-to-teams-from-personal-app-or-tab.md)
* [Share to Teams from web apps](share-to-teams-from-web-apps.md)
