---
title: llms.txt
description: "Use Teams SDK llms.txt files to give AI coding assistants the context they need. Find small and full docs for TypeScript, Python, and C# and start building."
ms.date: 11/03/2026
ms.topic: article
---

# llms.txt

The Teams SDK publishes [llms.txt](https://llmstxt.org) files, plain-text versions of the documentation optimized for AI coding assistants. Point your tool at the right file and it gets the context it needs to help you build Teams apps.

## Available files

### Root

High-level SDK overview with links to reference guides.

```
https://microsoft.github.io/teams-sdk/llms_docs/llms.txt
```

:::tip
Instead of manually providing URLs, you can install the [`teams-dev` agent skill](coding-agent-skill.md) which automatically gives your coding assistant the right context.
:::

### Per-language

# [TypeScript](#tab/typescript)

**Small** — navigation index, the assistant fetches individual pages as needed.

```
https://microsoft.github.io/teams-sdk/llms_docs/llms_typescript.txt
```

**Full** — complete documentation in a single file, best for tools with large context windows.

```
https://microsoft.github.io/teams-sdk/llms_docs/llms_typescript_full.txt
```

# [Python](#tab/python)

**Small** — navigation index, the assistant fetches individual pages as needed.

```
https://microsoft.github.io/teams-sdk/llms_docs/llms_python.txt
```

**Full** — complete documentation in a single file, best for tools with large context windows.

```
https://microsoft.github.io/teams-sdk/llms_docs/llms_python_full.txt
```

# [C#](#tab/csharp

)
**Small** — navigation index, the assistant fetches individual pages as needed.

```
https://microsoft.github.io/teams-sdk/llms_docs/llms_csharp.txt
```

**Full** — complete documentation in a single file, best for tools with large context windows.

```
https://microsoft.github.io/teams-sdk/llms_docs/llms_csharp_full.txt
```

---
