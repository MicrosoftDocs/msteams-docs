---
title: Send and receive files
description: Learn how agents send and receive files in Microsoft Teams using Teams SDK and Microsoft Graph.
ms.date: 11/06/2026
author: nickwalkmsft
ms.author: nickwalk
ms.reviewer: nickwalk
ms.localizationpriority: medium
ms.topic: how-to
ms.owner: angovil
zone_pivot_groups: teams-sdk-languages
---

# Send and receive files

> [!IMPORTANT]
>
> **Upcoming change: action required by December 31, 2026.** Teams is changing the authentication requirements for bot and agent file upload and download. Bots must send an app-only access token in the `Authorization` header on file download and upload requests, acquire that token without a client secret, and request it for the file's tenant. If you don't make and deploy these changes by December 31, 2026, your agent might not be able to upload or download files, and users might see errors or broken file experiences. For details, see [Prepare for upcoming file authentication changes](#prepare-for-upcoming-file-authentication-changes).

Agents can receive, read, and send documents in Microsoft Teams conversations. Teams stores these files in OneDrive or SharePoint and displays them as file cards or stored items.

Use Teams SDK to receive files in personal chats and send files through bot file consent. Use Microsoft Graph when your agent must work with stored files across personal chats, group chats, and channels. For images that render directly in a conversation, see [Send and receive inline images](agents-inline-images.md).

> [!IMPORTANT]
>
> Agents don't support document-file send and receive workflows in Government Community Cloud High (GCC High), Department of Defense (DoD), or Teams operated by 21Vianet.


## User experience

Understand how users exchange documents with an agent so you can provide clear prompts, consent requests, and confirmations. Users can:

* Attach a document to a personal chat with an agent.
* Review and accept or decline a file that an agent offers.
* Open a successfully uploaded file from its file card.
* Work with stored OneDrive or SharePoint files across supported conversation scopes.

A received document is stored in OneDrive or SharePoint and appears as a file card or stored item. A bot that sends a file in personal chat first asks for consent, uploads the file after acceptance, and then sends a file information card.

## Developer experience

Choose a file API based on the app identity, direction, and conversation scope. The following options match the implementation order in this article:

| Requirement | Recommended approach |
| --- | --- |
| Receive and read a document in a personal chat | Teams SDK file accessor |
| Send or retrieve stored files across conversation scopes | Microsoft Graph |
| Send a document from a bot in a personal chat | Teams SDK file consent |

The Teams SDK file accessor filters the activity attachment collection and exposes supported documents as lazy incoming-file handles. Agentic users retrieve file bytes through Microsoft Graph with their identity. Today, traditional bots use the short-lived, pre-authorized URL supplied by Teams. Under the upcoming file authentication model, bots must send an app-only access token, acquired without a client secret and for the file's tenant, on every file download and upload request. For more information, see [Prepare for upcoming file authentication changes](#prepare-for-upcoming-file-authentication-changes).

| Operation | Personal chat | Group chat | Channel | Requirement |
| --- | --- | --- | --- | --- |
| Receive files with the Teams SDK file accessor | Supported | Not explicitly supported | Not explicitly supported | Agentic users require Graph file permissions. Bots use a pre-authorized URL today and must meet the [upcoming file authentication requirements](#prepare-for-upcoming-file-authentication-changes). |
| Send or retrieve files with Graph | Supported | Supported | Supported | Configure permissions for the storage location, API, calling identity, and access model. |
| Send files with bot file consent | Supported | Not supported | Not supported | Set `supportsFiles` to `true` on the bot entry and meet the [upcoming file authentication requirements](#prepare-for-upcoming-file-authentication-changes). |

## Receive files

Receive document files that users attach to personal chats so your agent can inspect or process their content. Configure file access first, then use the Teams SDK file accessor to list and read each received file.

### Configure file support

Configure file support so your agent or bot has the permissions and platform settings required to receive documents. Complete the setup for your app identity before implementing file handlers.

The required configuration depends on the identity and file operation:

| Scenario | App manifest update | Other configuration |
| --- | --- | --- |
| Agentic user receives a file | None | Add a Microsoft Graph file permission to the agent blueprint and obtain administrator consent. |
| Bot receives or sends a file through file consent | Set `supportsFiles` to `true` on the bot entry. | Today, no other configuration is required for the pre-authorized file URL supplied by Teams. By December 31, 2026, configure a certificate, federated identity credential, or managed identity on the bot's app registration, and send the resulting token on file requests. Client secrets aren't supported for the file token. See [Prepare for upcoming file authentication changes](#prepare-for-upcoming-file-authentication-changes). |
| App sends or retrieves a stored file with Microsoft Graph | No file-specific app manifest property | Configure the required Microsoft Graph permission and authentication for the calling identity. |

#### Agentic user

For an agentic user, you don't need to set `supportsFiles` or add another file-specific app manifest property. Configure a Microsoft Graph file permission on the agent blueprint and obtain administrator consent. The agentic user retrieves file content through Microsoft Graph with its own identity. For more information, see [inheritable permissions](/entra/agent-id/concept-inheritable-permissions).

> [!IMPORTANT]
>
> Configure and consent the blueprint permission before testing file retrieval. Without a Graph credential, the SDK raises a file credential error.

#### Bot

For a bot that receives files or uses file consent, set `supportsFiles` to `true` in the bot entry of the app manifest:

```json
{
  "bots": [
    {
      "botId": "${{BOT_ID}}",
      "scopes": ["personal"],
      "supportsFiles": true
    }
  ]
}
```

Key values:

* `botId`: Set `${{BOT_ID}}` to identify your bot registration.
* `scopes`: Add `personal` to enable one-to-one file interactions.
* `supportsFiles`: Set `true` to expose the file attachment control.

Without `supportsFiles: true`, users can't attach files in a personal chat with the bot and the file accessor returns an empty collection. This setting doesn't grant Microsoft Graph permissions.

> [!IMPORTANT]
>
> Setting `supportsFiles` isn't enough to keep bot file upload and download working after the upcoming authentication change. By December 31, 2026, update your bot to send an app-only access token on file requests, acquired with the bot's Microsoft App ID (`botId`) and a certificate, federated identity credential, or managed identity rather than a client secret. For more information, see [Prepare for upcoming file authentication changes](#prepare-for-upcoming-file-authentication-changes).

### Access received files and metadata

When a user attaches a document in a personal chat, Teams stores it in OneDrive or SharePoint. The message activity contains file metadata, and the Teams SDK file accessor provides lazy access to the file bytes.

::: zone pivot="teams-sdk-csharp"

Use `ListAsync()` to access every supported file attached to the current message:

```csharp
teamsApp.OnMessage(async (context, cancellationToken) =>
{
    IList<IncomingFile> files =
        await context.Files.ListAsync(cancellationToken);

    if (files.Count == 0)
    {
        await context.ReplyAsync(
            "Attach a file and I will read it.",
            cancellationToken);
        return;
    }

    string names = string.Join(", ", files.Select(file => file.Name));
    await context.ReplyAsync(
        $"You sent {files.Count} file(s): {names}",
        cancellationToken);
});
```

Key APIs and values:

* `context.Files.ListAsync`: Return file metadata without downloading file bytes.
* `file.Name`: Read the uploader-provided name for display only.

`ListAsync()` preserves attachment order. It returns an empty collection for activities without supported files and skips malformed file entries. Use `FirstAsync()` when your handler expects one file:

```csharp
IncomingFile? file =
    await context.Files.FirstAsync(cancellationToken);

if (file is not null)
{
    await context.ReplyAsync(
        $"Reading {file.Name}...",
        cancellationToken);
}
```

Key APIs and values:

* `FirstAsync`: Return the first supported file or `null`.
* `file.Name`: Display the received file's uploader-provided name.

::: zone-end

::: zone pivot="teams-sdk-typescript"

Use `list()` to access every supported file attached to the current message:

```typescript
app.on('message', async ({ files, send }) => {
  const attached = await files.list();

  if (attached.length === 0) {
    await send('Attach a file and I will read it.');
    return;
  }

  const names = attached.map((file) => file.name).join(', ');
  await send(`You sent ${attached.length} file(s): ${names}`);
});
```

Key APIs and values:

* `files.list`: Return file metadata without downloading file bytes.
* `file.name`: Read the uploader-provided name for display only.

`list()` preserves attachment order. It returns an empty array for activities without supported files and skips malformed file entries. Use `first()` when your handler expects one file:

```typescript
const file = await files.first();

if (file) {
  await send(`Reading ${file.name}...`);
}
```

Key APIs and values:

* `first`: Return the first supported file or `undefined`.
* `file.name`: Display the received file's uploader-provided name.

::: zone-end

::: zone pivot="teams-sdk-python"

Use `list()` to access every supported file attached to the current message:

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]) -> None:
    attached = await ctx.files.list()

    if not attached:
        await ctx.reply("Attach a file and I will read it.")
        return

    names = ", ".join(file.name for file in attached)
    await ctx.reply(f"You sent {len(attached)} file(s): {names}")
```

Key APIs and values:

* `ctx.files.list`: Return file metadata without downloading file bytes.
* `file.name`: Read the uploader-provided name for display only.

`list()` preserves attachment order. It returns an empty list for activities without supported files and skips malformed file entries. Use `first()` when your handler expects one file:

```python
file = await ctx.files.first()

if file:
    await ctx.reply(f"Reading {file.name}...")
```

Key APIs and values:

* `first`: Return the first supported file or `None`.
* `file.name`: Display the received file's uploader-provided name.

::: zone-end

An incoming-file handle includes:

* **Unique ID**: OneDrive or SharePoint drive-item ID when available.
* **Name**: Uploader-provided filename, including its file extension.
* **Extension**: Platform-provided extension without the leading period.
* **Content type**: MIME type when provided by the source.
* **Scope**: Conversation scope where the file was received.
* **Source**: SDK source that identified the incoming file.
* **Content URL**: Browsable storage URL, not necessarily a download URL.
* **Raw attachment**: Original metadata for protocol-level diagnostics.

> [!CAUTION]
>
> Treat `Name` as untrusted input. Before writing a file, replace it with a safe application-generated name or sanitize it and verify that the resolved destination remains inside an application-controlled directory.

### Read a received file

Read a received file when your app needs its text or binary content for processing, storage, or analysis. Use the download method for a reusable in-memory copy, or select a streaming method for large files.

::: zone pivot="teams-sdk-csharp"

Use `DownloadAsync()` to download a file into a reusable in-memory copy:

```csharp
IncomingFile? file =
    await context.Files.FirstAsync(cancellationToken);

if (file is not null)
{
    DownloadedFile downloaded =
        await file.DownloadAsync(cancellationToken);

    await context.ReplyAsync(
        $"Downloaded {downloaded.Filename} " +
        $"({downloaded.Bytes.Length} bytes, {downloaded.ContentType}).",
        cancellationToken);
}
```

Key APIs and values:

* `DownloadAsync`: Fetch and buffer one reusable copy of bytes.
* `downloaded.Bytes`: Access the downloaded file's complete binary content.
* `downloaded.ContentType`: Use the resolved MIME type for processing.
* `downloaded.Filename`: Use the resolved name for display purposes.

Other read options include:

* `TextAsync()`: Download and decode text as UTF-8 by default.
* `StreamAsync()`: Process large files without buffering them completely.
* `SaveAsAsync(path)`: Stream bytes directly to a safe local path.

`TextAsync()` replaces invalid byte sequences with `U+FFFD`. Supply an `Encoding` for non-UTF-8 text and process binary files as bytes or streams.

An `IncomingFile` doesn't cache bytes. Every call to `DownloadAsync()`, `TextAsync()`, `StreamAsync()`, or `SaveAsAsync()` performs another network request. Download once and reuse `DownloadedFile` when you need the same content more than once:

```csharp
DownloadedFile downloaded =
    await file.DownloadAsync(cancellationToken);

string text = downloaded.Text();
byte[] bytes = downloaded.Bytes;

await downloaded.SaveAsAsync(
    "./downloads/copy.bin",
    cancellationToken);
```

Key APIs and values:

* `downloaded.Text()`: Decode the buffered copy without another download.
* `downloaded.Bytes`: Reuse buffered bytes for binary processing.
* `SaveAsAsync`: Save buffered bytes without fetching the file again.

::: zone-end

::: zone pivot="teams-sdk-typescript"

Use `download()` to download a file into a reusable in-memory copy:

```typescript
const file = await files.first();

if (file) {
  const downloaded = await file.download();
  await send(
    `Downloaded ${downloaded.filename} ` +
    `(${downloaded.bytes.length} bytes, ${downloaded.contentType}).`
  );
}
```

Key APIs and values:

* `download`: Fetch and buffer one reusable copy of bytes.
* `downloaded.bytes`: Access the downloaded file's binary content.
* `downloaded.contentType`: Use the resolved MIME type for processing.
* `downloaded.filename`: Use the resolved name for display purposes.

Other read options include:

* `text()`: Download and decode text as UTF-8 by default.
* `stream()`: Process large files without buffering them completely.
* `saveAs(path)`: Stream bytes directly to a safe local path.

An incoming file doesn't cache bytes. Download once and reuse the downloaded file when you need the same content more than once:

```typescript
const downloaded = await file.download();
const text = downloaded.text();
const buffer = downloaded.arrayBuffer();

await downloaded.saveAs('./downloads/copy.bin');
```

Key APIs and values:

* `downloaded.text()`: Decode the buffered copy without another download.
* `downloaded.arrayBuffer()`: Reuse buffered bytes for binary processing.
* `saveAs`: Save buffered bytes without fetching the file again.

::: zone-end

::: zone pivot="teams-sdk-python"

Use `download()` to download a file into a reusable in-memory copy:

```python
file = await ctx.files.first()

if file:
    downloaded = await file.download()
    await ctx.reply(
        f"Downloaded {downloaded.filename} "
        f"({len(downloaded.bytes)} bytes, {downloaded.content_type})."
    )
```

Key APIs and values:

* `download`: Fetch and buffer one reusable copy of bytes.
* `downloaded.bytes`: Access the downloaded file's binary content.
* `downloaded.content_type`: Use the resolved MIME type for processing.
* `downloaded.filename`: Use the resolved name for display purposes.

Other read options include:

* `text()`: Download and decode text as UTF-8 by default.
* `stream()`: Process large files without buffering them completely.
* `save_as(path)`: Stream bytes directly to a safe local path.

An incoming file doesn't cache bytes. Download once and reuse the downloaded file when you need the same content more than once:

```python
downloaded = await file.download()
text = downloaded.text()
data = downloaded.bytes

await downloaded.save_as("./downloads/copy.bin")
```

Key APIs and values:

* `downloaded.text()`: Decode the buffered copy without another download.
* `downloaded.bytes`: Reuse buffered bytes for binary processing.
* `save_as`: Save buffered bytes without fetching the file again.

::: zone-end

For an agentic user, Teams SDK uses the attachment `ContentUrl` and the agentic user's identity to retrieve the file through Microsoft Graph. For a bot, the SDK currently uses the short-lived, pre-authorized `downloadUrl` supplied in the activity. The file-read APIs shown in this section apply to both routes.

### Access the raw file attachment

Access the raw attachment when you need protocol metadata that the typed file accessor doesn't expose, such as for diagnostics or troubleshooting. Inspect the raw payload only when necessary, and log only explicitly selected, non-sensitive fields.

::: zone pivot="teams-sdk-csharp"

Use `IncomingFile.Raw` only when you need the original protocol payload. The following example logs the attachment name and content type instead of serializing the complete object:

```csharp
IncomingFile? file =
    await context.Files.FirstAsync(cancellationToken);

if (file is not null)
{
    logger.LogDebug(
        "File attachment received. Name: {Name}; Content type: {ContentType}",
        file.Raw.Name,
        file.Raw.ContentType);
}
```

Key APIs and values:

* `file.Raw`: Access original metadata for diagnostics or troubleshooting.
* `file.Raw.Name`: Log the display name only after validating its sensitivity.
* `file.Raw.ContentType`: Log the attachment type without exposing its URLs.
* `logger.LogDebug`: Record selected metadata instead of the complete payload.

::: zone-end

::: zone pivot="teams-sdk-typescript"

Use `IIncomingFile.raw` only when you need the original protocol payload. The following example logs the attachment name and content type instead of the complete object:

```typescript
const file = await files.first();

if (file) {
  log.debug('File attachment received', {
    name: file.raw.name,
    contentType: file.raw.contentType
  });
}
```

Key APIs and values:

* `file.raw`: Access original metadata for diagnostics or troubleshooting.
* `file.raw.name`: Log the display name only after validating its sensitivity.
* `file.raw.contentType`: Log the attachment type without exposing its URLs.
* `log.debug`: Record selected metadata instead of the complete payload.

::: zone-end

::: zone pivot="teams-sdk-python"

Use `IncomingFile.raw` only when you need the original protocol payload. The following example logs the attachment name and content type instead of the complete object:

```python
file = await ctx.files.first()

if file:
    ctx.logger.debug(
        "File attachment received. Name: %s; Content type: %s",
        file.raw.name,
        file.raw.content_type,
    )
```

Key APIs and values:

* `file.raw`: Access original metadata for diagnostics or troubleshooting.
* `file.raw.name`: Log the display name only after validating its sensitivity.
* `file.raw.content_type`: Log the attachment type without exposing its URLs.
* `ctx.logger.debug`: Record selected metadata instead of the complete payload.

::: zone-end

Don't log raw attachment URLs, identifiers, or the complete payload. The file accessor doesn't return inline images, cards, mentions, link previews, HTML attachments, or malformed file entries. Access these items through the activity's attachment collection. For image-specific guidance, see [Send and receive inline images](agents-inline-images.md).

## Send files

Send stored documents to users when your app must deliver generated reports, exports, or other downloadable content. Use Microsoft Graph for agentic and cross-scope scenarios, or use bot file consent in personal chats.

### Use Microsoft Graph for stored files

Use Microsoft Graph when your app must send or retrieve stored files across personal chats, group chats, or channels:

* Use a user's OneDrive for personal and group-chat files.
* Use the team's SharePoint site for channel files.
* Obtain the required storage access through OAuth 2.0.
* Post a message attachment that references an existing stored file.

For more information, see [send chat message file attachments](/graph/api/chatmessage-post?view=graph-rest-beta&preserve-view=true&tabs=http#example-4-file-attachments) and [OneDrive and SharePoint APIs](/onedrive/developer/rest-api/).

### Send files with bot file consent

Use the bot file-consent workflow to request permission before your bot uploads a document to a user's OneDrive. Implement the following sequence for personal chats:

1. Send a `FileConsentCard`.
1. Receive a `fileConsent/invoke` activity.
1. If the user accepts, upload the bytes to `uploadUrl` with HTTP `PUT`.
1. Send a `FileInfoCard` that links to the uploaded file.
1. If the user declines, discard the pending content.

> [!IMPORTANT]
>
> The upcoming file authentication change also applies to bot file uploads. Before December 31, 2026, update your file-consent upload flow to send an app-only access token on every request to `uploadUrl`. For more information, see [Prepare for upcoming file authentication changes](#prepare-for-upcoming-file-authentication-changes).

#### Request file consent

Request consent so the user can review the file name, purpose, and size before your app uploads it to OneDrive. Send a `FileConsentCard` and retain the pending file content until the user accepts or declines.

The following message requests permission to upload a file:

:::image type="content" source="../../assets/images/bots/bot-file-consent-card.png" alt-text="Consent card requesting permission to upload a file." lightbox="../../assets/images/bots/bot-file-consent-card.png" border="true":::

On mobile, the consent request appears as follows:

<img src="../../assets/images/bots/mobile-bot-file-consent-card.png" alt="Consent card requesting permission to upload a file on mobile." width="350"/>

```json
{
  "attachments": [
    {
      "contentType": "application/vnd.microsoft.teams.card.file.consent",
      "name": "file_example.txt",
      "content": {
        "description": "This is your monthly expense report.",
        "sizeInBytes": 1029393,
        "acceptContext": {
          "fileId": "expense-report-2026-09"
        },
        "declineContext": {
          "fileId": "expense-report-2026-09"
        }
      }
    }
  ]
}
```

Key properties and values:

* `contentType`: Use the file-consent card content type shown.
* `name`: Set the filename that Teams displays to users.
* `description`: Add a brief purpose for the offered file.
* `sizeInBytes`: Set the exact file size in bytes.
* `acceptContext`: Add identifiers needed after the user accepts.
* `declineContext`: Add identifiers needed after the user declines.

Keep pending file bytes outside the context object. Apply expiration and cleanup policies to pending uploads.

#### Handle acceptance or decline

Handle the consent response to decide whether to upload the pending file or discard it. Inspect the `fileConsent/invoke` action and retain only the identifiers required to locate the pending content.

When the user accepts, Teams sends `fileConsent/invoke` with `action` set to `accept` and an `uploadInfo.uploadUrl`. The `uploadInfo.tenantId` value identifies the tenant to use when you request the upload token. If the user declines, `action` is `decline`.

#### Upload file content

Upload the pending bytes only after the user accepts the file. Use the supplied upload URL, required byte-range headers, the `Authorization` header, and HTTP `PUT`, then verify that OneDrive returns a successful status.

Use the upload URL to transfer the file bytes:

::: zone pivot="teams-sdk-csharp"

```csharp
using System.Net;
using System.Net.Http.Headers;

async Task UploadToOneDrive(
    string url,
    byte[] content,
    string? accessToken,
    CancellationToken cancellationToken)
{
    if (content.Length == 0)
    {
        throw new ArgumentException(
            "The file content must not be empty.",
            nameof(content));
    }

    using var request = new HttpRequestMessage(HttpMethod.Put, url);

    if (!string.IsNullOrEmpty(accessToken))
    {
        request.Headers.Authorization =
            new AuthenticationHeaderValue("Bearer", accessToken);
    }

    request.Content = new ByteArrayContent(content);
    request.Content.Headers.ContentType =
        new MediaTypeHeaderValue("application/octet-stream");
    request.Content.Headers.ContentLength = content.Length;
    request.Content.Headers.ContentRange =
        new ContentRangeHeaderValue(0, content.Length - 1, content.Length);

    using HttpResponseMessage response =
        await httpClient.SendAsync(request, cancellationToken);

    if (response.StatusCode is not HttpStatusCode.OK
        and not HttpStatusCode.Created)
    {
        throw new HttpRequestException(
            $"Upload failed with status {response.StatusCode}.");
    }
}
```

Key parameters and values:

* `url`: Use the `UploadInfo.UploadUrl` returned after acceptance, exactly as received.
* `content`: Provide the exact bytes associated with consent.
* `accessToken`: Send the app-only token for the upload URL's host.
* `content.Length`: Reject an empty upload before creating its byte range.
* `ContentType`: Set `application/octet-stream` for binary transfer.
* `ContentLength`: Set the exact number of uploaded bytes.
* `ContentRange`: Describe the uploaded byte range and total.
* `httpClient.SendAsync`: Send the HTTP `PUT` request to OneDrive.
* `response.StatusCode`: Accept HTTP 200 or 201 and fail otherwise.

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
import axios from 'axios';

async function uploadToOneDrive(
  url: string,
  content: Buffer,
  accessToken?: string
): Promise<void> {
  if (content.length === 0) {
    throw new Error('The file content must not be empty.');
  }

  const fileSize = content.length;
  const response = await axios.put(url, content, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Length': fileSize.toString(),
      'Content-Range': `bytes 0-${fileSize - 1}/${fileSize}`,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
    }
  });

  if (![200, 201].includes(response.status)) {
    throw new Error(`Upload failed with status ${response.status}`);
  }
}
```

Key parameters and values:

* `url`: Use the `uploadInfo.uploadUrl` returned after acceptance, exactly as received.
* `content`: Provide the exact bytes associated with consent.
* `accessToken`: Send the app-only token for the upload URL's host.
* `content.length`: Reject an empty upload before creating its byte range.
* `Content-Type`: Set `application/octet-stream` for binary file transfer.
* `Content-Length`: Set the decimal length of uploaded bytes.
* `Content-Range`: Describe the uploaded byte range and total.
* `axios.put`: Upload the bytes with an HTTP `PUT` request.
* `response.status`: Accept HTTP 200 or 201 and fail on other responses.

::: zone-end

::: zone pivot="teams-sdk-python"

```python
import httpx

async def upload_to_onedrive(
    url: str, content: bytes, access_token: str | None = None
) -> None:
    if not content:
        raise ValueError("The file content must not be empty.")

    file_size = len(content)
    headers = {
        "Content-Type": "application/octet-stream",
        "Content-Length": str(file_size),
        "Content-Range": f"bytes 0-{file_size - 1}/{file_size}",
    }
    if access_token:
        headers["Authorization"] = f"Bearer {access_token}"

    async with httpx.AsyncClient() as client:
        response = await client.put(url, content=content, headers=headers)

    if response.status_code not in (200, 201):
        raise RuntimeError(
            f"Upload failed with status {response.status_code}"
        )
```

Key parameters and values:

* `url`: Use the `upload_info.upload_url` returned after acceptance, exactly as received.
* `content`: Provide the exact bytes associated with consent.
* `access_token`: Send the app-only token for the upload URL's host.
* `if not content`: Reject an empty upload before creating its byte range.
* `Content-Type`: Set `application/octet-stream` for binary transfer.
* `Content-Length`: Set the exact number of uploaded bytes.
* `Content-Range`: Describe the uploaded byte range and total.
* `httpx.AsyncClient.put`: Upload the bytes with an HTTP `PUT` request.
* `response.status_code`: Accept HTTP 200 or 201 and fail otherwise.

::: zone-end

> [!NOTE]
>
> These samples send the `Authorization` header when you pass an access token. Today's TempAuth upload URLs ignore the header, but upload URLs that aren't TempAuth return HTTP 401 without it. Unlike Microsoft Graph upload session guidance, send the header on every request to `uploadUrl`. To acquire the token, see [Prepare for upcoming file authentication changes](#prepare-for-upcoming-file-authentication-changes). Make and deploy these changes by December 31, 2026.

#### Notify the user

Notify the user after the upload succeeds so they can open or download the stored file. Send a `FileInfoCard` containing the drive-item identifier, file type, and stored file URL.

After a successful upload, send a file information attachment:

```json
{
  "attachments": [
    {
      "contentType": "application/vnd.microsoft.teams.card.file.info",
      "contentUrl": "https://contoso.sharepoint.com/personal/user/Documents/Applications/file_example.txt",
      "name": "file_example.txt",
      "content": {
        "uniqueId": "1150D938-8870-4044-9F2C-5BBDEBA70C8C",
        "fileType": "txt"
      }
    }
  ]
}
```

Key properties and values:

* `contentType`: Use the file-information card content type shown.
* `contentUrl`: Set the stored file URL for user access.
* `uniqueId`: Set the OneDrive or SharePoint drive-item ID.
* `fileType`: Set the platform-reported file extension without punctuation.

## Handle errors

Handle known SDK file errors separately from transport and service failures. For agentic users, handle credential and Graph access errors first because file retrieval depends on the agentic identity and consented blueprint permissions. The expired URL error applies to the bot path that uses the current time-bound, pre-authorized download URL.

After the upcoming file authentication change, bot file upload and download return HTTP 401 if the request doesn't include an access token, the token was acquired with a client secret, or the token was requested for the wrong tenant. If token acquisition fails for a TempAuth URL, send the request without the header so downloads that work today keep working. Handle a missing tenant ID by falling back to the activity tenant ID, treat authentication failures as configuration issues to investigate, and show users a clear message instead of a broken file experience. For more information, see [Prepare for upcoming file authentication changes](#prepare-for-upcoming-file-authentication-changes).

::: zone pivot="teams-sdk-csharp"

| Status code | Error code | Description | Developer action |
| --- | --- | --- | --- |
| Not applicable | `FileCredentialException` | No Graph credential is available for agentic-user file retrieval. | Verify blueprint permissions, administrator consent, and credential configuration. |
| HTTP 401 | `FileAccessException` | Microsoft Graph rejected the token used to retrieve the file. | Refresh or correct the token and verify the selected actor. |
| HTTP 403 | `FileAccessException` | The identity lacks consent or access to the requested item. | Verify consent, sharing, blueprint permissions, and item access. |
| Not applicable | `FileUrlExpiredException` | The bot's pre-authorized file URL expired before retrieval or re-read. | Ask the user to attach the file again. Download once and reuse `DownloadedFile`. |
| Not applicable | `FileScopeNotSupportedException` | The high-level file API received an unsupported conversation scope. | Use personal chat or retrieve the stored file through Microsoft Graph. |
| Not applicable | `FileException` | A known SDK file operation failed for another reason. | Show a general user message and log sanitized diagnostics. |
| HTTP 5xx | Transport or service error | Microsoft Graph or storage service couldn't complete the request. | Retry according to service guidance and preserve the original exception. |

A `403` can represent missing consent, missing item access, or a nonexistent item. The SDK doesn't expose a separate file-not-found error for these responses.

```csharp
try
{
    DownloadedFile downloaded =
        await file.DownloadAsync(cancellationToken);
}
catch (FileCredentialException)
{
    await context.ReplyAsync(
        "The agent isn't configured to access this file.",
        cancellationToken);
}
catch (FileAccessException error)
{
    await context.ReplyAsync(
        $"The storage service denied access ({error.Status}).",
        cancellationToken);
}
catch (FileUrlExpiredException)
{
    await context.ReplyAsync(
        "That file link expired. Attach the file again.",
        cancellationToken);
}
catch (FileScopeNotSupportedException)
{
    await context.ReplyAsync(
        "File download isn't supported in this conversation.",
        cancellationToken);
}
catch (FileException)
{
    await context.ReplyAsync(
        "The file couldn't be read.",
        cancellationToken);
}
```

Key types and values:

* `FileCredentialException`: Handle missing agentic-user Graph credential configuration.
* `FileAccessException.Status`: Distinguish rejected tokens from denied access.
* `FileUrlExpiredException`: Handle expired bot download URLs.
* `FileScopeNotSupportedException`: Handle unsupported group or channel retrieval.
* `FileException`: Provide fallback handling for known SDK failures.

::: zone-end

::: zone pivot="teams-sdk-typescript"

| Status code | Error code | Description | Developer action |
| --- | --- | --- | --- |
| Not applicable | `FileCredentialError` | No Graph credential is available for agentic-user file retrieval. | Verify blueprint permissions, administrator consent, and credential configuration. |
| HTTP 401 or 403 | `FileAccessError` | Microsoft Graph rejected the token or denied item access. | Inspect `status`, then verify the token, consent, sharing, and item access. |
| Not applicable | `FileUrlExpiredError` | The bot's pre-authorized file URL expired before retrieval or re-read. | Ask the user to attach the file again. Download once and reuse the downloaded file. |
| Not applicable | `FileScopeNotSupportedError` | The high-level API received an unsupported conversation scope. | Use personal chat or retrieve the stored file through Microsoft Graph. |
| Not applicable | `FileError` | A known SDK file operation failed for another reason. | Show a general user message and log sanitized diagnostics. |
| HTTP 5xx | Transport or service error | Microsoft Graph or storage couldn't complete the request. | Retry according to service guidance and preserve the original error. |

```typescript
try {
  const downloaded = await file.download();
} catch (error) {
  if (error instanceof FileCredentialError) {
    await send("The agent isn't configured to access this file.");
  } else if (error instanceof FileAccessError) {
    await send(`The storage service denied access (${error.status}).`);
  } else if (error instanceof FileUrlExpiredError) {
    await send('That file link expired. Attach the file again.');
  } else if (error instanceof FileScopeNotSupportedError) {
    await send("File download isn't supported in this conversation.");
  } else if (error instanceof FileError) {
    await send("The file couldn't be read.");
  } else {
    throw error;
  }
}
```

Key types and values:

* `FileCredentialError`: Handle missing agentic-user Graph credentials.
* `FileAccessError.status`: Distinguish rejected tokens from denied access.
* `FileUrlExpiredError`: Handle expired bot download URLs.
* `FileScopeNotSupportedError`: Handle unsupported conversation scopes.
* `FileError`: Provide fallback handling for known SDK failures.

::: zone-end

::: zone pivot="teams-sdk-python"

| Status code | Error code | Description | Developer action |
| --- | --- | --- | --- |
| Not applicable | `FileCredentialError` | No Graph credential is available for agentic-user file retrieval. | Verify blueprint permissions, administrator consent, and credential configuration. |
| HTTP 401 or 403 | `FileAccessError` | Microsoft Graph rejected the token or denied item access. | Inspect `status`, then verify the token, consent, sharing, and item access. |
| Not applicable | `FileUrlExpiredError` | The bot's pre-authorized file URL expired before retrieval or re-read. | Ask the user to attach the file again. Download once and reuse the downloaded file. |
| Not applicable | `FileScopeNotSupportedError` | The high-level API received an unsupported conversation scope. | Use personal chat or retrieve the stored file through Microsoft Graph. |
| Not applicable | `FileError` | A known SDK file operation failed for another reason. | Show a general user message and log sanitized diagnostics. |
| HTTP 5xx | Transport or service error | Microsoft Graph or storage couldn't complete the request. | Retry according to service guidance and preserve the original error. |

```python
try:
    downloaded = await file.download()
except FileCredentialError:
    await ctx.reply("The agent isn't configured to access this file.")
except FileAccessError as error:
    await ctx.reply(
        f"The storage service denied access ({error.status})."
    )
except FileUrlExpiredError:
    await ctx.reply("That file link expired. Attach the file again.")
except FileScopeNotSupportedError:
    await ctx.reply(
        "File download isn't supported in this conversation."
    )
except FileError:
    await ctx.reply("The file couldn't be read.")
```

Key types and values:

* `FileCredentialError`: Handle missing agentic-user Graph credentials.
* `FileAccessError.status`: Distinguish rejected tokens from denied access.
* `FileUrlExpiredError`: Handle expired bot download URLs.
* `FileScopeNotSupportedError`: Handle unsupported conversation scopes.
* `FileError`: Provide fallback handling for known SDK failures.

::: zone-end

## Prepare for upcoming file authentication changes

> [!IMPORTANT]
>
> **Changes to your agent must be made and deployed by December 31, 2026.** If your agent sends or receives files in Teams, review the following requirements now. Agents that don't meet them risk failed file uploads and downloads and errors shown to users.

Teams is updating how bots and agents securely access files that users share. The updated model uses application-based authentication for file operations to strengthen security, align with OneDrive and SharePoint authentication requirements, and support future file-sharing capabilities across Teams conversations.

Today, bots download and upload files through time-bound, pre-authorized TempAuth URLs. After TempAuth goes away, download and upload URLs that aren't TempAuth return HTTP 401 unless the request includes an access token. To keep file operations working, your bot must:

* **Send a bearer token with every file request**: Acquire an app-only token for the file URL's host and send it in the `Authorization` header on the download `GET` and on every request to `uploadUrl`.
* **Not use a client secret for the file token**: Certificates, federated identity credentials (FIC), and managed identity all work. A token acquired with a client secret gets HTTP 401.
* **Request the token for the file's tenant**: Use the tenant ID provided with the file, and fall back to the activity's tenant ID only when the file's tenant ID is missing.

These requirements apply only to the token your bot uses for file operations. Your bot can keep using its client secret for other calls, such as getting the Bot Framework token.

> [!TIP]
>
> Today's TempAuth URLs ignore the `Authorization` header, so you can start sending it now without affecting downloads and uploads that work today.

### Determine whether you need to take action

The required changes depend on the credential your bot uses to acquire the file token:

| Credential type | File token support | Developer action |
| --- | --- | --- |
| Certificate or federated identity credential (FIC) | Supported | Use the certificate or FIC to acquire the file token. |
| Managed identity | Supported | Use the managed identity to acquire the file token. You can skip the tenant resolution steps because a managed identity token always comes from the managed identity's own tenant, whatever tenant you pass. |
| Client secret | Not supported | After TempAuth goes away, the bot can't open or upload files. Add a certificate or FIC to the bot's app registration, or move to managed identity, and use it for the file token. |

> [!WARNING]
>
> Don't use a client secret to acquire the file token. Requests that use a secret-based token get HTTP 401.

Acquire the token with the bot's Microsoft App ID, the `bots[].botId` value in the app manifest. Don't use a separate single sign-on (SSO) app registration.

The credential stays on the bot's app registration in its home tenant. A multi-tenant bot also needs a service principal in each tenant where it's used. Teams will start creating these service principals. While you test the `Authorization` header during this transition period, the service principal might not be provisioned yet in every tenant, so keep the [TempAuth fallback](#acquire-the-token-and-send-the-authorization-header) in place.

For more information about configuring credentials, see [Microsoft identity platform certificate credentials](/entra/identity-platform/certificate-credentials) and [Add and manage application credentials in Microsoft Entra ID](/entra/identity-platform/how-to-add-credentials).

### Resolve the tenant for file tokens

Request the file token for the tenant ID provided with the file:

| Operation | Tenant ID field | Fallback |
| --- | --- | --- |
| Download | `attachment.content.tenantId` on the file attachment | The activity's tenant ID |
| Upload | `activity.value.uploadInfo.tenantId` on the `fileConsent/invoke` activity | The activity's tenant ID |

If the field is missing, use the activity's tenant ID, such as `activity.channelData.tenant.id`. Bots that use managed identity can skip this step.

The file's tenant ID identifies the tenant context to use when requesting authentication for the file operation. If your bot always uses the activity tenant ID, it can select the wrong tenant context when the file belongs to a different tenant.

> [!WARNING]
>
> Don't assume that the tenant associated with the Teams conversation is always the correct tenant for the file.

### Acquire the token and send the authorization header

For each download or upload request:

1. Resolve the tenant ID as described in [Resolve the tenant for file tokens](#resolve-the-tenant-for-file-tokens).
1. Request an app-only token for the `https://<url host>/.default` scope, where `<url host>` is the host of the download URL or `uploadUrl`.
1. Send `Authorization: Bearer <token>` on the download `GET` and on every request to `uploadUrl`.
1. Use each URL exactly as received. Don't rebuild, re-encode, or modify it.

Because the token is requested for the URL's own host, it isn't sent anywhere else.

> [!IMPORTANT]
>
> This is a change for uploads. Microsoft Graph upload session documentation says not to send an `Authorization` header on upload `PUT` requests. For Teams bot file uploads, send the header on every request to `uploadUrl`.

Don't let a failed token request break a download that works today. If your bot can't acquire a token and the URL contains `tempauth`, send the request without the `Authorization` header.

The following pseudocode illustrates tenant resolution, token acquisition, the authorization header, and the TempAuth fallback:

```typescript
// Download: attachment.content.tenantId
// Upload: activity.value.uploadInfo.tenantId on fileConsent/invoke
const tenantId = fileTenantId ?? activity.channelData?.tenant?.id;

// Use the download URL or uploadUrl exactly as received.
const scope = `https://${new URL(fileUrl).host}/.default`;

let token: string | undefined;
try {
  // Use the bot's Microsoft App ID (bots[].botId) with a certificate,
  // federated identity credential, or managed identity.
  // Don't use a client secret.
  token = await acquireAppOnlyToken({ clientId: botAppId, tenantId, scope });
} catch (error) {
  log.warn('File token request failed.');
}

const headers: Record<string, string> = {};
if (token) {
  headers['Authorization'] = `Bearer ${token}`;
} else if (!fileUrl.toLowerCase().includes('tempauth')) {
  // A URL that isn't TempAuth returns 401 without a token.
  // Handle this as an authentication failure.
}

const response = await fetch(fileUrl, { method, headers, body });
```

Key values:

* `fileTenantId`: Use the tenant ID provided with the download attachment or upload information.
* `activity.channelData.tenant.id`: Use the activity tenant only as a fallback.
* `scope`: Request the token for the host of the file URL.
* `botAppId`: Use the bot's Microsoft App ID from `bots[].botId`.
* `Authorization`: Send the bearer token on the download `GET` and every `uploadUrl` request.
* `tempauth`: Send the request without a token only when token acquisition fails for a TempAuth URL.

### Update your agent

If your agent supports file upload or download, complete the following checklist and deploy your changes by December 31, 2026:

1. **Identify your file token credential.** Determine whether your bot uses a certificate, FIC, managed identity, or client secret to acquire app-only tokens.
1. **Replace client secrets for the file token.** If your bot uses a client secret, add a certificate or FIC to the bot's app registration, or move to managed identity. You can keep the client secret for other calls, such as getting the Bot Framework token.
1. **Use the bot's app ID.** Acquire the file token with the bot's Microsoft App ID (`bots[].botId`), not a separate SSO app.
1. **Send the authorization header.** Request the token for `https://<url host>/.default` and send `Authorization: Bearer <token>` on the download `GET` and every request to `uploadUrl`. Use each URL exactly as received.
1. **Update tenant resolution logic.** Use `attachment.content.tenantId` for downloads and `activity.value.uploadInfo.tenantId` for uploads, falling back to the activity tenant ID only when the field is missing.
1. **Keep the TempAuth fallback.** If token acquisition fails and the URL contains `tempauth`, send the request without the header.
1. **Confirm service principals.** For a multi-tenant bot, verify that a service principal exists in each tenant where the bot is used.
1. **Validate file upload and download.** Test your bot's file operations with the updated authentication approach, including missing tenant information and HTTP 401 responses.

## Design guidelines and best practices

Apply these guidelines to create secure, predictable file experiences. Review them while designing handlers and before deploying your app.

* Tell users whether the agent received a file or is asking to upload one.
* Acknowledge successful file receipt and upload.
* Explain why the bot requests file consent before sending a document.
* Handle declined consent without repeatedly prompting the user.
* Prefer the Teams SDK file accessor over manually parsing document attachments.
* Download once and reuse the downloaded file when processing content repeatedly.
* Stream large files instead of buffering the complete file in memory.
* Sanitize uploader-provided filenames and use application-controlled destinations.
* Validate actual content instead of trusting extensions or reported MIME types.
* Don't log file bytes, credentials, identifiers, or pre-authorized upload and download URLs.
* Apply expiration and cleanup policies to pending file-consent uploads.
* Propagate cancellation and handle HTTP, credential, scope, and expiration failures.

## See also

Use these resources to explore related Teams SDK file APIs, inline images, authentication, and messaging guidance.

* [Send and receive inline images](agents-inline-images.md)
* [Teams SDK overview](/microsoftteams/platform/teams-sdk/why)
* [File and Image Handling](https://microsoft.github.io/teams-sdk/csharp/in-depth-guides/file-handling/)
* [Receiving Files](https://microsoft.github.io/teams-sdk/csharp/in-depth-guides/file-handling/receiving-files/)
* [Sending messages](/microsoftteams/platform/teams-sdk/essentials/sending-messages/overview?pivots=csharp)
* [User authentication](/microsoftteams/platform/teams-sdk/in-depth-guides/user-authentication?tabs=portal&pivots=csharp)
