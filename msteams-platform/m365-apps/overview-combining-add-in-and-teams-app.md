---
title: General Guidance for Combining an Office add-in and a Teams App
description: Get high-level general guidance about combining an existing Office Add-in with an existing Teams app.
ms.date: 11/08/2024
ms.author: mosdevdocs
author: rickki
ms.topic: conceptual
ms.localizationpriority: medium
ms.subservice: m365apps
---

# General guidance for combining an Office add-in and a Teams app

When you have an existing Teams app and Office add-in that have closely related or overlapping functionality and workloads, we recommend that you combine them into a single app. This enables users and Microsoft 365 tenant administrators to acquire and approve both the add-in and the Teams app as a unit. For an example of an app that combines an add-in and a Teams app, see [Discount Offers sample](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-add-in-combined/nodejs).

> [!NOTE]
> Outlook add-ins are the only kind of Office add-in that can be combined with a Teams app. We are working hard to support this feature for Excel, PowerPoint, and Word add-ins too.

There can be no algorithmic procedure for merging an add-in and a Teams app for the following reasons:

- An algorithm will have to make assumptions about the folder and file structure of the existing Teams app. But these structures vary depending on which tool was used to create the app project and what version of that tool. And, of course, the developer of the app might have changed the structure after the project was created.
- The preceding bullet also applies to the add-in project.
- An algorithm will have to make assumptions about the settings in various configuration files. But these settings will also vary depending on how the project was created and changes made to the configuration since it was created.
- An algorithm will have to make an assumption about which language, TypeScript or JavaScript, was used for the client-side source code of the web application.

