---
title: Share in Teams Meeting
description: Learn to add the Share in Teams Meeting button on app and document to share in the meeting stage
ms.topic: reference
ms.localizationpriority: medium
keywords: Share in Teams Meeting
---
# Share in Teams Meeting

Share in Teams Meeting allows users to share any documents or third party app as a web view in the meeting stage and all the participants can interact and edit together.

Users can select Share in Teams Meeting button and it launches the deep link to the meeting stage. If users not installed meeting extension, it requests users to install the meeting extension app for the third party apps to control the meeting stage, and to have access to the meeting stage.

The following image shows the Share in Teams Meeting experience:

:::image type="content" source="../../assets/images/share-in-teams-meeting/present.PNG" alt-text="share-in-teams-meeting":::

## Enable Share in Teams Meeting

Following are the options to enable Share in Teams Meeting:

### Option 1

Scans your web page to locate any HTML Elements with the class name of type `teams-share-in-meeting-button` and dynamically generate Share in Teams Meeting buttons in your page.

1. Add the `launcher.js` script on your webpage.

   ```html
   <script async defer src="https://teams.microsoft.com/share/launcher.js"></script>
   ```

2. Add an HTML element on your webpage with the `teams-share-in-meeting-button` class name attribute, the app ID (which can be found in the manifest) in the `data-app-id` attribute, and the app content URL to share in the `data-href` attribute. Also, you can include more attributes: `data-entity-name` and `data-description`.

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

3. Following are the other attributes can be specified to customized Share in Teams Meeting button:
   * `data-button-type`: Specifies the background color of the button (`primaryShareInMeeting` or `secondaryShareInMeeting`).
   * `data-button-size`: Specifies the size of the button in pixel.
   * `data-target`: Specifies whether the link will open in the same window, new tab, or new window.
   * `data-locale`: Specifies desired user language.

### Option 2

The API `async shareToMicrosoftTeams.renderButtons(options)` renders all share buttons that have **teams-share-button** or **teams-share-in-meeting-button**, class name currently on the page. If an optional options object is supplied with a list of elements, those elements will be rendered into share buttons or Share in Teams Meeting buttons.

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

### Option 3

The API `async shareInMeetingClickHandler(content: IShareInMeetingContent)` creates a callback handler for Share in Teams Meeting button which can be executed on selection of a button or menu.

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

### Full Launcher.js definition

| Property | HTML attribute | Type | Required | Default | Description |
| -------------- | ---------------------- | --------------------- | ------- |  ------- |---------------------------------------------------------------------- |
| url | `data-href` | String | Yes | NA | The URL of the app content to share |
| appId | `data-app-id` | String | Yes | NA | ID of the app to share |
| entityName | `data-entity-name` | String | No | NA | App entity name |
| entityDescription | `data-entity-description` | String | No | NA | Description of app content to share |
| locale | `data-locale` | String | No | en-US | User preferred language |
| target | `data-target` | String | No | self | Specifies how deep link will be opened: self, new window, new tab |
| buttonType | `data-button-type` | String | No | primaryShareInMeeting | Specifies the button background color: `primaryShareInMeeting` or `secondaryShareInMeeting` |
| buttonSize | `data-button-size` | String | No | NA | Button size in pixel |

## Deep link Format

When you select Share in Teams Meeting button, it launches the deep link to the meeting stage. The following is the deep link format:

`msteams:/l/meeting-share?deeplinkId=GUID&fqdn=string&appContext={json}`

The query parameters are:

* `msteams`: All deep links should start with **msteams**, so that Teams app recognizes it and can open the deep link.​

* `meeting-stage`: Verb that Specifies the protocol type and the deep link type​.

* `deep link Id`: **GUID/UUID** used for telemetry correlation​.

* `fqdn`: teams.microsoft.com or teams.live.com. FQDN is needed in Teams deep link service for tenant or account checking.

  * When the meeting is scheduled with Teams for Life, the fqdn is: **teams.live.com**.

  * When the meeting is scheduled for Teams for business, the fqdn is: **teams.microsoft.com** or **team.microsoft.us** (for Gov) etc. Teams client will find the right linked identity and suggest switching to the right one.​

## Deep link example

`https://teams.microsoft.com/l/meeting-share?deeplinkId=ACCC6AFE-449D-4AF3-8D3E-E8A7B3AB1280&fqdn=teams.microsoft.com&appContext=`

Required:

```json
{ ​
"contentUrl" : "<URL to be opened in the Meeting Stage>", ​
"appID" : "<Unique ID of the App to be Installed>"​
}
```

Optional:

```json
{ ​
"additionalInfo": "<Passed on further down for consumption as required>"
}
```

## Known limitations

The app developer needs to have a Meeting Extension with Share to Meeting Stage capability.

## End user experience on third party apps

After you enable Share in Teams Meeting on third party apps, you can share the document or web apps in the meeting stage. To access, follow the steps:

If meeting extension is installed:

1. Open web app in the browser and select **Share in Teams Meeting** button.

   :::image type="content" source="../../assets/images/share-in-teams-meeting/web-app.PNG" alt-text="Share in Teams Meeting web app":::

1. Select **Start sharing** button.

   :::image type="content" source="../../assets/images/share-in-teams-meeting/share.PNG" alt-text="Share in Teams Meeting share":::

1. Web app is shared to meeting stage and all the participant can interact and edit together.

   :::image type="content" source="../../assets/images/share-in-teams-meeting/share-stage.PNG" alt-text="Share in Teams Meeting":::

If meeting extension isn't installed:

1. Open web app in the browser and select **Share in Teams Meeting** button.

   :::image type="content" source="../../assets/images/share-in-teams-meeting/web-app.PNG" alt-text="Share in Teams Meeting web app":::

1. Select **Add** to install meeting extension app.

   :::image type="content" source="../../assets/images/share-in-teams-meeting/meeting-extension-app.PNG" alt-text="meeting-extension":::

1. Select **Start sharing** button.

   :::image type="content" source="../../assets/images/share-in-teams-meeting/share.PNG" alt-text="Share in Teams Meeting share":::

1. Web app is shared to meeting stage and all the participant can interact and edit together.

   :::image type="content" source="../../assets/images/share-in-teams-meeting/share-stage.PNG" alt-text="present in team":::

## See also

* [Share to Teams from personal app or tab](share-to-teams-from-personal-app-or-tab.md)
* [Share to Teams from web apps](share-to-teams-from-web-apps.md)
