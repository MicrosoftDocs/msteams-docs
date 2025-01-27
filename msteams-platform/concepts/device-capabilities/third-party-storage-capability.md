---
title: Enable Third-party Cloud Storage
description: Learn how to set third-party app storage for your app for the files that are dragged and dropped in a message compose space of a Teams chat or channel.
ms.localizationpriority: medium
ms.topic: how-to
ms.date: 11/28/2024
---

# Third-party cloud storage capability

Microsoft Teams provides the flexibility to change the default storage from OneDrive and SharePoint to a preferred third-party cloud storage provider app. When a file is drag-dropped to the message compose area of a Teams chat, it's possible to store the file in a third-party cloud storage using Microsoft Teams JavaScript client library (TeamsJS).

## Prerequisites

For Teams app to support third-party cloud storage for drag-dropped files:

* Use the latest version of TeamsJS SDK.
* The app manifest (previously called Teams app manifest) must have the first action as `Upload`. This action automatically opens the app in upload mode when files are drag-dropped in the compose message area.
* Admins must configure the app manifest with the app ID of the third-party cloud storage app. Search for the property named `defaultFilesUploadAppId` and configure the app ID. It must be a plain string and must not use inverted commas. For more information, see [admin settings for file drag-drop to third-party storage](/MicrosoftTeams/admin-settings-for-file-drag-drop-to-third-party-storage).

## Drag-drop files to third-party cloud storage

If you want to have a storage of your preference, you must use `getDragAndDropFiles` API of `thirdPartyCloudStorage` in TeamsJS SDK to upload files that are drag-dropped in the message compose area of a Teams chat. 

Here's how files are uploaded to third-party cloud storage app:

1. When files are drag-dropped in the compose message area, the files are temporarily stored in Teams cache.

1. When the files are in the compose message area, the following values are obtained to call the `thirdPartyCloudStorage` API:

   * `const uniqueId` = `replyToId` + `id` (that is, `threadId`).

        If `replyToId` isn't present in the context, then the unique ID is ""+threadId.

        :::image type="content" source="../../assets/images/personal-apps/third-party-storage.png" alt-text="Screenshot shows the sample context where the two values to create the unique ID are present." lightbox="../../assets/images/personal-apps/third-party-storage.png":::

        > [!NOTE]
        > All the above values are present in application context. If `"commandContext" = "thirdParty"`, it helps third-party cloud storage app to determine that their app is opened programmatically, and they need to call `getDragAndDropFiles` API to get the files that were dropped in the compose area of a chat or channel.

1. The third-party cloud storage app calls the `getDragAndDropFiles` API in Teams SDK to fetch the files that were drag-dropped. 

1. The files are received in the third-party cloud storage app through the callback.

    Callback: (files: FilesFor3PStorage[], error?: SdkError): void;** 

    ```javascript
    microsoftTeams.initialize(() => {
      microsoftTeams.getContext((context) => {
        console.log(`Context is ${JSON.stringify(context)}`);
      });
    
      let inputthreadId = "19:8c24b2ac42924ca3b8e220b3a48d8f9a@thread.v2";
      let replyChainIdforChats = "";
      const uniqueIdForChats = replyChainIdforChats + inputthreadId;
      let mediaData = [];

      microsoftTeams.thirdPartyCloudStorage.getDragAndDropFiles(inputthreadId, (medias, err) => {
        document.getElementById("hubState").innerText = JSON.stringify(inputthreadId);
        console.log("inside getDragAndDropFiles");
    
        if (err) {
          console.log("error while calling getDragAndDropFiles API");
          document.getElementById("getDragAndDropFiles").innerText = JSON.stringify(err);
          console.log(err);
          return;
        }
    
        console.log("no error");
        const media = medias;
        console.log(media);
        
        medias.forEach((media) => {
            console.log(`Name: ${media.name}`);
            console.log(`Type: ${media.type}`);
            console.log(`Size: ${media.size}`);
        
            mediaData.push({
                name: media.name,
                type: media.type,
                size: media.size,
            });
        
            // Example 1: Bind mediaData to HTML (e.g., create a table row for each file)
            // Example 2: Add blob storage functionality for downloading the file
        });
      });
    });
    ```

1. The third-party cloud storage app then uploads the files to their storage.

For more information, see [thirdPartyCloudStorage module](/javascript/api/@microsoft/teams-js/thirdpartycloudstorage). For more TeamsJS SDK information, see [@microsoft/teams-js package](/javascript/api/@microsoft/teams-js).


## Code sample

Sample name | Description | Node.js | .NET | Python |
|----------------|-----------------|--------------|----------------|----------------|
| Third-party storage | Demonstrates how to implement third-party cloud storage app for files that are drag-dropped in the message compose area. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-thirdparty-storage/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-thirdparty-storage/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-thirdparty-storage/python) |

## See also

* [App manifest](../../resources/schema/manifest-schema.md)
