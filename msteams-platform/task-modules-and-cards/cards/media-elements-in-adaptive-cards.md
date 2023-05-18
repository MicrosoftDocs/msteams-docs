---
title: Media Elements in Adaptive Card
author: v-sdhakshina
description: Learn how the media elements are supported in the Adaptive Card and support consumption directly within Teams Adaptive Card.
ms.localizationpriority: high
ms.topic: reference
ms.author: v-sdhakshina
---

# Media elements in Adaptive Card

Media elements in Adaptive Card provides enhanced media experience and increases engagement with the Adaptive Card. You can add media files such as audio or video clips to your Adaptive Card.

Adaptive Card plays the video or audio clips by accessing the media files available in OneDrive or SharePoint. You can view the media files within the Adaptive Card in Teams.

The following screenshot shows you the media elements in your Adaptive Card:

# [Desktop](#tab/desktop)

:::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/desktop-media.png" alt-text="Screenshot shows you the media elements in desktop.":::

# [Mobile](#tab/mobile)

:::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/mobile-media.png" alt-text="Screenshot shows you the media elements in mobile.":::

---
> [!NOTE]
> For desktop clients, Adaptive cards support inline and full screen playback, whereas for mobile clients, the experience is limited to full screen and picture-in-picture (PiP) (which allows you to watch video in floating window when you open the other apps).

## Add media elements to your Adaptive Card

You can add media files to an existing or new Adaptive Card using Teams Developer Portal or Adaptive Card Designer. To add media files to your Adaptive Card, follow the steps:

1. Add your media files to OneDrive or SharePoint.

1. [Create a sharing link or URL for a DriveItem](/graph/api/driveitem-createlink). You can also get a link or URL using the **Share**, **Copy link**, or **Copy link at current time** options from OneDrive or SharePoint.

   :::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/share-link.png" alt-text="Screenshot shows you from where you can take a link.":::

    >[!NOTE]
    > Adaptive Card does't support media file links or URL that are copied directly from the address bar.

1. Open an existing Adaptive Card or create a new Adaptive Card using [Teams Developer Portal](https://dev.teams.microsoft.com/cards) or [Adaptive Card Designer](https://adaptivecards.io/designer).

1. From the left pane, under **Elements**, select **Media** and add it to your Adaptive Card.

   :::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/media-element-in-ac.png" alt-text="Screenshot shows you the Adaptive Card with media elements.":::

1. Under **Custom card structure title**, select **Media**. The **ELEMENT PROPERTIES** window appears.

1. In **ELEMENT PROPERTIES** section, update the following fields:

   * Under **Sources** section, enter your media file URL in the **URL**.
   * Under **Media** section, enter image URL in the **Poster URL**. For more information, see [Adaptive Cards media](https://adaptivecards.io/explorer/Media.html).

   :::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/media-element-ac.png" alt-text="Screenshot shows you the Adaptive Card schema with media elements."lightbox="../../assets/images/media-elements-in-adaptive-cards/media-element-ac.png":::

    >[!NOTE]
    > Poster URL is supported only for mobile clients.

1. Select **Save** and then select **Send me this card**.

   :::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/media-element-ac-save.png" alt-text="Screenshot shows you how to save your Adaptive card and send it to your Teams"lightbox="../../assets/images/media-elements-in-adaptive-cards/media-element-ac-save.png":::

   Your Adaptive Card with media file is successfully saved and sent to your Teams chat. Now, you can play your media file in your Adaptive Card.

   :::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/adaptive-card-teams.png" alt-text="Screenshot shows you the adaptive card with media files in Teams chat.":::

### Example

The following code shows an example of an Adaptive Card with media elements:

```json
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.6",
  "fallbackText": "This card requires CaptionSource to be viewed. Ask your platform to update to Adaptive Cards v1.6 for this and more!",
  "body": [
    {
      "type": "Media",
      "poster": "https://adaptivecards.io/content/poster-video.png",
      "sources": [
    {
          "mimeType": "video/mp4",
          "url": "https://adaptivecardsblob.blob.core.windows.net/assets/AdaptiveCardsOverviewVideo.mp4"
    }
      ]
    }
  ]
}

```

## Limitations

* Adaptive Card supports only the media files uploaded in SharePoint or OneDrive.
* Ensure that the users have access to the media files available in the SharePoint or OneDrive.

## Code samples

|Sample name| Description|.NET|
|-------|------------------|-----|
| Adaptive Card |This sample shows how user can send cards with media files. Also, explain|[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-all-cards/csharp)|

## See also

* [Adaptive Cards](cards-reference.md#adaptive-card)
* [People Picker in Adaptive Cards](people-picker.md)
* [Typeahead search in Adaptive Cards](dynamic-search.md)
