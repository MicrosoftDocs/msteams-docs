---
title: Share to Teams from web apps
description: Learn to add the Share to Teams embedded button on your website, with a website preview, using Code samples.
ms.topic: reference
ms.localizationpriority: medium
ms.date: 07/22/2022
---

# Share to Teams from web apps

Share to Teams from web apps allow users to share a link directly to a chat, channel, or meeting without switching the context. Third-party websites can use the launcher script to embed Share to Teams buttons on their webpages. When you select the **Share to Teams** button, it launches the Share to Teams experience in a pop-up window.

The following image displays the dialog that appears when the user selects **Share to Teams**:

:::image type="content" source="~/assets/images/share-to-teams-popup.png" alt-text="Screenshot shows the Share to Teams dialog.":::

> [!NOTE]
>
> * Only the desktop versions of Microsoft&nbsp;Edge and Google Chrome are supported.
> * Usage of Freemium or guest accounts isn't supported.

You can also add link unfurling for the links shared through Share to Teams button hosted in web app, personal app, or tab. For more information, see [link unfurling](~/messaging-extensions/how-to/link-unfurling.md).

The following image displays the link unfurling experience through Share to Teams button:

:::image type="content" source="~/assets/images/share-to-teams-link-unfurling.png" alt-text="Screenshot shows the Share to Teams link unfurling experience.":::

This article guides you on how to create and embed a Share to Teams button for your website, craft your website preview, and extend Share to Teams for Education.

