---
title: Add Audio/Video Clips in Adaptive Cards
author: v-sdhakshina
description: Learn how the media elements are supported in the Adaptive Card and support consumption directly within Teams Adaptive Card.
ms.localizationpriority: high
ms.topic: reference
ms.author: v-sdhakshina
---

# Media elements in Adaptive Card

Adaptive Card media elements are components that allow you to embed audio and video clips directly into your Adaptive Cards. These elements enhance the user experience by making the cards more interactive and engaging for your app users. They can view and play media files directly within Teams using Adaptive Card. Here are few key points about media elements in Adaptive Card:

* ***Enhanced engagement***: Adding media elements makes the cards more effective and can capture user's attention more effectively. 

* ***Improved Communication***: Media elements can convey information more richly and effectively than text alone. 

* ***Versatility***: They can be used in various scenarios, such as tutorials, announcements, or feedback requests. 

The following image shows the media elements in Adaptive Card:

# [Desktop](#tab/desktop)

:::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/desktop-media.png" alt-text="Screenshot shows you the media elements in desktop.":::

# [Mobile](#tab/mobile)

:::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/mobile-media.png" alt-text="Screenshot shows you the media elements in mobile.":::

---

You can add audio or video clips to your Adaptive Card by setting `media` as the `type` property in the Adaptive Card payload. The video or audio clips are accessed through the media files available in OneDrive, SharePoint, YouTube, Dailymotion, or Vimeo.

## Adaptive Card example with media elements

The following is an Adaptive Card payload that includes media elements:

```json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json", 
  "type": "AdaptiveCard", 
  "version": "1.6", 
  "fallbackText": "This card requires CaptionSource to be viewed. Ask your platform to update to Adaptive Cards v1.6 for this and more!", 
  "body": [
    {
      "type": "TextBlock",
      "text": "YouTube video",
      "wrap": true
    },
    { 
      "type": "Media",
      "poster": "https://adaptivecards.io/content/poster-video.png"
      "sources": [
        {
          "mimeType": "video/mp4",
          "url": "https://www.youtube.com/watch?v=S7xTBa93TX8"
        }
      ]
    },
    {
      "type": "TextBlock",
      "text": "Vimeo video",
      "wrap": true
    },
    {
      "type": "Media",
      "poster": "https://adaptivecards.io/content/poster-video.png"
      "sources": [
        {
          "mimeType": "video/mp4",
          "url": "https://vimeo.com/508683403"
        }
      ]
    },
    {
      "type": "TextBlock",
      "text": "Dailymotion video",
      "wrap": true
    },
    {
      "type": "Media",
      "poster": "https://adaptivecards.io/content/poster-video.png" 
      "sources": [
        {
          "mimeType": "video/mp4",
          "url": "https://www.dailymotion.com/video/x8wi5ho"
        }
      ]
    }
  ]
}

```

| Property | Description |
| --- | --- |
| `type` | Must be `Media` to add media files.|
| `poster` | The URL of an image displayed before the media plays. Supports data URI in version 1.2+.</br> If you omit the poster, the `media` element either uses a default poster (controlled by the host application) or attempts to automatically pull the poster from the target video service when the source URL points to a video from a Web provider, such as YouTube.|
| `sources.url`| The URL to media file. Supports data URI in version 1.2+. |
| `sources.mimeType`| Mime type of associated media, such as `video/mp4`.</br> For YouTube and other Web video URLs, `mimeType` can be omitted.|

For more information, see [Adaptive Cards `media` ](https://www.adaptivecards.io/explorer/Media.html).

## Add media elements to your Adaptive Card

Add media files into an existing or new Adaptive Card either through [Teams Developer Portal](https://dev.teams.microsoft.com/cards) or [Adaptive Card Designer](https://adaptivecards.io/designer). To incorporate media files into your Adaptive Card, follow these steps:

1. Open an existing Adaptive Card or create a new Adaptive Card using [Teams Developer Portal](https://dev.teams.microsoft.com/cards) or [Adaptive Card Designer](https://adaptivecards.io/designer).

1. From the left pane, under **Elements**, select **Media** and add it to your Adaptive Card.

   :::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/media-element-in-ac.png" alt-text="Screenshot shows you the Adaptive Card with media elements.":::

1. Under **Custom card structure title**, select **Media**. The **ELEMENT PROPERTIES** window appears.

1. In **ELEMENT PROPERTIES** section, update the following fields:

   * Under the **Sources** section, enter your media file URL in the **URL**. To add and obtain the media file URL from OneDrive or SharePoint, see [OneDrive or SharePoint media file](#add-media-files-to-onedrive-or-sharepoint).
   * Under the **Media** section, enter image URL in the **Poster URL**. For more information, see [Adaptive Cards media](https://adaptivecards.io/explorer/Media.html).

     :::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/media-element-ac.png" alt-text="Screenshot shows you the Adaptive Card schema with media elements."lightbox="../../assets/images/media-elements-in-adaptive-cards/media-element-ac.png":::

1. Select **Save** and then select **Send me this card**.

   :::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/media-element-ac-save.png" alt-text="Screenshot shows you how to save your Adaptive card and send it to your Teams"lightbox="../../assets/images/media-elements-in-adaptive-cards/media-element-ac-save.png":::

   Your Adaptive Card with media file is successfully saved and sent to your Teams chat. Now, you can play your media file in your Adaptive Card.

   :::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/adaptive-card-teams.png" alt-text="Screenshot shows you the adaptive card with media files in Teams chat.":::

### Add media files to OneDrive or SharePoint

To add media files to OneDrive or SharePoint, follow the steps:

1. Add your media files to OneDrive or SharePoint.

1. Get a link or URL using the **Share**, **Copy link**, or **Copy link at current time** options from OneDrive or SharePoint.

   :::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/share-link.png" alt-text="Screenshot shows you from where you can take a link.":::
   
   You can also create a sharing link or URL for a DriveItem. For more information, see [DriveItem](/graph/api/driveitem-createlink).

    >[!NOTE]
    > Adaptive Card doesn't support media file links or URLs that are copied directly from the address bar of OneDrive or SharePoint.

## Limitations

* `mimeType` is a required field for Teams web and desktop clients.
* `poster` URL is supported only for Teams mobile clients.
* For Teams desktop clients, Adaptive Cards support inline and full screen playback, whereas for mobile clients, the experience is limited to full screen and picture-in-picture (PiP) (which allows you to watch video in floating window when you open the other apps).
* For SharePoint or OneDrive media files, ensure that the users have access to the media files available in the SharePoint or OneDrive.

## Code samples

|Sample name| Description|.NET|
|-------|------------------|-----|
| Media elements in Adaptive Card | This sample shows how user can send Adaptive Cards with media files. |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-all-cards/csharp)|

## See also

* [Adaptive Cards](cards-reference.md#adaptive-card)
* [People Picker in Adaptive Cards](people-picker.md)
* [Typeahead search in Adaptive Cards](dynamic-search.md)
