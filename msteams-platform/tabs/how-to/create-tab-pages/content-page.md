---
title: Create a content page
author: laujan
description: 
keywords: teams tabs group channel configurable static
ms.topic: conceptual
ms.author: v-laujan
---
# Create a content page for your tab

A content page is a webpage that is rendered within the Teams client. Typically these are part of:

* A personal-scoped custom tab - In this instance the content page is the first page the user encounters.
* A channel/group custom tab - After the user pins and configures the tab in the appropriate context, the content page is displayed.
* A [task module](foo.md) - You can create a content page and embed it as a webview inside a task module. The page will be rendered inside the modal popup.

This article is specific to using content pages as tabs; however the majority of the guidance here would apply regardless of how the content page is presented to the end-user.

## Tab content and style guidelines

Your tab's overall objective should be to provide access to meaningful and engaging content that has a practical value and an evident purpose. That does not mean that you should forego a pleasing style, but you should focus on minimizing clutter by making your tab design clean, navigation intuitive, and content immersive. See [Content and conversations, all at once using tabs](~/resources/design/framework/tabs) and [Microsoft Teams app approval process guidance](~/platform/publishing/office-store-approval#tabs)

## Integrate your code with Teams

For your page to display in Teams, you must include the [Microsoft Teams JavaScript client SDK](~/foo.md) and include a call to `microsoftTeams.initialize()` after your page loads. That is how your page and the Teams client communicate:

```html
<!DOCTYPE html>
<html>
<head>
...
    <script src= 'https://statics.teams.microsoft.com/sdk/v1.5.0/js/MicrosoftTeams.min.js'></script>
...
</head>

<body>
...
    <script>
    microsoftTeams.initialize();
    </script>
...
</body>
```

>[!IMPORTANT]
>Don't copy/paste the `<script src="...">` URLs from this page, as it might not represent the latest version. To get the latest version of the SDK markup, always go to:
[Microsoft Teams JavaScript API (via CDN)](static.foo.com).

## Accessing additional content

### Using the SDK to interact with Teams

The [Teams client JavaScript SDK](~/tabs/how-to/using-teams-client-sdk.md) provides many additional functions you may find useful while developer your content page.

### Deep links

You can create deep links to entities in Teams. Typically, these are used to create links that navigate to content and information within your tab. See [Create deep links to content and features in Microsoft Teams](foo.md)

### Task Modules

A task module is a modal popup-like experience that you can trigger from your tab. Typically in a content page you do not want to navigate your user through multiple pages. Instead, you will use task modules to present forms for gathering additional information, displaying the details of an item in a list, or any other time you need to present the user with additional information. The task modules themselves can be additional content pages, or created completely using Adaptive Cards. See [Using task modules in tabs](foo.md) for complete information.

### Valid Domains

Ensure that the all URL domains used in your tabs are included in the `validDomains` array in your [manifest](~/concepts/apps/apps-package). For more information, see [validDomains](~/resources/schema/manifest-schema#validdomains) in the manifest schema reference. However, be mindful that the core functionality of your tab exists within Teams and not outside of Teams.

## Get Started

Ready to get started building?

Node.js

- [Quickstart: Create a custom personal tab with Node.js and the Yeoman Generator for Microsoft Teams](foo.md)
- [Quickstart: Create a custom channel and group tab with Node.js and the Yeoman Generator for Microsoft Teams](foo.md)

.NET

- [Quickstart: Create a Custom Personal Tab with ASP.NET Core](foo.md)
- [Quickstart: Create a Custom Personal Tab with ASP. NET Core MVC](foo.md)
- [Quickstart: Create a Custom Channel and Group Tab with ASP.NET Core](foo.md)
- [Quickstart: Create a Custom Channel and Group Tab with ASP.NET Core MVC](foo.md)
