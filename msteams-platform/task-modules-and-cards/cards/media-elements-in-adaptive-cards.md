---
title: Media Elements in Adaptive Cards
description: Learn how the media elements are supported in the Adaptive Cards and support consumption directly within Teams Adaptive Cards.
ms.localizationpriority: high
ms.topic: reference
---

# Media elements in Adaptive Cards

The media elements such as audio or video clips are supported in the Adaptive Cards, files from OneDrive, and SharePoint but not in Teams. Teams don’t provide any media support like audio, video, and animation cards from Bot Framework.

To increase engagement with the Adaptive cards and to provide new experience in the media elements, Teams in parity with the SDK that supports media elements.

Adaptive Cards now supports the consumption of the media elements without the force exit from Teams to view media. Following are the scenarios:

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

    >[!NOTE]
    > Links copied directly from address bar won't works.

1. Add your media file or DriveItem url or link to your Adaptive Card json file in `url`:

   :::image type="content" source="../../assets/images/media-elements-in-adaptive-cards/adaptive-card-json.png" alt-text="Screenshot shows you the Adaptive Card json code.":::

## Limitations

1. Only sharepoint or OneDrive links of media supports now.
1. It is not likely that Guest, Federated, or Anonymous users will be able to view videos unless the shared video permissions is public to those users.
1. You must inform users or admin before you share a link that they are responsible for ensuring that the audience can view the link. That means that whoever can view the adaptive card is in the permissions group to view the media file.

## See also

* [Adaptive Card](cards-reference.md#adaptive-card)
