---
title: Design guidelines for tabs
description: Describes the guidelines for creating tabs for content and collaboration
keywords: teams design guidelines reference framework tabs configuration
---
# Content and conversations, all at once using tabs

> [!Important]
> **Tabs on Mobile Clients**
>
> Follow the [guidance for tabs on mobile](./tabs-mobile.md) when creating your tabs. If your tab uses authentication, you must upgrade your Teams JavaScript SDK to version 1.4.1 or later, or authentication will fail.
>
> **Channel/group (configurable) tabs on mobile:**
>
> * Mobile clients only show configurable tabs that have a value for `websiteUrl`. If you want your tab to appear on the Teams mobile clients, you must set the value of `websiteUrl`.
> * Default open behavior on mobile is to open outside in browser using the `websiteUrl`. For apps published to the public App Store, if you want your channel tab to open inside teams by default, follow the [guidance for tabs on mobile](~/tabs/design/tabs-mobile.md), and reach out to your support rep to request to be whitelisted.

Tabs are canvases that you can use to share content, hold conversations, and host third-party services, all within a team’s organic workflow. When you build a tab in Microsoft Teams, it puts your web app front and center where it’s easily accessible from key conversations.

## Guidelines

A good tab should display the following characteristics:

### Focused functionality

Tabs work best when they’re built to address a specific need. Focus on a small set of tasks or a subset of data that’s relevant to the channel the tab is in.

### Reduced chrome

Avoid creating multiple panels in a tab, adding layers of navigation, or requiring users to scroll both vertically and horizontally in one tab. In other words, try not to have tabs in your tab.

### Integration

Find ways to notify users about tab activity by posting [adaptive cards](../../task-modules-and-cards/what-are-cards.md#adaptive-cards) to a conversation.

### Conversational

Find a way to facilitate conversation around a tab. This ensures that conversations center on the content, data, or process at hand.

### Streamlined access

Make sure you’re granting access to the right people at the right time. Keeping your sign-in process simple will avoid creating barriers to contribution and collaboration.

### Responsiveness to window sizing

Teams can be used in window sizes as small as 720px, so making sure that a tab is usable in a small window is just as important as usability at very high resolutions.

### Flat navigation

We ask developers not to add their entire portal to a tab. Keeping the navigation relatively flat helps maintain a simpler conversational model. In other words, the conversation is about a list of things, such as triaged work items, or a single thing, like a spec.

There are inherent navigational challenges with deep navigation hierarchy, within threaded conversations. For the best user experience, your tab navigation should be kept to a minimum and be designed as follows:

> [!div class="checklist"]
>
> * **Opens a task module such as an individual work item or entity**. This precludes chat entirely and is the best option to keep chat specifically about the tab and not the sub-entities or editing experiences.
>* **Opens a pseudo dialog in an iframe**. If used with a screened background we recommend using the lighter color rather than the dark. The `app-gray-10 at 30%` transparency works well.
>* **Opens a browser page**.

### Personality

Your tab canvas presents a great opportunity to brand your experience. Your logo is an important part of your identity and connection with your users., so be sure to include it:

> [!div class="checklist"]
>
>* Place your logo in the left or right corner or along the bottom edge
> * Keep your logo small and unobtrusive

Incorporating your own colors and layouts twill also aid in communicating personality.

> [!TIP]
> Please work with our visual style so your service feels like a part of Teams. *See*, for example [Teams Colors](../../concepts/design/components/color.md)

---

## Tab layouts

[!INCLUDE [Tab layouts](../../includes/design/tab-layouts.html)]

---

## Types of tabs

[!INCLUDE [Tab types](../../includes/design/tab-types.html)]

---

## Configuration page height

>[!IMPORTANT]
>In September 2018, the height for the tab [configuration page](~/tabs/how-to/create-tab-pages/configuration-page.md) was increased while the width remained unchanged. If your app is designed for the older size your tab configuration page will have a great deal of vertical whitespace. Legacy store apps exempted from this change will need to contact Microsoft after updating to accommodate the new dimensions.

The dimensions of the tab configuration page:

<img width="450px" title="Sizes for configuration tabs" src="~/assets/images/tabs/config-dialog-Contoso2.png" />

### Guidelines for tab configuration page format

* Base the minimum height of your content area of your tab configuration page on fixed-height graphic elements.
* Calculate available vertical space (the height of the content area in the configuration page) using `window.innerHeight`. This returns the size of the `<iframe>` in which your configuration page resides, which may change in future releases. By using this value your content will adjust automatically to future changes.
* Allocate vertical space to the variable-height elements minus what's needed for the fixed-height elements.
* For the *login* state, vertically and horizontally center the content.
* If you want a background image, you need either a new image, sized to fit the area (preferred), or you can keep the same image and choose between:
  * aligning to the upper left hand corner.
  * scaling the image to fit.

When properly sized, your tab configuration page should look similar to this:

<img width="450px" title="New configuration tab" src="~/assets/images/tabs/config-dialog-Contoso.png" />

## Best practices

### Always include a default state

Include a default state to make tabs easy to set up even if your tab is configurable.

### Deep linking

Whenever possible, cards and bots should deep link to richer data in a hosted tab. For example, a card may show a summary of bug data, but clicking it can shows the entire bug in a tab.

### Naming

In many cases, the name of your app will make a great tab name. But, also consider naming your tabs according to the functionality they provide.

## Notifications for tabs

There are two modes of notification for tab content changes:

> [!div class="checklist"]
>
> * **Use the app api to notify users of changes**. This message will show up in the user’s activity feed and deep link to the tab. *See*  [Create deep links to content and features in Microsoft Teams](../../concepts/build-and-test/deep-links.md?view=msteams-client-js-latest)
> * **Use a bot**. This method is preferred especially if the Tab thread is targeted. The result will be that the tab’s threaded conversation will be moved into view as recently active. This method also allows for some sophistication in how the notification is sent.

  Sending a message to a tab thread increases the awareness of activity to all users without explicitly notifying everyone. This is awareness without noise. In addition, when you `@mention`  specific users the same notification will be placed in their feed, deep linking them to the tab thread directly.
