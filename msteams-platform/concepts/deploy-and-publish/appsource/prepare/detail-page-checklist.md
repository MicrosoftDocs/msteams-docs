---
title: Create a store listing for your app
description: Describes how to create a store listing for your Microsoft Teams app.
ms.topic: how-to
author: heath-hamilton
ms.author: surbhigupta
---

# Create a store listing for your Microsoft Teams app

The information that you submit to [Partner Center](https://partner.microsoft.com)&#8212;including your name, descriptions, icons, and images&#8212;becomes the Microsoft Teams store and Microsoft AppSource listing for your app.

A store listing may be someone's first impression of your app. Increase your installations with a listing that effectively conveys your app's benefits, functionality, and brand.

## 1. Come up with a short name

Your app's name (specifically, its [*short name*](~/resources/schema/manifest-schema.md#name)) plays a crucial role in how users discover it in the store.

The following example highlights where an app's short name displays in a store listing.

:::image type="content" source="../../../../assets/images/store-detail-page/AppName-02.png" alt-text="Example screenshot highlights where an app's short name displays in a store listing.":::

### Best practices for names

**Do:**

* Choose a simple, memorable name that hints at what your app does.
* Be distinctive.
* If needed, reference **Microsoft 365** instead of **Office 365**.
* Avoid typos and grammatical errors.

**Don't:**

* Use profane or derogatory terms.
* Use racially or culturally insensitive language.
* Use generic terms or names similar to existing apps.
* Include "Teams", "Microsoft", existing/upcoming Microsoft product names, or  "app" in the name.

> [!NOTE]
> If your app is part of an official partnership with Microsoft, the name of your app must come first (for example, *Salesforce Connector for Microsoft Teams*).

## Write descriptions

You need a short and long description of your app.

### Best practices for all descriptions

**Do:**

* Reference Microsoft product names only when necessary. For more information on the guidelines, see [Microsoft Trademark and Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general).
* If you need to reference **Teams**, write the first reference as **Microsoft Teams**. Subsequent references can be shortened to **Teams**.
* Refer to **Microsoft 365** instead of **Office 365**.
* Avoid typos and grammatical errors.
* Avoid unnecessary capitalizations (for example, **Users** instead of **users**).
* Avoid acronyms.

**Don't:**

* Abbreviate Microsoft as **MS** or **MSFT**.
* Indicate the app is an offering from Microsoft, including using Microsoft slogans or taglines.
* Use copyrighted brand names you don't own.

### Short description

A concise summary of your app that should be original, engaging, and directed at your target audience. Ideally, keep the short description to one sentence.

The following example highlights where an app's short description displays in a store listing:

:::image type="content" source="~/assets/images/store-detail-page/ShortDescription-02.png" alt-text="Example screenshot highlights where an app's short description displays in a store listing.":::

#### Best practices for short descriptions

**Do:**

* Put the most important information first.
* Include keywords that customers are likely to search for.

**Don't:**

* Repeat your app name.
* Rely on jargon or specialized terminology. (You can't assume users know what to look for.)

### Long description

The long description can provide an engaging narrative that highlights your app's main features, the problems it solves, and its target audience. While this description can be as long as 4000 characters, most users will only read between 300-500 words.

The following example highlights where an app's long description displays in a store listing:

:::image type="content" source="~/assets/images/store-detail-page/ShortDescription-02.png" alt-text="Example screenshot highlights where an app's long description displays in a store listing.":::

#### Usage examples

The following phrases are examples of what's allowed when writing long descriptions:

* "<*Your app name*> works with Microsoft Teams"
* "... a <*type of app*> for Microsoft Teams"
* "<*Your app name*> integrates with Microsoft Teams"
* "... integrated with Microsoft Teams"
* "... for users working with Microsoft Teams"
* "... for <*specific task*> within Microsoft Teams"
* "... built on ..."
* "... runs on ..."
* "... enabled by ..."
* "... developed for ..."
* "... designed for ..."

#### Best practices for long descriptions

**Do:**

* Use [Markdown](https://support.office.com/article/use-markdown-formatting-in-teams-4d10bd65-55e2-4b2d-a1f3-2bebdcd2c772) to format your description.
* List features with bullet points so it's easier to scan the description.
* Use active voice and speak to users directly (for example, *You can ...*).
* Include a help or support link.
* Identify the following if applicable: limitations, set up information, account dependencies, and release updates.

**Don't:**

* Exceed 500 words.
* Include too many keywords. (It's distracting and won't help people find your app.)
* Use the following language unless the app has gone through an official certification process:
  * "... certified for ..."
  * " ... powered by ..."

Adhere to icon design guidelines

Icons are one of the main elements users see when browsing the store. Your icons should communicate your app's brand purpose while also adhering to Teams requirements.

[See specific guidance on creating Teams app icons](~/concepts/build-and-test/apps-package.md#app-icons).

## 4. Capture screenshots

Screenshots provide a prominent visual preview of your app to complement your app name, icon, and descriptions.

### Requirements for screenshots

* Up to five screenshots per listing.
* Supported file types include PNG, JPEG, and GIF.
* Dimensions should be 1366x768 pixels.
* Maximum size of 1,024 KB.

### Best practices for screenshots

**Do:**

* Focus on your app's capabilities (for example, how people can communicate with your bot).
* Include content that accurately represents your app.
* Use text judiciously.
* Frame screenshots with a color that reflects your brand and include marketing content, similar to the following [Freshdesk](https://appsource.microsoft.com/product/office/WA104381505?src=office&tab=Overview) example (dimension requirements apply to the whole image and not just the screenshot):
    :::image type="content" source="../../../../assets/images/freshdesk.png" alt-text="Screenshot example of third-party app Freshdesk":::

**Don't:**

* Show specific devices, such as phones or laptops.
* Display chrome or UI that isn't in your app.
* Capture any Teams or browser UI in your screenshots.
* Include mockups that inaccurately reflect your app's actual UI, such as showing your app in  a browser instead of a Teams tab.

For more best practices, see [craft effective images for Microsoft app stores](/office/dev/store/craft-effective-appsource-store-images).

## Create a video

A video can be the most effective way to communicate why people should use your app. You should address the following questions in a video:

* Who is your app for?
* What problems can your app solve?
* How does your app work?
* What other benefits do you get from using your app?

If you include a video, it appears before your screenshots in the listing.

### Best practices for videos

* Keep your video between 30-90 seconds.
* Aim for quality. In a listing, users will see your video before screenshots.

## Localize your store listing

Partner Center supports [localized store listings](https://docs.microsoft.com/office/dev/store/prepare-localized-solutions).

[See how to localize your Teams app listing](../../../../concepts/build-and-test/apps-localization.md)

## Related

* [Create effective Microsoft 365 Stores listings](/office/dev/store/create-effective-office-store-listings)
* Teams app design guidelines for [copy and content](~/concepts/design/design-teams-app-fundamentals.md#copy-and-content) and [brand expression](~/concepts/design/design-teams-app-fundamentals.md#brand-expression)
* [Microsoft Trademark and Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general)

## Next step

> [!div class="nextstepaction"]
> [Prepare your store submission](~/concepts/deploy-and-publish/appsource/prepare/submission-checklist.md)