See the following video to learn how to embed Share to Teams button:
<br>
> [!VIDEO https://www.microsoft.com/en-us/videoplayer/embed/RE4vhWH]
<br>

<!--## Steps

* Embed Share to Teams button on webpage.
* In the meeting tab, add additional logic to query shared content (new APIs to be built by Teams platform) and display the content within the tab experience.
* Allow users to present that content onto the meeting stage via the Share to Stage APIs.
* Notify users of shared content via link unfurling.-->

## Embed a Share to Teams button

There are two methods by which you can embed a Share to Teams button on your web page. Based on the control you want on the Share to Teams button, you can use one of the following methods:

# [Method 1](#tab/method-1)

The first method shows the basic way to embed Share to Teams button where you can customize the button and it's functionality based on your needs.

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

    After configuration, the Teams icon gets added to your website. The following image shows the Share to Teams icon:

    :::image type="content" source="~/assets/icons/share-to-teams-icon.png" alt-text="Share to Teams icon":::

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

Use `async shareToMicrosoftTeams.renderButtons(options)` API to trigger the rendering of the Share buttons. This renders all share button that have the class name `teams-share-button` on the page.  

*procedure placeholder*

```javascript
`options` (optional): `{ elements?: HTMLElement[] }`
```

All share buttons are rendered on the page. If an optional `options` object is supplied with a list of elements, those elements are rendered into share buttons.

---

## Share content in meetings

To share content to meeting stage, you must ensure the following criteria are met:

1. A [Microsoft Teams app with a tab](../../apps-in-teams-meetings/build-tabs-for-meeting.md) that supports meeting side panel, instant tab, and [Share to Stage APIs](../../apps-in-teams-meetings/build-apps-for-teams-meeting-stage.md).

2. To present the content to the meeting stage, the meeting app must support [Share to Stage APIs](../../apps-in-teams-meetings/build-apps-for-teams-meeting-stage.md), which has two major requirements:

    * The [app manifest](../../resources/schema/manifest-schema.md) must support both the meeting stage and meeting side panel. You must configure `meetingStage` and `meetingSidePanel` as frame contexts in the app manifest. If not configured, meeting attendees might not be able to view the content on stage.
    * The app must support `MeetingStage.Write.Chat` permissions for taking control of the stage. This is a read permission requirement.

To enable your users to share content in meetings from Share to Teams, set `allow-share-in-meeting` attribute to `true` when configuring Share to Teams button:

```html
    <div
    class="teams-share-button"
    data-href="https://<link-to-be-shared>"
    data-allow-share-in-meeting="<true>"
    >
    </div>
```

The Share to Teams dialog appears with a **Present now** option.

:::image type="content" source="~/assets/images/share-to-teams-popup.png" alt-text="Screenshot shows the Share to Teams dialog with Present now option.":::

> [!NOTE]
> The **Present now** option in Share to Teams dialog appears only when you set `data-allow-share-in-meeting` to `true`.

## End user experience

Here are few end user scenarios when the content is shared in different scopes from Share to Teams button.

# [Chat or channel or upcoming meeting](#tab/chatchannelmeeting)

To share the content to a chat or channel:

1. Open the web app in the browser and select **Share to Teams**. The Share to Teams dialog opens.

    :::image type="content" source="../../assets/images/share-to-teams/share-to-teams-browser.png" alt-text="Screenshot shows the Share to Teams button in the browser.":::

1. Add the chat or channel name.

    :::image type="content" source="~/assets/images/share-to-teams-popup.png" alt-text="Screenshot shows the Share to Teams dialog to add chat or channel name.":::

   > [!NOTE]
   > If the app isn't added in chat or channel scope, an app consent appears in the Share to Teams dialog.

1. Select **Share**. The app content gets shared in the respective scope.

# [Upcoming or scheduled meeting](#tab/upcomingmeeting)

To share the content in an upcoming or a scheduled meeting:

1. Open the web app in the browser and select **Share to Teams**. The Share to Teams dialog opens.

    :::image type="content" source="../../assets/images/share-to-teams/share-to-teams-browser.png" alt-text="Screenshot shows the Share to Teams button in the browser.":::

1. Add the meeting name.

    :::image type="content" source="~/assets/images/share-to-teams-popup.png" alt-text="Screenshot shows the Share to Teams dialog to add chat or channel name.":::

   > [!NOTE]
   > If the app isn't added in chat or channel scope, an app consent appears within the Share to Teams dialog.

1. Select **Share**. The app content gets shared in an upcoming or a scheduled meeting chat as an Adaptive Card.

    :::image type="content" source="../../assets/images/share-to-teams/upcoming-meeting-content.png" alt-text="Screenshot shows the shared content in the meeting chat.":::

When the meeting begins, the content shared to a scheduled meeting is displayed in a side panel experience, based on the app that's open.

# [Live meeting](#tab/live)

To share content to an ongoing meeting:

1. Open the web app in the browser and select **Share to Teams**. The Share to Teams dialog opens.

    :::image type="content" source="../../assets/images/share-to-teams/share-to-teams-browser.png" alt-text="Screenshot shows the Share to Teams button in the browser to share in meeting.":::

1. Select **Present now**. A consent dialog appears to share the content in the meeting.

    :::image type="content" source="../../assets/images/share-to-teams/live-meeting.png" alt-text="Screenshot shows the  Share to Teams dialog to add content to an ongoing meeting.":::

   > [!NOTE]
   >
   > * If the app isn't added in the meeting scope, an app consent appears within the Share to Teams dialog.
   > * If there's no ongoing meeting, the user can select **Meet Now** to begin a meeting and share content.

1. Select **Start sharing**.

   :::image type="content" source="../../assets/images/share-to-teams/start-share-live-meeting.png" alt-text="Screenshot shows how to share apps in teams meeting.":::

1. The web app is shared to meeting stage and all the participants can interact and work together.

   :::image type="content" source="../../assets/images/share-to-teams/share-meeting-live.png" alt-text="Screenshot shows app shared to the teams meeting stage.":::

# [Meet Now](#tab/meetnow)

If there is no ongoing meeting and the user wants to begin a meeting and start presenting the content, they can do so with Share to Teams option. To start a meeting while sharing the content, follow the steps given:

1. Open the web app in the browser and select **Share to Teams**. The Share to Teams dialog opens.

    :::image type="content" source="../../assets/images/share-to-teams/share-to-teams-browser.png" alt-text="Screenshot shows the Share to Teams button on the browser.":::

1. Add either the meeting name or participant names to begin a new meeting.

    :::image type="content" source="~/assets/images/share-to-teams-popup.png" alt-text="Screenshot shows the Share to Teams dialog to add meeting name or participants.":::

   > [!NOTE]
   > If the app isn't added in the meeting scope, an app consent appears within the Share to Teams dialog.

1. Select **Present now**. A consent dialog to start the meeting appears.

    :::image type="content" source="../../assets/images/share-to-teams/meeting-start-consent.png" alt-text="Screenshot shows the Present Now option in the Share to Teams dialog.":::

1. Select **OK**. The meeting window appears to join the meeting.

    :::image type="content" source="../../assets/images/share-to-teams/join-meeting-now.png" alt-text="Screenshot shows the join meeting window.":::

1. Select **Join Now**. After you join the meeting, a consent dialog appears to share the content in the meeting.

    :::image type="content" source="../../assets/images/share-to-teams/start-share-new-meeting.png" alt-text="Screenshot shows the consent dialog.":::

1. The web app is shared to meeting stage and all the participants can interact and work together.

   :::image type="content" source="../../assets/images/share-to-teams/share-meeting-live.png" alt-text="Screenshot shows app shared to the teams meeting stage.":::

---

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
| url | `data-href` | string | NA | The href of the content to share. URL that can be used to pin the content to an upcoming meeting or to share in an ongoing meeting. Required if allow-share-in-meeting is set as true. |
| preview | `data-preview` | Boolean (as a string) | `true` | Whether or not to show a preview of the content to share. |
| appId | `data-app-id` | String | NA | ID of the app to share. Teams App ID of the underlying app which will be used to power the content sharing. Reqd if allow-share-in-meeting is set as true. |
| iconPxSize | `data-icon-px-size` | number (as a string) | `32` | The size in pixels of the Share to Teams button to render. |
| msgText | `data-msg-text` | string | NA | Default text to be inserted before the link in the message compose box. Maximum number of characters is 200. |
| assignInstr | `data-assign-instr` | string | NA | Default text to be inserted in the assignments "Instructions" field. Maximum number of characters is 200. |
| assignTitle | `data-assign-title` | string | NA | Default text to be inserted in the assignments "Title" field. Maximum number of characters is 50. |
| shareinmeeting | `data-allow-share-in-meeting` | String | NA | To allow users to share content in meetings in addition to existing capability to share in chat/channel. It's considered as false by default. |

## See also

* [Integrate web apps](~/samples/integrate-web-apps-overview.md)
* [Share to Teams from personal app or tab](share-to-teams-from-personal-app-or-tab.md)
