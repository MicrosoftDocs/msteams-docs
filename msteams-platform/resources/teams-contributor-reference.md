---
title: Contribute to Teams documentation
description: Learn steps for creating and publishing Teams documentation
author: surbhigupta
ms.author: lajanuar
ms.localizationpriority: medium
ms.topic: contributor-guide
---

# Contribute to Teams documentation

Teams documentation is part of the **Microsoft Learn** technical documentation library. The content is organized into groups called docsets, each representing a group of related documents managed as a single entity. Articles in the same docset have the same URL path extension after `learn.microsoft.com`. For example, `/learn.microsoft.com/microsoftteams/...` is the beginning of the Teams docset file path. Teams articles are written in Markdown syntax and hosted on GitHub.

## Set up your workspace

> [!div class="checklist"]
>
> * Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
> * Install [Microsoft Visual Studio Code](https://code.visualstudio.com/) (VS Code).
> * Install [Docs Authoring Pack](https://marketplace.visualstudio.com/items?itemName=docsmsft.docs-authoring-pack) directly from the VS Code Marketplace.
<br>&emsp;&emsp; or
> [!div class="checklist"]
>
> * Install within VS Code:

   1. Select the **Extensions icon** on the side activity bar or use the **View => Extensions** command or Ctrl+Shift+X and, search for **Docs Authoring Pack**.
   1. Select **Install**.
   1. After installation, the **Install** changes to the **Manage** gear button.

## Review the Microsoft Docs contributor guide

The contributors guide provides direction to create, publish, and update technical content on the **Microsoft Learn** platform.

## Microsoft Writing, Style, and Content Guides

* **[Microsoft Writing Style Guide](/style-guide/welcome)**: Microsoft Writing Style Guide is a comprehensive resource for technical writing and reflects Microsoft's modern approach to voice and style. For easy reference, add this online guide to your browser's **Favorites** menu.

* **[Writing developer content](/style-guide/developer-content/)**: Teams specific content is aimed at a developer audience with a fundamental understanding of programming concepts and processes. It's important that you must provide clear, technically accurate information in a compelling manner while maintaining Microsoft's tone and style.

* **[Writing step-by-step instructions](/style-guide/procedures-instructions/writing-step-by-step-instructions)**: Applied and interactive experiences are a great way for developers to learn about Microsoft products and technologies. Presenting complex or simple procedures in a progressive format is natural and user friendly.

## MarkDown reference

**Microsoft Learn** pages are written in **MarkDown** syntax and parsed through a [Markdig](https://github.com/lunet-io/markdig) engine. For more information on specific tags and formatting conventions, see [Docs Markdown reference](/contribute/markdown-reference).

## File Paths

When using relative paths and creating links to other docsets, it's important to set a valid file path for hyperlinks in your documentation. Your build succeeds on GitHub only if the file path is correct or valid.

For more information on hyperlinks and file paths, see [use links in documentation](/contribute/how-to-write-links).

> [!IMPORTANT]
> To reference an article that is **part of** the Teams platform docset:<br>
> &emsp;&#x2714; Use a relative path without a leading forward slash.<br>
> &emsp;&#x2714; Include the Markdown file extension.<br>
>Ex:  **parent directory/directory/path-to-article.md** —> [Building an app for Microsoft Teams](../concepts/building-an-app.md) <br><br>
> To reference a Microsoft Learn article that **is not part of** the Teams platform docset:<br>
> &emsp;&#x2714; Use a relative path that begins with a forward slash.<br>
> &emsp;&#x2714; Do not include the file extension. <br>
> Ex:  **/docset/address-to-file-location** —> [Use the Microsoft Graph API to work with Microsoft Teams](/graph/api/resources/teams-api-overview)<br><br>
> To reference a page outside of Microsoft Learn, such as GitHub, use the full `https` file path.<br>

## Code Samples and Snippets

Code samples play an important role to use APIs and SDKs effectively. Well presented code samples can communicate how things work more clearly than descriptive text and instructional information alone. Your code samples must be accurate, concise, well documented, and reader friendly. Code that is easy to read must be easy to understand, test, debug, maintain, modify, and extend. For more information, see [how to include code in an article](/contribute/code-in-docs).

## Next step

> [!div class="nextstepaction"]
> [Troubleshoot your Microsoft Teams app](troubleshoot.md)

## See also

* [Localize your app](../concepts/build-and-test/apps-localization.md)
* [Microsoft Learn](/)
* [Microsoft Learn documentation contributor guide](/contribute)
* [Microsoft Learn style and voice quickstart](/contribute/style-quick-start)
* [Cutting edge: source code readability tips](/archive/msdn-magazine/2014/october/cutting-edge-source-code-readability-tips)
* [Teams documentation](/microsoftteams/platform/overview)
* [GitHub](https://github.com/MicrosoftDocs/msteams-docs/tree/master/msteams-platform)
* [Get Microsoft Learn updates and the latest announcements](/teamblog)
