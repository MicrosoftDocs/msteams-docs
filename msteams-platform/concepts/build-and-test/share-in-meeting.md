---
title: Share in Meeting
description: Learn how to add the share in meeting button, which allows users to share any document or third-party app to the meeting stage.
ms.topic: reference
ms.localizationpriority: medium
keywords: Share in Meeting
---
# Share in meeting

Share in meeting allows users to share any document or third-party app to the meeting stage and all the participants can interact and edit together.

When users select the **Share in meeting** button, it launches a deep link to the meeting stage. If users haven't installed any meeting extension, it requests users to install the meeting extension app for the third-party apps to control and access the meeting stage.

The following image shows the share in meeting experience:

:::image type="content" source="../../assets/images/share-in-teams-meeting/share-stage.png" alt-text="Screenshot shows share in meeting stage experience.":::

## Enable share in meeting

Following are the different methods to enable share in meeting:

### Method 1

The following steps scans your web page to locate any HTML elements with the class name of type `teams-share-in-meeting-button` and dynamically generate share in meeting buttons in your page.

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

3. Following are the additional attributes to customize share in meeting button:
   * `data-button-type`: Specifies the background color of the button (`primaryShareInMeeting` or `secondaryShareInMeeting`).
   * `data-button-size`: Specifies the size of the button in pixel.
   * `data-target`: Specifies whether the link opens in the same window, new tab, or a new window.
   * `data-locale`: Specifies the desired user language.

### Method 2

`async shareToMicrosoftTeams.renderButtons(options)` renders all share buttons that have the class name **teams-share-button** or **teams-share-in-meeting-button** on the page. If an `options (optional)` object is supplied with a list of elements as shown in the following code, those elements are rendered into the share buttons or share in meeting buttons.

```javascript
options (optional): { elements?: HTMLElement[], shareInMeetingElements?: HTMLElement[] }
```

1. Add the `launcher.js` script on your webpage.

   ```html
   <script async defer src="https://teams.microsoft.com/share/launcher.js" onload="onLoadComplete()"></script>
   ```

2. Create an HTML element and specify the required attributes. After the launcher script is fully loaded, ensure that the rendering logic is executed.

   ```javascript
   async function onLoadComplete() {
      const shareInMeetingButton = document.createElement("div");
      shareInMeetingButton.setAttribute("data-app-id", "<app-id>");
      shareInMeetingButton.textContent = "Share Test App"
      shareInMeetingButton.setAttribute("data-href", "<app-content-url>");
      shareInMeetingButton.setAttribute("data-button-type", "secondaryShareInMeeting");
      shareInMeetingButton.setAttribute("data-locale", "fr-CA");
      await window.shareToMicrosoftTeams.renderButtons({elements: [], shareInMeetingElements: [shareInMeetingButton]});
   }  
   ```

### Method 3

`async shareInMeetingClickHandler(content: IShareInMeetingContent)` creates a callback handler for share in meeting button, which can be executed by selecting a button or menu.

1. Add the `launcher.js` script on your webpage.

   ```html
   <script async defer src="https://teams.microsoft.com/share/launcher.js" onload="onLoadComplete()"></script>
   ```

2. Create an HTML element and add the `shareToMicrosoftTeams.shareInMeetingClickHandler` to its `onClick` attribute. After the launcher script is fully loaded, ensure that the onclick logic is created.

   ```javascript
   async function onLoadComplete() {
      var customShareInMeetingButton = document.createElement("a");
      customShareInMeetingButton.onclick = window.shareToMicrosoftTeams.shareInMeetingClickHandler({
      url: "<app-content-url>",
      appId: "<app-id>",
      entityName: "<app-entity-name>",
      entityDescription: "<app-content-description>",
      });
   }
   ```

### Full launcher.js definition

