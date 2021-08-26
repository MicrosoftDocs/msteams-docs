---
title: Updating links in Visual Studio Code
author: GubbaPallavi
description: Updating links in Visual Studio Code 
ms.topic: conceptual
---

# Links

This article describes how to update different types of links in Visual Studio Code. Hyperlinks can connect two different documents and various sections in the same document.

Following are the three different types of links:

> * Bookmark links
> * Links from one article to another within the docset 
> * External links

## Link text

The words that you write in the link text should be user-friendly. This is the text that appears in the document as a link.

## Bookmark links

For a bookmark link to a heading in the current file, use a hash symbol followed by the lowercase words of the heading.

`[Before a meeting](#before-a-meeting)`

**Testing purpose**

[External links](#external-links)

## Links from one article to another within the docset

A file can link to other file within the docset using `/` symbol. It helps to divide all the file paths.

`[link text](../directory/article-name.md)`

**Testing purpose**

[API references](../apps-in-teams-meetings/Api-references.md)

## External links

Use URL links when linking to content outside of the current docset.

`[External link](https://.........)`

**Testing purpose**

[Node.js](https://nodejs.org/en/download/)

## See also
[Update images in VSC](../apps-in-teams-meetings/Images.md)

