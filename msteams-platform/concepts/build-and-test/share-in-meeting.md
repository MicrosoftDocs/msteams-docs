---
title: Share in Meeting
description: Learn how to add the share in meeting button, which allows users to share any document or third-party app to the meeting stage.
ms.topic: reference
ms.localizationpriority: medium
keywords: Share in Meeting
---
# Share in meeting

Share in meeting allows users to share documents or third-party web apps to the meeting stage. The meeting participants can collaborate and interact with the third-party web apps or edit the documents together.

The following image shows the **Share in meeting** button on the web app:

:::image type="content" source="../../assets/images/share-in-teams-meeting/web-app.png" alt-text="Screenshot shows share in meeting button on the web app.":::

During the meeting, when a user selects the **Share in meeting** button from the third-party web app or document, it launches a deep link to the meeting stage and opens the app as a web view in the meeting stage. For the meeting participants to interact with third-party web app or document, they must have meeting extension of the app or document installed in their Teams client. If they don't have meeting extension, Teams prompts participants to install the meeting extension.

When you select the **Share in meeting** button, it launches a deep link to the meeting stage. The following is the deep link format:

`msteams:/l/meeting-share?deeplinkId={GUID}&fqdn={string}&lm=deeplink&appContext={json encoded app context}`

For more information, see [generate a deep link to share content to stage in meetings](#generate-a-deep-link-to-share-content-to-stage-in-meetings).

## Enable Share in meeting

The following are three different methods to enable share in meeting. You can use one of the methods depending on how much control you want on the **Share in meeting** buttons displayed on your web page:

# [Method 1](#tab/method-1)

This method is the simplest way to display the share in meeting buttons with minimal customizations. You can customize the button styles, size, and languages.

You can scan your web page to locate any HTML elements with the class name of type `teams-share-in-meeting-button` and dynamically generate **Share in meeting** buttons in your page.

1. Add the `launcher.js` script on your webpage.

   ```html
   <script async defer src="https://teams.microsoft.com/share/launcher.js"></script>
   ```

2. Add an HTML element on your webpage with the `teams-share-in-meeting-button` in the `class` attribute, the app ID (from manifest) in the `data-app-id` attribute, and the link to share in the `data-href` attribute. You can also include the `data-entity-name` and `data-entity-description` attributes.

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

3. Following are the additional attributes to customize Share in meeting button:
   * `data-button-type`: Specifies the background color of the button (`primaryShareInMeeting` or `secondaryShareInMeeting`).
   * `data-button-size`: Specifies the size of the button in pixel.
   * `data-target`: Specifies whether the link opens in the same window, new tab, or a new window.
   * `data-locale`: Specifies the desired user language.

# [Method 2](#tab/method-2)

You can use this method to have some control over which button to render dynamically or when the script is executed. The script only executes when `window.shareToMicrosoftTeams.renderButtons()` is called. You can pass specific HTML elements through the `renderButtons({elements: [], shareInMeetingElements: [shareInMeetingButton])` API. You can customize the button styles, size, and languages.

The `async shareToMicrosoftTeams.renderButtons(options)` API renders all share button that have the class name **teams-share-button** or **teams-share-in-meeting-button** on the page. If an `options (optional)` object is supplied with a list of elements as shown in the following code, those elements are rendered into the **Share** buttons or **Share in meeting** buttons.

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

# [Method 3](#tab/method-3)

You can use this method to have complete control over how the script is called and when to generate the button using the `window.shareToMicrosoftTeams.shareInMeetingClickHandler` API. You can control how and where the buttons are generated. You only need to attach the `window.shareToMicrosoftTeams.shareInMeetingClickHandler` API to the `onclick` attribute of the button. It can be attached to a link, button, dropdown menu, and so on. You have complete control of how the UI appears.

The `async shareInMeetingClickHandler(content: IShareInMeetingContent)` API creates a callback handler for Share in meeting button, which can be executed by selecting a button or menu.

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

---

The following are the launcher.js definitions:

| Property | HTML attribute | Type | Required | Default | Description |
| -------------- | ---------------------- | --------------------- | ------- |  ------- |---------------------------------------------------------------------- |
| url | `data-href` | String | Yes | NA | URL of the app content to share. |
| appId | `data-app-id` | String | Yes | NA | ID of the app to share. |
| entityName | `data-entity-name` | String | No | NA | App entity name. |
| entityDescription | `data-entity-description` | String | No | NA | Description of app content to share. |
| locale | `data-locale` | String | No | en-US | User preferred language. |
| target | `data-target` | String | No | self | Specifies whether the link opens in the same window, new tab, or new window. |
| buttonType | `data-button-type` | String | No | primaryShareInMeeting | Specifies the button background color: `primaryShareInMeeting` or `secondaryShareInMeeting`. |
| buttonSize | `data-button-size` | String | No | NA | Button size in pixels. |

## End user experience on third-party apps

After you enable Share in meeting on third-party apps, you can share the apps to the meeting stage. To access, follow the steps:

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

## Generate a deep link to share content to stage in meetings

You can also generate a deep link to share the app to stage and start or join a meeting.

> [!NOTE]
> Deep link to share content to stage in meeting is supported in Teams desktop client only.

When a deep link is selected in an app by a user who is part of an ongoing meeting, then the app is shared to the stage and a permission pop-up window appears. Users can grant access to the participants to collaborate with an app.

:::image type="content" source="../../assets/images/integrate-with-teams/screenshot-of-pop-up-permission.png" alt-text="The screenshot is an example that shows a permission pop-up window.":::

When a user isn't in a meeting then the user is redirected to the Teams calendar where they can join a meeting or initiate instant meeting (Meet now).

:::image type="content" source="../../assets/images/integrate-with-teams/Instant-meetnow-pop-up.png" alt-text="The screenshot is an example that shows a pop-up window when there's no ongoing meeting.":::

Once the user initiates an instant meeting (Meet now), they can add participants and interact with the app.

:::image type="content" source="../../assets/images/integrate-with-teams/Screenshot-ofmeet-now-option-pop-up.png" alt-text="The screenshot is an example that shows an option to add participants and how to interact with the app.":::

To add a deep link to share content on stage, you need to have an app context. The app context allows the Teams client to fetch the app manifest and check if the sharing on stage is possible. The following is an example of an app context:

`{ "appSharingUrl" : "https://teams.microsoft.com/extensibility-apps/meetingapis/view", "appId": "9ec80a73-1d41-4bcb-8190-4b9eA9e29fbb" , "useMeetNow": false }`

The query parameters for the app context are:

* `appID`: This is the ID that can be obtained from the app manifest.
* `appSharingUrl`: The URL, which needs to be shared on stage should be a valid domain defined in the app manifest. If the URL isn't a valid domain, an error dialog appears to provide the user with a description of the error.
* `useMeetNow`: This includes a Boolean parameter that can be either true or false.
  * **True**: When the `UseMeetNow` value is true and if there's no ongoing meeting, a new Meet now meeting will be initiated. When there's an ongoing meeting, this value will be ignored.

  * **False**: The default value of `UseMeetNow` is false, which means that when a deep link is shared to stage and there's no ongoing meeting, a calendar pop-up will appear. However, you can share directly during a meeting.

Ensure that all the query parameters are properly URI encoded and the app context has to be encoded twice in the final URL. Following is an example:

```javascript
const appContext= JSON.stringify({ 
  "appSharingUrl" : "https://teams.microsoft.com/extensibility-apps/meetingapis/view",
  "appId": "9cc80a93-1d41-4bcb-8170-4b9ec9e29fbb",
  "useMeetNow": false
});
const encodedContext = encodeURIComponent(appContext).replace(/'/g,"%27").replace(/"/g,"%22");
const encodedAppContext = encodeURIComponent(encodedContext).replace(/'/g,"%27").replace(/"/g,"%22");
```

A deep link can be launched either from the Teams web or from the Teams desktop client.

* **Teams web**: Use the following format to launch a deep link from the Teams web to share content on stage:

    `msteams:/l/meeting-share?deeplinkId={GUID}&fqdn={string}&lm=deeplink&appContext={json encoded app context}`

    Example: `https://teams.microsoft.com/l/meeting-share?deeplinkId={sampleid}&fqdn=teams.microsoft.com&lm=deeplink%22&appContext=%257B%2522appSharingUrl%2522%253A%2522https%253A%252F%252Fteams.microsoft.com%252Fextensibility-apps%252Fmeetingapis%252Fview%2522%252C%2522appId%2522%253A%25229cc80a93-1d41-4bcb-8170-4b9ec9e29fbb%2522%252C%2522useMeetNow%2522%253Atrue%257D`

    |Deep link|Format|Example|
    |---------|---------|---------|
    |To share the app and open Teams calendar, when `UseMeeetNow` is **false**, default.|`https://teams.microsoft.com/l/meeting-share?deeplinkId={deeplinkid}&fqdn={fqdn}}&lm=deeplink%22&appContext={encoded app context}`|`https://teams.microsoft.com/l/meeting-share?deeplinkId={sampleid}&fqdn=teams.microsoft.com&lm=deeplink%22&appContext=%257B%2522appSharingUrl%2522%253A%2522https%253A%252F%252Fteams.microsoft.com%252Fextensibility-apps%252Fmeetingapis%252Fview%2522%252C%2522appId%2522%253A%25229cc80a93-1d41-4bcb-8170-4b9ec9e29fbb%2522%252C%2522useMeetNow%2522%253Afalse%257D`|
    |To share the app and initiate instant meeting, when `UseMeeetNow` is **true**.|`https://teams.microsoft.com/l/meeting-share?deeplinkId={deeplinkid}&fqdn={fqdn}}&lm=deeplink%22&appContext={encoded app context}`|`https://teams.microsoft.com/l/meeting-share?deeplinkId={sampleid}&fqdn=teams.microsoft.com&lm=deeplink%22&appContext=%257B%2522appSharingUrl%2522%253A%2522https%253A%252F%252Fteams.microsoft.com%252Fextensibility-apps%252Fmeetingapis%252Fview%2522%252C%2522appId%2522%253A%25229cc80a93-1d41-4bcb-8170-4b9ec9e29fbb%2522%252C%2522useMeetNow%2522%253Atrue%257D`|

* **Teams desktop client**: Use the following format to launch a deep link from the Teams desktop client to share content on stage:

    `msteams:/l/meeting-share?deeplinkId={deeplinkid}&fqdn={fqdn}&lm=deeplink&appContext={encoded app context}`

    Example: `msteams:/l/meeting-share?deeplinkId={sampleid}&fqdn=teams.microsoft.com&lm=deeplink%22&appContext=%257B%2522appSharingUrl%2522%253A%2522https%253A%252F%252Fteams.microsoft.com%252Fextensibility-apps%252Fmeetingapis%252Fview%2522%252C%2522appId%2522%253A%25229cc80a93-1d41-4bcb-8170-4b9ec9e29fbb%2522%252C%2522useMeetNow%2522%253Atrue%257D`

    |Deep link|Format|Example|
    |---------|---------|---------|
    |To share the app and open Teams calendar, when `UseMeeetNow` is **false**, default.|`msteams:/l/meeting-share?   deeplinkId={deeplinkid}&fqdn={fqdn}&lm=deeplink%22&appContext={encoded app context}`|`msteams:/l/meeting-share?deeplinkId={sampleid}&fqdn=teams.microsoft.com&lm=deeplink%22&appContext=%257B%2522appSharingUrl%2522%253A%2522https%253A%252F%252Fteams.microsoft.com%252Fextensibility-apps%252Fmeetingapis%252Fview%2522%252C%2522appId%2522%253A%25229cc80a93-1d41-4bcb-8170-4b9ec9e29fbb%2522%252C%2522useMeetNow%2522%253Afalse%257D`|
    |To share the app and initiate instant meeting, when `UseMeeetNow` is **true**.|`msteams:/l/meeting-share?   deeplinkId={deeplinkid}&fqdn={fqdn}&lm=deeplink%22&appContext={encoded app context}`|`msteams:/l/meeting-share?deeplinkId={sampleid}&fqdn=teams.microsoft.com&lm=deeplink%22&appContext=%257B%2522appSharingUrl%2522%253A%2522https%253A%252F%252Fteams.microsoft.com%252Fextensibility-apps%252Fmeetingapis%252Fview%2522%252C%2522appId%2522%253A%25229cc80a93-1d41-4bcb-8170-4b9ec9e29fbb%2522%252C%2522useMeetNow%2522%253Atrue%257D`|

The query parameters are:

* `deepLinkId`: Any identifier used for telemetry correlation.
* `fqdn`: `fqdn` is an optional parameter, which can be used to switch to an appropriate environment of a meeting to share an app on stage. It supports scenarios where a specific app share happens in a particular environment. The default value of `fqdn` is enterprise URL and possible values are `Teams.live.com` for Teams for Life, `teams.microsoft.com`, or `teams.microsoft.us`.

To share the entire app to stage, in the app manifest, you must configure `meetingStage` and `meetingSidePanel` as frame contexts, see [app manifest](../../resources/schema/manifest-schema.md). Otherwise, meeting attendees may not be able to see the content on stage.

> [!NOTE]
> For your app to pass validation, when you create a deep link from your website, web app, or Adaptive Card, use **Share in meeting** as the string or copy.

## Code sample

| **Sample name** | **Description** | **.NET** |**Node.js** |
|-----------------|-----------------|----------------|----------------|
| Meeting stage view | This app helps to enable and configure your apps for Teams meetings. It also demonstrates use of share in meeting feature.|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-stage-view/csharp)|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/meetings-stage-view/nodejs)|

## See also

* [Apps for Teams meetings and calls](../../apps-in-teams-meetings/teams-apps-in-meetings.md)
* [Share to Teams from web apps](share-to-teams-from-web-apps.md)
* [Share to Teams from personal app or tab](share-to-teams-from-personal-app-or-tab.md)
* [Create deep links](deep-links.md)
* [Adaptive Cards](../../task-modules-and-cards/cards/cards-reference.md#adaptive-card)
