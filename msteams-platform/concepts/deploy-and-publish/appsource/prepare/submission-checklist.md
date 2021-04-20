---
title: Prepare your store submission  
description: Describes the final steps before submitting your Microsoft Teams app to be listed on the store.
ms.topic: how-to
author: heath-hamilton
ms.author: surbhigupta
---
# Prepare your Microsoft Teams store submission

You've designed, built, and tested your Microsoft Teams app. Now you're ready to list it so people can discover and start using your app.

Before you submit your app to [Partner Center](/office/dev/store/use-partner-center-to-submit-to-appsource), make sure you've done the following.

## Validate your app package

While your app may be working in a test environment, you should check your app package to avoid running into issues during the submission process.

The Microsoft Teams app validation tool helps you identify and fix issues before submitting to Partner Center. The tool automatically checks your app's configurations against the same test cases used during store validation.

1. Go to the [Microsoft Teams app validation tool](https://dev.teams.microsoft.com/appvalidation.html). (Note: The tool is also available in [App Studio](../../../build-and-test/app-studio-overview.md).)
1. Upload your app package to run the automated tests.
1. Go to the **Preliminary checklist** and review the test cases that are difficult to automate.
1. [Fix issues with your configurations](~/resources/schema/manifest-schema.md) or app in general if the automated tests give you errors or you haven't met all the criteria in the checklist.

## Compile notes for testing your app

Include the following information with your submission. If you upload test notes to SharePoint, you must provide a public link to that site.

### Feature list

Detail all of the app's capabilities within Teams and steps for testing each one.

### Accounts

Test accounts are required if your app only allows licensed accounts or safelisting from the backend. In these situations, you must provide the following:

* Credentials for at least two accounts (one admin and one non-admin). For testing purposes, the accounts should have sufficient pre-populated data.
* If your app has a channel or group chat scope, two test accounts in the same tenant to validate the collaboration scenario.
* For apps that require a subscription, have a Microsoft 365 tenant or domain dependency, or are for enterprise users, a third account in the same domain that isn't pre-configured to validate the first-run user experience.
* If your app has premium features, an additional account with necessary access to test that experience.

### Tenant configurations

If you must configure a Teams tenant to use your app, include those instructions and admin and non-admin accounts for validation.

### Video (optional)

Provide a recording of your app so that Microsoft can fully understand its functionality.

## Create your store listing details

The information that you submit to [Partner Center](https://partner.microsoft.com)&#8212;including your name, descriptions, icons, and images&#8212;becomes the Teams store and Microsoft AppSource listing for your app.

A store listing may be someone's first impression of your app. Increase installations with a listing that effectively conveys your app's benefits, functionality, and brand.

### Specify a short name

Your app's name (specifically, its [*short name*](~/resources/schema/manifest-schema.md#name)) plays a crucial role in how users discover it in the store.

The following example highlights where an app's short name displays in a store listing:

:::row:::

   :::column span="3":::
      :::image type="content" source="../../../../assets/images/store-detail-page/AppName-02.png" alt-text="Example screenshot highlights where an app's short name displays in a store listing.":::
   :::column-end:::
   :::column span="1":::
   :::column-end:::

:::row-end:::

Make sure your short name adheres to the [store validation guidelines](~/concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md#11-app-name).

### Write descriptions

You must have a short and long description of your app.

#### Short description

A concise summary of your app that should be original, engaging, and directed at your target audience. Keep the short description to one sentence.

The following example highlights where an app's short description displays in a store listing:

:::row:::

   :::column span="3":::
      :::image type="content" source="~/assets/images/store-detail-page/ShortDescription-02.png" alt-text="Example screenshot highlights where an app's short description displays in a store listing.":::
   :::column-end:::
   :::column span="1":::
   :::column-end:::

:::row-end:::

Make sure your short description adheres to the [store validation guidelines](~/concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md#431-short-description).

#### Long description

The long description can provide a narrative that highlights your app's main features, the problems it solves, and its target audience. While this description can be as long as 4,000 characters, most users will only read between 300-500 words.

The following example highlights where an app's long description displays in a store listing:

:::row:::

   :::column span="3":::
      :::image type="content" source="~/assets/images/store-detail-page/ShortDescription-02.png" alt-text="Example screenshot highlights where an app's long description displays in a store listing.":::
   :::column-end:::
   :::column span="1":::
   :::column-end:::

:::row-end:::

Make sure your long description adheres to the [store validation guidelines](~/concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md#432-long-description).

### Adhere to icon design guidelines

Icons are one of the main elements users see when browsing the store. Your icons should communicate your app's brand and purpose while also adhering to Teams requirements.

For more information, see [guidance on creating Teams app icons](~/concepts/build-and-test/apps-package.md#app-icons).

### Capture screenshots

Screenshots provide a prominent visual preview of your app to complement your app name, icon, and descriptions.

Remember the following about screenshots:

* You can have up to five screenshots per listing.
* Supported file types include PNG, JPEG, and GIF.
* Dimensions should be 1366x768 pixels.
* Maximum size of 1,024 KB.

For best practices, see the following resources:

* [Teams store validation guidelines](~/concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md#44-screenshots)
* [Craft effective images for Microsoft app stores](/office/dev/store/craft-effective-appsource-store-images)

### Create a video

A video in your listing can be the most effective way to communicate why people should use your app. You should address the following questions in a video:

* Who is your app for?
* What problems can your app solve?
* How does your app work?
* What other benefits do you get from using your app?

#### Best practices for videos

* Keep your video between 30-90 seconds.
* Aim for quality. In a listing, users will see your video before screenshots.

### Select a category for your app

During submission, you're asked to categorize your app. The following table maps Teams store categories to the categories listed in [Partner Center](https://aka.ms/PartnerCenterHomePage).

| Teams categories       | Partner Center categories  |
|:---------------------|:---------------|
| Analytics and BI | Analytics, Data Visualization and BI |
| Developer and IT | Developer Tools, IT Admin |
| Education | Education |
| Human resources | Human Resources and Recruiting |
| Productivity | Content Management, Files and documents, Productivity, Training and Tutorials, and Utilities |
| Project management | Communication, Project Management, Workflow, and Business Management |
| Sales and support | Customer and Contact Management, Customer Support, Financial Management, Sales and Marketing |
| Social and fun | Image and Video Galleries, Lifestyle, News and Weather, Social, Travel, and Navigation |

### Localize your store listing

Partner Center supports [localized store listings](https://docs.microsoft.com/office/dev/store/prepare-localized-solutions). For more information, see [how to localize your Teams app listing](../../../../concepts/build-and-test/apps-localization.md).

## Complete Publisher Verification

[Publisher Verification](/azure/active-directory/develop/publisher-verification-overview) is required for Teams apps listed in the store.For more information, see [frequently asked questions](/azure/active-directory/develop/publisher-verification-overview#frequently-asked-questions), [how to mark your app as publisher verified](/azure/active-directory/develop/mark-app-as-publisher-verified), and [troubleshoot publisher verification](/azure/active-directory/develop/troubleshoot-publisher-verification).

## Complete Publisher Attestation

[Publisher Attestation](/microsoft-365-app-certification/docs/attestation) is also required for Teams apps listed in the store. The process includes completing a self-assessment of your app's security, data handling, and compliance practices that can help potential customers make informed decisions about using your app.

> [!NOTE]
> If you're submitting a new app, you can't officially complete Publisher Attestation until your app is listed on the Teams store. If you're updating a listed app, complete Publisher Attestation before you submit the latest version of the app for validation.

## Next step

> [!div class="nextstepaction"]
> [Submit your app](https://docs.microsoft.com/office/dev/store/add-in-submission-guide)
