---
title: Sending and receiving files from a bot
description: Describes how to send and receive files from a bot
keywords: teams bots files send receive
ms.date: 04/17/2018
---
# Send and receive files through your bot

>**Note:** This feature is currently available in Developer Preview.

Your bot can send and receive files with users in the personal (1:1) context. You can use this to implement expense reporting, image recognition, file archival, e-signatures, and other scenarios involving direct manipulation of file content. Files shared in Teams typically appear as cards, and allow rich in-app viewing. In channels, you can also post messages with card attachments referencing existing SharePoint files.

## Overview

One way of doing this is using the Microsoft Graph APIs for OneDrive and SharePoint, [as documented here](https://docs.microsoft.com/en-us/onedrive/developer/rest-api/). This method requires obtaining ongoing access to the user's OneDrive folder through standard OAuth2 authorization flow. This documentation describes a simple alternative mechanism if you only need to send file content as a result of direct user interaction, e.g. sending a message. This API is provided as part of the Microsoft Teams Bot Platform.

## Receiving files in 1:1 chat

When a user sends a file to your bot, the file is first uploaded to the user's OneDrive for Business storage. Your bot will then receive a message activity notifying you of the user upload. The activity will contain file metadata, such as its name and the content URL, and the content URL's expiry time (e.g. 24 hours). You can directly read from this URL to fetch its binary content.

### Message activity with file attachment example

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

As a best practice, you should acknowledge the file upload by sending back a message to the user.

## Uploading files to 1:1 chat

Uploading a file to a user involves the following steps:

1. Send a message to the user requesting permission to write the file. This message must contain a `FileConsentCard` attachment with the name of the file to be uploaded.
2. If the user accepts the file download, your bot will receive an Invoke activity with a location URL.
3. To transfer the file, your bot performs an HTTP POST directly into the provided location URL.
4. Optionally, you can perform a message update on the original message, removing the consent card if you do not want to allow the user to accept further uploads of the same file.

### Message requesting permission to upload

This message contains a simple attachment object requesting user permission to upload the file.

```json
{
  "attachments": [{
    "contentType": "application/vnd.microsoft.teams.card.file.consent",
    "name": "file_example.txt",
    "content": {
      "description": "<Purpose of the file, e.g. this is your monthly expense report>",
      "sizeInBytes": 1029393,
      "acceptContext": {
      },
      "declineContext": {
      }
    }
  }]
}
```

### Invoke activity when the user accepts the file

An activity is sent to your bot if and when the user accepts the file. It contains the OneDrive for Business placeholder URL that your bot can then Post into to transfer the file contents. The following example shows the attachment object that your bot will receive:

```json
{
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

Similarly, if the user declines the file, your bot will receive the following event:

```json
{
  "value": {
    "type": "fileUpload",
    "action": "decline",
    "context": {
    }
  }
}
```

## Notifying the user about an uploaded file

After uploading a file to the user's OneDrive, whether you use the mechanism described above or OneDrive user delegated APIs, you should send a confirmation message to the user. This message should contain  a FileCard attachment that the user can click on, either to preview it, open it in OneDrive, or download locally.

```json
{
  "attachments": [{
    "contentType": "application/vnd.microsoft.teams.card.file.info",
    "contentUrl": "https://contoso.sharepoint.com/personal/johnadams_contoso_com/Documents/Applications/file_example.txt",
    "name": "file_example.txt",
    "content": {
      "uniqueId": "1150D938-8870-4044-9F2C-5BBDEBA70C8C",
      "fileType": "txt",
      "etag": "123"
    }
  }]
}
```

### Notifying channel users

We recommend using Graph APIs to perform read and write operations with a team's SharePoint folders. You can subscribe, via webhooks, to receive updates whenever users upload files to its SharePoint.

With the FileCard, you can now post notifications into channels about files that you write into the team's SharePoint. The format of the message is the same as the Confirmation message example above in 1:1 chat. To populate the URL, you can use the file metadata from the SharePoint file object.

## Coming soon: Enabling the Files tab in your personal app

You can specify whether to show the Files tab in your personal app experience. This tab will show all the files that your bot has  received from the user, and vice versa. Declaring this involves adding a simple app manifest property.

### App manifest snippet

```json
{
...
  "bots": [
    {
      "botId": "c201df69-7490-40c3-aa7f-aef4254cb1ee",
      "canReceiveFiles": true,
      "scopes": [
        "team",
        "personal"
      ]
    }
  ],
}
```