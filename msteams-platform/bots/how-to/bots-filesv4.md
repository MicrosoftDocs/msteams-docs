---
title: Send and receive files
description: Learn how agents send and receive files in Microsoft Teams using Teams SDK and Microsoft Graph.
ms.date: 11/20/2026
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
> This guidance was significantly updated on November 20, 2026. If you implemented file send and receive behavior in an agent prior to then, you need to update your agent's implementation and configuration before **March 1, 2027** to keep file operations working. See [Update an existing bot to authenticate file requests](#update-an-existing-bot-to-authenticate-file-requests) for detailed instructions and guidance.

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

The Teams SDK file accessor filters the activity attachment collection and exposes supported documents as lazy incoming-file handles. Agentic users retrieve file bytes through Microsoft Graph with their identity. Traditional bots download and upload files through URLs supplied by Teams and send their own app-only access token with each request. For more information, see [Authenticate bot file requests](#authenticate-bot-file-requests).

| Operation | Personal chat | Group chat | Channel | Requirement |
| --- | --- | --- | --- | --- |
| Receive files with the Teams SDK file accessor | Supported | Not explicitly supported | Not explicitly supported | Agentic users: Graph file permissions<br>Bots: [Bot file authentication requirements](#authenticate-bot-file-requests) |
| Send or retrieve files with Graph | Supported | Supported | Supported | Configure permissions for the storage location, API, calling identity, and access model. |
| Send files with bot file consent | Supported | Not supported | Not supported | Set `supportsFiles` to `true` on the bot entry and meet the [bot file authentication requirements](#authenticate-bot-file-requests). |

## Receive files

Receive document files that users attach to personal chats so your agent can inspect or process their content. Configure file access first, then use the Teams SDK file accessor to list and read each received file.

### Configure file support

Configure file support so your agent or bot has the permissions and platform settings required to receive documents. Complete the setup for your app identity before implementing file handlers.

The required configuration depends on the identity and file operation:

| Scenario | App manifest update | Other configuration |
| --- | --- | --- |
| Agentic user receives a file | None | Add a Microsoft Graph file permission to the agent blueprint and obtain administrator consent. |
| Bot receives a file, or sends a file through file consent | Set `supportsFiles` to `true` on the bot entry.<br>Starting January 15, 2027, add the [RSC permission](#add-the-rsc-permission-to-your-app-manifest) under `authorization.permissions.resourceSpecific`. | Add a certificate, federated identity credential, or managed identity to the bot's app registration for the file token. Client secrets aren't supported. See [Authenticate bot file requests](#authenticate-bot-file-requests). |
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

A bot that receives or sends files also needs:

* An app-only access token on every file request, acquired with the bot's Microsoft App ID (`botId`) and a certificate, federated identity credential, or managed identity rather than a client secret. For more information, see [Authenticate bot file requests](#authenticate-bot-file-requests).
* Starting January 15, 2027, the `File.ReadSelected.User` RSC permission if it only downloads files, or `File.ReadWriteSelected.User` if it uploads files, under `authorization.permissions.resourceSpecific` in the app manifest. For more information, see [Add the RSC permission to your app manifest](#add-the-rsc-permission-to-your-app-manifest).

You can build and publish a bot that sends and receives files now. Add the RSC permission to its manifest starting January 15, 2027.

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

For an agentic user, Teams SDK uses the attachment `ContentUrl` and the agentic user's identity to retrieve the file through Microsoft Graph. For a bot, the SDK uses the short-lived `downloadUrl` supplied in the activity. The file-read APIs shown in this section apply to both routes.

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
1. If the user accepts, upload the bytes to `uploadUrl` with HTTP `PUT`, and send the bot's access token in the `Authorization` header.
1. Send a `FileInfoCard` that links to the uploaded file.
1. If the user declines, discard the pending content.

To upload files, a bot sends an app-only access token on every request to `uploadUrl`. Starting January 15, 2027, it also declares the `File.ReadWriteSelected.User` [RSC permission](#add-the-rsc-permission-to-your-app-manifest) in its app manifest. For more information, see [Authenticate bot file requests](#authenticate-bot-file-requests).

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

Upload the pending bytes only after the user accepts the file. Use the supplied `uploadUrl`, required byte-range headers, the `Authorization` header, and HTTP `PUT`, then verify that OneDrive returns a successful status. To get the token, see [Acquire the token and send the authorization header](#acquire-the-token-and-send-the-authorization-header).

Use the `uploadUrl` to transfer the file bytes:

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
* `accessToken`: Send the app-only token for the `uploadUrl` host. The token is optional only so you can use the [`tempauth` fallback](#acquire-the-token-and-send-the-authorization-header) until March 1, 2027.
* `content.Length`: Reject an empty upload before creating its byte range.
* `ContentType`: Set `application/octet-stream` for binary transfer.
* `ContentLength`: Set the exact number of uploaded bytes.
* `ContentRange`: Describe the uploaded byte range and total.
* `httpClient.SendAsync`: Send the HTTP `PUT` request to OneDrive.
* `response.StatusCode`: Accept HTTP 200 or 201 and fail otherwise.

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
import * as https from 'node:https';

async function uploadToOneDrive(
  url: string,
  content: Buffer,
  accessToken?: string
): Promise<void> {
  if (content.length === 0) {
    throw new Error('The file content must not be empty.');
  }

  const fileSize = content.length;
  const headers: Record<string, string> = {
    'Content-Type': 'application/octet-stream',
    'Content-Length': fileSize.toString(),
    'Content-Range': `bytes 0-${fileSize - 1}/${fileSize}`,
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
  };

  // Send the path and query exactly as received. Node fetch and axios
  // change ' to %27, and the request then fails.
  const { hostname, port } = new URL(url);
  const path = url.slice(url.indexOf('/', 'https://'.length));

  const status = await new Promise<number>((resolve, reject) => {
    https
      .request({ method: 'PUT', hostname, port, path, headers }, (response) => {
        response.resume();
        resolve(response.statusCode ?? 0);
      })
      .on('error', reject)
      .end(content);
  });

  if (![200, 201].includes(status)) {
    throw new Error(`Upload failed with status ${status}`);
  }
}
```

Key parameters and values:

* `url`: Use the `uploadInfo.uploadUrl` returned after acceptance, exactly as received.
* `content`: Provide the exact bytes associated with consent.
* `accessToken`: Send the app-only token for the `uploadUrl` host. The token is optional only so you can use the [`tempauth` fallback](#acquire-the-token-and-send-the-authorization-header) until March 1, 2027.
* `content.length`: Reject an empty upload before creating its byte range.
* `Content-Type`: Set `application/octet-stream` for binary file transfer.
* `Content-Length`: Set the decimal length of uploaded bytes.
* `Content-Range`: Describe the uploaded byte range and total.
* `path`: Cut the path and query from the original string. Don't rebuild them with `new URL()`, which also changes `'` to `%27`.
* `https.request`: Send the HTTP `PUT` with the URL exactly as received. Don't use Node `fetch` or `axios`: they change `'` to `%27`, and the request fails.
* `status`: Accept HTTP 200 or 201 and fail on other responses.

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
* `access_token`: Send the app-only token for the `uploadUrl` host. The token is optional only so you can use the [`tempauth` fallback](#acquire-the-token-and-send-the-authorization-header) until March 1, 2027.
* `if not content`: Reject an empty upload before creating its byte range.
* `Content-Type`: Set `application/octet-stream` for binary transfer.
* `Content-Length`: Set the exact number of uploaded bytes.
* `Content-Range`: Describe the uploaded byte range and total.
* `httpx.AsyncClient.put`: Upload the bytes with an HTTP `PUT` request.
* `response.status_code`: Accept HTTP 200 or 201 and fail otherwise.

::: zone-end

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

## Authenticate bot file requests

A bot sends its own access token with every file download and upload request. Your bot must:

* **Use a supported credential for the file token**: Certificates, federated identity credentials (FIC), and managed identity all work. Starting March 1, 2027, a token acquired with a client secret gets HTTP 401.
* **Request the token for the file's tenant**: Use the tenant ID provided with the file, and fall back to the activity's tenant ID only when the file's tenant ID is missing.
* **Send a bearer token with every file request**: Acquire an app-only token for the host of the `downloadUrl` or `uploadUrl` and send it in the `Authorization` header on the download `GET` and on every request to `uploadUrl`.
* **Declare the RSC permission, starting January 15, 2027**: Add `File.ReadSelected.User` if your bot only downloads files, or `File.ReadWriteSelected.User` if it uploads files, under `authorization.permissions.resourceSpecific` in the app manifest.

These requirements apply only to the token your bot uses for file operations. Your bot can keep using its client secret for other calls, such as getting the Bot Framework token.

### Choose a credential for the file token

The following table shows which credentials can acquire the file token:

| Credential type | File token support | Developer action |
| --- | --- | --- |
| Certificate or federated identity credential (FIC) | Supported | Use the certificate or FIC to acquire the file token. |
| Managed identity | Supported | Use the managed identity to acquire the file token. A managed identity gets tokens only for its own tenant, so the bot can access files only in that tenant. |
| Client secret | Not supported | Add a certificate or FIC to the bot's app registration, or move to managed identity, and use it for the file token. |

> [!WARNING]
>
> Don't use a client secret to acquire the file token. Starting March 1, 2027, requests that use a secret-based token get HTTP 401.

Acquire the token with the bot's Microsoft App ID, the `bots[].botId` value in the app manifest. Don't use a separate single sign-on (SSO) app registration.

The credential stays on the bot's app registration in its home tenant. Until March 1, 2027, a multi-tenant bot might not have a service principal in every tenant where it's used, and token requests in those tenants fail. Until then, keep the [fallback for URLs that have a `tempauth` parameter](#acquire-the-token-and-send-the-authorization-header) in place so file requests in those tenants keep working.

For more information about configuring credentials, see [Microsoft identity platform certificate credentials](/entra/identity-platform/certificate-credentials) and [Add and manage application credentials in Microsoft Entra ID](/entra/identity-platform/how-to-add-credentials).

### Resolve the tenant for file tokens

Request the file token for the tenant ID provided with the file:

| Operation | Tenant ID field | Fallback |
| --- | --- | --- |
| Download | `attachment.content.tenantId` | The activity's tenant ID |
| Upload | `activity.value.uploadInfo.tenantId` on the `fileConsent/invoke` activity | The activity's tenant ID |

The file's tenant ID identifies the tenant context to use when requesting authentication for the file operation. If your bot always uses the activity tenant ID, it can select the wrong tenant context when the file belongs to a different tenant.

### Acquire the token and send the authorization header

For each download or upload request:

1. Resolve the tenant ID as described in [Resolve the tenant for file tokens](#resolve-the-tenant-for-file-tokens).
1. Request an app-only token for the `https://<url host>/.default` scope, where `<url host>` is the host of the `downloadUrl` or `uploadUrl`. Files in OneDrive use a SharePoint host, such as `contoso-my.sharepoint.com`. Use the host from the URL as is.
1. Send `Authorization: Bearer <token>` on the download `GET` and on every request to `uploadUrl`.
1. Use each URL exactly as received. Don't rebuild, re-encode, or modify it. Some HTTP libraries re-encode characters, such as changing `'` to `%27`, and the request then fails.

Until March 1, 2027, file URLs have a `tempauth` query parameter and work without a token. If your bot can't acquire a token and the URL has a `tempauth` query parameter, send the request without the `Authorization` header.

The following pseudocode shows the same steps, including the fallback for URLs that have a `tempauth` parameter:

```text
// Resolve the tenant.
tenantId = attachment.content.tenantId              // download
        or activity.value.uploadInfo.tenantId       // upload (fileConsent/invoke)
if tenantId is missing:
    tenantId = activity.channelData.tenant.id

// Request an app-only token for the host of the file URL.
scope = "https://" + host of fileUrl + "/.default"
try:
    token = request an app-only token
              client ID:  the bot's Microsoft App ID (bots[].botId)
              tenant:     tenantId
              scope:      scope
              credential: certificate, FIC, or managed identity (not a client secret)
if the token request fails:
    token = none

// Add the authorization header, or fall back for tempauth URLs.
if token is not none:
    add header  Authorization: Bearer <token>
else if fileUrl has no "tempauth" query parameter:
    don't send the request, because it returns HTTP 401 without a token
else:
    send the request without the Authorization header

// Send the request to the URL exactly as received.
download: GET fileUrl
upload:   PUT each chunk to fileUrl, with the same header on every request
```

Key values:

* `tenantId`: Use the tenant ID provided with the download attachment or upload information. Use the activity's tenant ID only as a fallback.
* `scope`: Request the token for the host of the file URL.
* Client ID: Use the bot's Microsoft App ID from `bots[].botId`.
* `Authorization`: Send the bearer token on the download `GET` and every `uploadUrl` request.
* `tempauth`: Check for a `tempauth` query parameter, ignoring case. If token acquisition fails and the `tempauth` query parameter is present, the request can be made without the token.
* `fileUrl`: Send the URL exactly as received. Some HTTP libraries re-encode characters, such as changing `'` to `%27`, and the request then fails.

### Add the RSC permission to your app manifest

> [!NOTE]
>
> The `File.ReadSelected.User` and `File.ReadWriteSelected.User` RSC permissions are available for use in app manifests starting January 15, 2027. See [Known issues](#known-issues).

Under `authorization.permissions.resourceSpecific` in your app manifest, add one of these permissions with `type` set to `Application`:

* `File.ReadSelected.User`: The bot can read files that users share with it. Use it if your bot only downloads files.
* `File.ReadWriteSelected.User`: The bot can read files that users share with it and upload files that users accept. Use it if your bot uploads files. It also covers downloads, so you don't need both.

For the manifest format, see [Declare RSC permissions in the app manifest](../../graph-api/rsc/declare-resource-specific-consent-requirements.md#declare-rsc-permissions-in-the-app-manifest).

The permission doesn't give your bot access to any file on its own. The bot can access a file only after a user shares it with the bot or accepts a file consent card.

Publish the updated manifest worldwide by March 1, 2027. Users or admins might be asked to approve the permission when they install or update the app.

## Handle errors

Handle known SDK file errors separately from transport and service failures. For agentic users, handle credential and Graph access errors first because file retrieval depends on the agentic identity and consented blueprint permissions. The expired URL error applies only to bots that download from a `downloadUrl`.

For URLs without a `tempauth` query parameter, bot file upload and download return HTTP 401 if the request doesn't include an access token, the token was acquired with a client secret, or the token was requested for the wrong tenant. Handle a missing tenant ID by falling back to the activity tenant ID, treat authentication failures as configuration issues to investigate, and show users a clear message instead of a broken file experience. For more information, see [Authenticate bot file requests](#authenticate-bot-file-requests).

::: zone pivot="teams-sdk-csharp"

| Status code | Error code | Description | Developer action |
| --- | --- | --- | --- |
| Not applicable | `FileCredentialException` | No Graph credential is available for agentic-user file retrieval. | Verify blueprint permissions, administrator consent, and credential configuration. |
| HTTP 401 | `FileAccessException` | Microsoft Graph or the `downloadUrl` host rejected the token used to retrieve the file. | Agentic users: refresh or correct the token.<br>Bots: verify the token credential and tenant. See [Authenticate bot file requests](#authenticate-bot-file-requests). |
| HTTP 403 | `FileAccessException` | The identity lacks consent or access to the requested item. | Verify consent, sharing, blueprint permissions, and item access. |
| Not applicable | `FileUrlExpiredException` | The bot's `downloadUrl` expired before retrieval or re-read. | Ask the user to attach the file again. Download once and reuse `DownloadedFile`. |
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
* `FileUrlExpiredException`: Handle an expired `downloadUrl`.
* `FileScopeNotSupportedException`: Handle unsupported group or channel retrieval.
* `FileException`: Provide fallback handling for known SDK failures.

::: zone-end

::: zone pivot="teams-sdk-typescript"

| Status code | Error code | Description | Developer action |
| --- | --- | --- | --- |
| Not applicable | `FileCredentialError` | No Graph credential is available for agentic-user file retrieval. | Verify blueprint permissions, administrator consent, and credential configuration. |
| HTTP 401 or 403 | `FileAccessError` | Microsoft Graph or the `downloadUrl` host rejected the token or denied item access. | Inspect `status`, then verify the token, consent, sharing, and item access. For bots, see [Authenticate bot file requests](#authenticate-bot-file-requests). |
| Not applicable | `FileUrlExpiredError` | The bot's `downloadUrl` expired before retrieval or re-read. | Ask the user to attach the file again. Download once and reuse the downloaded file. |
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
* `FileUrlExpiredError`: Handle an expired `downloadUrl`.
* `FileScopeNotSupportedError`: Handle unsupported conversation scopes.
* `FileError`: Provide fallback handling for known SDK failures.

::: zone-end

::: zone pivot="teams-sdk-python"

| Status code | Error code | Description | Developer action |
| --- | --- | --- | --- |
| Not applicable | `FileCredentialError` | No Graph credential is available for agentic-user file retrieval. | Verify blueprint permissions, administrator consent, and credential configuration. |
| HTTP 401 or 403 | `FileAccessError` | Microsoft Graph or the `downloadUrl` host rejected the token or denied item access. | Inspect `status`, then verify the token, consent, sharing, and item access. For bots, see [Authenticate bot file requests](#authenticate-bot-file-requests). |
| Not applicable | `FileUrlExpiredError` | The bot's `downloadUrl` expired before retrieval or re-read. | Ask the user to attach the file again. Download once and reuse the downloaded file. |
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
* `FileUrlExpiredError`: Handle an expired `downloadUrl`.
* `FileScopeNotSupportedError`: Handle unsupported conversation scopes.
* `FileError`: Provide fallback handling for known SDK failures.

::: zone-end

## Update an existing bot to authenticate file requests

Microsoft has changed the implementation and app manifest requirements for bots that download or upload files in Teams. If your bot uses `downloadUrl` or `uploadUrl`, you must update it by **March 1, 2027** to keep file operations working after that date.

Your bot needs the following changes, which can be made and deployed separately:

* Code changes, which you can make and deploy now.
* An RSC permission in your app manifest, which you can add and publish starting **January 15, 2027**, when the permissions become available in Teams.

| Date | What changes | What to do |
| --- | --- | --- |
| Now | `downloadUrl` and `uploadUrl` values have a `tempauth` query parameter and work with or without an access token. | [Update your bot to send an access token on file requests](#changes-to-make-now). |
| January 15, 2027 | The `File.ReadSelected.User` and `File.ReadWriteSelected.User` RSC permissions become available for use in app manifests. | [Add the permission to your app manifest and publish it](#changes-to-make-starting-january-15-2027). |
| March 1, 2027 | `downloadUrl` and `uploadUrl` values don't have a `tempauth` query parameter and return HTTP 401 unless the request includes an access token. | Have both changes deployed and your updated manifest published worldwide. |

### Changes to make now

1. **Set up a credential for the file token.** Acquire the file token with the bot's Microsoft App ID (`bots[].botId`), not a separate SSO app. If the bot uses a client secret, add a certificate or FIC to its app registration, or move to managed identity. You can keep the client secret for other calls, such as getting the Bot Framework token. See [Choose a credential for the file token](#choose-a-credential-for-the-file-token).
1. **Update tenant resolution logic.** Use `attachment.content.tenantId` for downloads and `activity.value.uploadInfo.tenantId` for uploads, falling back to the activity tenant ID only when the field is missing. See [Resolve the tenant for file tokens](#resolve-the-tenant-for-file-tokens).
1. **Send the authorization header.** Request the token for `https://<url host>/.default` and send `Authorization: Bearer <token>` on the download `GET` and every request to `uploadUrl`. Use each URL exactly as received. See [Acquire the token and send the authorization header](#acquire-the-token-and-send-the-authorization-header).
1. **Keep the `tempauth` fallback until March 1, 2027.** Until then, if token acquisition fails and the URL has a `tempauth` query parameter, send the request without the header. This also covers tenants where a multi-tenant bot doesn't have a service principal yet. See [Acquire the token and send the authorization header](#acquire-the-token-and-send-the-authorization-header).
1. **Validate file upload and download.** Confirm that your bot acquires a token for the file host and sends it on every download and upload request, and that file operations still succeed. Also test the fallback paths for a missing tenant ID and a failed token request.

### Changes to make starting January 15, 2027

1. **Update and publish your app manifest.** Under `authorization.permissions.resourceSpecific`, add `File.ReadSelected.User` if your bot only downloads files, or `File.ReadWriteSelected.User` if it uploads files, as an `Application` RSC permission. Publish the updated manifest worldwide by March 1, 2027. See [Add the RSC permission to your app manifest](#add-the-rsc-permission-to-your-app-manifest).
1. **Test with the updated manifest.** Install the updated app and confirm that file download and upload still work.

To share feedback, report issues, or ask questions about these changes, go to [aka.ms/TeamsDeveloperFeedback](https://aka.ms/TeamsDeveloperFeedback).

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
* Don't log file bytes, credentials, identifiers, or `downloadUrl` and `uploadUrl` values.
* Apply expiration and cleanup policies to pending file-consent uploads.
* Propagate cancellation and handle HTTP, credential, scope, and expiration failures.

## Known issues

### Adding a file RSC permission before January 15, 2027

Before January 15, 2027, Teams doesn't accept the `File.ReadSelected.User` and `File.ReadWriteSelected.User` permissions in app manifests. If your manifest includes either permission, users can't install your app, and users who already have it stay on the previous version. Teams shows one of these errors:

* "App package can't be uploaded"
* "Requested permission is not recognized."

Publish your manifest with these permissions starting January 15, 2027. You can make the [changes to make now](#changes-to-make-now) before then.

## See also

Use these resources to explore related Teams SDK file APIs, inline images, authentication, and messaging guidance.

* [Send and receive inline images](agents-inline-images.md)
* [Teams SDK overview](/microsoftteams/platform/teams-sdk/why)
* [File and Image Handling](https://microsoft.github.io/teams-sdk/csharp/in-depth-guides/file-handling/)
* [Receiving Files](https://microsoft.github.io/teams-sdk/csharp/in-depth-guides/file-handling/receiving-files/)
* [Sending messages](/microsoftteams/platform/teams-sdk/essentials/sending-messages/overview?pivots=csharp)
* [User authentication](/microsoftteams/platform/teams-sdk/in-depth-guides/user-authentication?tabs=portal&pivots=csharp)
