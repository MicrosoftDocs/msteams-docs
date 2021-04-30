---
title: Sending and receiving files from a bot
description: Describes how to send and receive files from a bot
keywords: teams bots files send receive
ms.topic: how-to
localization_priority: Normal
ms.date: 05/20/2019
---
# Send and receive files through your bot

[!include[v3-to-v4-SDK-pointer](~/includes/v3-to-v4-pointer-bots.md)]

There are two ways to send files to and from a bot:

* Using the Microsoft Graph APIs. This method works for bots in all scopes in Teams:
  * `personal`
  * `channel`
  * `groupchat`
* Using the Teams APIs. These only support files in one context:
  * `personal`

## Using the Microsoft Graph APIs

You can post messages with card attachments referencing existing SharePoint files using the Microsoft Graph APIs for [OneDrive and SharePoint](/onedrive/developer/rest-api/). Using the Graph APIs requires obtaining access to a user's OneDrive folder (for `personal` and `groupchat` files) or the files in a team's channels (for `channel` files) through the standard OAuth 2.0 authorization flow. This method works in all Teams scopes.

## Using the Teams Bot APIs

> [!NOTE]
> This method works only in the `personal` context. It does not work in the `channel` or `groupchat` context.

Your bot can directly send and receive files with users in the `personal` context, also known as personal chats, using Teams APIs. This lets you implement expense reporting, image recognition, file archival, e-signatures, and other scenarios involving direct manipulation of file content. Files shared in Teams typically appear as cards, and allow rich in-app viewing.

The following sections describe how to do this to send file content as a result of direct user interaction, like sending a message. This API is provided as part of the Microsoft Teams Bot Platform.

### Configure your bot to support files

In order to send and receive files in your bot, you have to set the `supportsFiles` property in the manifest to `true`. This property is described in the [bots](~/resources/schema/manifest-schema.md#bots) section of the Manifest reference.

The definition will look like this: `"supportsFiles": true`. If your bot does not enable `supportsFiles`, the following features will not work.

### Receiving files in personal chat

When a user sends a file to your bot, the file is first uploaded to the user's OneDrive for Business storage. Your bot will then receive a message activity notifying you of the user upload. The activity will contain file metadata, such as its name and the content URL. You can directly read from this URL to fetch its binary content.

#### Message activity with file attachment example

```json
{
  "attachments": [{
    "contentType": "application/vnd.microsoft.teams.file.download.info",
    "contentUrl": "https://contoso.sharepoint.com/personal/johnadams_contoso_com/Documents/Applications/file_example.txt",
    "name": "file_example.txt",
    "content": {
      "downloadUrl" : "https://download.link",
      "uniqueId": "1150D938-8870-4044-9F2C-5BBDEBA70C9D",
      "fileType": "txt",
      "etag": "123"
    }
  }]
}
```

The following table describes the content properties of the attachment:

| Property | Purpose |
| --- | --- |
| `downloadUrl` | OneDrive URL for fetching the content of the file. You can issue an `HTTP GET` directly from this URL. |
| `uniqueId` | Unique file ID. This will be the OneDrive drive item ID, in the case of the user sending a file to your bot. |
| `fileType` | File extension type, such as pdf or docx. |

As a best practice, you should acknowledge the file upload by sending back a message to the user.

### Uploading files to personal chat

Uploading a file to a user involves the following steps:

1. Send a message to the user requesting permission to write the file. This message must contain a `FileConsentCard` attachment with the name of the file to be uploaded.
2. If the user accepts the file download, your bot will receive an *Invoke* activity with a location URL.
3. To transfer the file, your bot performs an `HTTP POST` directly into the provided location URL.
4. Optionally, you can remove the original consent card if you do not want to allow the user to accept further uploads of the same file.

#### Message requesting permission to upload

This desktop message contains a simple attachment object requesting user permission to upload the file:

![Screenshot of consent card requesting user permission to upload file](../../assets/images/bots/bot-file-consent-card.png)

This mobile message contains an attachment object requesting user permission to upload the file:

![Screenshot of consent card requesting user permission to upload file on mobile](../../assets/images/bots/mobile-bot-file-consent-card.png)

```json
{
  "attachments": [{
    "contentType": "application/vnd.microsoft.teams.card.file.consent",
    "name": "file_example.txt",
    "content": {
      "description": "<Purpose of the file, such as: this is your monthly expense report>",
      "sizeInBytes": 1029393,
      "acceptContext": {
      },
      "declineContext": {
      }
    }
  }]
}
```

The following table describes the content properties of the attachment:

| Property | Purpose |
| --- | --- |
| `description` | Description of the file. May be shown to the user to describe its purpose or to summarize its content. |
| `sizeInBytes` | Provides the user an estimate of the file size and the amount of space it will take in OneDrive. |
| `acceptContext` | Additional context that will be silently transmitted to your bot when the user accepts the file. |
| `declineContext` | Additional context that will be silently transmitted to your bot when the user declines the file. |

#### Invoke activity when the user accepts the file

An invoke activity is sent to your bot if and when the user accepts the file. It contains the OneDrive for Business placeholder URL that your bot can then issue a `PUT` into to transfer the file contents. for information on uploading to the OneDrive URL read this article: [Upload bytes to the upload session](/onedrive/developer/rest-api/api/driveitem_createuploadsession#upload-bytes-to-the-upload-session).

The following example shows an abridged version of the invoke activity that your bot will receive:

```json
{
  ...

  "name": "fileConsent/invoke",
  "value": {
    "type": "fileUpload",
    "action": "accept",
    "context": {
    },
    "uploadInfo": {
      "contentUrl": "https://contoso.sharepoint.com/personal/johnadams_contoso_com/Documents/Applications/file_example.txt",
      "name": "file_example.txt",
      "uploadUrl": "https://upload.link",
      "uniqueId": "1150D938-8870-4044-9F2C-5BBDEBA70C8C",
      "fileType": "txt",
      "etag": "123"
    }
  }
}
```

Similarly, if the user declines the file, your bot will receive the following event, with the same overall activity name:

```json
{
  "name": "fileConsent/invoke",
  "value": {
    "type": "fileUpload",
    "action": "decline",
    "context": {
    }
  }
}
```

### Notifying the user about an uploaded file

After uploading a file to the user's OneDrive, whether you use the mechanism described above or OneDrive user delegated APIs, you should send a confirmation message to the user. This message should contain  a `FileCard` attachment that the user can click on, either to preview it, open it in OneDrive, or download locally.

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

### Basic example in C#

The following sample shows how you can handle file uploads and send file consent requests in your bot's dialog.

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
