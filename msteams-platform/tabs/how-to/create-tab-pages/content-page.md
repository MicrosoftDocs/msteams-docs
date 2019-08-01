---
title: Create a Content Page for Your Custom Tab
author: laujan
description: 
keywords: teams tabs group channel configurable 
ms.topic: conceptual
ms.author: laujan
---
# Create a Content Page for Your Custom Tab

A custom tab allows you to enrich user experience by presenting your hosted web content within the Teams platform. See [Create a Content Page for Your Custom Tab](foo.md). Whether you present your tab within the channel/group or personal scope, it will be an IFramed HTML content page—the difference is how your tab page content is set. See [Requirements for tab pages in Microsoft Teams](foo.md).

## Integrate your code with Teams

### Teams Library

Within your content page, you’ll add a reference to [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client) using script tags. In addition, your code will call `microsoftTeams.initialize()` when the page loads.

### Teams Manifest

Your code is submitted to the Teams platform via a Teams app—a package containing two specified images and a `manifest.json` file citing your app’s capabilities and referencing your content URL:

- A **full color icon** measuring 192 x 192 pixels.
- A **transparent outline icon** measuring 32 x 32 pixels.
- A [Reference: Manifest schema for Microsoft Teams](foo.md) compliant `manifest.json` file specifying your app’s attributes. Your manifest must conform to the schema hosted at <https://developer.microsoft.com/json-schemas/teams/v1.5/MicrosoftTeams.schema.json>.

#### Personal Tabs

The displayed content for personal tabs is the same for all users and is set directly in your manifest by the `contentUrl` property in the `staticTabs` array:

```json
"staticTabs": [
    {
      "entityId": "idForPage",
      "name": "Display name for tab",
      "contentUrl": "https:// yourURL.com/content ",
      "websiteUrl": "https://yourURL.com/website",
      "scopes": [ "personal" ]
    }
```

#### Channel/group content page

For channel/group tabs you'll set the content URL from a configuration page based upon parameter variables provided by the user. See [Create a Content Page for Your Custom Tab](foo.md):

```json
"configurableTabs": [
    {
      "configurationUrl": "https://yourURL.com/configure",
      "canUpdateConfiguration": true,
      "scopes": [ "team", "groupchat" ]
    }
```

### Host your content

Your content needs to be available on a hosted URL available from the cloud using HTTPS endpoints. For testing, you can use a proxy, such as [ngrok](https://ngrok.com/), to expose your local port to an internet-facing URL.

## Create and upload your app package to Teams

There are several ways to create your app package and upload it to Teams. The following table outlines the most common scenarios:

|App package contents| Zipped?       | Direct Upload||Use App Studio|
| ---------------| :-----------------|-----------|---|-------------- |
|- Two required images<br>- Fully compliant manifest.json<br>|yes |Upload directly to a channel or group chat<br>|or<br>|Select "Import an existing app" to upload the zip folder<br>|
| | |
|- Two required images<br>- Fully compliant manifest.json<br>|no|---||<br> Select "Create a new app"<br>|
|||
|- Two required images<br>- A manifest.json with incomplete required fields or in need of further testing<br>|yes|---||Select "Import an existing app"<br>|
|||
|- Two required images<br> - A manifest.json with incomplete required fields or in need of further testing<br>|no|---||Select "Create a new app"<br>|

## Accessing additional content

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
