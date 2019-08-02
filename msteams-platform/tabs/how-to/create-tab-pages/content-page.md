---
title: Create a Content Page for Your Custom Tab
author: laujan
description: 
keywords: teams tabs group channel configurable 
ms.topic: conceptual
ms.author: laujan
---
# Create a Content Page for Your Tab

A custom tab allows you to enrich user experience by presenting your hosted web content within the Teams platform. See [Create a Content Page for Your Custom Tab](foo.md). A tab allows you to share your content in an easily accessible format. Whether you present your tab within the personal or channel/group scope, it is essentially an HTML page—the difference is how your tab content URL is set. See [What are custom tabs?](foo.md).

## Tab content and style guidelines

Your tab's overall objective of should be to provide access to meaningful and engaging content that has a practical value and an evident purpose. That does not mean that you should forego an appealing design but, you should focus on minimizing clutter by making your tab design clean, navigation intuitive, and content immersive. See [Content and conversations, all at once using tabs](~/resources/design/framework/tabs) and Microsoft Teams app approval process guidance](~/platform/publishing/office-store-approval#tabs)

## Integrate your code with Teams

For your tab to display in Teams, you must include the **Microsoft Teams JavaScript client SDK** and include a call to `microsoftTeams.initialize()` after your page loads. This is how your tab and the Teams client communicate:

```html
<!DOCTYPE html>
<html>
<head>
...
    <script src= 'https://statics.teams.microsoft.com/sdk/v1.4.3/js/MicrosoftTeams.min.js'></script>
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
>Don't copy/paste the `<script src="...">` URLs from this page, as they may not represent the latest version. To get the latest version of the SDK markup, always go to:
[Microsoft Teams JavaScript API (via CDN)](foo.com) or [Microsoft jQuery Releases on the CDN.](/aspnet/ajax/cdn/overview#jquery-releases-on-the-cdn)

### Deep links

You can create deep links to entities in Teams. Typically, these are used to create links that navigate to content and information within your tab. See [Create deep links to content and features in Microsoft Teams](foo.md)

### Task Modules

A task modules is essentially a tab inside a popup window.
Using the Microsoft Teams Tabs SDK you can invoke task modules from buttons, links or menus on your tab. See ([Using task modules in tabs](foo.md)]

### Valid Domains

Ensure that the all URL domains used in your tabs are included in the `validDomains` array in your [manifest](~/concepts/apps/apps-package). For more information, see [validDomains](~/resources/schema/manifest-schema#validdomains) in the manifest schema reference.

## Get Started

Ready to get started building? Here are a few guidelines:

Node.js

- [Quickstart: Create a custom personal tab with Node.js and the Yeoman Generator for Microsoft Teams](foo.md)
- [Quickstart: Create a custom channel and group tab with Node.js and the Yeoman Generator for Microsoft Teams](foo.md)

.NET

- [Quickstart: Create a Custom Personal Tab with ASP.NET Core](foo.md)
- [Quickstart: Create a Custom Personal Tab with ASP. NET Core MVC](foo.md)
- [Quickstart: Create a Custom Channel and Group Tab with ASP.NET Core](foo.md)
- [Quickstart: Create a Custom Channel and Group Tab with ASP.NET Core MVC](foo.md)
