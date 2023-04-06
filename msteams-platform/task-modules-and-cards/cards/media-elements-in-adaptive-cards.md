---
title: Media Elements in Adaptive Cards
description: Learn how the media elements are supported in the Adaptive Cards and support consumption directly within Teams Adaptive Cards.
ms.localizationpriority: high
ms.topic: reference
---

# Media elements in Adaptive Cards

The media elements such as audio or video clips are supported in the Adaptive Cards SDK but not in Teams. Currently, Teams doesn't provide media support like audio, video, and animation cards from Bot Framework. To increase engagement with cards and provide a new experience in the media elements, we're bringing in parity with the SDK that already supports media elements.

The Media Elements now supports consumption of media elements directly within the Adaptive Cards without force exit from Teams to view media. Following are the scenarios:

**LOB scenarios**

The following data sources are supported primarily for the in-line media playback:

* Video or audio files are linked externally via any publicly available URL that points to a supported media file.
* Video or audio files are directly uploaded to OneDrive or Sharepoint and accessible within the tenant and Adaptive Card plays the file through player.

**Third party partner scenarios**

To improve the ability to deal with media files, following are the dynamic user-uploaded scenarios where users upload video or audio files within OneDrive or SharePoint in other tenants and be able to link to them:

* Files are directly uploaded to OneDrive Sharepoint external to the current tenant.
* Files hidden behind external SSO or authentication. For example, Google Drive, Dropbox, etc.

## Add media elements to your Adaptive Cards

To add media elements to your Adaptive Cards, follow the steps:

1. Add your media files to OneDrive or SharePoint.
1. [Create a sharing link or url for a DriveItem](/graph/api/driveitem-createlink) or get a link using the following options from the OneDrive or share point.

   :::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/share-link.png" alt-text="Screenshot shows you from where you can take a link.":::

1. Add your media file or DriveItem url or link to your Adaptive Card json file in `url`:

   :::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/adaptive-card-json.png" alt-text="Screenshot shows you the Adaptive Card json code.":::

>[!NOTE]
> Links copied directly from address bar won't works.

## End user experience

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
Following image shows error state if a video or audio isn't found or not supported:

:::image type="content" source="~/assets/images/media-elements-in-adaptive-cards/unsupported-media-error-state.png" alt-text="Unsupported Media error state":::

## Limitations

Following are the limitations:

1. Only sharepoint or OneDrive links of media supports now.
1. It is not likely that Guest, Federated, or Anonymous users will be able to view videos unless the shared video permissions is public to those users.
1. You must inform users or admin before you share a link that they are responsible for ensuring that the audience can view the link. That means that whoever can view the adaptive card is in the permissions group to view the media file.

## See also

* [Adaptive Card](cards-reference.md#adaptive-card)
