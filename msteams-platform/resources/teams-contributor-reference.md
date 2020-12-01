---
title: Contributing to Microsoft Teams documentation
description: steps for creating and publishing Teams documentation
author: laujan
ms.author: lajanuar
ms.topic: contributor-guide
---

# Contributing to Microsoft Teams documentation

[Teams documentation](/microsoftteams/platform/overview) is part of the [Microsoft Docs](https://docs.microsoft.com/) technical documentation library. The content is organized into groups called docsets, each representing a group of related documents managed as a single entity. Articles in the same docset have the same URL path extension after *docs<span></span>.microsoft.com*.  For example,  `/docs.microsoft.com/microsoftteams/...`   is the beginning of the Teams docset file path. Teams articles are written in  [MarkDown](#markdown-reference) syntax and hosted on [GitHub](https://github.com/MicrosoftDocs/msteams-docs/tree/master/msteams-platform).

## Set up your workspace

> [!div class="checklist"]
>
> * Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git).
> * Install [Visual Studio Code](https://code.visualstudio.com/) (VS Code).
> * Install [Docs Authoring Pack](https://marketplace.visualstudio.com/items?itemName=docsmsft.docs-authoring-pack) directly from the VS Code Marketplace
<br>&emsp;&emsp; or

> [!div class="checklist"]
>
> * Install from within VS Code:

   1. Select the **Extensions icon** on the side activity bar or use the **View => Extensions** command (Ctrl+Shift+X) and search for the *Docs Authoring Pack* (Microsoft).
   1. Select the **Install** button.
   1. Once installation is complete, the **Install** button will change to the **Manage** gear button.

## Review the Microsoft Docs Contributors Guide

The [contributors guide](/contribute) offers direction for creating, publishing, and updating technical content on the Microsoft Docs platform. *See also*, [Docs style and voice quick start](/contribute/style-quick-start) .

## Microsoft Writing, Style, and Content Guides

* **[Microsoft Writing Style Guide](/style-guide/welcome)**. Consider adding this online guide  to your browser's **Favorites** menu. It is a comprehensive resource for today's technical writing and reflects Microsoft's modern approach to voice and style.

* **[Writing developer content](/style-guide/developer-content/)**. Teams-specific content is aimed at a developer audience with a fundamental understanding of programming concepts and processes. It is important that you provide clear, technically-accurate information in a compelling manner while maintaining Microsoft's tone and style.

* **[Writing step-by-step instructions](/style-guide/procedures-instructions/writing-step-by-step-instructions)**. Applied and interactive experiences are a great way for developers to learn about Microsoft products and technologies. Presenting complex or simple procedures in a progressive format is natural and user-friendly.

## MarkDown reference

 Microsoft Docs pages are written in MarkDown syntax and parsed through a [Markdig](https://github.com/lunet-io/markdig) engine. Please *see* [Docs Markdown reference](/contribute/markdown-reference) for specific tags and formatting conventions.

## File Paths

Setting a valid file path for hyperlinks in your documentation can be a challenge, especially when using relative paths and creating links to other docsets.  Your build won't succeed on GitHub if the file path is incorrect or invalid.

For more information on  hyperlinks and file paths, please *see* [Use links in documentation](/contribute/how-to-write-links).

>[!IMPORTANT]
> To reference an article that is *part of* the Teams platform docset:<br>
> &emsp;&#x2714; Use a relative path without a leading forward slash.<br>
> &emsp;&#x2714; Include the Markdown file extension.<br>
>Ex:  **parent directory/directory/path-to-article.md** —> `[Building an app for Microsoft Teams](../concepts/building-an-app.md)` <br><br>
> To reference a Microsoft Docs library article that *is not part of* the Teams platform docset:<br>
> &emsp;&#x2714; Use a relative path that begins with a forward slash.<br>
> &emsp;&#x2714; Don't include the file extension. <br> 
> Ex:  **/docset/address-to-file-location** —> `[Use the Microsoft Graph API to work with Microsoft Teams](/graph/api/resources/teams-api-overview)`<br><br>
> To reference a page outside of the Microsoft Docs library, such as GitHub, use the full `https` file path.<br>

## Code Samples and Snippets

Code samples play an important role in helping developers successfully use APIs and SDKs. Well-presented code samples can communicate how things work more clearly than descriptive text and instructional information alone. Your code samples should be accurate, concise, well-documented, and, most importantly, reader-friendly. Code that is easy-to-read is also easy to understand, test, debug, maintain, modify, and extend. *See* [How to include code in docs](/contribute/code-in-docs). For readability tips, please *see also* [Cutting Edge : Source Code Readability Tips](/archive/msdn-magazine/2014/october/cutting-edge-source-code-readability-tips).

> [!div class="nextstepaction"]
> [Get Microsoft Docs updates and the latest announcements](/teamblog)
