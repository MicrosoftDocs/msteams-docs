---
title: Send and receive inline images
description: Learn how agents receive and send inline images in Microsoft Teams with Teams SDK.
ms.date: 10/13/2026
author: nickwalkmsft
ms.author: nickwalk
ms.reviewer: nickwalk
ms.localizationpriority: medium
ms.topic: how-to
ms.owner: angovil
zone_pivot_groups: teams-sdk-languages
---
# Send and receive inline images

An inline image is part of the message and renders directly in a Microsoft Teams conversation instead of appearing as stored documents in the conversation's **Shared** tab. Teams represents each image as an activity attachment with an image MIME type and a hosted URL or base64 data URI.

Use [Teams SDK](/microsoftteams/platform/teams-sdk/welcome) to download images that users paste into messages and to send images from hosted URLs or in-memory bytes. For documents stored in OneDrive or SharePoint, see [Send and receive files](bots-filesv4.md).

> [!NOTE]
>
> In GCC High, DoD, and Teams operated by 21Vianet, agents can use a base64 image attachment to include an image in a message even though document-file workflows aren't supported.

## User experience

Understand how inline images appear and behave so you can select the right presentation for visual content. Users can:

* View an image that an agent sends with a message text and a base64 image positioned within formatted message text.
* Paste an image that renders at its position in a composed message.
* Interact with an image included in an Adaptive Card.

Use a hosted attachment for a standalone image, base64 HTML/XML content for exact placement, or an Adaptive Card when the image belongs to interactive content.

## Developer experience

Choose an image representation based on where the bytes are stored and how the image should appear. The following options match the implementation order in this article:

| Requirement | Recommended approach |
| --- | --- |
| Receive an image pasted into a message | Inspect activity attachments and use the authenticated SDK HTTP client |
| Send an image beside message text | Image attachment with a hosted URL or base64 data URI |
| Position an image within formatted text | Base64 image in HTML/XML content |
| Add an image to interactive content | Adaptive Card `Image` element |

The activity attachment collection contains the image payload and any HTML layout information. Inline images aren't exposed through the Teams SDK file accessor.

| Operation | Personal chat | Group chat | Channel | Requirement |
| --- | --- | --- | --- | --- |
| Receive inline images | Supported through activity attachments | Use activity attachments | Use activity attachments | Download with the app's authenticated SDK HTTP client. |
| Send inline images | Supported | Supported | Supported | No Graph permission or user sign-in is required. |

## Work with inline images

Work with inline images when users or agents need visual content rendered directly in a conversation instead of as a stored document. Use authenticated activity attachments to receive images and image attachments or HTML/XML content to send them.

### Receive inline images

An inline image isn't exposed through the Teams SDK file accessor. An inbound message commonly includes an `image/*` attachment with the authenticated download URL and a `text/html` attachment that preserves the image position.

Use the `image/*` attachment as the canonical source. Don't use the `<img src>` URL from the HTML attachment to download the image.

::: zone pivot="teams-sdk-csharp"

```csharp
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Teams.Apps.Clients;
using Microsoft.Teams.Apps.Schema;

HttpClient imageClient = app.Services
    .GetRequiredService<IHttpClientFactory>()
    .CreateClient(nameof(ApiClient));

teams.OnMessage(async (context, cancellationToken) =>
{
    TeamsAttachment? image =
        context.Activity.Attachments?.FirstOrDefault(
            attachment =>
                attachment.ContentType is not null &&
                attachment.ContentType.Value.StartsWith(
                    "image/",
                    StringComparison.OrdinalIgnoreCase) &&
                attachment.ContentUrl is not null);

    if (image?.ContentUrl is not Uri contentUrl)
    {
        return;
    }

    using HttpResponseMessage response =
        await imageClient.GetAsync(
            contentUrl,
            HttpCompletionOption.ResponseHeadersRead,
            cancellationToken);

    response.EnsureSuccessStatusCode();

    byte[] bytes =
        await response.Content.ReadAsByteArrayAsync(
            cancellationToken);

    // Process the image bytes.
});
```

Key APIs and values:

