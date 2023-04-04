---
title: Designing your message extension
description: Learn how to design a Teams message extension and get the Microsoft Teams UI Kit. Describes about Teams design guidelines reference message extensions tips and best practice.
author: heath-hamilton
ms.localizationpriority: high
ms.author: surbhigupta
ms.topic: conceptual
---
# Designing your Microsoft Teams message extension

Message extensions are shortcuts for inserting app content or acting on a message without navigating away from the conversation.
To guide your app design, the following information describes and illustrates how people can add, use, and manage message extensions in Teams.

## Microsoft Teams UI Kit

You can find comprehensive message extension design guidelines, including elements that you can grab and modify as needed, in the Microsoft Teams UI Kit.

> [!div class="nextstepaction"]
> [Get the Microsoft Teams UI Kit (Figma)](https://www.figma.com/community/file/916836509871353159)

## Add a message extension

You can add a message extension in the following Teams contexts:

* From the Teams store.
* In a channel, chat, or meeting (before, during, and after) near the compose box. It's worth noting if you add a message extension in one of these places, only you can use it in that context.

The following examples show how to add a message extension in a channel.

### Mobile

:::image type="content" source="../../assets/images/messaging-extension/mobile-add-in-channel.png" alt-text="Example shows how to add a message extension near the compose box in a channel on mobile.":::

### Desktop

:::image type="content" source="../../assets/images/messaging-extension/add-in-channel.png" alt-text="Example shows how to add a message extension near the compose box in a channel.":::

## Set up a message extension

Authentication isn't mandatory, but if your app is something like a ticket tracking tool, you may need people to sign in to use the message extension.

For consistency across Teams apps, you can't customize the sign-in screen. If you use single sign-on (SSO) authentication, users are signed in automatically.

### Mobile

:::image type="content" source="../../assets/images/messaging-extension/mobile-set-up.png" alt-text="Example shows message extension setup screen with a sign-in button on mobile.":::

### Desktop

:::image type="content" source="../../assets/images/messaging-extension/set-up.png" alt-text="Example shows message extension setup screen with a sign-in button.":::

## Types of message extensions

Message extensions can have search commands, action commands, or both. Your commands depend on your app's features and how those fits within Teams use cases.

### Search commands

With search commands, people can use your message extension to quickly find external content and insert into a message. Search commands are commonly made available in the compose box. For example, you can start or add to a discussion by sharing a piece of content—without ever leaving Teams.

#### Mobile

:::image type="content" source="../../assets/images/messaging-extension/mobile-search-command-type.png" alt-text="Example shows a search-based message extension launched from the compose box on mobile.":::

#### Desktop

:::image type="content" source="../../assets/images/messaging-extension/search-command-type.png" alt-text="Example shows a search-based message extension launched from the compose box.":::

#### Compose box layout options

You have some options for displaying message extension search results, including [list and grid views](../../messaging-extensions/how-to/search-commands/respond-to-search.md#respond-to-user-requests).

:::image type="content" source="../../assets/images/messaging-extension/search-result-layout.png" alt-text="Illustrations showing layout options for message extension search results.":::

### Action commands

Action commands allow people to trigger actions and process requests in external services within Teams. For example, if your app tracks orders, a user could create a new order using the contents of a colleague’s message from right inside their chat.

Action-based message extensions frequently require users to complete a form or some other kind of configuration within a modal. You can create these experiences with [dialogs](../../task-modules-and-cards/task-modules/design-teams-task-modules.md).

## Open a message extension

The compose box and messages or posts are the primary contexts where people use message extensions.

### From the compose box

Once added, users can open your message extension by selecting your app icon below the compose box. In these examples, the extension has search and action commands.

#### Mobile

:::image type="content" source="../../assets/images/messaging-extension/mobile-open-from-compose-box.png" alt-text="Example shows how to open a message extension from the compose box on mobile.":::

#### Desktop

:::image type="content" source="../../assets/images/messaging-extension/open-from-compose-box.png" alt-text="Example shows how to open a message extension from the compose box.":::

### From a chat message or channel post

Once added, users can select the **More** :::image type="icon" source="../../assets/icons/teams-client-more.png"::: icon on the chat message or channel post to find your extension’s action commands. Your extension may be listed under **More actions** based on usage.

#### Chat message

:::image type="content" source="../../assets/images/messaging-extension/open-from-chat-message.png" alt-text="Example shows how to open a message extension from a chat message.":::

#### Channel post

:::image type="content" source="../../assets/images/messaging-extension/open-from-channel-post.png" alt-text="Example shows how to open a message extension from a channel post on mobile.":::

## Use a message extension

The following scenarios show the primary ways people use message extensions.

### Insert content into a message

**1. Select a message extension**. Users can search for the content they want to share from the compose box.

#### Mobile

:::image type="content" source="../../assets/images/messaging-extension/mobile-insert-content-search.png" alt-text="Example shows a user searching for content to insert from the compose box on mobile.":::

#### Desktop

:::image type="content" source="../../assets/images/messaging-extension/insert-content-search.png" alt-text="Example shows a user searching for content to insert from the compose box.":::

**2. Insert content**. Once posted, others can reply or select the content to see more information in your app.

#### Mobile

:::image type="content" source="../../assets/images/messaging-extension/mobile-insert-content-posted.png" alt-text="Example shows a user posting content into a channel conversation on mobile.":::

#### Desktop

:::image type="content" source="../../assets/images/messaging-extension/insert-content-posted.png" alt-text="Example shows a user posting content into a channel conversation.":::

### Take action on a message

**1. Select a message extension**. Your app can include one or more action commands.

:::image type="content" source="../../assets/images/messaging-extension/select-action-command.png" alt-text="Example shows a user selecting a message extension action command.":::

**2. Complete the action**. Your app can receive and process any content or data sent by the message action. Users complete the action in your app while remaining in their conversation.

:::image type="content" source="../../assets/images/messaging-extension/complete-action-command.png" alt-text="Example on how to take action on a message.":::

### Preview links

Message extensions also allow you to insert rich links from a recognized URL into a message (this capability is called [link unfurling](../../messaging-extensions/how-to/link-unfurling.md).)

**1. Paste a recognized link** in the compose box.

#### Mobile

:::image type="content" source="../../assets/images/messaging-extension/mobile-paste-preview-link.png" alt-text="Example shows a user pasting a link in the compost box on mobile.":::

#### Desktop

:::image type="content" source="../../assets/images/messaging-extension/paste-preview-link.png" alt-text="Example shows a user pasting a link in the compost box.":::

**2. Insert content**. If your app recognizes the URL in the compose box, it renders the link as a card that provides a content-rich preview of the web content. (See [Adaptive Cards design guidelines](../../task-modules-and-cards/cards/design-effective-cards.md) for more information.)

#### Mobile

:::image type="content" source="../../assets/images/messaging-extension/mobile-insert-preview-link.png" alt-text="Example shows how the URL, since it's recognized by your app, includes some rich content in the compose box on mobile.":::

#### Desktop

:::image type="content" source="../../assets/images/messaging-extension/insert-preview-link.png" alt-text="Example shows how the URL, since it's recognized by your app, includes some rich content in the compose box.":::

## Manage a message extension

By right-clicking your icon, users can pin, remove, or configure your message extension.

## Anatomy

### Message extension in the compose box

The following examples show a message extension opened from the compose box.

#### Mobile

:::image type="content" source="../../assets/images/messaging-extension/mobile-anatomy-compose.png" alt-text="Illustration showing the UI anatomy of a message extension in the compose box on mobile.":::

|Counter|Description|
|----------|-----------|
|1|**App name**: Full name of your app.|
|2|**Action commands menu icon (optional)**: Opens a list of action commands for your message extension (if you specify any).
|3|**Search box**: Allows users to find app content they want to insert.|
|4|**Tab menu (optional)**: Provides multiple content categories.|
|5|**Action commands menu (optional)**: Displays list of action commands (if you specify any).|
|6|**App content**: Primarily to display search results.|

#### Desktop

:::image type="content" source="../../assets/images/messaging-extension/anatomy-compose.png" alt-text="Illustration showing the UI anatomy of a message extension in the compose box.":::

|Counter|Description|
|----------|-----------|
|1|**App logo**: Color icon of your app logo.|
|2|**App name**: Full name of your app.|
|3|**Action commands menu icon (optional)**: Opens a list of action commands for your message extension (if you specify any).
|4|**Search box**: Allows users to find app content they want to insert.|
|5|**Tab menu (optional)**: Provides multiple content categories.|
|6|**Action commands menu (optional)**: Displays list of action commands (if you specify any).|
|7|**App content**: Primarily to display search results. The example here is using the list layout (grid layout is another option).|
|8|**App logo**: Outline icon of your app logo.|

### Message extension management menu

:::image type="content" source="../../assets/images/messaging-extension/anatomy-management-menu.png" alt-text="Illustration showing the UI anatomy of a message extension management menu.":::

|Counter|Description|
|----------|-----------|
|1|**Unpin**: Available if the user has pinned your app.|
|2|**Remove**: Removes the message extension from the channel, chat, or meeting.|

## Best practices

Use these recommendations to create a quality app experience.

### Setup and general usage

:::row:::
   :::column span="":::
:::image type="content" source="../../assets/images/messaging-extension/setup-do.png" alt-text="Example of setup and general usage.":::

#### Do: Integrate with single-sign on

SSO makes the sign-in process easier, faster, and secure. Also, if a user has already signed in to your personal app, they don’t have to also sign in again to access the message extension.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../../assets/images/messaging-extension/setup-dont.png" alt-text="Example of integrating with single-sign on.":::

#### Don't: Take users away from the conversation

Message extensions are shortcuts that are supposed reduce context switching. Your extension should not, for example, direct users to a webpage outside Teams.

   :::column-end:::
:::row-end:::

#### Do: Highlight your message extension

Message extensions aren't always easy to find. Include screenshots of how to use it in your app details page. If your app also includes a bot, you can include message extension help documentation in a bot welcome tour.

### Templating

:::row:::
   :::column span="":::
:::image type="content" source="../../assets/images/messaging-extension/templating-do.png" alt-text="Example of templating.":::

#### Do: Let Teams handle some of the design work if possible

If it makes sense for your use cases, consider creating a search-based message extension. Teams renders these types of extensions with built-in theming and accessibility.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../../assets/images/messaging-extension/templating-dont.png" alt-text="Example of handling design work.":::

#### Don't: Embed your entire app in a dialog

If your message extension requires action commands, keep the dialog simple and display only the components required to complete the action.

   :::column-end:::
:::row-end:::

### Theming

:::row:::
   :::column span="":::
:::image type="content" source="../../assets/images/messaging-extension/theming-do.png" alt-text="Example on theming.":::

#### Do: Take advantage of Teams color tokens

Each Teams theme has its own color scheme. To handle theme changes automatically, use [color tokens (Fluent UI)](https://fluentsite.z22.web.core.windows.net/0.51.3/colors#color-scheme) in your design.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../../assets/images/messaging-extension/theming-dont.png" alt-text="Example on color tokens.":::

#### Don't: Hard code color values

If you don't use Teams color tokens, your designs will be less scalable and take more time to manage.

   :::column-end:::
:::row-end:::

### Actions

:::row:::
   :::column span="":::
:::image type="content" source="../../assets/images/messaging-extension/action-commands-do.png" alt-text="Example on actions.":::

#### Do: Include action commands that make sense in context

Message actions should relate to what a user is looking at. For example, provide users a shortcut for creating an issue or work item using the text in someone’s post.

   :::column-end:::
   :::column span="":::
:::image type="content" source="../../assets/images/messaging-extension/action-commands-dont.png" alt-text="Example on action commands.":::

#### Don't: Include actions commands that aren't contextual

A message action to **View your dashboard** would probably seem disconnected from most conversations.

   :::column-end:::
:::row-end:::

### Searches

#### Do: Show search results while typing

Provide suggested search results while users type. They may find the content they need faster with minimal amount of characters.

#### Don't: Require users to submit a query

You can make users press a key or select a button to send queries to your app. While that may be easier on your app services service, people may be confused that they're not seeing real-time search results as they type.

#### Do: Consider zero-term queries

For example, before a user writes anything in the search box, display what they last viewed on your app. It's possible that they want to insert that content into their conversation.
