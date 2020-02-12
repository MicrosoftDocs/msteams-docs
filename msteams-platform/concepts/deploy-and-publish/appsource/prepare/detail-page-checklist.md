---
title: Build a great app details page 
description: Describes what app details pages must have 
keywords: teams publish store office publishing policy AppSource content
---

# Build a great app details page

The details page is the first impression of your app. Each element of your details page can be used to convey your vision and drive downloads — consider how you want to showcase your app in a limited space. Here are some tips and tricks to help you engage your users before they even install your app.

> [!NOTE]
> Make sure your app information follows our [AppSource guidance for creating an effective store listing](/office/dev/store/create-effective-office-store-listings).

## App name

An app’s name plays a critical role in how users discover it in AppSource app store. Your app’s short name will be displayed on the details page.

**Do's:**

* Choose a simple, memorable name that hints at what your app does.
* Be distinctive.

**Don'ts:**

* Don't use generic terms or names that are similar to existing app names.
* Don't use "Teams", "Microsoft", or "app" in your app name.
![App name store view](~/assets/images/store-detail-page/AppName-02.png)
![App name appstudio view](~/assets/images/store-detail-page/AppName-01.png)

## Color icon

This is one of the first elements that users see. It should be attractive and eye-catching when scrolling through the app store. Be sure it makes a good first impression and also communicates your brand’s image and purpose. AppSource has more tips on [creating a consistent visual identity](/office/dev/store/create-effective-office-store-listings#create-a-consistent-visual-identity).

![App icon store view](~/assets/images/store-detail-page/AppIcon-02.png)
![App icon appstudio view](~/assets/images/store-detail-page/AppIcon-01.png)

## Outline icon

This is used in messaging extensions marked as a favorite by the user and the left navigation menu. Make sure it's simple and recognizable. Your outline icon must contain only white and transparency (no other colors). For required specifications, *see* [Create an app package for your Microsoft Teams app - Icons](../../../build-and-test/apps-package.md#icons).

![App icon outline store view](~/assets/images/store-detail-page/AppIconOutline-02.png)
![App icon outline appstudio view](~/assets/images/store-detail-page/AppIconOutline-01.png)

## Short description

This is a concise summary of your app. You want it to be original, engaging, and directed at your target audience. Ideally, try and describe your solution and its value to your users in one sentence.

**Do's:**

* Put the most important information first.
* Include keywords that customers are likely to search for.

**Don’ts:**

* Don't repeat the title.
* Don't use jargon or specialized terminology — you can't assume that users know what to look for.

![Short Description store view](~/assets/images/store-detail-page/ShortDescription-02.png)

Here's a view in [App Studio](https://aka.ms/InstallTeamsAppStudio):

![Short Description  appstudio view](~/assets/images/store-detail-page/ShortDescription-01.png)

## Long description

This provides an engaging narrative highlighting your solution's main features, the problems it solves, and its target audience. Draw in your audience with the first sentence by communicating your app’s unique features. Your description must be under 4000 characters. Note that most users will only read between 300 and 500 words.

>[!IMPORTANT]
> Make sure to precisely copy the descriptions you wrote in your AppSource entry to your manifest — the values must match. Teams will only use the descriptions you provide in the manifest.

**Do's:**

* Use [Markdown formatting](https://support.office.com/article/use-markdown-formatting-in-teams-4d10bd65-55e2-4b2d-a1f3-2bebdcd2c772) to illuminate your description.  
* List features to aid readers scanning your description.
* Use active voice and speak to users directly.
* Use bullet points to list out your features.
* Include a help or support link so your users know how to reach you if they have questions.

**Don’ts:**

* Don't put too many keywords in your description — it's distracting and won't help your app's discoverability.

![App long description store view](~/assets/images/store-detail-page/LongDescription-02.png)

Here's a view in [App Studio](https://aka.ms/InstallTeamsAppStudio):

![App long description appstudio view](~/assets/images/store-detail-page/LongDescription-01.png)

## Screenshots

The screenshots uploaded on the [Seller Dashboard](https://sellerdashboard.microsoft.com/Registration) are displayed in both [AppSource](https://appsource.microsoft.com/marketplace/apps?product=office%3Bteams&page=1) and your app listing in the Teams client. They provide a visual preview of your app along with your app description.
You can provide one to five screenshots formatted as .png, .jpg, or .gif files. Screenshots should be 1366 x 768 pixels with a maximum size of 1024 KB.

**Do's:**

* Focus on highlighting all of your app's capabilities.
* Content should accurately represent your app.
* Text should be well-populated without being excessive.
* You can surround your screenshots with a background color and add marketing content similar to the [Freshdesk](https://appsource.microsoft.com/product/office/WA104381505?src=office&tab=Overview) example; however, the dimensions won't be of the screenshot alone, but will include the overall image.

<img width="800px" title="Freshdesk screenshot" src="~/assets/images/freshdesk.png" />

**Don'ts:**

* Don't show specific devices, like phones or laptops.
* Don't show any chrome/UI from outside of your app.
* Don't capture any Teams or browser UI in your screenshots.
* Don't include mock-ups that inaccurately reflect your apps actual UI such as showing your website instead of your Teams tab.

For more best practices, *see*: [Crafting effective AppSource store images](/office/dev/store/craft-effective-appsource-store-images).

## Videos

If an image is worth a thousand words, then a video is worth a thousand images. Videos are the most effective way to communicate the benefits of using your app. It will be placed in front of all your screenshots in the app details page. Make sure you talk about how your app works, what can be achieved with it, the benefits of using it, and who it's for. Remember to keep your presentation short and sweet — somewhere between 30-90 seconds.

## Learn more

[Checklist for app submission](~/concepts/deploy-and-publish/appsource/publish.md).  
[Create an app package for your Microsoft Teams app](~/concepts/build-and-test/apps-package.md).  
[Use Partner Center to submit your solution to AppSource](/office/dev/store/use-partner-center-to-submit-to-appsource).
