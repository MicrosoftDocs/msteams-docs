---
title: General guidance for combining an Outlook add-in and a Teams app
description: Get high-level general guidance about combining an existing Office Add-in with an existing Teams app.
ms.date: 06/20/2024
ms.author: mosdevdocs
author: rickki
ms.topic: conceptual
ms.localizationpriority: medium
ms.subservice: m365apps
---

# General guidance for combining an Outlook add-in and a Teams app

When you have an existing Teams app and Outlook add-in that have closely related or overlapping functionality and workloads, we recommend that you combine them into a single app. This enables users and Microsoft 365 tenant administrators to acquire and approve both the add-in and the Teams app as a unit. For an example of an app that combines and add-in and a Teams app, see [Discount Offers sample](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-add-in-combined/nodejs).

There can be no algorithmic procedure for merging an add-in and a Teams app for the following reasons:

- An algorithm would have to make assumptions about the folder and file structure of the existing Teams app. But these structures vary depending on which tool was used to create the app project and what version of that tool. And, or course, the developer of the app may have changed the structure after the project was created.
- The preceding bullet also applies to the add-in project.
- An algorithm would have to make assumptions about the settings in various configuration files. But these settings would also vary depending on how the project was created and changes made to the configuration since it was created.
- An algorithm would have to make an assumption about which language, TypeScript or JavaScript, was used for the client-side source code of the web application.

> [!NOTE]
> In addition to these bullets, note also that there are two basic families of web application frameworks on which either the add-in or the Teams app may have been created. 
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

Before you start work merging your two existing extensions, get a sense of how to merge the two types of extensions by creating a new Teams app and a new add-in in Teams toolkit and then following the instructions in [Add an Outlook Add-in to a Teams app](combine-office-add-in-and-teams-app.md) to combine them. Pay close attention to the following:

- How the single unified manifest is created.
- The differences in how the add-in and the Teams app are sideloaded and debugged.

When you are ready to merge your actual add-in and Teams app, we recommend the following:

- If the add-in uses an XML manifest, convert it to use the unified manifest for Microsoft 365 as described in [Convert an add-in to use the unified manifest for Microsoft 365](/office/dev/add-ins/develop/convert-xml-to-json-manifest) before you combine it with a Teams app.
- Use the Teams app project as the starting point for the merged application.
- Keep configuration files that are applicable to both the add-in and Teams app in the root of the project.
- Move source files and configuration files that are only applicable to the Teams app into a subfolder off the root of the project. Similarly, copy source and configuration files that are only used by the add-in from the existing add-in to a different subfolder off the root of the combined project. 
- Use the same base domain for the built files of both the add-in and Teams app.
- Merge the two manifests into a single manifest. Use the process you went through in step 1 as a guide.

## See also

- [Outlook Add-ins Overview](/office/dev/add-ins/outlook/outlook-add-ins-overview)
- [Office Add-ins with the unified app manifest for Microsoft 365](/office/dev/add-ins/develop/unified-manifest-overview)
- [Build an Outlook add-in with the unified manifest for Microsoft 365](/office/dev/add-ins/quickstarts/outlook-quickstart-json-manifest)
- [Add an Outlook Add-in to a Teams app](combine-office-add-in-and-teams-app.md)
