---
title: Design guidelines for tabs
description: Describes the guidelines for creating tabs for content and collaboration
keywords: teams design guidelines reference framework tabs configuration
---
# Content and conversations, all at once using tabs

> [!Important]
> **Tabs on Mobile Clients**
>
> Follow the [guidance for tabs on mobile](~/tabs/design/tabs-mobile.md) when creating your tabs. If your tab uses authentication, you must upgrade your Teams JavaScript SDK to version 1.4.1 or later, or authentication will fail.
>
> **Personal (static) tabs on mobile:**
>
> * Static tabs (personal app) are available in [developer preview](~/resources/dev-preview/developer-preview-intro.md).
> * While building your static tabs, ensure to follow the [guidance for tabs on mobile](~/tabs/design/tabs-mobile.md)
>
> **Channel/group (configurable) tabs on mobile:**
>
> * Mobile clients only show tabs that have a value for `websiteUrl`. If you want your tab to appear on the Teams mobile clients, you must set the value of `websiteUrl`.
> * Default open behavior on mobile is to open outside in browser using the `websiteUrl`. For apps published to the public App Store, if you want your channel tab to open inside teams by default, follow the [guidance for tabs on mobile](~/tabs/design/tabs-mobile.md), and reach out to your support rep to request to be whitelisted.

Tabs are canvases that you can use to share content, hold conversations, and host third-party services, all within a team’s organic workflow. When you build a tab in Microsoft Teams, it puts your web app front and center where it’s easily accessible from key conversations.

## Guidelines

A good tab should display the following characteristics:

### Focused functionality

Tabs work best when they’re built to address a specific need. Focus on a small set of tasks or a subset of data that’s relevant to the channel the tab is in.

### Reduced chrome

Avoid creating multiple panels in a tab, adding layers of navigation, or requiring users to scroll both vertically and horizontally in one tab. In other words, try not to have tabs in your tab.

> [!TIP]
> Avoid creating multiple panels in a tab, adding layers of navigation, or requiring users to scroll both vertically and horizontally in one tab.

### Integration

Find ways to notify users about tab activity by posting cards to a conversation, for example.

### Conversational

Find a way to facilitate conversation around a tab. This ensures that conversations center on the content, data, or process at hand.

### Streamlined access

Make sure you’re granting access to the right people at the right time. Keeping your sign-in process simple will avoid creating barriers to contribution and collaboration.

### Personality

Your tab canvas presents a good opportunity to brand your experience. Incorporate your own logos, colors, and layouts to communicate personality.

Your logo is an important part of your identity and a connection with your users. So be sure to include it.

* Place your logo in the left or right corner or along the bottom edge
* Keep your logo small and unobtrusive

> [!TIP]
> Please work with our visual style so your service feels like a part of Teams.

---

## Tab layouts

[!include[Tab layouts](~/includes/design/tab-layouts.html)]

---

## Types of tabs

[!include[Tab types](~/includes/design/tab-types.html)]

---

## Configuration page height

>[!NOTE]
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

In many cases, the name of your app may make a great tab name. But consider naming your tabs according to the functionality they provide.
