---
title: Embed Share to Teams on Web Apps
description: Learn to add the Share to Teams embedded button on third-party websites, with a website preview, using launcher script and code samples.
ms.topic: reference
ms.localizationpriority: medium
ms.date: 10/29/2024
---

# Share to Teams from web apps

Share to Teams from web apps allows users to share content directly to a chat, channel, or meeting without switching context. Third-party websites can use the launcher script to embed the **Share to Teams** button on their webpages. When the user selects **Share to Teams**, the Share to Teams dialog appears and prompts the user to provide the required details to share the content.

The following image displays the dialog that appears when the user selects **Share to Teams**:

:::image type="content" source="~/assets/images/share-to-teams/share-to-team-dialog.png" alt-text="Screenshot shows the Share to Teams dialog.":::

By default, Share to Teams supports tagging users with @username and @everyone, and the tagged users receive notifications within Microsoft Teams when content is shared on Teams.

> [!NOTE]
>
> * Only the desktop versions of Microsoft&nbsp;Edge and Google Chrome are supported.
> * Usage of Freemium or guest accounts isn't supported.

You can also add link unfurling for the links shared through Share to Teams that are hosted in a web app, personal app, or tab. For more information, see [link unfurling](~/messaging-extensions/how-to/link-unfurling.md).

The following image displays the link unfurling experience through Share to Teams:

:::image type="content" source="~/assets/images/share-to-teams-link-unfurling.png" alt-text="Screenshot shows the Share to Teams link unfurling experience.":::

The content outlined here guides you on how to create and embed Share to Teams for your website, craft your website preview, and extend Share to Teams for Education.

