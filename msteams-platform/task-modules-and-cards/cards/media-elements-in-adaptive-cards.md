---
title: Media Elements in Adaptive Cards
description: Learn how the Media Elements are supported in the Adaptive Cards SDK and support consumption directly within Microsoft Teams Adaptive Cards.
ms.localizationpriority: high
ms.topic: reference
---

# Overview

The Media Elements such as audio or video clips are supported in the Adaptive Cards SDK but not in Teams. Currently, Teams doesn't provide media support like audio, video, and animation cards from Bot Framework. To increase engagement with cards and provide a new experience in the media elements, we are bringing in parity with the SDK that already supports media elements.

The Media Elements now supports consumption of media elements directly within Teams Adaptive Cards without force exit from Teams to view media. Following are the scenarios:

### Support LOB scenarios

Following three data sources are supported primarily for the in-line media playback:

* Video or audio files are linked externally via any publicly available URL that points to a supported media file.
* Inline YouTube video playback through an embedded YouTube player. This experience looks different from the rest of the media elements that leverage one player.
* Video or audio files are directly uploaded to OneDrive Sharepoint and are accessible within the tenant and Adaptive Card plays the file through player.

### Support third party partner scenarios

To improve the ability to deal with media files, following are the dynamic user-uploaded scenarios where users upload video or audio files within OneDrive, SharePoint in other tenants and be able to link to them:

* Files are directly uploaded to OneDrive Sharepoint external to the current tenant.
* Files on third party external players such as Vimeo, Dailymotion, Spotify, Netflix, etc.
* Files hidden behind external SSO or authentication. For example, Google Drive, Dropbox, etc.
* Inline Vimeo and Dailymotion playback and other media providers.

## Enable Media Elements in Teams

(Content)

## End user Media Elements experience

**Media Elements-Video (Channel)**:
The media playback lives within the Adaptive Card. Users need to press **play** button and videos are directly replayed. For example, video is within the channel in the following image:

:::image type="content" source="~/assets/images/media-elements-in-adaptive-cards/design-video-channel.png" alt-text="Video channel design":::

**Media Elements-Video (Chat)**:
Following image shows video within the Adaptive Card in a chat:

:::image type="content" source="~/assets/images/media-elements-in-adaptive-cards/video-chat.png" alt-text="Video chat design":::

**Media Elements-Video (Narrow card in a meeting)**:
Following image shows video within the Adaptive Card in a meeting:

:::image type="content" source="~/assets/images/media-elements-in-adaptive-cards/video-narrow-card-in-meeting.png" alt-text="Video narrow card in meeting design":::

**Media Elements-Video (Mobile card in channel)**:
Following image shows video within the Adaptive Card in a mobile view:

:::image type="content" source="~/assets/images/media-elements-in-adaptive-cards/video-mobile-card-in-channel.png" alt-text="Video Mobile card in channel":::

**Media Elements-Audio (Channel)**:
Following image shows audio within the Adaptive Card in a channel:

:::image type="content" source="~/assets/images/media-elements-in-adaptive-cards/audio-channel.png" alt-text="Audio channel":::

**Media Elements-Audio (Chat)**:
Following image shows audio within the Adaptive Card in a chat:

:::image type="content" source="~/assets/images/media-elements-in-adaptive-cards/audio-chat.png" alt-text="Audio chat":::

**Media Elements-Audio (Mobile)**:
Following image shows audio within the Adaptive Card in a mobile view:

:::image type="content" source="~/assets/images/media-elements-in-adaptive-cards/audio-mobile.png" alt-text="Audio mobile":::

**Unsupported media error state**:
Following image shows error state if a video or audio is not found or not supported:

:::image type="content" source="~/assets/images/media-elements-in-adaptive-cards/unsupported-media-error-state.png" alt-text="Unsupported Media error state":::

## Inline YouTube playback

Playing YouTube videos inline in any app requires the use of the YouTube embedded player, that relies on an IFrame.

Following is an example of a card embedded in a YouTube video:

``` json
{
    "type": "AdaptiveCard",
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.6",
    "body": [
        {
            "type": "TextBlock",
            "text": "Inline YouTube video player demo",
            "wrap": true,
            "size": "Large",
            "weight": "Bolder"
        },
        {
            "type": "Media",
            "sources": [
                {
                    "url": "https://www.youtube.com/watch?v=YsqcODOEO-M&ab_channel=DavidClaux"
                }
            ]
        }
    ]
}
```

The above card renders as follows:

:::image type="content" source="~/assets/images/media-elements-in-adaptive-cards/inline-youtube-video-player-demo.png" alt-text="Inline youtube video player":::

Initially, as depicted above, only the poster of the video is displayed. For YouTube, the poster or thumbnail is automatically pulled from YouTube, but the card author can technically provide their own poster to explicitly specify the `Media.poster` property.

After user selects the central **Play** button, the actual player is instantiated, and video playback starts.

:::image type="content" source="~/assets/images/media-elements-in-adaptive-cards/inline-youtube-video-player-demo-telegraph-road.png" alt-text="Inline youtube video player demo":::

## Limitations

Following are the limitations:

1. The MIME type, that is able to support certain file types and using the MIME type.
1. Size limitation.
