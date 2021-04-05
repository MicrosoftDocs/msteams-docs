---
title: Features in the Public Developer Preview
description: Details the features in the Microsoft Teams Public Developer Preview
ms.topic: reference
keywords: teams preview developer features
---

# Features in the Public Developer Preview for Microsoft Teams

The developer preview includes the following new features:

## App customization

You can now enable Teams admin to customize your apps based on the organization's need. Use the [app customization feature](~/concepts/design/design-teams-app-overview.md) to rebrand the apps.

## Tabs single sign-on (SSO)

You can now use [single sign-on (SSO)](~/tabs/how-to/authentication/auth-aad-sso.md) to login and authenticate a user on desktop and mobile using the Teams JavaScript SDK from a web content page. One of the benefits is that a user never has to sign-in; and once they've consented to the app using their profile: they will automatically be signed-in to their tab (including mobile).

Our developer preview is available in manifest versions 1.5 and greater. Our current implementation can only get a limited amount of Graph APIs, however we provide a workaround to get additional Graph APIs using our existing authentication API.

## Calls and online meeting bots

With the addition of [Microsoft Graph APIs for calls and online meetings](/graph/api/resources/communications-api-overview?view=graph-rest-beta), Microsoft Teams apps can now interact with users in rich ways using voice and video. These APIs allow you to add new app features such as interactive voice response (IVR), call control, and access to real-time audio and/or video streams for calls and meetings, including desktop and app sharing.

We've added a new section on how to create and develop calls and online meetings bots, starting with the [overview](~/bots/calls-and-meetings/calls-meetings-bots-overview.md).


## Image enlarge support

It is now possible for bots to indicate which images shared in Adaptive Cards in Teams are allowed to be enlarged. This is useful for scenarios like sharing detailed step-by-step visual guides via bots which might be hard to read for users otherwise. To make an image expandable, just flag it `allowExpand: true` as shown below.

```json
    {
      "type": "Image",
      "url": "https://picsum.photos/200/200?image=110",
      "msTeams": {
        "allowExpand": true
      }
    }
```
This will cause Teams web/desktop client to render an element on hover over the image to allow the user to expand the image.

