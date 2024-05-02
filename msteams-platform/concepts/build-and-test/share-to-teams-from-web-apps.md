---
title: Share to Teams from web apps
description: Learn to add the Share to Teams embedded button on your website, with a website preview, using Code samples.
ms.topic: reference
ms.localizationpriority: medium
ms.date: 07/22/2022
---

# Share to Teams from web apps

Third-party websites can use the launcher script to embed Share to Teams buttons on their webpages. When you select Share to Teams button, it launches the Share to Teams experience in a pop-up window. This allows you to share a link directly to any person, channel without switching the context, or an upcoming or an ongoing meeting.

The following image displays the pop-up window for Share to Teams preview experience:

:::image type="content" source="~/assets/images/share-to-teams-popup.png" alt-text="Share-to-Teams pop-up":::

> [!NOTE]
>
> * Only the desktop versions of Microsoft&nbsp;Edge and Google Chrome are supported.
> * Use of Freemium or guest accounts is not supported.

You can also add link unfurling for the links shared through Share to Teams button hosted in web app, personal app or tab. For more information, see [link unfurling](~/messaging-extensions/how-to/link-unfurling.md).

The following image displays the link unfurling experience through Share to Teams button:

:::image type="content" source="~/assets/images/share-to-teams-link-unfurling.png" alt-text="Share-to-Teams link unfurling":::

This article guides you on how to create and embed a Share to Teams button for your website, craft your website preview, and extend Share to Teams for Education.

See the following video to learn how to embed Share to Teams button:
<br>
> [!VIDEO https://www.microsoft.com/en-us/videoplayer/embed/RE4vhWH]
<br>

## Embed a Share to Teams button

# [Method 1](#tab/method-1)

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

1. Alternatively, if you want a different icon size for the Share to Teams button, use the `data-icon-px-size` attribute.

    ```html
    <div
      class="teams-share-button"
      data-href="https://<link-to-be-shared>"
      data-icon-px-size="64">
    </div>
    ```

1. If the shared link requires user authentication, and the URL preview from your link to be shared doesn't render well in Teams, then you can disable the URL preview by adding the `data-preview` attribute set to `false`.

    ```html
    <div
      class="teams-share-button"
      data-href="https://<link-to-be-shared>"
      data-preview="false">
    </div>
    ```

1. To display a message of your choice in compose box, you can define your text in `data-msg-text` attribute.

     ```html
     <div
      class="teams-share-button"
      data-href="https://<link-to-be-shared>"
      data-msg-text="<default-message-to-be-populated-in-compose-box>"
      data-preview="false">
      </div>
     ```

1. If your page dynamically renders content, you can use the `shareToMicrosoftTeams.renderButtons()` method to force **Share** to render at the appropriate place in the pipeline.

(*placeholder for [Share in meeting](share-in-meeting.md)*)

* To enable users to share content in meetings, set `allow-share-in-meeting` attribute (optional) to `true`.
* To open content in side panel and request for all the content shared in the meeting to display in side panel and shared to stage, set `sharing.history.getContent` (*place holder on how to configure*)

# [Method 2](#tab/method-2)

**`shareToMicrosoftTeams.renderButtons(options)`**

`options` (optional): `{ elements?: HTMLElement[] }`

Currently, all share buttons are rendered on the page. If an optional `options` object is supplied with a list of elements, those elements are rendered into share buttons.

# [Method 3](#tab/method-3)

*Placeholder - the `window.shareToMicrosoftTeams.shareInMeetingClickHandler` API.*

---

The following are the launcher.js definitions:

| Property | HTML attribute | Type | Default | Description |
| -------------- | ---------------------- | --------------------- | ------- | ---------------------------------------------------------------------- |
| href | `data-href` | string | n/a | The href of the content to share. |
| preview | `data-preview` | Boolean (as a string) | `true` | Whether or not to show a preview of the content to share. |
| iconPxSize | `data-icon-px-size` | number (as a string) | `32` | The size in pixels of the Share to Teams button to render. |
| msgText | `data-msg-text` | string | n/a | Default text to be inserted before the link in the message compose box. Maximum number of characters is 200. |
| assignInstr | `data-assign-instr` | string | n/a | Default text to be inserted in the assignments "Instructions" field. Maximum number of characters is 200. |
| assignTitle | `data-assign-title` | string | n/a | Default text to be inserted in the assignments "Title" field. Maximum number of characters is 50. |

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

## End user experience

# [Chat or channel](#tab/chatchannel)

If there's no ongoing meeting, the user may select Meet Now to begin a meeting. To open content in a scheduled call, follow the steps:

1. Open the web app in the browser and select **Share to Teams**. The Share to Teams dialog opens.
1. Add the chat or channel name.
   > [!NOTE]
   > If the app isn't added in the meeting scope, then an app consent appears and the app gets added once you click **Share**.

# [Live meeting](#tab/live)

If meeting extension is installed:

1. Open the web app in the browser and select **Share to Teams**.

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

# [Meet Now](#tab/meetnow)

If there's no ongoing meeting, the user may select Meet Now to begin a meeting. To open content in a scheduled call, follow the steps:

1. Open the web app in the browser and select **Share to Teams**. The Share to Teams dialog opens.
1. Add the meeting name.
   > [!NOTE]
   > If the app isn't added in the meeting scope, then an app consent appears and the app gets added once you click **Share**.
1. You can select Meet Now to begin the meeting.
1. Once the meeting begins, request to share the content appears.
1. The web app is shared to meeting stage and all the participants can interact and edit together.

   :::image type="content" source="../../assets/images/share-in-teams-meeting/share-stage.png" alt-text="Screenshot shows app shared to the teams meeting stage.":::

## See also

* [Integrate web apps](~/samples/integrate-web-apps-overview.md)
* [Share to Teams from personal app or tab](share-to-teams-from-personal-app-or-tab.md)
