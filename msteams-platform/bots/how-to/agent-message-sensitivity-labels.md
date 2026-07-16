---
title: Add Citations and Sensitivity Labels to Agent Messages
description: Learn how to add citations and Microsoft Purview sensitivity labels to Microsoft Teams agent messages using Teams SDK.
ms.topic: how-to
ms.localizationpriority: medium
ms.date: 07/14/2026
---

# Add citations and sensitivity labels to agent messages

This article explains how to implement citations and sensitivity labels for agent responses that use enterprise content.

* Citations show where response content came from.
* Sensitivity labels show how response content should be handled.

For new implementations, send a **Microsoft Purview sensitivity label ID** in the message payload instead of relying on free-text label metadata.

Use this article to:

* Add citations to agent responses with Teams SDK.
* Add message-level and citation-level sensitivity labels.
* Decide when to use message-level versus citation-level labels.
* Understand rendering behavior and payload validation errors.

This article covers two related capabilities:

* [Citations](#add-citations) improve source transparency.
* [Sensitivity labels](#why-use-purview-sensitivity-labels) improve confidentiality signaling.

Because these capabilities often appear together in AI-generated responses, this article shows them in a single implementation flow.

> [!NOTE]
>
> Citations and sensitivity labels are supported for agent responses in personal chats, group chats, and channels, including GCC, GCC High, and DoD environments.

## When to use these features

Use citations when your response is based on retrievable sources such as files, messages, and emails.

Use sensitivity labels when your response contains sensitive content and you need a consistent confidentiality signal.

If your response includes citations from sensitive sources, add citation-level labels and a message-level label.

In practice, these two capabilities solve different trust questions for users:

* **Citations** answer "Where did this come from?"
* **Sensitivity labels** answer "How carefully should I handle this?"

Use them together for high-value scenarios such as policy summaries, legal/compliance responses, or responses derived from internal documents.

## Add citations

For agents built with **Teams SDK**, use `addCitation()` to add in-text references and citation metadata.

After you add citations, continue to [add sensitivity labels](#add-message-level-sensitivity-label) if your response contains sensitive content.

Each citation links an in-text marker (for example, `[1]`) to structured source metadata. This helps users inspect the source quickly and decide whether to trust or validate the response.

In Teams, citations render as inline footnote-style references such as `[1]` and `[2]`. When users hover over a citation, Teams shows the source title, abstract, and URL.

In grounded agent flows, citation positions are usually assigned during retrieval or tool execution. Preserve those positions when you build the final reply so the inline reference and citation metadata stay aligned.

In the Teams SDK TypeScript guidance, citations are typically attached to the final message activity after the app determines which citation markers are present in the generated text. This is especially useful for streamed responses, where the app emits text incrementally and then adds citations to the final marker activity.

Keep citation data concise and stable:

* Use a readable `name` so users recognize the source immediately.
* Include `url` only when users are allowed to navigate to the source.
* Keep `abstract` short and descriptive.
* Use `keywords` for discoverability, not as extra summary text.
* Keep citation `position` values stable throughout the turn.

## TypeScript pattern for streamed replies

For streamed agent responses, a common TypeScript pattern is:

1. Stream the generated text to the user.
2. Collect the final response text for the turn.
3. Extract the citation markers that appear in that final text.
4. Attach only those citations to the final activity.

This avoids emitting citations for sources that were retrieved but never referenced in the response.

The following example shows the pattern at a high level:

```typescript
function attachUsedCitations(activity: MessageActivity, fullText: string, citations: CitationEntry[]) {
  const usedPositions = new Set(
    [...fullText.matchAll(/\[(\d+)\]/g)].map((match) => Number(match[1]))
  );

  for (const citation of citations) {
    if (!usedPositions.has(citation.position)) {
      continue;
    }

    activity.addCitation(citation.position, {
      name: citation.title ?? `Source ${citation.position}`,
      abstract: citation.snippet ?? "No description available.",
      url: citation.url,
    });
  }
}

const finalMarker = new MessageActivity().addAiGenerated().addFeedback("custom");
attachUsedCitations(finalMarker, fullText, collectedCitations);
stream.emit(finalMarker);
```

Use this pattern if your agent builds responses from retrieval or tool outputs and streams the result before sending the final message metadata.

# [JavaScript](#tab/javascript)

```javascript
app.message(/citation/i, async ({ send }) => {
  const appearance = {
    name: "Contoso Design Spec",
    url: "https://example.com/spec",
    abstract: "Design specification used to generate this response.",
    keywords: ["design", "spec", "agent"],
    icon: "Microsoft Word",
  };

  await send(
    new MessageActivity("Here are the key updates from the spec [1]")
      .addCitation(1, appearance)
  );
});
```

# [C#](#tab/csharp)

```csharp
async Task SendCitations(IContext context)
{
  var message = new MessageActivity
  {
    Text = "Here are the key updates from the spec [1]"
  };

  message.AddCitation(1, new CitationAppearance
  {
    Name = "Contoso Design Spec",
    Url = "https://example.com/spec",
    Abstract = "Design specification used to generate this response.",
    Keywords = new List<string> { "design", "spec", "agent" },
    Icon = CitationIcon.MicrosoftWord
  });

  await context.Send(message);
}
```

# [Python](#tab/python)

```python
@app.on_message_pattern(re.compile(r"citation", re.IGNORECASE))
async def add_citations(ctx: ActivityContext[MessageActivity]):
    await ctx.send(
        MessageActivityInput(
            text="Here are the key updates from the spec [1]",
        ).add_citation(
            position=1,
            appearance=CitationAppearance(
                name="Contoso Design Spec",
                url="https://example.com/spec",
                abstract="Design specification used to generate this response.",
                keywords=["design", "spec", "agent"],
                icon=CitationIconName.MICROSOFT_WORD,
            ),
        )
    )
```

---

## Citation properties used in these examples

| Property | Type | Required | Description |
| -- | -- | -- | -- |
| `citation` | Object | Yes | Details of the citation. |
| `citation.@type` | String | Yes | Citation object type. Allowed value: `Claim`. |
| `citation.position` | Integer | Yes | Citation number. Must be unique in a message. |
| `citation.appearance` | Object | Yes | Citation appearance details. |
| `citation.appearance.@type` | String | Yes | Appearance object type. Allowed value: `DigitalDocument`. |
| `citation.appearance.name` | String | Yes | Citation title. Max 80 characters. |
| `citation.appearance.url` | String | No | Citation URL. |
| `citation.appearance.abstract` | String | No | Citation abstract. Max 160 characters. |
| `citation.appearance.keywords` | Array | No | Up to three keywords. Each keyword max 28 characters. |
| `citation.appearance.image.name` | String | No | Citation icon name. In Teams SDK `addCitation()` examples, this is provided as `icon` and mapped to the citation image metadata. |

These are the citation fields referenced in the snippets on this page.

If you need a full schema-level reference for every optional field, use the broader bot message formatting documentation in addition to this implementation guide.

## Attach only citations used in the response

When you generate the final response, attach only the citations whose positions actually appear in the response text. For example, if the response contains `[1]` and `[3]`, attach citation metadata only for positions `1` and `3`.

This keeps the response clean and avoids showing references the user never sees in the message body.

This pattern is especially important for grounded or streamed responses where your retrieval layer may produce more candidate sources than the final response uses.

If your agent streams text, collect the final text for the turn and then attach citations that match the positions present in that text.

This guidance aligns with the TypeScript Teams SDK in-depth guide, where citation attachment is treated as a final assembly step for the response activity.

> [!NOTE]
>
> * A maximum of 20 citations are displayed in a message.
> * Citations with Adaptive Cards are available in [public developer preview](../../resources/dev-preview/developer-preview-intro.md).

## Why use Purview sensitivity labels

Using tenant-defined Purview labels ensures that:

* Labels shown in agent responses stay consistent with labels used across Microsoft 365.
* Users see recognizable label names and descriptions.
* Agents avoid free-text label values that can be inconsistent.

This consistency matters because users often interpret the same label text across apps as the same policy intent. Sending Purview IDs helps prevent custom label text that looks valid but doesn't represent a tenant-defined classification.

## Developer contract

For new implementations, send the sensitivity label ID in the message entity (`usageInfo.@id`).

If an app sends both legacy title/description fields and label ID, Teams uses the **label ID**.

For citation-level labeling, use the same ID model in citation `usageInfo`.

Treat the label ID as the authoritative contract value. The displayed title and description are resolved from that ID by the platform.

> [!NOTE]
>
> Legacy title/description payloads remain available for backward compatibility, but they're not supported as the primary contract for new implementations.

## Get Purview label IDs

Common ways to get sensitivity label IDs:

* From source content APIs that already return label metadata.
* From Microsoft Graph sensitivity label APIs.

For Graph API documentation, see:

* [List sensitivity labels for a user](/graph/api/security-informationprotection-list-sensitivitylabels)

If your source content isn't in Microsoft 365, apply labels carefully so the label signal remains accurate.

Don't set a label unless your app can reliably derive it from source content or a policy-backed mapping.

For most agent patterns, you should capture the label ID as close to the content retrieval step as possible and preserve it through your response generation pipeline.

## Add message-level sensitivity label

The following example shows message-level labeling by ID.

Use message-level labeling when the response should be treated uniformly. This is the simplest pattern and is usually the right default for responses summarizing multiple sensitive sources.

```javascript
await context.sendActivity({
  type: ActivityTypes.Message,
  text: "Hey, I'm a friendly AI bot. This message is generated through AI [1]",
  entities: [
    {
      type: "https://schema.org/Message",
      "@type": "Message",
      "@context": "https://schema.org",
      usageInfo: {
        "@type": "CreativeWork",
        "@id": "purview-label-id",
      },
    },
  ],
});
```

## Add citation-level sensitivity labels

The following example shows message-level and citation-level labeling by ID.

Use citation-level labeling when different sources in the same response have different classifications. This gives users finer context when reviewing individual references.

```javascript
await context.sendActivity({
  type: ActivityTypes.Message,
  text: "Hey, I'm a friendly AI bot. This message is generated through AI [1]",
  entities: [
    {
      type: "https://schema.org/Message",
      "@type": "Message",
      "@context": "https://schema.org",
      usageInfo: {
        "@type": "CreativeWork",
        "@id": "purview-label-id",
      },
      citation: [
        {
          "@type": "Claim",
          position: 1,
          appearance: {
            "@type": "DigitalDocument",
            name: "Source document",
            url: "https://example.com/source",
            usageInfo: {
              "@type": "CreativeWork",
              "@id": "purview-label-id",
            },
          },
        },
      ],
    },
  ],
});
```

## Message label versus citation labels

Use message-level sensitivity labels when the whole response should be treated consistently.

Use citation-level labels when only specific references are sensitive.

If both are present, Teams can compute a top-level message label from available signals.

If you need a simple rule, use both levels and ensure the message-level label is at least as restrictive as the most sensitive citation.

This helps avoid under-labeling the overall response when one source is significantly more sensitive than others.

## Label rendering behavior

Users can hover over the sensitivity icon to view label details.

Teams may compute the top-level label from available sensitivity signals. If citation-level labels imply higher sensitivity, the displayed top-level label can reflect the highest applicable sensitivity.

Teams also indicates that the sensitivity label was set by the agent/bot.

From a user perspective, this preserves two important signals:

* The response has a tenant-recognized classification label.
* The label assignment came from the bot workflow, not from automatic document inheritance.

## Best practices

* Use source-of-truth label IDs from Microsoft 365 content whenever available.
* Use message-level labels when the full response is sensitive or when citation-level labeling is not practical.
* Use citation-level labels when specific sources have different sensitivity levels.
* If uncertain, include message-level and citation-level labels.
* Keep message-level label at least as restrictive as the most sensitive cited source.

Also consider operational practices:

* Log label ID resolution failures so you can detect broken source integrations quickly.
* Keep a defensive fallback path that omits labels instead of sending guessed labels.
* Validate label IDs before send to reduce avoidable 400 errors.

## Error handling

| Error code | Description |
| --- | --- |
| 400 | Multiple root message entities found under `entities` array. |
| 400 | Error parsing message entity from `entities` array. |
| 400 | Bot message with more than 20 citations. |
| 400 | The `appearance` object is empty. |
| 400 | Error while parsing citation entity with ID: X. |
| 400 | Citation-level `usageInfo.@id` doesn't match message-level `usageInfo.@id` in at least one instance. |
| 400 | Multiple citation-level `usageInfo` entries share the same `@id` but have conflicting metadata. |

For Graph API permissions and API-specific error details, see Microsoft Graph documentation.

For choosing label IDs, see [Get Purview label IDs](#get-purview-label-ids).

When troubleshooting, start in this order:

1. Validate payload structure and required fields.
2. Confirm message-level and citation-level IDs are consistent for the response.
3. Verify the ID exists and is accessible in the current tenant context.

## See also

* [Enhance AI-generated bot messages](bot-messages-ai-generated-content.md)
* [Streaming UX in bots](~/bots/streaming-ux.md)
