---
title: Third-party Storage Capability
description: Learn how to set third-party app storage for your app for the files that are gragged and dropped in the Teams chat.
localization_priority: medium
ms.topic: how-to
ms.date: 11/13/2024
---

Third-party storage

You can now change the default storage of Teams from OneDrive and SharePoint to third-party storage provider app fo your choice. You can achieve this with the help of Teams SDK. If a file is dragged and dropped to a Teams chat, then the file can be stored in third-party storage by implementing this feature in your Teams app.

## Prerequisites

In order for Teams app to support drag-drop: 

* Use the latest version of the Teams SDK. 

* Admins must configure the third-party cloud storage provider's App ID. For more information, see [Admin settings for file drag-drop to third-party storage](/MicrosoftTeams/admin-settings-for-file-drag-drop-to-third-party-storage).

* The app manifest should have the first action as Upload (This auto opens the app in upload mode when files are dragdropped in compose)


## Drag-drop files to third-party storage

The third-party app calls `thirdPartyCloudStorage` API to get the drag-dropped files with the following parameters: 

1. Concatenate two values to get the unique ID/cache ID: const uniqueIdForChats = replyToId + id (that is, thread ID). Note, if replyToId is not present in the context, then the unique ID will be ""+threadId 

> [!NOTE]
> All the above value is present in application contest, if commandContext value is thirdParty, that means the app is opened programmatically and you need to call SDK API to fetch the dragdropped files.  

2. Callback: (files: FilesFor3PStorage[], error?: SdkError): void;** 

    sample code placeholder

For more API information, see [thirdPartyCloudStorage module](/javascript/api/@microsoft/teams-js/thirdpartycloudstorage). For more Teams SDK information, see [@microsoft/teams-js package](/javascript/api/@microsoft/teams-js). 
