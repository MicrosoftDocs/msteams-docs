---
title: Reorder personal app tabs
description: How to reorder personal app static tabs in your personal app
keywords: teams tabs development
---

# Reorder personal app tabs

Starting with manifest version 1.7 developers can rearrange all tabs in their personal app. In particular, a developer can move the “bot chat” tab (which has always defaulted to the first position) anywhere in the personal app tab header. We’ve declared two reserved tab entityId keywords: “conversations” and “about”.

## Moving the “Chat/Conversation” tab

If you create a bot with a “personal” scope, it will always show up in the first tab position in a personal app. If you wish to move it to another position, you need to add a static tab object to your manifest with the reserved keyword “conversations”. Wherever you add the “conversations” tab in the “staticTabs” array, that’s where the conversation tab will appear on web and desktop. 

``` jsonc
"staticTabs": [
    {
        // … other static tabs
    },
    {
        "entityId": "conversations",
        "scopes": [
            "personal"
        ]
    }
],
```

> [!NOTE]
> Note that this behavior is not reflected on mobile since the personal bot chat already has a dedicated place within the personal app.

## Moving the “About” tab

The “About” tab always defaults to the end of the personal app tab header bar. If you wish to move it to another position, you need to use the “about” entityId.

```jsonc
"staticTabs": [
    {
        // … other static tabs
    },
    {
        "entityId": "about",
        "scopes": [
            "personal"
        ]
    }
],
```
> [!NOTE]
> Note that the about tab is not shown on mobile.

## Example code

```jsonc
"staticTabs": [
  {
    "entityId": "homeTab",
    "name": "Home",
    "contentUrl": "https://www.contoso.com",
    "websiteUrl": " https://www.contoso.com ",
    "scopes": [
      "personal"
    ]
  },
  {
    "entityId": "about",
    "scopes": [
      "personal"
    ]
  },
  {
    "entityId": "conversations",
    "scopes": [
      "personal"
    ]
  }
],
```