> [!NOTE]
> In addition to these bullets, note also that there are two basic families of web application frameworks on which either the add-in or the Teams app might have been created. 
>
> - **IIS/.NET**: 
>
>      - Add-in projects can be created in Visual Studio with the [Office Developer Tools](https://visualstudio.microsoft.com/vs/features/office-tools/), in which case the web application portion is built on ASP.NET and Internet Information Server (IIS).
>      - Teams app projects can be created in Visual Studio with the [Teams Toolkit for Visual Studio](/microsoftteams/platform/toolkit/toolkit-v4/install-teams-toolkit-vs), in which case the web application portion is a Blazor/C# application.
>
> - **Node.js server/JavaScript or TypeScript**:
>
>      - Add-in projects can be created in the [Office Yeoman Generator](/office/dev/add-ins/develop/yeoman-generator-overview) or with [Teams Toolkit for Visual Studio Code](/microsoftteams/platform/toolkit/install-teams-toolkit?tabs=vscode#install-teams-toolkit-for-visual-studio-code). In either case, the web application is Node.js-based and written in TypeScript or JavaScript.
>      - Teams app projects can be created in Visual Studio Code with [Teams Toolkit for Visual Studio Code](/microsoftteams/platform/toolkit/install-teams-toolkit?tabs=vscode#install-teams-toolkit-for-visual-studio-code), in which case the web application is Node.js-based and written in TypeScript or JavaScript.
>
> Visual Studio doesn't currently support the unified manifest in add-in projects, so this article assumes that both the add-in and Teams apps projects are Node.js-based and *not* created with Visual Studio.

However, we can make some general recommendations about combining an add-in with a Teams app.

## Learn about the manifest and structure of a combined Teams app and Office add-in

Before you start work merging your two existing extensions, get a sense of how to merge the two types of extensions by creating a new Teams app and a new add-in in Teams toolkit and then following the instructions in [Add an Outlook Add-in to a Teams app](combine-office-add-in-and-teams-app.md) to combine them. Pay close attention to the following:

- How the single unified manifest is created.
- The differences in how the add-in and the Teams app are sideloaded and debugged.

> [!NOTE]
> Although the article uses an Outlook add-in, the general process of combining an add-in with a Teams app also applies to Excel, PowerPoint, and Word add-ins.

## Follow proper principles for combining Teams apps and add-ins

When you are ready to merge your existing add-in and Teams app, follow these principles:

- If the add-in uses an XML manifest, convert it to use the unified manifest for Microsoft 365 as described in [Convert an add-in to use the unified manifest for Microsoft 365](/office/dev/add-ins/develop/convert-xml-to-json-manifest) before you combine it with a Teams app.
- Use the Teams app project as the base project for the merged application.
- Keep configuration files that are applicable to both the add-in and Teams app in the root of the project.
- Move source files and configuration files that are only applicable to the Teams app into a subfolder off the root of the project. Similarly, copy source and configuration files that are only used by the add-in from the existing add-in to a different subfolder off the root of the combined project.
- Use the same base domain for the built files of both the add-in and Teams app; for example, contoso.com.
- Merge the two manifests into a single manifest. Use the process you went through in [add an Outlook Add-in to a Teams app](combine-office-add-in-and-teams-app.md) as a guide.
- The [id](../resources/schema/manifest-schema.md#id) property in the new manifest should be the same value as the "id" property in the original Teams app manifest.
- Raise the value of the [version](../resources/schema/manifest-schema.md#version) property; for example, raise "1.0.0" to "1.1.0".
- Add an [extensions.alternates](../resources/schema/manifest-schema.md#extensionsalternates) property to the manifest and configure it to hide the original Office add-in in versions of Office that support combining an add-in and a Teams app. For more information, see [Manage new and old versions of an add-in](/office/dev/add-ins/concepts/duplicate-legacy-metaos-add-ins).

## Publish the combined Teams app and Office add-in

To publish the combined app, treat it like an update to the Teams app. For more information, see [Publish updates to your app](../concepts/deploy-and-publish/appsource/post-publish/overview.md#publish-updates-to-your-app).

When the update has been published, how the update becomes available to end users varies. The following are the general principles.

> [!NOTE]
> To be clear about what "available" means, note that Outlook and the Microsoft 365 application have an  **App bar** just as Teams does. In principle, a "Teams app" can be installed from the **Apps** or **More apps** button on any of these three app bars. The installed "Teams app" can be launched from (or separately pinned to) any of the app bars of any of the three applications. A standalone Outlook *add-in*, on the other hand, is installed through the **All Apps** button in the Outlook ribbon. And, regardless of whether it is standalone or combined into a Teams app, an add-in is launched from the Outlook ribbon or launches automatically in response to an event in the open Outlook message or meeting item. These facts are assumed in remainder of this section.

- If the Microsoft 365 administrator consents to the update, then:

   - The updated version of the Teams app is available immediately from **Apps** or **More Apps** in Outlook and the Microsoft 365 application, but not the Teams **Apps**, to users who had previously acquired the Teams app. 
   - The Outlook add-in is also available immediately to users who had previously acquired the Teams app, regardless of whether they had also previously acquired the add-in.
   - If a Teams administrator allows the update, then users can individually install it to Teams from the Teams **Apps**.

- If the administrator doesn't consent, then each user who had previously acquired the Teams app must consent to the update and it can only be made available in Teams if the Teams administrator has allowed it.
- Users who had previously acquired only the Office add-in must acquire the new combined app from the Teams store. It cannot be acquired through **All Apps** button in the Outlook ribbon.

> [!IMPORTANT]
> Users with certain older versions of Office might still see the old version of the add-in, even after the new combined app is acquired. Generally, add-ins that use the unified app manifest for Microsoft 365 (formerly Teams app manifest) can be installed only on Microsoft 365 Version 2307 (Build 16626.20132) and later. However, there are two exceptions which enable these add-ins to be installed on older versions of Microsoft 365 and on perpetual license versions of Office.
>
> - The user's Microsoft 365 administrator deploys the add-in for all users.
> - The user installs the add-in in Outlook on the web, [new Outlook for Windows](https://support.microsoft.com/office/new-and-classic-outlook-for-windows-feature-comparison-de453583-1e76-48bf-975a-2e9cd2ee16dd), or in another Microsoft 365 desktop client app that *is* Version 2307 (Build 16626.20132) or later. This makes the add-in available on the same user's other Office clients, including older or perpetual license clients.

In the future, you only need to update the new version of the app. 

## See also

- [Outlook Add-ins Overview](/office/dev/add-ins/outlook/outlook-add-ins-overview)
- [Office Add-ins with the unified app manifest for Microsoft 365](/office/dev/add-ins/develop/unified-manifest-overview)
- [Build an Outlook add-in with the unified manifest for Microsoft 365](/office/dev/add-ins/quickstarts/outlook-quickstart-json-manifest)
- [Add an Outlook Add-in to a Teams app](combine-office-add-in-and-teams-app.md)
