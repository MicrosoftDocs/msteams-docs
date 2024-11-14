---
title: Third-party Storage Capability
description: Learn how to set third-party app storage for your app for the files that are gragged and dropped in the Teams chat.
ms.localizationpriority: medium
ms.topic: how-to
ms.date: 11/13/2024
---

# Third-party storage

Microsoft Teams now allows you to modify the default storage from OneDrive and SharePoint to a third-party storage provider app of your preference. This can be accomplished using the Teams SDK. If a file is dragged and dropped into a Teams chat, the file can be stored in third-party storage by integrating this feature into your Teams application.

## Use case

If third-party app developers want to have a storage of their preference, they can use `thirdPartyCloudStorage` to upload files that are dragged and dropped in the Teams message compose box of their app.

## How it works

When a file is dragged and dropped, the files are temporarily stored in Teams cache. The third-party app calls the `FilesFor3PStorage` API to fetch the files that were dropped in the compose area. The files are fetched from cache and sent to Teams SDK and the file is received in the third-party storage end through the callback. The third-party app must then upload the files to the third-party app storage of their preference.

## Prerequisites

For Teams app to support drag-drop:

* Use the latest version of the Teams SDK.

* The app manifest must have the first action as upload. This auto opens the app in upload mode when files are drag-dropped in compose message area.

* Admins must configure the third-party cloud storage provider's App ID. For more information, see [admin settings for file drag-drop to third-party storage](/MicrosoftTeams/admin-settings-for-file-drag-drop-to-third-party-storage).

## Drag-drop files to third-party storage

The third-party app calls `thirdPartyCloudStorage` API to get the drag-dropped files with the following parameters: 

1. Concatenate two values to get the unique ID/cache ID: 

    const uniqueIdForChats = replyToId + id (that is, thread ID). Note, if replyToId is not present in the context, then the unique ID will be ""+threadId 

    *Sample code reference*

    > [!NOTE]
    >
    > * Thread id and ReplyToId are from the payload.
    > * All the above value is present in application contest. If `commandContext` value is thirdParty, that the app is opened programmatically, and you need to call Teams SDK API to fetch the drag-dropped files.  

2. Callback: (files: FilesFor3PStorage[], error?: SdkError): void;** 

    *sample code placeholder*

For more API information, see [thirdPartyCloudStorage module](/javascript/api/@microsoft/teams-js/thirdpartycloudstorage). For more Teams SDK information, see [@microsoft/teams-js package](/javascript/api/@microsoft/teams-js). 
