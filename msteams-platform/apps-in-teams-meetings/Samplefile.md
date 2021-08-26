---
title: Enable and configure your apps for Teams meetings
author: surbhigupta
description: Enable and configure your apps for Teams meetings 
ms.topic: conceptual
---

# Training

Markdown editor trainig includes headings, images, bullets, hyperlinks, tables, etc.
This is a lightweight markup language.

## Heading 2

Content belongs to second level heading.

### Heading 3

Content belongs to third level heading.

### Note Syntax

> [!NOTE]

> * Note content goes here.
> * Note content goes here.

### Code

```json

"configurableTabs": [
    {
      "configurationUrl": "https://contoso.com/teamstab/configure",
      "canUpdateConfiguration": true,
      "scopes": [
        "team",
        "groupchat"
      ],
      "context":[
        "channelTab",
        "privateChatTab",
        "meetingChatTab",
        "meetingDetailsTab",
        "meetingSidePanel",
        "meetingStage"
     ]
    }
  ]
  ```

  ### Hyperlinks
  * [Before a Meeting](#before-a-meeting)
  * [After Meeting](after-a-meeting)

  ### Ordered List
  **To add ordered list, use 1**

  1. [List1](#before-a-meeting)
  1. **List 2**
  1. List 3

  ### Important

  > [!IMPORTANT]

  > Important data

  ### Gray background

  `Configurabletabs`


  ### Table

  | Heading | Heading | Heading |
  |----------|-----------|-----------|
  |a | b| c|
  |x | y| z|