The following video provides the basic steps on how to embed Share to Teams:
<br>
> [!VIDEO https://www.microsoft.com/en-us/videoplayer/embed/RE4vhWH]
<br>

<!--## Steps

* Embed Share to Teams button on webpage.
* In the meeting tab, add additional logic to query shared content (new APIs to be built by Teams platform) and display the content within the tab experience.
* Allow users to present that content onto the meeting stage via the Share to Stage APIs.
* Notify users of shared content via link unfurling.-->

## Embed Share to Teams

There are two methods by which you can embed Share to Teams on your webpage. Based on the control you want on Share to Teams, you can use one of the following methods:

# [Method 1](#tab/method1)

This method shows the simple and basic way to embed Share to Teams where you can customize the button and its functionality based on your requirements:

1. Add the `launcher.js` script on your webpage.

    ```html
    <script async defer src="https://teams.microsoft.com/share/launcher.js"></script>
    ```

1. Add an HTML element on your webpage with `teams-share-button` in the `class` attribute and the link to share in the `data-href` attribute.

    ```html
    <div
      class="teams-share-button"
      data-href="https://<link-to-be-shared>">
    </div>
    ```

    After configuration, the **Share to Teams** button gets added to your website.

    * If you want a different icon size for the button, use the `data-icon-px-size` attribute.

        ```html
        <div
          class="teams-share-button"
          data-href="https://<link-to-be-shared>"
          data-icon-px-size="64">
        </div>
        ```

    * If the shared link requires user authentication or the URL preview from your link doesn't render properly in Teams, then you can disable the URL preview by adding the `data-preview` attribute and setting it to `false`.

        ```html
        <div
          class="teams-share-button"
          data-href="https://<link-to-be-shared>"
          data-preview="false">
        </div>
        ```

    * If you want to display a message of your choice in the compose box, you can define your text in `data-msg-text` attribute.

         ```html
         <div
          class="teams-share-button"
          data-href="https://<link-to-be-shared>"
          data-msg-text="<default-message-to-be-populated-in-compose-box>"
          data-preview="false">
          </div>
         ```

# [Method 2](#tab/method2)

This method allows you to have control over which button is dynamically rendered or when the script is executed. The script only runs when `window.shareToMicrosoftTeams.renderButtons()` is invoked. You can pass specific HTML elements through the `renderButtons({elements: []})` API. You can customize the button styles, size, and languages.

The async `shareToMicrosoftTeams.renderButtons(options)` API renders all share buttons that have the class name `teams-share-button` on the page. If an `options (optional)` object is supplied with a list of elements as shown in the following code, those elements are rendered into the **Share** buttons.

```javascript
`options` (optional): `{ elements?: HTMLElement[] }`
```

1. Add the launcher.js script on your webpage.

    ```html
    <script async defer src="https://teams.microsoft.com/share/launcher.js" onload="onLoadComplete()"></script>
    ```

2. Create an HTML element and specify the required attributes. After the launcher script is fully loaded, ensure that the rendering logic is executed.

   ```javascript
   async function onLoadComplete() {
       const shareButton = document.createElement("div");
       shareButton.setAttribute("data-app-id", "<app-id>");
       shareButton.textContent = "Share Test App"
       shareButton.setAttribute("data-href", "<app-content-url>");
       shareButton.setAttribute("data-preview", "false");
       shareButton.setAttribute("data-msg-text", "<default-message-to-be-populated-in-compose-box>");
       await window.shareToMicrosoftTeams.renderButtons({elements: [shareButton]});
   }
   ```

---

Here's the end user scenario where the content is shared to chat or channel using Share to Teams:

</br>
<details>
<summary>Share content to a chat or channel</summary>

1. Open the web app in the browser and select **Share to Teams**. The Share to Teams dialog opens.

    :::image type="content" source="../../assets/images/share-to-teams/share-to-teams-browser.png" alt-text="Screenshot shows the Share to Teams button in the browser.":::

1. Add the chat or channel name.

    :::image type="content" source="~/assets/images/share-to-teams/share-to-teams-popup.png" alt-text="Screenshot shows the Share to Teams dialog to add chat or channel name.":::

   > [!NOTE]
   > If the app isn't already added in chat or channel scope, an app consent disclaimer appears within the Share to Teams dialog.

1. Select **Share**. The app content gets shared in the respective scope.

</details>
</br>

### Share content in meetings

Share to Teams from web apps allows users to share content to a live or an upcoming meeting. When you enable content sharing in meetings, it allows users to share information that creates a collaborative workspace within the meeting. For example, users can share workboards from a web app directly onto the meeting stage, facilitating a collective effort to gather and organize ideas.

Here's how the shared web content appears in the meeting stage:

:::image type="content" source="../../assets/images/share-to-teams/share-meeting-live.png" alt-text="Screenshot shows app shared to the teams meeting stage." lightbox="../../assets/images/share-to-teams/share-meeting-live.png":::

Before you enable share content to meetings, you must ensure the following:

1. A [Microsoft Teams app with a tab](../../apps-in-teams-meetings/build-tabs-for-meeting.md) that supports meeting side panel and [Share to Stage APIs](../../apps-in-teams-meetings/build-apps-for-teams-meeting-stage.md).

2. The meeting app must support Share to Stage APIs with two primary requirements to display the content on the meeting stage:

    * The [app manifest](../../resources/schema/manifest-schema.md) that supports both `meetingStage` and `meetingSidePanel` configured as frame contexts. If not configured, meeting participants might not be able to view the content on stage.
    * The app that supports `MeetingStage.Write.Chat` permissions for taking control of the stage. This is a read permission requirement.

> [!NOTE]
>
> * If the app doesn't have meeting stage and side panel capabilities, the content aren't stored and the messages are sent in the regular meeting chat.
> * If an app installation is blocked by the admin, then the app is added to the chat and not the meeting of the user.
> * Share to Teams in meeting is supported only for tab scenarios and specific to Teams.

**Enable Share to Teams for meeting**

1. Add the `launcher.js` script on your webpage.

    ```html
    <script async defer src="https://teams.microsoft.com/share/launcher.js"></script>
    ```

1. Add an HTML element on your webpage with `teams-share-button` in the `class` attribute and the link to share in the `data-href` attribute. To enable your users to share content in meetings from Share to Teams, add `allow-share-in-meeting` attribute and set it to `true`.

    ```html
        <div
        class="teams-share-button"
        data-href="https://<link-to-be-shared>"
        data-allow-share-in-meeting="true"
        data-app-id="<app-id>"
        >
        </div>
    ```

    After the configuration, the Share to Teams dialog appears with the **Present now** option. Present now allows the users to share content to an ongoing meeting. For the user who shared content in meeting stage, the side panel opens automatically as the meeting begins and populates the shared content in the meeting side panel.

    :::image type="content" source="~/assets/images/share-to-teams/share-to-team-dialog.png" alt-text="Screenshot shows the Share to Teams dialog with the Present now option.":::

Here are a few end user scenarios where the content is shared to meetings using Share to Teams:

</br>
<details>
<summary>Share content to an upcoming meeting</summary>

1. Open the web app in the browser and select **Share to Teams**. The Share to Teams dialog opens.

    :::image type="content" source="../../assets/images/share-to-teams/share-to-teams-browser.png" alt-text="Screenshot shows the Share to Teams button in the browser.":::

1. Add the meeting name.

    :::image type="content" source="~/assets/images/share-to-teams/share-to-team-dialog.png" alt-text="Screenshot shows the Share to Teams dialog to add meeting name.":::

   > [!NOTE]
   > If the app isn't already added in the meeting scope, an app consent disclaimer appears within the Share to Teams dialog.

1. Select **Share**. The app content gets shared in an upcoming meeting chat as an Adaptive Card.

    :::image type="content" source="../../assets/images/share-to-teams/upcoming-meeting-content.png" alt-text="Screenshot shows the shared content in the meeting chat." lightbox="../../assets/images/share-to-teams/upcoming-meeting-content-lightbox.png":::

When the meeting begins, the content shared to the meeting is displayed in a side panel experience, based on the app that's opened.

</details>
</br>
<details>
<summary>Share content in an ongoing meeting</summary>

1. Open the web app in the browser and select **Share to Teams**. The Share to Teams dialog opens.

    :::image type="content" source="../../assets/images/share-to-teams/share-to-teams-browser.png" alt-text="Screenshot shows the Share to Teams button in the browser to share in meeting.":::

1. Select **Present now**. A consent dialog appears to share the content in the meeting.

    :::image type="content" source="~/assets/images/share-to-teams/share-to-team-dialog.png" alt-text="Screenshot shows the Share to Teams dialog to add content to an ongoing meeting.":::

   > [!NOTE]
   >
   > * If the app isn't already added in the meeting scope, an app consent disclaimer appears within the Share to Teams dialog.
   > * If there's no ongoing meeting, the user can select **Meet now** to begin a meeting and share content.

1. Select **Start sharing**.

   :::image type="content" source="../../assets/images/share-to-teams/start-share-live-meeting.png" alt-text="Screenshot shows how to share apps in teams meeting." lightbox="../../assets/images/share-to-teams/start-share-live-meeting-lightbox.png":::

1. The web app is shared to meeting stage and all the participants can interact and work together.

   :::image type="content" source="../../assets/images/share-to-teams/share-meeting-live.png" alt-text="Screenshot shows an app shared to the teams meeting stage.":::

</details>
</br>
<details>
<summary>Start a meeting and share content</summary>

If there's no ongoing meeting and the user wants to initiate a meeting and present the content, they can do so with the Share to Teams option. To start a meeting and share the content:

1. Open the web app in the browser and select **Share to Teams**. The Share to Teams dialog opens.

    :::image type="content" source="../../assets/images/share-to-teams/share-to-teams-browser.png" alt-text="Screenshot shows the Share to Teams button on the browser.":::

1. Add either the meeting name or participants to begin a new meeting.

1. Select **Present now**. A consent dialog appears to start the meeting.

    :::image type="content" source="~/assets/images/share-to-teams/share-to-team-dialog.png" alt-text="Screenshot shows the Share to Teams dialog to add meeting name or participants.":::

   > [!NOTE]
   > If the app isn't already added in the meeting scope, an app consent disclaimer appears within the Share to Teams dialog.

1. Select **OK**. The meeting window appears to join the meeting.

    :::image type="content" source="../../assets/images/share-to-teams/meeting-start-consent.png" alt-text="Screenshot shows the Present Now option in the Share to Teams dialog." lightbox="../../assets/images/share-to-teams/meeting-start-consent-lightbox.png":::

1. Select **Join Now**. After you join the meeting, a consent dialog appears to share the content in the meeting.

    :::image type="content" source="../../assets/images/share-to-teams/join-meeting-now.png" alt-text="Screenshot shows the join meeting window." lightbox="../../assets/images/share-to-teams/join-meeting-now-lightbox.png":::

1. Select **Start sharing**.

    :::image type="content" source="../../assets/images/share-to-teams/start-share-new-meeting.png" alt-text="Screenshot shows the consent dialog." lightbox="../../assets/images/share-to-teams/start-share-new-meeting-lightbox.png":::

1. The web app is shared to meeting stage and all the participants can interact and work together.

   :::image type="content" source="../../assets/images/share-to-teams/share-meeting-live.png" alt-text="Screenshot shows app shared to the teams meeting stage.":::

</details>
</br>

## Craft your website preview

When your website is shared to Teams, the card that's inserted into the selected channel contains a preview of your website. You can control the behavior of this preview by ensuring the appropriate metadata is added to the website that's being shared, such as the `data-href` URL.  

To display the preview:

* You must include either a **Thumbnail image**, or both a **Title** and **Description**. For best results, include all three.
* The shared URL doesn't require authentication. If it requires authentication, you can share it, but the preview isn't created.

The following table outlines the necessary tags:

|Value|Meta tag| Open Graph|
|----|----|----|
|Title|`<meta name="title" content="Example Page Title">`|`<meta property="og:title" content="Example Page Title">`|
|Description|`<meta name="description" content="Example Page Description">`|`<meta property="og:description" content="Example Page Description">`|
|Thumbnail Image| None |`<meta property="og:image" content="http://example.com/image.jpg">`|

You can use either the HTML default versions or the Open Graph version.

## Share to Teams for education

For teachers using the Share to Teams button, there's an additional option to `Create an Assignment` that enables you to quickly create an assignment in the chosen Team, based on the shared link.

You can select to set default values for the following fields on the Share to Teams form:

* Say something about this: `msgText`
* Assignment Instructions: `assignInstr`
* Assignment Title: `assignTitle`

The following image displays Share to Teams for education:

:::image type="content" source="../../assets/images/share-to-teams-popup-edu.png" alt-text="Share to Teams pop-up education":::

### Example

The default form values are given in the following example:

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
| url | `data-href` | string | NA | The URL of the content to be shared. This URL can be used to pin the content to an upcoming meeting or to share in an ongoing meeting. Required if `allow-share-in-meeting` is set as `true`. |
| preview | `data-preview` | Boolean (as a string) | `true` | The value specifies whether to show a preview of the content to be shared. |
| appId | `data-app-id` | String | NA | The ID of the app to be shared. Required if `allow-share-in-meeting` is set as `true`. |
| iconPxSize | `data-icon-px-size` | number (as a string) | `32` | The size in pixels of the Share to Teams button to be rendered. |
| msgText | `data-msg-text` | string | NA | The default text to be added before the link in the message compose box. The maximum number of characters is 200. |
| assignInstr | `data-assign-instr` | string | NA | The default text to be added in the assignments **Instructions** field. The maximum number of characters is 200. |
| assignTitle | `data-assign-title` | string | NA | The default text to be added in the assignments **Title** field. The maximum number of characters is 50. |
| share in meeting | `data-allow-share-in-meeting` | String | NA | The value that allows users to share content in meetings in addition to existing capability to share in chat or channel. It's considered as `false` by default. |

## Code sample

| **Sample name** | **Description** | **Node.js** |
|-----------------|-----------------|----------------|
| Share to Teams | This sample app displays a webpage as a tab and includes a Share to Teams button with a Present now option. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-deeplink/nodejs) |

## See also

* [Integrate web apps](~/samples/integrate-web-apps-overview.md)
* [Share to Teams from personal app or tab](share-to-teams-from-personal-app-or-tab.md)
* [Share in meeting](share-in-meeting.md)
