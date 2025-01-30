---
title: Enable Third-party Cloud Storage
description: Learn how to set third-party storage app for your Teams app for the files that are dragged and dropped in a message compose area of a Teams chat or channel.
ms.localizationpriority: medium
ms.topic: how-to
ms.date: 01/30/2025
---

# Third-party cloud storage capability

Microsoft Teams provides the flexibility to change the default storage from OneDrive and SharePoint to a preferred third-party cloud storage provider app. When a file is drag-dropped into the message compose area of a Teams chat or channel, you can allow the file to be stored in a third-party cloud storage using the Microsoft Teams JavaScript client library (TeamsJS).

## Prerequisites

For Teams app to support third-party cloud storage for drag-dropped files:

* Use the latest version of the TeamsJS SDK.
* The app manifest (previously called Teams app manifest) must be configured with the app ID of the third-party storage app. Search for the property named `defaultFilesUploadAppId` and configure the app ID. It must be a plain string and must not use inverted commas. <br>
    Alternatively, admins can also configure the third-party cloud storage app ID. For more information, see [admin settings for file drag-drop to third-party storage](/MicrosoftTeams/admin-settings-for-file-drag-drop-to-third-party-storage).
* The app manifest must have the first action as `Upload`. This action automatically opens the app in upload mode when files are drag-dropped into the message compose area.

    Following code sample shows the first action added as `Upload` under `composeExtensions`:

    ```javascript
    {
        "$schema": "https://developer.microsoft.com/en-us/json-schemas/teams/v1.9/MicrosoftTeams.schema.json",
        "manifestVersion": "1.9",
        "version": "2.3.1",
        "id": "id",
        "packageName": "com.testApp.partners.testAppforteams",
        "developer": {
            "name": "testApp",
            "websiteUrl": "https://www.testApp.com",
            "privacyUrl": "https://www.testApp.com/legal/privacypolicy",
            "termsOfUseUrl": "https://www.testApp.com/legal/termsofservice"
        },
        "composeExtensions": [
            {
                "botId": "botid",
                "canUpdateConfiguration": false,
                "commands": [
                    {
                        "id": "getUpload",
                        "type": "action",
                        "title": "Upload file to testApp",
                        "description": "Upload file to testApp",
                        "initialRun": false,
                        "fetchTask": true,
                        "context": [
                            "compose"
                        ],
                        "parameters": [
                            {
                                "name": "param",
                                "title": "param",
                                "description": ""
                            }
                        ],
                        "taskInfo": {
                            "title": "Upload File",
                            "width": "880",
                            "height": "550",
                            "url": "https://account.testApp.com/app-api/microsoft-teams/sandtestApp_NWCqGLjTs0k/message-extension/uploader"
                        }
                    },
                    {
                        "id": "getShare",
                        "type": "action",
                        "title": "Share file from testApp",
                        "description": "Share file from testApp",
                        "initialRun": false,
                        "fetchTask": true,
                        "context": [
                            "compose"
                        ],
                        "parameters": [
                            {
                                "name": "param",
                                "title": "param",
                                "description": ""
                            }
                        ],
                        "taskInfo": {
                            "title": "Share File",
                            "width": "880",
                            "height": "550",
                            "url": "https://account.testApp.com/app-api/microsoft-teams/sandtestApp_NWCqGLjTs0k/message-extension/shared-link"
                        }
                    }
                ],
                "messageHandlers": [
                    {
                        "type": "link",
                        "value": {
                            "domains": [
                                "*.testApp.com"
                            ]
                        }
                    }
                ]
            }
        ]
    }
    ```


## Drag-drop files to third-party cloud storage

If you want your Teams app to have a third-party storage of your preference, you must use `getDragAndDropFiles` API of `thirdPartyCloudStorage` in TeamsJS SDK. This API enables to upload files from the message compose area of a Teams chat or channel to third-party storage app.

Here's how files are uploaded to third-party cloud storage app:

1. When the files are drag-dropped in the message compose area, the files are temporarily stored in Teams cache.

1. The following parameters are obtained to call the `thirdPartyCloudStorage` API:

   * `const uniqueIdForChats` = `replyToId` + `id` (that is, `threadId`).

      All the above values are present in application context. If `"commandContext" = "thirdParty"`, it helps third-party cloud storage app to determine that the app is opened programmatically. If `replyToId` isn't present in the context, then the unique ID is `""+threadId`.

        :::image type="content" source="../../assets/images/personal-apps/third-party-storage.png" alt-text="Screenshot shows the sample context where the two values to create the unique ID are present." lightbox="../../assets/images/personal-apps/third-party-storage.png":::

1. The third-party cloud storage app calls the `getDragAndDropFiles` API in TeamsJS SDK to fetch the files that were drag-dropped.

1. The files are received in the third-party cloud storage app through the callback.

    Callback: `(files: FilesFor3PStorage[], error?: SdkError): void;**`

    The following code sample shows the callback:

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

For more information, see [thirdPartyCloudStorage module](/javascript/api/@microsoft/teams-js/thirdpartycloudstorage) and [microsoft/teams-js package](/javascript/api/@microsoft/teams-js).


## Code sample

Sample name | Description | Node.js | .NET | Python |
|----------------|-----------------|--------------|----------------|----------------|
| Third-party storage | Demonstrates how to implement third-party cloud storage app for files that are drag-dropped in the message compose area. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-thirdparty-storage/nodejs) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-thirdparty-storage/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/msgext-thirdparty-storage/python) |

## See also

* [App manifest](../../resources/schema/manifest-schema.md)