* `nameof(ApiClient)`: Select the SDK client with platform authentication.
* `ContentType`: Match an `image/*` MIME type case-insensitively.
* `ContentUrl`: Use the canonical authenticated image download URL.
* `ResponseHeadersRead`: Begin processing without buffering response content first.
* `EnsureSuccessStatusCode`: Fail explicitly when image retrieval is unsuccessful.

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
app.on('message', async ({ activity }) => {
  const image = activity.attachments?.find(
    (attachment) =>
      attachment.contentType?.toLowerCase().startsWith('image/') &&
      attachment.contentUrl
  );

  if (image?.contentUrl) {
    const response = await app.api.http.get<ArrayBuffer>(
      image.contentUrl,
      { responseType: 'arraybuffer' }
    );
    const bytes = Buffer.from(response.data);

    // Process the image bytes.
  }
});
```

Key APIs and values:

* `activity.attachments`: Search all inbound message attachments.
* `contentType`: Match an `image/*` MIME type case-insensitively.
* `contentUrl`: Use the canonical authenticated image download URL.
* `app.api.http`: Download bytes with the SDK's authenticated client.
* `responseType`: Set `arraybuffer` to receive binary image content.

::: zone-end

::: zone pivot="teams-sdk-python"

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]) -> None:
    image = next(
        (
            attachment
            for attachment in (ctx.activity.attachments or [])
            if attachment.content_type
            and attachment.content_type.lower().startswith("image/")
            and attachment.content_url
        ),
        None,
    )

    if image and image.content_url:
        response = await app.api.http.get(image.content_url)
        image_bytes = response.content

        # Process the image bytes.
```

Key APIs and values:

* `ctx.activity.attachments`: Search all inbound message attachments.
* `content_type`: Match an `image/*` MIME type case-insensitively.
* `content_url`: Use the canonical authenticated image download URL.
* `app.api.http`: Download bytes with the SDK's authenticated client.
* `response.content`: Access the downloaded binary image content.

::: zone-end

Process the bytes directly when possible. Convert them to base64 only when a downstream API requires it, and preserve the attachment's actual MIME type.

### Send an inline image

An outbound inline image uses an image MIME type in `ContentType` and either a reachable HTTPS URL or a base64 data URI in `ContentUrl`. Sending doesn't upload the image to OneDrive or SharePoint and requires no Graph permission or user sign-in.

Choose a hosted URL for externally available images or base64 data for small images held by your app, then create the corresponding outgoing message attachment.

Teams supports inline images with the following limits:

| Limit | Value |
| --- | --- |
| Maximum dimensions | 1024 x 1024 pixels |
| Maximum image size | 1 MB |
| Supported formats | PNG, JPEG, and GIF |
| Animated GIF | Not supported |
| SDK validation | Not performed |

> [!WARNING]
>
> An image outside the supported dimensions, size, or format can be accepted by the send API but fail to render in the Teams client.

#### Send an image from a hosted URL

Use a hosted URL when the image is already available through a public HTTPS endpoint or is too large to embed efficiently. Add the reachable URL and matching MIME type to an image attachment.

::: zone pivot="teams-sdk-csharp"

```csharp
TeamsAttachment image = TeamsAttachment.CreateBuilder()
    .WithContentType(new AttachmentContentType("image/png"))
    .WithContentUrl(new Uri("https://contoso.com/charts/weekly.png"))
    .WithName("weekly.png")
    .Build();

await context.SendAsync(
    new MessageActivityInput()
        .WithText("Here is the latest chart:")
        .AddAttachment(image),
    cancellationToken);
```

Key properties and values:

* `ContentType`: Set the MIME type matching hosted image bytes.
* `ContentUrl`: Set a publicly reachable HTTPS image URL.
* `Name`: Add an optional display name for the image.
* `AddAttachment`: Attach the image to the outgoing message.

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
app.on('message', async ({ send }) => {
  await send(
    new MessageActivityInput('Here is the latest chart:')
      .addAttachments({
        contentType: 'image/png',
        contentUrl: 'https://contoso.com/charts/weekly.png',
        name: 'weekly.png'
      })
  );
});
```

Key properties and values:

* `contentType`: Set the MIME type matching hosted image bytes.
* `contentUrl`: Set a publicly reachable HTTPS image URL.
* `name`: Add an optional display name for the image.
* `addAttachments`: Attach the image to the outgoing message.

::: zone-end

::: zone pivot="teams-sdk-python"

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]) -> None:
    await ctx.send(
        MessageActivityInput(text="Here is the latest chart:").add_attachments(
            Attachment(
                content_type="image/png",
                content_url="https://contoso.com/charts/weekly.png",
                name="weekly.png",
            )
        )
    )
```

Key properties and values:

* `content_type`: Set the MIME type matching hosted image bytes.
* `content_url`: Set a publicly reachable HTTPS image URL.
* `name`: Add an optional display name for the image.
* `add_attachments`: Attach the image to the outgoing message.

::: zone-end

The URL must be reachable by the Teams client without agent credentials. Prefer this approach for images that aren't small.

#### Send image bytes as base64

Use a base64 data URI when image bytes exist only in your app, such as for a generated icon, thumbnail, or chart. Encode the bytes, preserve the correct MIME type, and attach the resulting data URI to the message.

::: zone pivot="teams-sdk-csharp"

```csharp
byte[] bytes = await File.ReadAllBytesAsync(
    "./charts/weekly.png",
    cancellationToken);

string dataUri =
    $"data:image/png;base64,{Convert.ToBase64String(bytes)}";

TeamsAttachment image = TeamsAttachment.CreateBuilder()
    .WithContentType(new AttachmentContentType("image/png"))
    .WithContentUrl(new Uri(dataUri))
    .WithName("weekly.png")
    .Build();

await context.SendAsync(
    new MessageActivityInput()
        .WithText("Here is the latest chart:")
        .AddAttachment(image),
    cancellationToken);
```

Key properties and values:

* `dataUri`: Prefix base64 bytes with the matching MIME type.
* `ContentType`: Match the data URI and actual image format.
* `ContentUrl`: Wrap the complete data URI in `Uri`.
* `Name`: Add an optional filename matching the image format.

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
app.on('message', async ({ send }) => {
  const bytes = await readFile('./charts/weekly.png');

  await send(
    new MessageActivityInput('Here is the latest chart:')
      .addAttachments({
        contentType: 'image/png',
        contentUrl: `data:image/png;base64,${bytes.toString('base64')}`,
        name: 'weekly.png'
      })
  );
});
```

Key properties and values:

* `contentUrl`: Prefix base64 bytes with the matching MIME type.
* `contentType`: Match the data URI and actual image format.
* `bytes.toString('base64')`: Encode the image bytes for the data URI.
* `name`: Add an optional filename matching the image format.

::: zone-end

::: zone pivot="teams-sdk-python"

```python
@app.on_message
async def handle_message(ctx: ActivityContext[MessageActivity]) -> None:
    encoded = b64encode(
        Path("./charts/weekly.png").read_bytes()
    ).decode("ascii")

    await ctx.send(
        MessageActivityInput(text="Here is the latest chart:").add_attachments(
            Attachment(
                content_type="image/png",
                content_url=f"data:image/png;base64,{encoded}",
                name="weekly.png",
            )
        )
    )
```

Key properties and values:

* `content_url`: Prefix base64 bytes with the matching MIME type.
* `content_type`: Match the data URI and actual image format.
* `b64encode`: Encode the image bytes for the data URI.
* `name`: Add an optional filename matching the image format.

::: zone-end

Base64 increases payload size by approximately one-third. Use it for small generated images and use a hosted URL for larger images.

#### Position an image within message text

Use HTML/XML content to control image placement and dimensions:

::: zone pivot="teams-sdk-csharp"

```csharp
string encoded = Convert.ToBase64String(
    await File.ReadAllBytesAsync(
        "./charts/weekly.png",
        cancellationToken));

await context.SendAsync(
    new MessageActivityInput()
        .WithText(
            $"<div>Revenue is up." +
            $"<img src=\"data:image/png;base64,{encoded}\"/>" +
            $"Questions?</div>")
        .WithTextFormat(TextFormats.Xml),
    cancellationToken);
```

Key properties and values:

* `src`: Use a base64 data URI for embedded images.
* `TextFormats.Xml`: Enable HTML elements within the message body.
* `height` and `width`: Add optional dimensions to the image element.

::: zone-end

::: zone pivot="teams-sdk-typescript"

```typescript
app.on('message', async ({ send }) => {
  const bytes = await readFile('./charts/weekly.png');
  const encoded = bytes.toString('base64');

  await send(
    new MessageActivityInput(
      `<div>Revenue is up.` +
      `<img src="data:image/png;base64,${encoded}"/>` +
      `Questions?</div>`
    ).withTextFormat('xml')
  );
});
```

Key properties and values:

* `src`: Use a base64 data URI for embedded images.
* `withTextFormat('xml')`: Enable HTML elements in the message body.
* `height` and `width`: Add optional dimensions to the image element.

::: zone-end

::: zone pivot="teams-sdk-python"

```python
@app.on_message
async def send_positioned_image(
    ctx: ActivityContext[MessageActivity],
) -> None:
    encoded = base64.b64encode(
        Path("./charts/weekly.png").read_bytes()
    ).decode("ascii")

    await ctx.send(
        MessageActivityInput(
            text=(
                '<div>Revenue is up.'
                f'<img src="data:image/png;base64,{encoded}"/>'
                'Questions?</div>'
            )
        ).with_text_format("xml")
    )
```

Key properties and values:

* `src`: Use a base64 data URI for embedded images.
* `with_text_format("xml")`: Enable HTML elements in the message body.
* `height` and `width`: Add optional dimensions to the image element.

::: zone-end

An HTTPS `<img src>` isn't uploaded or rewritten. Use a hosted image attachment instead. Every embedded image counts toward the message payload, and exceeding the limit can reject the entire message.

For multiple standalone images, add each attachment and select a supported layout, such as list or carousel. For an image within interactive content, use an Adaptive Card `Image` element. For streamed responses, add attachments only to the final message because intermediate typing activities don't carry attachments.

## Handle errors

Handle retrieval failures separately from image validation and rendering failures so users receive an actionable response.

| Status code | Error code | Description | Developer action |
| --- | --- | --- | --- |
| HTTP 4xx | Authenticated image request failed | The platform rejected the request for the inbound image URL. | Use the authenticated SDK HTTP client, preserve the response status, and verify that the app can access the message attachment. |
| HTTP 5xx | Image service unavailable | Teams or the attachment service couldn't complete the download. | Preserve the original error and retry according to service guidance. |
| Not applicable | Invalid image attachment | The attachment has no image MIME type or no content URL. | Skip the attachment and inspect the remaining activity attachments. |
| Not applicable | Hosted image unavailable | The Teams client can't reach a hosted image URL without the agent's credentials. | Use a publicly reachable HTTPS URL or send a base64 image. |
| Not applicable | Image rendering failed | The MIME type, format, size, or dimensions are unsupported. | Match the MIME type to the bytes and validate the image before sending. |
| Not applicable | Message payload rejected | Base64 image content causes the message to exceed its payload limit. | Reduce the image size or use a hosted URL. |

## Design guidelines and best practices

Apply these guidelines to create reliable and accessible inline-image experiences. Review them before processing or sending image content.

* Tell users what image the agent received or generated and what it did with the content.
* Use the authenticated SDK HTTP client for inbound image URLs.
* Search all attachments instead of assuming the first attachment is an image.
* Use the `image/*` attachment as the canonical download source, not the HTML `<img src>` URL.
* Preserve and validate the actual image MIME type.
* Keep base64 images small and prefer hosted URLs for larger images.
* Ensure hosted image URLs are reachable without agent credentials.
* Validate image size, dimensions, and format before sending.
* Add meaningful alternative text when the image is part of an Adaptive Card.
* Use HTML/XML only when exact image placement or dimensions are required.
* Add attachments to the final streamed message because intermediate typing activities don't carry attachments.
* Don't log image bytes or authenticated attachment URLs.
* Propagate cancellation and preserve HTTP errors for diagnostics.

## See also

Use these resources to explore related Teams SDK image APIs, file handling, cards, and messaging guidance.

* [Send and receive files](bots-filesv4.md)
* [Teams SDK overview](/microsoftteams/platform/teams-sdk/why)
* [File and Image Handling](https://microsoft.github.io/teams-sdk/csharp/in-depth-guides/file-handling/)
* [Receiving Inline Images](https://microsoft.github.io/teams-sdk/csharp/in-depth-guides/file-handling/receiving-inline-images/)
* [Sending Inline Images](https://microsoft.github.io/teams-sdk/csharp/in-depth-guides/file-handling/sending-inline-images/)
* [Sending messages](/microsoftteams/platform/teams-sdk/essentials/sending-messages/overview?pivots=csharp)
* [Adaptive Cards](/microsoftteams/platform/task-modules-and-cards/cards/cards-reference)
