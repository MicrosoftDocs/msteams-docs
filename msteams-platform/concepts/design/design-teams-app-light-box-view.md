---
title: Design your app with lightbox UI components
author: v-npaladugu
description: Learn how to use lightbox UI component from Teams UI kit to build Microsoft Teams apps.
ms.localizationpriority: medium
ms.topic: reference
ms.author: surbhigupta
ms.date: 01/29/2023
---

# Designing lightbox for your Microsoft Teams app

The lightbox is a display component that emphasizes important information by deactivating the page layout behind it. Information in the lightbox is non-editable and non-interactive. The lightbox view enables users to preview media content, including images, videos, audio files, documents, and PDFs, on a large surface over the main Teams window. 

The lightbox component is designed for quick reviews, understanding, or verification. 
It don't support actions for editing or collaboration. 
The most frequently used file types in the lightbox are images, short PDFs or documents, and short video clips. 

Users can initiate the lightbox in a new Teams child window or open it directly in a native app or browser. 

# [Desktop](#tab/desktop)

:::image type="content" source="../../assets/images/light-box/lightbox-desktop.png" alt-text="Example shows the default lightbox view in the Teams desktop.":::

# [Mobile](#tab/mobile)

:::image type="content" source="../../assets/images/light-box/lightbox-mobile.png" alt-text="Example shows the default lightbox view in the Teams mobile.":::

---

## Anatomy

Lightbox view includes a header, center stage, and carousel.

:::image type="content" source="../../assets/images/light-box/lightbox-anatomy.png" alt-text="Design anatomy of the lightbox view in the Teams.":::

|Counter|Description|
|----------|-----------|
|1|**Back**: Button to navigate to the previoius screen|
|2|**Open in**: Button (basic or split) to navigate to the external window|
|3|Buttons with Content actions: Zoom in or out, Share, Download, Popout (open new child window), open chat panel|
|4|Chevrons for slide show|
|A|**Lightbox Header**: Actionable|
|B|**Center stage**: Main content container|
|C|**Carousel**: Actionable|

## Sizing of the components

Default sizing for the container with main content. Following is the default content:

# [Image](#tab/image)

:::image type="content" source="../../assets/images/light-box/image-sizing.png" alt-text="Example shows an image sizing with lightbox view in the Teams.":::

# [Carousel](#tab/carousel)

Contains all media files from the current chat, channel post, or file folder. 

:::image type="content" source="../../assets/images/light-box/image-sizing.png" alt-text="Example shows carousel sizing with lightbox view in the Teams.":::

---

## Best practices

Recommended best practices for Lightbox

#### Do: Use a lightbox component to preview files that present media such an image, video, audio in a full-screen view.

Help to save time during file opening. Opening on top of the main content. With easy navigation through the files and fast soft dismiss.

:::image type="content" source="../../assets/images/light-box/interactions-lightbox-do.png" alt-text="Example shows the use of a lightbox component to preview files.":::

#### Don’t: Use a lightbox for content editing or interaction

Provide clear options in **Open in** menu, where users can start to interact with content. 

:::image type="content" source="../../assets/images/light-box/interactions-lightbox-dont.png" alt-text="Example shows the use of a lightbox component for content editing.":::

#### Do: Use a Lightbox component to preview documents

Documents which are intended just for the preview option or have **Preview** option from the **More option**.

:::image type="content" source="../../assets/images/light-box/lightbox-preview-do.png" alt-text="Example shows the use of a lightbox component to preview documents.":::

#### Don’t: Use a lightbox in collaborative environments where it’s helpful to see live presence

Users won’t be able to see who else is in the file and making changes from the lightbox.

:::image type="content" source="../../assets/images/light-box/lightbox-preview-dont.png" alt-text="Example shows the use of a lightbox component in collaborative environments.":::

#### Do: Back button in the header will take to the previous screen and close the lightbox or clicking on the sides from the main content. 

:::image type="content" source="../../assets/images/light-box/lightbox-back-do.png" alt-text="Example shows the use of a lightbox component with back button in the header.":::

#### Don’t use more button to close the lightbox 

There are two ways how to close the lightbox, back to previous screen and soft dismiss.

:::image type="content" source="../../assets/images/light-box/lightbox-back-dont.png" alt-text="Example shows the use of a lightbox component with more back buttons.":::

#### Do: Highlight the chat panel for communicating about the previewed file

:::image type="content" source="../../assets/images/light-box/lightbox-highlight-do.png" alt-text="Example shows the use of a lightbox component with highlighted chat panel.":::

#### Don’t: Refer to commenting in a lightbox experience

Users can’t comment in lightbox files so mentioning comments might be confusing. 

:::image type="content" source="../../assets/images/light-box/lightbox-highlight-do.png" alt-text="Example shows the use of a lightbox component with commenting in the chat panel.":::