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

*  An app's name plays a critical role in how users discover it in the AppSource app store. Your app's short name will be displayed on the details page.
* The app name should reflect your app without any reference to Microsoft or Microsoft productsNote: If your app is an official partnership with Microsoft, then the name of the 3rd party app needs to go first i.e. Salesforce Connector for Microsoft Teams.
* Use these resources for guidance:
    * Online naming resource: [App name](https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/deploy-and-publish/appsource/prepare/detail-page-checklist#app-name)
    * Trademark guidance: [Microsoft Trademark and Brand Guidelines](https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks/usage/general)

**Do's:**

* Choose a simple, memorable name that hints at what your app does.
* Be distinctive.
* If needed, use Microsoft 365 references instead of Office 365.

**Don'ts:**

* App name must not omit spaces, have an incorrect case, or language errors.
* Don't use generic terms or names similar to existing apps.
* Don't use "Teams", "Microsoft", existing/upcoming Microsoft product names, or  "app" in your app name.
* Do not use parenthesis in name to include Microsoft products i.e. App Name (for Microsoft Teams).

![App name store view](~/assets/images/store-detail-page/AppName-02.png)
![App name App Studio view](~/assets/images/store-detail-page/AppName-01.png)

## Color icon

This is one of the first elements that users see. It should be attractive and eye-catching when scrolling through the app store. Be sure it makes a good first impression and also communicates your brand's image and purpose. AppSource has more tips on [creating a consistent visual identity](/office/dev/store/create-effective-office-store-listings#create-a-consistent-visual-identity).

![App icon store view](~/assets/images/store-detail-page/AppIcon-02.png)
![App icon App Studio view](~/assets/images/store-detail-page/AppIcon-01.png)

**Don'ts:**

* Your icon must not mimic any copyrighted products you do not own.
* Your icon must not look similar to any Microsoft product/brands.

## Outline icon

This is used in messaging extensions marked as a favorite by the user and the left navigation menu. Make sure it's simple and recognizable. Your outline icon must contain only white and transparent (no other colors). For required specifications, *see* [Create an app package for your Microsoft Teams app - Icons](../../../build-and-test/apps-package.md#icons).

![App icon outline store view](~/assets/images/store-detail-page/AppIconOutline-02.png)
![App icon outline App Studio view](~/assets/images/store-detail-page/AppIconOutline-01.png)

**Don'ts:**

* Your icon must not mimic any copyrighted products you do not own.
* Your icon must not look similar to any Microsoft product/brands.

## Short description

* This is a concise summary of your app. You want it to be original, engaging, and directed at your target audience. Ideally, try and describe your solution and its value to your users in one sentence.

**Do's:**

* Put the most important information first.
* Include keywords that customers are likely to search for.
* If you need to mention Microsoft Teams, the first mention of Microsoft Teams should be written out in full as ‘Microsoft Teams’. If Teams is mentioned again later in the same description, the name can be shortened to ‘Teams’.
* Any references to Microsoft or Microsoft Teams can be part of the description and should follow Microsoft’s brand standards and guidelines.
* All descriptions must be grammatically correct with no language errors.
* Avoid unnecessary use of capitalizations (example: stating "Users" instead of "users".

**Don'ts:**

* Do not repeat the title.
* Do not abbreviate Microsoft to "MS".
* Do not use jargon or specialized terminology — you can't assume that users know what to look for.
* Avoid unnecessary reference to Microsoft product names unless absolutely necessary
* Do not wrongly indicate that the app is an offering from Microsoft
* Do not use copyrighted brand names you do not own
* Do not use "for Teams" in a short name.

![Short Description store view](~/assets/images/store-detail-page/ShortDescription-02.png)

Here's a view in [App Studio](https://aka.ms/InstallTeamsAppStudio):

![Short Description App Studio view](~/assets/images/store-detail-page/ShortDescription-01.png)

## Long description

* This provides an engaging narrative highlighting your solution's main features, the problems it solves, and its target audience. Draw in your audience with the first sentence by communicating your app's unique features. Your description must be under 4000 characters. Note that most users will only read between 300 and 500 words.
* What is allowed?
    * ž…works with Microsoft Teams
    * ž…working with Microsoft Teams
    * ž…within Microsoft Teams
    * ž…for Microsoft Teams
    * ……integrated with Microsoft Teams
    * …integrates with…
    * …built for…
    * ….built on…
    * ….runs on…
    * …enabled by…
    * …developed for…
    * …designed for…
    Note: The same terms above also apply to the use of Microsoft 365. Office 365 is now called Microsoft 365. Please update your app descriptions to reflect this.

>[!IMPORTANT]
> Make sure to precisely copy the descriptions you wrote in your AppSource entry to your manifest — the values must match. Microsoft Teams will only use the descriptions you provide in the manifest.

**Do's:**

* Use [Markdown formatting](https://support.office.com/article/use-markdown-formatting-in-teams-4d10bd65-55e2-4b2d-a1f3-2bebdcd2c772) to illuminate your description.  
* List features to aid readers in scanning your description.
* Use active voice and speak to users directly.
* Use bullet points to list out your features.
* Include a help or support link so your users know how to reach you if they have questions.
* The first mention of Microsoft Teams should be written out in full as ‘Microsoft Teams’. If Teams is mentioned again later in the same description, the name can be shortened to ‘Teams’.
* Any references to Microsoft or Microsoft Teams (only if necessary)  may be part of the Long description and should follow Microsoft’s brand standards and guidelines.
* All descriptions must be grammatically correct with no language errors.
* Avoid unnecessary use of capitalizations for terms in your description (example: stating "Users" instead of "users".
* Avoid acronyms
* Make sure to call out limitations, account dependency, configuration set up, future updates in releases, or any usage constraints

>[!NOTE]
> Microsoft Teams supports the following Markdown syntax:  
> **Links**. `[title](url/address/here)`.  
>**Images**.`![alt text](url/address/here)`.  
> **Bold**. `**bold text**`   `__bold text__`.  
> **Italics**. `*italicized text*`  `_italicized text`.  
>**[Ordered Lists](https://www.markdownguide.org/basic-syntax/#ordered-lists)**<br>
>`1. first` 
<br>` 1. second ` 
<br>`1.third`<br>
>**[Unordered List](https://www.markdownguide.org/basic-syntax/#unordered-lists)**<br>
` - short` <br>`- bulleted` <br>`- list`<br>
>**Newline**. `Place two empty spaces or a backslash \`  \
`at the end of a line.`<br>
 >**Escape.** Use an inline backslash to escape special characters.. `\*asterisk`.

**Don'ts:**

* Don't put too many keywords in your description — it's distracting and won't help your app's discoverability.
* Do not use "Teams” or “Microsoft Teams” in a short name.
* Avoid unnecessary reference to Microsoft product names unless absolutely necessary
* Do not wrongly indicate that the app is an offering from Microsoft
* Do not use copyrighted brand names you do not own
* Do not use the following language unless the app has gone through an official certification process:
    * …certified for…
    * …powered by…
* Do not abbreviate “Microsoft” to “MS” or “MSFT” – Write it out in full.
* No part of description or metadata must wrongly indicate the app as an official Microsoft offering.
* Partners may not use or imitate any Microsoft tagline, or use the name of any Microsoft product or service in your slogan or tagline.
* Logo must not wrongly depict the app as an official Microsoft product/ feature or mimic any of the existing or upcoming Microsoft products.

![App long description store view](~/assets/images/store-detail-page/LongDescription-02.png)

Here's a view in [App Studio](https://aka.ms/InstallTeamsAppStudio):

![App long description App Studio view](~/assets/images/store-detail-page/LongDescription-01.png)

## Screenshots

The screenshots uploaded on the [Partner Center](https://partner.microsoft.com) are displayed in both [AppSource](https://appsource.microsoft.com/marketplace/apps?product=office%3Bteams&page=1) and your app listing in the Teams client. They provide a visual preview of your app along with your app description.
You can provide one to five screenshots formatted as .png, .jpg, or .gif files. Screenshots should be 1366 x 768 pixels with a maximum size of 1024 KB.

**Do's:**

* Focus on highlighting all your app's capabilities.
* Content should accurately represent your app.
* Text should be well-populated without being excessive.
* You can surround your screenshots with a background color and add marketing content similar to the [Freshdesk](https://appsource.microsoft.com/product/office/WA104381505?src=office&tab=Overview) example; however, the dimensions won't be of the screenshot alone but will include the overall image.

<img width="800px" title="Freshdesk screenshot" src="~/assets/images/freshdesk.png" />

**Don'ts:**

* Don't show specific devices, like phones or laptops.
* Don't show any chrome/UI from outside of your app.
* Don't capture any Teams or browser UI in your screenshots.
* Don't include mock-ups that inaccurately reflect your apps actual UI such as showing your website instead of your Teams tab.

For more best practices, *see*: [Crafting effective AppSource store images](/office/dev/store/craft-effective-appsource-store-images).

## Videos

If an image is worth a thousand words, then a video is worth a thousand images. Videos are the most effective way to communicate the benefits of using your app. It will be placed in front of all your screenshots on the app details page. Make sure you talk about:
* how your app works
* what can be achieved with it 
* the benefits of using it 
* who it is for

Remember to keep your presentation short and sweet — somewhere between 30-90 seconds.

## Learn more

[Checklist for app submission](~/concepts/deploy-and-publish/appsource/publish.md).  
[Create an app package for your Microsoft Teams app](~/concepts/build-and-test/apps-package.md).  
[Use Partner Center to submit your solution to AppSource](/office/dev/store/use-partner-center-to-submit-to-appsource).