| Property | HTML attribute | Type | Required | Default | Description |
| -------------- | ---------------------- | --------------------- | ------- |  ------- |---------------------------------------------------------------------- |
| url | `data-href` | String | Yes | NA | URL of the app content to share. |
| appId | `data-app-id` | String | Yes | NA | ID of the app to share. |
| entityName | `data-entity-name` | String | No | NA | App entity name. |
| entityDescription | `data-entity-description` | String | No | NA | Description of app content to share. |
| locale | `data-locale` | String | No | en-US | User preferred language. |
| target | `data-target` | String | No | self | Specifies whether the link open in the same window, new tab, or new window. |
| buttonType | `data-button-type` | String | No | primaryShareInMeeting | Specifies the button background color: `primaryShareInMeeting` or `secondaryShareInMeeting`. |
| buttonSize | `data-button-size` | String | No | NA | Button size in pixels. |

## Deep link format

When you select share in meeting button, it launches a deep link to the meeting stage. The following is the deep link format:

`msteams:/l/meeting-share?deeplinkId=GUID&fqdn=string&appContext={json}`

The query parameters are:

* `msteams`: All deep links should start with **msteams**, so that Teams app recognizes it and can open the deep link.​

* `meeting-stage`: Verb that specifies the protocol type and the deep link type​.

* `deep link Id`: **GUID/UUID** used for telemetry correlation​.

* `fqdn`: FQDN is needed in Teams deep link service for tenant or for account checking.

  * When the meeting is scheduled with Teams for Life, then the fqdn should be **teams.live.com**.

  * When the meeting is scheduled for Teams for business, then the fqdn should be **teams.microsoft.com** or **team.microsoft.us** (for Gov). Teams client finds the right linked identity and suggest switching to the right one.​

Example: `https://teams.microsoft.com/l/meeting-share?deeplinkId=ACCC6AFE-449D-4AF3-8D3E-E8A7B3AB1280&fqdn=teams.microsoft.com&appContext=`

The following is the example for `json` attribute in deep link:

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

After you enable share in meeting on third-party apps, you can share the apps to the meeting stage. To access, follow the steps:

If meeting extension is installed:

1. Open the web app in the browser and select **Share in meeting**.

   :::image type="content" source="../../assets/images/share-in-teams-meeting/web-app-share-button.png" alt-text="Screenshot shows share in meeting button on web app."lightbox="../../assets/images/share-in-teams-meeting/web-app.png":::

1. Select **Start sharing**.

   :::image type="content" source="../../assets/images/share-in-teams-meeting/share.png" alt-text="Screenshot shows how to share apps in teams meeting.":::

1. The web app is shared to meeting stage and all the participants can interact and edit together.

   :::image type="content" source="../../assets/images/share-in-teams-meeting/share-stage.png" alt-text="Screenshot shows app shared to the teams meeting stage.":::

If meeting extension isn't installed:

1. Open the web app in the browser and select **Share in meeting**.

   :::image type="content" source="../../assets/images/share-in-teams-meeting/web-app-share-button.png" alt-text="Screenshot shows share in meeting button on web app."lightbox="../../assets/images/share-in-teams-meeting/web-app.png":::

1. To install the meeting extension app, select **Add**.

   :::image type="content" source="../../assets/images/share-in-teams-meeting/meeting-extension-app.png" alt-text="Screenshot shows add button to install meeting extension app.":::

1. Select **Start sharing**.

   :::image type="content" source="../../assets/images/share-in-teams-meeting/share.png" alt-text="Screenshot shows start sharing button to share your app in meeting.":::

1. The web app is shared to meeting stage and all the participants can interact and edit together.

   :::image type="content" source="../../assets/images/share-in-teams-meeting/share-stage.png" alt-text="Screenshot shows app shared to the teams meeting stage experience.":::

## See also

* [Share to Teams from web apps](share-to-teams-from-web-apps.md)
* [Share to Teams from personal app or tab](share-to-teams-from-personal-app-or-tab.md)
