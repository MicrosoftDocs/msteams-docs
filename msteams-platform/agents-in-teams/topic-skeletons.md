title: [Concept title – sentence case]  
description: [1–2 sentence summary of what this concept is and why it matters]  
ms.localizationpriority: medium  
ms.topic: concept  
ms.date: 07/02/2025  
---

# Concept - Overview Skeleton

Below are five reusable outline “skeletons.” Every new article can be produced by filling-in one of these skeletons with topic-specific headings/content. Each skeleton already follows your OUTPUT_TEMPLATE requirements (YAML header, word-count rules, mandatory “Next step” and “See also” sections, etc.).  

You can copy-paste a skeleton, replace the bracketed placeholders, and the outline is ready for SME drafting.

--------------------------------------------------------------------

1. Concept / Overview Skeleton

--------------------------------------------------------------------
FILE: [folder]/[article-name].md  
SOURCES:  

- [mapped legacy files here, if any]

OUTLINE
---

title: [Concept title – sentence case]  
description: [1–2 sentence summary of what this concept is and why it matters]  
ms.localizationpriority: medium  
ms.topic: concept  
ms.date: 07/02/2025  
---

# [Concept title]  

[Summarize the concept in 3-4 sentences. < 100 words]

## Why it matters  

[Explain the business / developer value in 2-3 bullets.]

## Key capabilities / components  

- Bullet 1  
- Bullet 2  
- Bullet 3  

## Architecture / high-level flow  

[Optional diagram call-out or numbered list (≤ 8 steps).]

## Limitations  

[1-2 sentences.]

## Next step  

[Link to the most logical how-to or deeper concept.]

## See also  

[1–3 related articles.]

--------------------------------------------------------------------

2. How-to / Step-by-Step Skeleton

--------------------------------------------------------------------
FILE: [folder]/[article-name].md  
SOURCES:  

- [legacy sources]

OUTLINE
---

title: [How-to title – imperative verb]  
description: [Brief task description]  
ms.localizationpriority: medium  
ms.topic: how-to  
ms.date: 07/02/2025  
---

# [Task title]  

[1-sentence goal statement.]

## Prerequisites  

[≤ 4 bullets with links.]

## Step 1 – [verb + object]  

[Instruction block (≤ 150 words).]

## Step 2 – …  

[Repeat as needed (max 8 steps).]

## Troubleshooting  

[Optional: 2-3 common errors + resolutions.]

## Code sample  

[1-sentence pointer plus list of GitHub sample paths.]

## Next step  

[Logical follow-up article.]

## See also  

[List of related guides.]

--------------------------------------------------------------------

3. Reference Skeleton (API / Schema / CLI)

--------------------------------------------------------------------
FILE: [folder]/[article-name].md  
SOURCES:  

- [legacy spec files]

OUTLINE
---

title: [Reference title]  
description: [What is documented here]  
ms.localizationpriority: medium  
ms.topic: reference  
ms.date: 07/02/2025  
---

# [Reference title]  

## Namespace / endpoint  

```
[code block]
```

### Parameters  

| Name | Type | Description |
|------|------|-------------|
| … | … | … |

### Response body  

```
[JSON schema]
```

### Status codes  

| Code | Meaning |
|------|---------|
| 200 | … |  
| … | … |

## Examples  

#### Request  

```
```  

#### Response  

```
```

## See also  

[Links to related APIs or SDK docs.]

--------------------------------------------------------------------

4. Design Guidance / Best-Practices Skeleton

--------------------------------------------------------------------
FILE: [folder]/[article-name].md  
SOURCES:  

- [design docs]

OUTLINE
---

title: [Design title]  
description: [Short design-focus description]  
ms.localizationpriority: medium  
ms.topic: design  
ms.date: 07/02/2025  
---

# [Design topic]  

[Context intro – 2-3 sentences.]

## UI principles  

### Do  

- Item  

### Don’t  

- Item  

## Layout & responsiveness  

[150-word section.]

## Theming & accessibility  

[100-word section.]

## Performance considerations  

[≤ 3 bullets.]

## Next step  

[Link to how-to or concept.]

## See also  

[Related design docs / UI Kit.]

--------------------------------------------------------------------

5. FAQ / Troubleshooting Skeleton

--------------------------------------------------------------------
FILE: [folder]/[article-name].md  
SOURCES:  

- [legacy faq/troubleshoot]

OUTLINE
---

title: [FAQ title]  
description: Frequently asked questions about [topic].  
ms.localizationpriority: medium  
ms.topic: troubleshooting  
ms.date: 07/02/2025  
---

# Frequently asked questions – [Topic]  

## Q1. [Question]  

A. [Concise answer – ≤ 120 words.]

## Q2. …  

A. …

*(Add as many Q/A pairs as needed; aim for ≤ 15 total.)*

## See also  

[List of deeper docs, support links.]

--------------------------------------------------------------------
Tagging & Metadata rules
• Set ms.topic to concept | how-to | reference | design | troubleshooting accordingly.  
• description should never exceed 160 chars for SEO.  
• Each outline **must** include “Next step” and “See also.”
