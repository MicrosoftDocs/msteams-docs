---
title: Enable Third-party Storage Capability
description: Learn how to set third-party app storage for your app for the files that are dragged and dropped in a Teams chat or channel.
ms.localizationpriority: medium
ms.topic: how-to
ms.date: 11/28/2024
---

# Third-party storage capability

Microsoft Teams allows you to modify the default storage from OneDrive and SharePoint to a third-party storage provider app of your preference. If a file is dragged and dropped into a Teams chat, you can allow the file to be stored in a third-party storage. You can accomplish this using the Microsoft Teams JavaScript client library (TeamsJS).

## How it works

If you want to have a storage of your preference, use `thirdPartyCloudStorage` of TeamsJS SDK to upload files that are dragged and dropped in the Teams message compose box. 

Here's the outline to upload files to third-party storage app:

1. When a file is dragged and dropped in the compose area, the files are temporarily stored in Teams cache. 
1. The third-party storage app then calls the `getDragAndDropFiles` API to fetch the files that were dragged and dropped. 
1. The files are fetched from cache and sent to TeamsJS SDK.
1. The files are received in the third-party storage end through the callback. 
1. The third-party storage app must then upload the files to their storage.

## Prerequisites

For Teams app to support drag and drop:

* Use the latest version of the TeamsJS SDK.

* The app manifest must have the first action as upload. This auto opens the app in upload mode when files are dragged and dropped in the compose message area.

* Admins must configure the third-party cloud storage provider's app ID. For more information, see [admin settings for file drag-drop to third-party storage](/MicrosoftTeams/admin-settings-for-file-drag-drop-to-third-party-storage).

## Drag-drop files to third-party storage

The third-party app calls `thirdPartyCloudStorage` API to get the drag-dropped files with the following parameters: 

1. Combine the two values to get the unique ID or cache ID: 

    `const uniqueId` = `replyToId` + `id` (that is, `threadId`). If `replyToId` isn't present in the context, then the unique ID is ""+threadId.

    :::image type="content" source="../../assets/images/personal-apps/third-party-storage.png" alt-text="Screenshot shows the sample context where the two values to create the unique ID are present.":::

    > [!NOTE]
    > All the above value is present in application contest. If `"commandContext" = "thirdParty"`, it helps third party cloud storage apps to determine that their app is opened programmatically, and they need to call `getDragAndDropFiles` API to get the files that were dropped in the compose area of a chat or channel.

2. Callback: (files: FilesFor3PStorage[], error?: SdkError): void;** 

    ```javascript
    microsoftTeams.initialize(() => {
      microsoftTeams.getContext((context) => {
        console.log(`Context is ${JSON.stringify(context)}`);
      });
    
      let inputthreadId = "19:8c24b2ac42924ca3b8e220b3a48d8f9a@thread.v2";
      let replyChainIdforChats = "";
      const uniqueIdForChats = replyChainIdforChats + inputthreadId;
    
      microsoftTeams.thirdPartyCloudStorage.getDragAndDropFiles(inputthreadId, (medias, err) => {
        document.getElementById("hubState").innerText = JSON.stringify(inputthreadId);
        console.log("inside getDragAndDropFiles");
    
        if (err) {
          console.log("err while calling");
          document.getElementById("getDragAndDropFiles").innerText = JSON.stringify(err);
          console.log(err);
          return;
        }
    
        console.log("no error");
        const media = medias;
        console.log(media);
        const fileBlob = medias.slice(0, medias.size, medias.type);
        console.log(fileBlob);
        const blobUrl = URL.createObjectURL(fileBlob);
        console.log(blobUrl); // this url can be used to download the file
        document.getElementById("getDragAndDropFiles").innerText = blobUrl;
      });
    });
    ```

For more API information, see [thirdPartyCloudStorage module](/javascript/api/@microsoft/teams-js/thirdpartycloudstorage). For more TeamsJS SDK information, see [@microsoft/teams-js package](/javascript/api/@microsoft/teams-js).


## See also

* [Admin settings for file drag-drop](/microsoftteams/admin-settings-for-file-drag-drop-to-third-party-storage)
* [App manifest](../../resources/schema/manifest-schema.md)