---
title: Develop message extensions
description: In this module, learn about the types of message extensions, user scenarios, and how to develop message extensions for Microsoft Teams.
ms.topic: overview
ms.localizationpriority: medium
ms.date: 04/02/2023
---
# Develop message extensions for Microsoft Teams

[!include[v3-to-v4-SDK-pointer](~/includes/v3-to-v4-pointer-me.md)]

Message extensions are a powerful way for users to engage with your app from Microsoft Teams. With this capability, users can query or post information to and from your service and post that information, in the form of cards, right into a message.

![Example of message extension card](~/assets/images/compose-extensions/ceexample.png)

Message extensions appear along the bottom of the compose box. A few are built in, such as Emoji, gif, and Sticker. Choose the **More Options** (**&#8943;**) button to see other message extensions, including those you add from the app gallery or upload yourself.

How would you use message extensions? Here are a few possibilities:

* Work items and bugs.
* Customer support tickets.
* Usage charts and reports.
* Images and media content.
* Sales opportunities and leads.

## Types of message extensions

There's primarily two kinds of message extensions you can create for Teams today. The following topics guide you through the process of creating them:

* [Search based message extensions](~/resources/messaging-extension-v3/search-extensions.md): Query your service for information and insert that into a message. Example: Look up a work item
* [Action-based message extensions](~/resources/messaging-extension-v3/create-extensions.md): Collect information from the user and post to a third party service. Example: Create a work item
