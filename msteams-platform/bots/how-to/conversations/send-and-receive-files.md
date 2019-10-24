---
title: Send and receive files
author: clearab
description: How to send and receive files with your Microsoft Teams bot.
ms.topic: overview
ms.author: anclear
---
# Send and receive files with a bot

<!-- It was named "Send and receive files through your bot" -->

[!INCLUDE [4.6-release-warning](../../../includes\v4-to-v3-pointer-bots.md)]

includes\v4-to-v3-pointer-bots.md

This article describe how to exchange files with a user that interacts with Teams using a bot. There are two approaches to choose from:

1. **Microsoft Graph API**s**. It supports all three scopes: `personal`, `channel`, and `groupchat`
1. **Teams APIs**. It only supports `personal` scope.

> [!NOTE] 
> Sending and receiving files to bots on mobile devices is not supported.

## Using the Microsoft Graph APIs

You can post messages with card attachments referencing existing SharePoint files using the Microsoft Graph APIs for [OneDrive and SharePoint](https://docs.microsoft.com/onedrive/developer/rest-api/). Using the Graph APIs requires obtaining authenticated access, through the standard OAuth 2.0 flow, to:

- A user's OneDrive folder (for `personal` and `groupchat` files).
- Or to the files in a team's channels (for `channel` files). This method works in all Teams scopes.

## Using the Teams Bot APIs

Your bot can directly send and receive files with users in the `personal` context, also known as personal chats, using Teams APIs. This lets you implement scenarios such expense reporting, image recognition, file archival, e-signatures, and other scenarios involving direct manipulation of file content. Files shared in Teams typically appear as cards, and allow rich in-app viewing.  The API is provided as part of the **Microsoft Teams Bot Platform**.

> [!NOTE]
> This method works only in the `personal` context. It does not work in the `channel` or `groupchat` context.

### Configure your bot to support files

To send and receive files in your bot, you must set the `supportsFiles` property in the manifest to `true`. This property is described in the [bots](https://docs.microsoft.com/microsoftteams/platform/resources/schema/manifest-schema#bots
) section of the Manifest reference.

The setting looks like this: `"supportsFiles": true`.

## Invoke activity when the user accepts the file upload

The file is uploaded to the user's **OneDrive** storage after the consent to upload is issued. The bot will receive a message activity which contains file metadata, such as its name and the content URL. Follow these steps:

1. Send a message to the user requesting permission to write the file. This message must contain a `FileConsentCard` attachment with the name of the file to be uploaded.

    ![bot files upload permission card](../../../assets/images/bots/bot-file-upload-permission-card.png)

2. If the user accepts the file upload, your bot will receive an *Invoke* activity with a location URL.
3. To transfer the file, your bot performs an `HTTP POST` directly into the provided location URL.
4. Optionally, you can remove the original consent card if you do not want to allow the user to accept further uploads of the same file.
 
The following example shows an abridged version of the invoke activity that your bot will receive:

```json
{
    "name": "fileConsent/invoke",
    "type": "invoke",
    "timestamp": "2019-10-24T20:22:37.875Z",
    "localTimestamp": "2019-10-24T13:22:37.875-07:00",
    "id": "f:8805947989118514037",

    ...

    "value": {
        "type": "fileUpload",
        "action": "accept",
        "context": {
            "filename": "teams-logo.png"
        },
        "uploadInfo": {
            "contentUrl": "https://contoso.sharepoint.com//personal/<user alias>/Documents/Applications/TeamsFilesBot/teams-logo.png",
            "name": "teams-logo.png",
            "uploadUrl": "https://contoso.sharepoint.com//personal/<user alias>/_api/v2.0/drive/items/01FED6KHQXVVCUCI6XVJCZZMU2WMUSA6JS/uploadSession?guid=<GUID>",
            "uniqueId": "<Unique ID>",
            "fileType": "png"
        }
    },

    "locale": "en-US"
}

```

The following table describes the content properties of the attachment:

| Property | Purpose |
| --- | --- |
| `uploadUrl` | OneDrive URL for uploading the content of the file. |
| `uniqueId` | Unique file ID. This will be the OneDrive drive item ID. |
| `fileType` | File extension type, such as pdf or *png**. |

As a best practice, you should acknowledge the file upload by sending back a message to the user.

Similarly, if the user declines the file, your bot will receive the following event, with the same overall activity name:

```json
{
  "name": "fileConsent/invoke",
  "value": {
    "type": "fileUpload",
    "action": "decline",
    "context": {
      ...
    }
  }
}
```

### Notifying the user about an uploaded file

After uploading a file to the user's OneDrive, whether you use the mechanism described above or OneDrive user delegated APIs, you should send a confirmation message to the user. This message should contain  a `FileCard` attachment that the user can click on, either to preview it, open it in OneDrive, or download locally. The following is an example. 

```json
{
  "attachments": [{
    "contentType": "application/vnd.microsoft.teams.card.file.info",
    "contentUrl": "https://contoso.sharepoint.com/personal/johnadams_contoso_com/Documents/Applications/file_example.txt",
    "name": "file_example.txt",
    "content": {
      "uniqueId": "1150D938-8870-4044-9F2C-5BBDEBA70C8C",
      "fileType": "txt",
    }
  }]
}
```

The following table describes the content properties of the attachment: 

| Property | Purpose |
| --- | --- |
| `uniqueId` | OneDrive/SharePoint drive item ID. |
| `fileType` | File type, such as pdf or docx. |


## Example

The following example shows how you can handle file uploads and send file consent requests to the user in the bot's dialog.

```csharp

// This sample dialog shows two simple flows:
// 1) A silly example of receiving a file from the user, processing the key elements,
//    and then constructing the attachment and sending it back.
// 2) Creating a new file consent card requesting user permission to upload a file.
private async Task MessageReceivedAsync(IDialogContext context, IAwaitable<object> result)
{
    var replyMessage = context.MakeMessage();
    Attachment returnCard;

    var message = await result as Activity;

    // Check to see if the user is sending the bot a file.
    if (message.Attachments != null && message.Attachments.Any())
    {
        var attachment = message.Attachments.First();

        if (attachment.ContentType == FileDownloadInfo.ContentType)
        {
            FileDownloadInfo downloadInfo = (attachment.Content as JObject).ToObject<FileDownloadInfo>();
            if (downloadInfo != null)
            {
                returnCard = CreateFileInfoAttachment(downloadInfo, attachment.Name, attachment.ContentUrl);
                replyMessage.Attachments.Add(returnCard);
            }
        }
    }
    else
    {
        // Illustrates creating a file consent card.
        returnCard = CreateFileConsentAttachment();
        replyMessage.Attachments.Add(returnCard);
    }
    await context.PostAsync(replyMessage);
}


private static Attachment CreateFileInfoAttachment(FileDownloadInfo downloadInfo, string name, string contentUrl)
{
    FileInfoCard card = new FileInfoCard()
    {
        FileType = downloadInfo.FileType,
        UniqueId = downloadInfo.UniqueId
    };

    Attachment att = card.ToAttachment();
    att.ContentUrl = contentUrl;
    att.Name = name;

    return att;
}

private static Attachment CreateFileConsentAttachment()
{
    JObject acceptContext = new JObject();
    // Fill in any additional context to be sent back when the user accepts the file.

    JObject declineContext = new JObject();
    // Fill in any additional context to be sent back when the user declines the file.

    FileConsentCard card = new FileConsentCard()
    {
        AcceptContext = acceptContext,
        DeclineContext = declineContext,
        SizeInBytes = 102635,
        Description = "File description"
    };

    Attachment att = card.ToAttachment();
    att.Name = "Example file";

    return att;
}
```

<!-- 
## Writing notes
 * **Purpose** Show how to send and receive files
 * **Existing teams doc reference** 
   * [https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/bots/bots-files](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/bots/bots-files)
 * **Existing Bot framework doc reference**
   * none?
 * **Code Snippets** 
   * [https://github.com/microsoft/botbuilder-dotnet/tree/master/tests/Teams/FileUpload](https://github.com/microsoft/botbuilder-dotnet/tree/master/tests/Teams/FileUpload)

-->