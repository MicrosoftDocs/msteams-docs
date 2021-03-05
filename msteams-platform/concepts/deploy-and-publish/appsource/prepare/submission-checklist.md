---
title: Prepare your store (AppSource) submission  
description: Describes the final steps before submitting your Microsoft Teams app to be listed on the store.
ms.topic: how-to
author: heath-hamilton
ms.author: surbhigupta
---
# Prepare your Microsoft Teams store and AppSource submission

You've designed, built, and tested your Microsoft Teams app. Now you're ready to list it so people can discover and start using your app.

Before you submit your app to [Partner Center](/office/dev/store/use-partner-center-to-submit-to-appsource), go through the following information.

## Validate your app manifest

While your app may be working in a test environment, you should check your app manifest again to avoid running into issues during the submission process.

The Microsoft Teams App Validator tool helps you identify and fix issues before submitting to Partner Center. The tool automatically checks your manifest against the same test cases used during store validation.

1. Go to the [Microsoft Teams App Validator tool](https://dev.teams.microsoft.com/appvalidation.html). (Note: The tool is also available in [App Studio](../../../build-and-test/app-studio-overview.md).)
1. Upload your manifest to run the automated tests.
1. Go to the **Preliminary checklist** and review the list of test cases that are difficult to automate.
1. If present, [fix issues with your manifest](~/resources/schema/manifest-schema.md) or app in general.

## Create notes for testing your app

Include the following information with your submission. If you upload test notes to SharePoint, you must provide a public link.

### Feature list

Detail all of the capabilities the app offers within Teams and steps for testing each feature.

### Accounts

* Credentials for at least two account (one admin and one non-admin). For verification purposes, the accounts should have sufficient pre-populated data.
* A test account is required if your app only allows licensed accounts or safelisting from the backend. Also, if your app has a team or group chat scope, you must provide two test accounts in the same tenant to validate the collaboration scenario.
* For apps that require a subscription, have an Microsoft 365 tenant/domain dependency, or are for enterprise users, you must provide a third account in the same domain that isn't pre-configured for your app so that we can validate the first-run user experience.
* If your app has premium features, an account with the necessary access must be provided to test that experience.

### Integration steps

If a Teams tenant requires configuration to use the app, include the configuration steps and admin and non-admin accounts for validation.

You can sign up for a [Microsoft 365 Developer Program](https://developer.microsoft.com/microsoft-365/dev-program) subscription. It's *free* for 90 days and renews as long as you're using it for development activities.

### Video (optional)

You can provide a recording of the product so we can fully understand its functionality.

## Create a Partner Center account

To publish your app to the Teams store and AppSource, you must [set up your Partner Center account](https://docs.microsoft.com/office/dev/store/open-a-developer-account).

### Partner Center app category mapping

During submission, you're asked to categorize your app. The following table maps Teams store categories to the categories listed in Partner Center.

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

### FAQ

Get answers to some common questions about using Partner Center.

<details>

<summary><b>How do I create a Partner Center account?</b></summary>

You can create a Partner Center account one of the following ways:

* If you're new to Partner Center and don't have a Microsoft Network Account, [create an account using the Partner Center enrollment page](#create-an-account-using-the-partner-center-enrollment-page).
* If you're already enrolled in the Microsoft Partner Network, [create an account directly from Partner Center using existing Microsoft Partner Center enrollments](#create-an-account-using-an-existing-partner-center-enrollment).

</details>

<details>

<summary><b>What if I can't find my account in Partner Center?</b></summary>

Open a [Partner Center support ticket](https://partner.microsoft.com/support/v2/?stage=1) and select the following:

| Menu | Option |
| -------   | -------  |
|Category| Commercial Marketplace|
| Topic | General Marketplace Help and How-to questions |
| Subtopic| Office add-in |

</details>

<details>

<summary><b>Where can I get support for my Partner Center account issues?</b></summary>

Visit the [publishers support page](https://aka.ms/marketplacepublishersupport) to search for your issue. If the guidance isn't helpful, create a [Partner Center support ticket](/azure/marketplace/partner-center-portal/support#how-to-open-a-support-ticket).

</details>

<details>

<summary><b>How do I manage my Office Store account in Partner Center?</b></summary>

See [manage your account through Partner Center](/office/dev/store/manage-account-settings-and-profile) for information.

</details>

<details>

<summary><b>My phone number doesn't have an area code, so how do I add it to my profile?</b></summary>

The phone number has three parts: country code, area code, and telephone number. If your phone number doesn't include an area code, leave the second box empty and complete the third box.

</details>

<details>

<summary><b>How do I manage my account settings and partner profile in Partner Center?</b></summary>

See [manage account settings and profile info](/windows/uwp/publish/manage-account-settings-and-profile#additional-settings-and-info) for information.

</details>

<details>

<summary><b>Why do I see a, "This account is not publish eligible," message when I try to submit my app?</b></summary>

You received this error message because your [account verification status](/partner-center/verification-responses) is pending. Check your status in the Partner Center [dashboard](https://partner.microsoft.com/dashboard). Select the **Settings** gear icon and choose **Developer settings > Account > Account settings**.

![Partner Center verification status](../../../assets/images/partner-center-verification-status.png)

</details>

<details>

<summary><b>What is verified in the Partner Center account verification process?</b></summary>

There are three verification areas, **Email Ownership**, **Employment**, and **Business**. For more information, see [what is verified and how to respond](/partner-center/verification-responses#what-is-verified-and-how-to-respond).

If you're the primary contact, global admin, or account admin, you can monitor verification status and track progress on your profile page.

Once verification process is complete, the status of your enrollment on the profile page changes from *pending* to *authorized*. The primary contact then receives an email from Microsoft within a few business days.

</details>

<details>

<summary><b>My account verification status hasn't advanced beyond Email Ownership. How should I proceed?</b></summary>

During the **Email Ownership** verification process, a verification email is sent to the primary contact. Check your primary contact inbox for an email from **maccount@microsoft.com** with the subject line **Action needed: Verify your email account with Microsoft** and complete the email verification process. The verification email is sent to the address listed on your Partner Center account settings.

Remember the following about the email verification process:

* The email verification link is only valid for seven days.
* You can request to resend the email by visiting your partner profile page and selecting the **Resend verification email** link.
* To ensure you receive the email, safe-list **microsoft.com** as a secure domain and check your junk email folders.

</details>

<details>

<summary><b>How do I get further support for my account-related issues?</b></summary>

See [support for the Commercial Marketplace program in Partner Center](/azure/marketplace/partner-center-portal/support) for information.

</details>

<details>

<summary><b>I've checked my mail folders and haven't received the verification email. What must I do next?</b></summary>

Try the following:

* Check your junk or spam folder.
* Clear the browser cache, go to your Partner Center account dashboard, and select **Resend verification email**.
* Try accessing the **Resend verification email** link from a different browser.
* Work with your IT department to ensure that the verification emails are not blocked by your email server.
* Adjust your server's spam filter to allow or safe-list all emails from **maccount@microsoft.com**.

</details>

<details>

<summary><b>How long does the employment verification process usually take?</b></summary>

If all the submitted details are correct, the employment verification process takes about two hours to complete.

</details>

<details>

<summary><b>How long does the business verification process usually take?</b></summary>

If all the required documents are submitted, business verification takes one to two business days to complete.

</details>

<details>

<summary><b>If I reach out to the support team, will my ticket be expedited?</b></summary>

Support tickets get resolved in a week. Check for updates sent to the email you provided when creating the support ticket.

</details>

<details>

<summary><b>I created a support ticket but haven't received an update in seven business days. Where can I get help?</b></summary>

Send an email to **teamsubm@microsoft.com** with the following details:

* **Subject Line**: Partner Center Account Issue for *<your app name>*
* **Email body**:
    * Support ticket number
    * Your seller ID
    * A screenshot of the issue (if possible)

</details>

<details>

<summary><b>Where else can I go for Partner Center help?</b></summary>

The following resources can also assist:

* [Microsoft 365 app submission FAQ](/office/dev/store/appsource-submission-faq)
* [Commercial marketplace documentation](/azure/marketplace/)

</details>

## Create your store listing details

The information that you submit to [Partner Center](https://partner.microsoft.com)&#8212;including your name, descriptions, icons, and images&#8212;becomes the Teams store and Microsoft AppSource listing for your app.

A store listing may be someone's first impression of your app. Increase installations with a listing that effectively conveys your app's benefits, functionality, and brand.

### Specify a short name

Your app's name (specifically, its [*short name*](~/resources/schema/manifest-schema.md#name)) plays a crucial role in how users discover it in the store.

The following example highlights where an app's short name displays in a store listing.

:::image type="content" source="../../../../assets/images/store-detail-page/AppName-02.png" alt-text="Example screenshot highlights where an app's short name displays in a store listing.":::

#### Best practices for names

**Do:**

* Choose a simple, memorable name that hints at what your app does.
* Be distinctive.
* Avoid typos and grammatical errors.

**Don't:**

* Use profane or derogatory terms.
* Use racially or culturally insensitive language.
* Use generic terms or names similar to existing apps.
* Include "Teams", "Microsoft", existing/upcoming Microsoft product names, or  "app" in the name.

> [!NOTE]
> If your app is part of an official partnership with Microsoft, the name of your app must come first (for example, *Salesforce Connector for Microsoft Teams*).

### Write descriptions

You need a short and long description of your app.

#### Short description

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

#### Long description

The long description can provide an engaging narrative that highlights your app's main features, the problems it solves, and its target audience. While this description can be as long as 4000 characters, most users will only read between 300-500 words.

The following example highlights where an app's long description displays in a store listing:

:::image type="content" source="~/assets/images/store-detail-page/ShortDescription-02.png" alt-text="Example screenshot highlights where an app's long description displays in a store listing.":::

#### Usage examples of long descriptions

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

#### Best practices for all descriptions

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

### Adhere to icon design guidelines

Icons are one of the main elements users see when browsing the store. Your icons should communicate your app's brand purpose while also adhering to Teams requirements.

For more information, see [specific guidance on designing Teams app icons](~/concepts/build-and-test/apps-package.md#app-icons).

### Capture screenshots

Screenshots provide a prominent visual preview of your app to complement your app name, icon, and descriptions.

#### Requirements for screenshots

* Up to five screenshots per listing.
* Supported file types include PNG, JPEG, and GIF.
* Dimensions should be 1366x768 pixels.
* Maximum size of 1,024 KB.

#### Best practices for screenshots

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

### Create a video

A video can be the most effective way to communicate why people should use your app. You should address the following questions in a video:

* Who is your app for?
* What problems can your app solve?
* How does your app work?
* What other benefits do you get from using your app?

If you include a video, it appears before your screenshots in the listing.

#### Best practices for videos

* Keep your video between 30-90 seconds.
* Aim for quality. In a listing, users will see your video before screenshots.

### Localize your store listing

Partner Center supports [localized store listings](https://docs.microsoft.com/office/dev/store/prepare-localized-solutions). For more information, see [how to localize your Teams app listing](../../../../concepts/build-and-test/apps-localization.md).

## Complete Publisher Verification

[Publisher Verification](/azure/active-directory/develop/publisher-verification-overview) helps admins and end users understand the authenticity of application developers integrating with the Microsoft identity platform.

## Complete Publisher Attestation

[Publisher Attestation](/microsoft-365-app-certification/docs/attestation) is required for Teams apps listed in the store. The process includes completing a self-assessment of your app's security, data handling, and compliance practices.

## Next step

> [!div class="nextstepaction"]
> [Submit your app](https://docs.microsoft.com/office/dev/store/add-in-submission-guide)
