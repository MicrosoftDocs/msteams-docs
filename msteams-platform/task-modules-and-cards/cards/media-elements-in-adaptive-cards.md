---
title: Media Elements in Adaptive Cards
author: v-sdhakshina
description: Learn how the media elements are supported in the Adaptive Cards and support consumption directly within Teams Adaptive Cards.
ms.localizationpriority: high
ms.topic: reference
ms.author: v-sdhakshina
---

# Media elements in Adaptive Cards

Adaptive Cards support media elements such as audio or video clips from OneDrive or SharePoint. To increase engagement with the Adaptive Cards and to provide new experience in the media elements, it uses OnePlayer to support the media play.

Adaptive Cards support the media elements without the force exit from Teams to view media. Teams don’t provide any media support like audio, video, and animation cards from Bot Framework.

For desktop clients, Adaptive cards support inline and full screen playback and for mobile clients, the experience is limited to full screen and picture-in-picture (PiP) (allows you to watch video in floating window when you open the other apps).

Following are the different scenarios:

**LOB scenarios**

Video or audio files are directly uploaded to OneDrive or SharePoint and accessible within the tenant and Adaptive Cards plays the file through OnePlayer.

**Third party partner scenarios**

To improve the ability to deal with media files, following are the dynamic user-uploaded scenarios where users upload video or audio files within OneDrive or SharePoint in other tenants and be able to link to them:

* Files are directly uploaded to OneDrive or SharePoint external to the current tenant.
* Files are hidden behind external SSO or authentication. For example, Google Drive, Dropbox, etc.

The following screenshot shows you the media elements in your Adaptive Cards:

# [Desktop](#tab/desktop)

:::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/desktop-media.png" alt-text="Screenshot shows you the media elements in desktop.":::

# [Mobile](#tab/mobile)

:::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/mobile-media.png" alt-text="Screenshot shows you the media elements in mobile.":::

---

## Add media elements to your Adaptive Cards

After you created an Adaptive Cards using [Teams Developer Portal](https://dev.teams.microsoft.com/cards) or [Adaptive Cards Designer](https://adaptivecards.io/designer), you can add any media files to your Adaptive Cards as follows:

1. Add your media files to OneDrive or SharePoint.

1. [Create a sharing link or url for a DriveItem](/graph/api/driveitem-createlink) or get a link using the following options from the OneDrive or SharePoint.

   :::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/share-link.png" alt-text="Screenshot shows you from where you can take a link.":::

    >[!NOTE]
    > Adaptive Cards don't support media file links that are copied directly from the address bar.

1. Add media elements to your Adaptive Cards.

1. Add your media file url in the `URL` of Adaptive Cards media element properties.

1. Add image url in the `Poster URL` of Adaptive Cards media element properties. For more information, see [Adaptive Cards media](https://adaptivecards.io/explorer/Media.html).

   :::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/media-elements.jpg" alt-text="Screenshot shows you the Adaptive Cards with media elements.":::

### Example

The following code shows an example of an Adaptive Cards with media elements:

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
      ],
      "captionSources": [
      {
      "mimeType": "vtt",
      "label": "English (vtt)",
      "url": "https://raw.githubusercontent.com/microsoft/AdaptiveCards/5ac07e8adb8d7dcd7480973321e57d279d1f7d2c/assets/ProductVideoSubtitles.vtt"
        },
    {
        "mimeType": "srt",
        "label": "English (srt)",
        "url": "https://raw.githubusercontent.com/microsoft/AdaptiveCards/da2eb4ad4de60d14b37decc062d3952da9dbb790/assets/ProductVideoSubtitles.srt"
        }
      ]
    }
  ]
}

```

## Limitations

1. Adaptive Cards supports only the links from SharePoint or OneDrive.
1. You must inform users or admin before you share a link that they're responsible to ensure that the users can view the link.

## See also

[Adaptive Cards](cards-reference.md#adaptive-card)
