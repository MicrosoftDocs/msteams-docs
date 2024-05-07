---
title: Share to Teams from web apps
description: Learn to add the Share to Teams embedded button on your website, with a website preview, using Code samples.
ms.topic: reference
ms.localizationpriority: medium
ms.date: 07/22/2022
---

# Share to Teams from web apps

Share to Teams from web apps allow users to share a link directly to a chat, channel, or meeting without switching the context. Third-party websites can use the launcher script to embed Share to Teams buttons on their webpages. When you select Share to Teams button, it launches the Share to Teams experience in a pop-up window.

The following image displays the pop-up window and link unfurling experience through Share to Teams button:

:::image type="content" source="~/assets/images/share-to-teams-popup.png" alt-text="Share-to-Teams pop-up":::

> [!NOTE]
>
> * Only the desktop versions of Microsoft&nbsp;Edge and Google Chrome are supported.
> * Use of Freemium or guest accounts is not supported.

You can also add link unfurling for the links shared through Share to Teams button hosted in web app, personal app or tab. For more information, see [link unfurling](~/messaging-extensions/how-to/link-unfurling.md).

This article guides you on how to create and embed a Share to Teams button for your website, craft your website preview, and extend Share to Teams for Education.

See the following video to learn how to embed Share to Teams button:
<br>
> [!VIDEO https://www.microsoft.com/en-us/videoplayer/embed/RE4vhWH]
<br>

## Prerequisites

To share content to meeting stage, yo must ensure the following criteria are met:

1. A Teams app with a tab that supports:

    * Meeting Side Panel
    * Instant Tab

2. To present the content onto the meeting stage, the meeting app must support Share to Stage APIs, which has two main requirements:

    * Support Meeting Stage and Meeting Side Panel within the app manifest.
    * Support read permissions for taking over the stage: “MeetingStage.Write.Chat”

To share the entire app to stage, in the app manifest, you must configure `meetingStage` and `meetingSidePanel` as frame contexts, see [app manifest](../../resources/schema/manifest-schema.md). Otherwise, meeting attendees may not be able to see the content on stage.

## Steps

* Embed Share to Teams button on webpage.
* In the meeting tab, add additional logic to query shared content (new APIs to be built by Teams platform) and display the content within the tab experience.
* Allow users to present that content onto the meeting stage via the Share to Stage APIs.
* Notify users of shared content via link unfurling.

## Embed a Share to Teams button

There are three different methods by which you can embed a Share to Teams button on your web page. Based on the control you want on the Share to Teams button, you can use one of the following methods:

# [Method 1](#tab/method-1)

The basic way to embed Share to Teams button and you can customize on your needs.

1. Add the `launcher.js` script on your webpage.

    ```html
    <script async defer src="https://teams.microsoft.com/share/launcher.js"></script>
    ```

1. Add an HTML element on your webpage with the `teams-share-button` class attribute and the link to share in the `data-href` attribute.

    ```html
    <div
      class="teams-share-button"
      data-href="https://<link-to-be-shared>">
    </div>
    ```

    After completing this, the Teams icon gets added to your website. The following image shows the Share to Teams icon:

    :::image type="content" source="~/assets/icons/share-to-teams-icon.png" alt-text="Share to Teams icon":::

    * If you want to enable your users to share content in meetings, set `allow-share-in-meeting` attribute (optional) to `true`.

    ```html
    <div
    class="teams-share-button"
    data-href="https://<link-to-be-shared>"
    data-allow-share-in-meeting="<true>"
    >
    </div>
    ```

    * If you want a different icon size for the Share to Teams button, use the `data-icon-px-size` attribute.

    ```html
    <div
      class="teams-share-button"
      data-href="https://<link-to-be-shared>"
      data-icon-px-size="64">
    </div>
    ```

    * If the shared link requires user authentication, and the URL preview from your link to be shared doesn't render well in Teams, then you can disable the URL preview by adding the `data-preview` attribute set to `false`.

    ```html
    <div
      class="teams-share-button"
      data-href="https://<link-to-be-shared>"
      data-preview="false">
    </div>
    ```

    * To display a message of your choice in compose box, you can define your text in `data-msg-text` attribute.

     ```html
     <div
      class="teams-share-button"
      data-href="https://<link-to-be-shared>"
      data-msg-text="<default-message-to-be-populated-in-compose-box>"
      data-preview="false">
      </div>
     ```

# [Method 2](#tab/method-2)

If your page dynamically renders content, you can use the `shareToMicrosoftTeams.renderButtons()` method to force **Share** to render at the appropriate place in the pipeline.

Use `async shareToMicrosoftTeams.renderButtons(options)` API to trigger the rendering of the Share buttons. This renders all share button that have the class name teams-share-button on the page.  

**`shareToMicrosoftTeams.renderButtons(options)`**

```javascript
`options` (optional): `{ elements?: HTMLElement[] }`
```

All share buttons are rendered on the page. If an optional `options` object is supplied with a list of elements, those elements are rendered into share buttons.

# [Method 3](#tab/method-3)

To render custom HTML button with click handler, assign `shareToMicrosoftTeams.shareInMeetingClickHandler` API to `onClick` handler of a custom HTML element while providing the *additional attributes* as shared below.

*Placeholder - the `window.shareToMicrosoftTeams.shareInMeetingClickHandler` API.*

---

The following are the launcher.js definitions:

| Property | HTML attribute | Type | Required | Default | Description |
| -------------- | ---------------------- | --------------------- | ------- |  ------- |---------------------------------------------------------------------- |
| url | `data-href` | String | Yes | NA | URL that can be used to pin the content to an upcoming meeting or to share in an ongoing meeting. Required if allow-share-in-meeting is set as true. |
| appId | `data-app-id` | String | Yes | NA | Teams App ID of the underlying app which will be used to power the content sharing. Required if allow-share-in-meeting is set as true. |
| entityName | `data-entity-name` | String | Optional | NA | App entity name. |
| entityDescription | `data-entity-description` | String | Optional | NA | Description of app content to share. |
| locale | `data-locale` | String | Optional | en-US | User preferred language. |
| target | `data-target` | String | Optional | self | Specifies whether the link opens in the same window, new tab, or new window. |
| buttonType | `data-button-type` | String | No | primaryShareInMeeting | Specifies the button background color: `primaryShareInMeeting` or `secondaryShareInMeeting`. |
| buttonSize | `data-button-size` | String | No | NA | Button size in pixels. |
| shareinmeeting | `data-allow-share-in-meeting` | String | No | NA | Button size in pixels. |

## End user experience

# [Chat or channel](#tab/chatchannel)

To share the content to a chat or channel:

1. Open the web app in the browser and select **Share to Teams**. The Share to Teams dialog opens.

:::image type="content" source="../../assets/images/share-to-teams/share-to-teams-browser.png" alt-text="m":::

1. Add the chat or channel name.

:::image type="content" source="~/assets/images/share-to-teams-popup.png" alt-text="Share-to-Teams pop-up":::

   > [!NOTE]
   > If the app isn't added in chat or channel scope, an app consent appears in the Share to Teams dialog.

1. Select **Share**. The app gets added in the shared scope.

# [Live meeting](#tab/live)

To share content to an ongoing meeting:

1. Open the web app in the browser and select **Share to Teams**. The Share to Teams dialog opens.

:::image type="content" source="../../assets/images/share-to-teams/share-to-teams-browser.png" alt-text="m":::

1. Add the meeting name.

:::image type="content" source="~/assets/images/share-to-teams-popup.png" alt-text="Share-to-Teams pop-up":::

   > [!NOTE]
   > If the app isn't added in the meeting scope, an app consent appears in the Share to Teams dialog.

1. Select **Share**. A consent dialog appears to share the content in the meeting.

1. Select **Start sharing**.

   :::image type="content" source="../../assets/images/share-to-teams/start-share-live-meeting.png" alt-text="Screenshot shows how to share apps in teams meeting.":::

1. The web app is shared to meeting stage and all the participants can interact and edit together.

   :::image type="content" source="../../assets/images/share-to-teams/share-meeting-live.png" alt-text="Screenshot shows app shared to the teams meeting stage.":::

# [Meet Now](#tab/meetnow)

If there's no ongoing meeting, the user may select Meet Now to begin a meeting. To open content in a scheduled call, follow the steps:

1. Open the web app in the browser and select **Share to Teams**. The Share to Teams dialog opens.

    :::image type="content" source="../../assets/images/share-to-teams/share-to-teams-browser.png" alt-text="Screenshot shows the Share to Teams button on the browser.":::

1. Add the meeting name.

    :::image type="content" source="~/assets/images/share-to-teams-popup.png" alt-text="Screenshot shows the Share to Teams pop-up.":::

   > [!NOTE]
   > If the app isn't added in the meeting scope, an app consent appears in the Share to Teams dialog.

1. Select **Present Now**. A consent dialog to start the meeting appears.

    :::image type="content" source="../../assets/images/share-to-teams/meeting-start-consent.png" alt-text="Screenshot shows the Present Now option in the Share to Teams dialog.":::

1. Select **OK**. The meeting window appears to join the meeting.

    :::image type="content" source="../../assets/images/share-to-teams/join-meeting-now.png" alt-text="Screenshot shows the join meeting window.":::

1. Select **Join Now**. A consent dialog appears to share the content in the meeting.

    :::image type="content" source="../../assets/images/share-to-teams/start-share-new-meeting.png" alt-text="Screenshot shows the consent dialog.":::

1. The web app is shared to meeting stage and all the participants can interact and edit together.

   :::image type="content" source="../../assets/images/share-to-teams/share-meeting-live.png" alt-text="Screenshot shows app shared to the teams meeting stage.":::

## Craft your website preview

When your website is shared to Teams, the card that is inserted into the selected channel contains a preview of your website. You can control the behavior of this preview by ensuring the appropriate meta-data is added to the website being shared, such as the `data-href` URL.  

To display the preview:

* You must include either a **Thumbnail image**, or both a **Title** and **Description**. For best results, include all three.
* The shared URL doesn't require authentication. If it requires authentication, you can share it, but the preview isn't created.

The following table outlines the necessary tags:

|Value|Meta tag| Open Graph|
|----|----|----|
|Title|`<meta name="title" content="Example Page Title">`|`<meta property="og:title" content="Example Page Title">`|
|Description|`<meta name="description" content="Example Page Description">`|`<meta property="og:description" content="Example Page Description">`|
|Thumbnail Image| none. |`<meta property="og:image" content="http://example.com/image.jpg">`|

You can use either the HTML default versions or the Open Graph version.

## Share to Teams for Education

For teachers using the Share to Teams button, there's an additional option to `Create an Assignment` that enables you to quickly create an assignment in the chosen Team, based on the shared link. The following image displays Share to Teams for education:

:::image type="content" source="../../assets/images/share-to-teams-popup-edu.png" alt-text="Share to Teams pop-up education":::

### Set default form values

You can select to set default values for the following fields on the Share to Teams form:

* Say something about this: `msgText`
* Assignment Instructions: `assignInstr`
* Assignment Title: `assignTitle`

#### Example

 Default form values are given in the following example:

```html
<span
    class="teams-share-button"
    data-href="https://www.microsoft.com/education/products/teams"
    data-msg-text="Default Message"
    data-assign-title="Default Assignment Title"
    data-assign-instr="Default Assignment Instructions"
></span>
```

The following are the launcher.js definitions:

| Property | HTML attribute | Type | Default | Description |
| -------------- | ---------------------- | --------------------- | ------- | ---------------------------------------------------------------------- |
| href | `data-href` | string | n/a | The href of the content to share. |
| preview | `data-preview` | Boolean (as a string) | `true` | Whether or not to show a preview of the content to share. |
| iconPxSize | `data-icon-px-size` | number (as a string) | `32` | The size in pixels of the Share to Teams button to render. |
| msgText | `data-msg-text` | string | n/a | Default text to be inserted before the link in the message compose box. Maximum number of characters is 200. |
| assignInstr | `data-assign-instr` | string | n/a | Default text to be inserted in the assignments "Instructions" field. Maximum number of characters is 200. |
| assignTitle | `data-assign-title` | string | n/a | Default text to be inserted in the assignments "Title" field. Maximum number of characters is 50. |

## See also

* [Integrate web apps](~/samples/integrate-web-apps-overview.md)
* [Share to Teams from personal app or tab](share-to-teams-from-personal-app-or-tab.md)
