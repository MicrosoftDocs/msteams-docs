---
title: Loop component design guidelines 
description: In this article, learn how to design Adaptive Card based Loop components.
ms.author: mobajemu
ms.date: 06/15/2023
ms.topic: tutorial
ms.custom: m365apps
ms.localizationpriority: medium
---

# Loop component design guidelines

Microsoft Loop components are live, actionable units of productivity that stay in sync and move freely across Microsoft 365 apps. It includes the capability for developers to create Loop components by evolving an existing Adaptive Card into a Loop component or creating a new Adaptive Card-based Loop component.

## Loop components are live, embedded, actionable, and portable

**Live**: Your Adaptive Card must be self-updating when the card is loaded, such as when opening an email or chat, to reflect the latest information.

**Embedded**: Adaptive Cards are embedded, so there's nothing specific needed from the developer.

**Actionable**: Loop components allow the user to take action to complete a flow within the component itself; beyond simply viewing information or opening a browser. If your Adaptive Card is a view-only experience, look for opportunities to make it actionable, as this is a core element to delight users. Ensure that an Adaptive Card with view-only experience doesn't change to a Loop component, in this case, it must remain an Adaptive Card only.

   > [!NOTE]
   > Certain user permissions or modes of your component might not be actionable, but the common cases must be actionable.

You can make your Adaptive Card actionable by including any of the following actions:

* Approve an expense report
* Add a comment
* Update a date
* Update price, such as dollar amount
* Change an assignment or status value
* Add or update data

**Portable**: Adding the URL attribute as required in the developer guidance ensures that your component can be live-copied anywhere the Adaptive Card-based Loop component is supported.

|Property|Function|
|---|---|
|Live| The latest information is populated in the card. If there are multiple instances, they remain in sync as updates are made. |
|Embedded |  Cards can be placed into documents and conversations that are separate from the rest of the content. |
| Actionable | Tasks can be completed inline. |
| Portable | Components can work across to Microsoft 365 app that supports Loop components. |

## Loop component elements

An Adaptive Card-based Loop component comprises of the **Body**, **Header**, and **Border**.

:::image type="content" source="~/assets/images/loop-element-overview.png" alt-text="The screenshot graphic of highlighting the spacing on a card and which belongs to the header, border, and body ":::

|Loop component element  |Developer provides  |Platform provides  |
|---------|---------|---------|
|Body    | Contents fully controlled by developer        | Rendering and styling of controls based on developer code.        |
|Header    |  Icon and name       |  Elements and layout are standard and provided by platform       |
|Border     |     NA    |   Standard border for all Loop components.      |

## Loop component body

The Loop component body makes your component unique. You can give your users a positive experience and grow usage and retention by building a component that embodies the Loop component attributes and provides customer value.

The details of the component body is determined by the specifics of your users’ needs and scenarios.

:::image type="content" source="../assets/images/adaptive-cards/loop-component-body.png" alt-text="Infographic shows the UX elements of a loop component body.":::

The following are the best practices for a Loop component body:

* Go to [Adaptive Cards Home](https://adaptivecards.io) and review the [Adaptive Cards overview](/adaptive-cards/) article to understand the basics and core design principles of Adaptive Cards.
* Follow the [Adaptive Card design guidelines](../task-modules-and-cards/cards/design-effective-cards.md), which include tools, examples, notes about responsive design, and pixel density.
* The following list provides the Loop component specific considerations:
  * Ensure that your component is true to the Loop components attributes such as, live, actionable, embedded, and portable.
  * [Don’t add a separate button to open in browser.](#dont-add-a-separate-button-to-open-in-browser)
  * [Don’t add a duplicate header or border.](#dont-add-a-duplicate-header-or-border)

### Don’t add a separate button to open in browser

The Loop component header provides a standard way to open a browser-based view of the component based on your URL. Thus, there's no need to add a separate button to your component for actions like **View Details**, or **Open on Web**.

You can add buttons or links for more specific views, for example, **View Related Items**. When possible, provide the required information and interaction within the card.

### Don’t add a duplicate header or border

All Loop components have a standard header and border; your Adaptive Card code must not duplicate these. You can have an item-specific title for your component, but ensure that the app name and icon isn't the same.

## Loop component header

The platform provides the component header and includes standard elements such as **App logo**, **App name**, and **Copy**.

:::image type="content" source="../assets/images/adaptive-cards/loop-component-header.png" alt-text="Infographic shows the UX elements in a Loop component header.":::

|Counter  |Description  |
|---------|---------|
|1     |  App logo: Full color app logo of your app.       |
|2     |  App name:  Full name of your app.       |
|3     |  Shared locations (Loop control)       |
|4     |  Copy component      |

**App name** is drawn from the component contract. We recommend to use a concise name for your app.

**App logo** is drawn from the component contract. Ensure that the logo provided works on both light and dark backgrounds since the same asset is used for light, dark, and high contrast themes in Teams.

## Loop component border

The component border separates your component from the content around it. It helps users understand that the Loop component is live and separate from the contents surrounding it such as, email or chat.

The border appears automatically.

## See also

[Format cards in Microsoft Teams](cards-loop-component.md)
