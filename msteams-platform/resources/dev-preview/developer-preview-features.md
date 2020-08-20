---
title: Features in the Public Developer Preview
description: Describes the features in the Public Developer Preview of Microsoft Teams
keywords: teams preview developer features
---

# Features in the Public Developer Preview for Microsoft Teams

The developer preview includes the following new features:

## Adaptive cards v1.2 support

Support for [Adaptive cards v1.2](https://github.com/microsoft/AdaptiveCards/releases/tag/v1.2.0) in Teams is now available to the general public. However, [Media elements](https://adaptivecards.io/explorer/Media.html) are currently not supported in Adaptive cards v1.2 on the Teams platform.

## Tabs single sign-on (SSO)

You can now use [single sign-on (SSO)](~/tabs/how-to/authentication/auth-aad-sso.md) to login and authenticate a user on desktop and mobile using the Teams JavaScript SDK from a web content page. One of the benefits is that a user never has to sign-in; and once they've consented to the app using their profile: they will automatically be signed-in to their tab (including mobile).

Our developer preview is available in manifest versions 1.5 and greater. Our current implementation can only get a limited amount of Graph APIs, however we provide a workaround to get additional Graph APIs using our existing authentication API.

## Calls and online meeting bots

With the addition of [Microsoft Graph APIs for calls and online meetings](/graph/api/resources/communications-api-overview?view=graph-rest-beta), Microsoft Teams apps can now interact with users in rich ways using voice and video. These APIs allow you to add new app features such as interactive voice response (IVR), call control, and access to real-time audio and/or video streams for calls and meetings, including desktop and app sharing.

We've added a new section on how to create and develop calls and online meetings bots, starting with the [overview](~/bots/calls-and-meetings/calls-meetings-bots-overview.md).
