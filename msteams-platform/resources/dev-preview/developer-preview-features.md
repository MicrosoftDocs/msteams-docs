---
title: Features in the Public Developer Preview
description: Describes the features in the Public Developer Preview of Microsoft Teams
keywords: teams preview developer features
ms.date: 05/20/2019
---

# Features in the Public Developer Preview for Microsoft Teams

The developer preview includes the following new features:

## Embed Share-to-Teams button on your website

You can now embed a Share-to-Teams button on your website that will insert a message into a channel. For Education tenants, you can also create an assigment from an external website using the same functionality. See [Share-to-Teams](~/share-to-teams.md).

## Respond to message extension submit action with an adaptive card message sent from a bot

You can also respond to the submit action by inserting a message with an [adaptive card](~/concepts/cards/cards.md#adaptive-cards) into the channel with a bot. Your user will be able to preview the message before submitting it, and potentially edit/interact with it as well. This can be very useful in scenarios where you need to gather information from your users before creating an adaptive card response. The following scenario shows how you can use this flow to configure a poll without including the configuration steps in the channel message. See [Respond with an adaptive card message sent from a bot](~/concepts/messaging-extensions/create-extensions.md#respond-with-an-adaptive-card-message-sent-from-a-bot).

## Calls and online meeting bots

With the addition of [Microsoft Graph APIs for calls and online meetings](https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/resources/calls-api-overview.md), Microsoft Teams apps can now interact with users in rich ways using voice and video. These APIs allow you to add new app features such as interactive voice response (IVR), call control, and access to real-time audio and/or video streams for calls and meetings, including desktop and app sharing.

We've added a new section on how to create and develop calls and online meetings bots, starting with the [overview](~/concepts/calls-and-meetings/calls-meetings-bots-overview.md).