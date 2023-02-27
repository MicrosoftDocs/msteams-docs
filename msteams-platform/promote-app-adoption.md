---
title: Promote app awareness and app adoption
author: ashishguptaiitb
description: Learn about the best practices and guidance for app adoption and promotion.
ms.topic: reference
ms.localizationpriority: medium
ms.author: guptaashish
---

# Promote app awareness and app adoption

As an app developer, one of the key activities after publishing your Microsoft Teams app is to drive adoption for your app with your customers. Ensure that the users interact with your app and you [learn from their usage behavior and feedback](/microsoftteams/teams-analytics-and-reports/app-usage-report). You incorporate the learning in your app revisions. Examples of post-publish activities are deployment and adoption-related engagements, user base growth, support for existing app customers, app updates, and app monetization.

This document provides resources and best practices to support the rollout of your Teams app in your customers’ organizations. The relevant personas are the business decision makers, IT admins, and users. The outcome of an app rollout is the successful adoption and engagement by the end-users of your customer’s organization.

## Know the prerequisites before your customers roll out your app

Your customers must have the following access to roll out your Teams app:

1. Access to Teams
1. Access to your apps

### Access to Teams

Customers need to have appropriate licenses to access Teams and use the apps in Teams. To use apps on Teams, users must be signed in to Teams and have a license for [Microsoft 365 Business Basic](https://www.microsoft.com/microsoft-365/business/compare-all-microsoft-365-business-products-b?ef_id=b7ff8842550c11df1d45ebe1bb56eaa1:G:s&OCID=AIDcmmwf9kwzdj_SEM_b7ff8842550c11df1d45ebe1bb56eaa1:G:s&lnkd=Bing_O365SMB_Brand&msclkid=b7ff8842550c11df1d45ebe1bb56eaa1) or higher. If they aren't already using Teams, then recommend to your customers that they adopt Microsoft Teams first. For Teams adoption guidance, see [Microsoft Teams Adoption](https://adoption.microsoft.com/microsoft-teams/).

If you're a Microsoft Partner, you can work with your Microsoft counterpart to facilitate Teams adoption. If you want to become a Microsoft Partner, see [ISV success program overview](https://www.microsoft.com/isv/program-benefits).

### Access to your apps

Ensure that the end-users have the appropriate licenses to access your apps on Teams. There are two types of apps in Teams store:

* **Custom apps**: Custom apps can be added to Teams from the Teams panel and can be set up and managed from the Teams admin center. While the users can view apps on the Teams panel, only admins can manage them from the Manage apps page.
* **Third-party apps**: Teams store provides many useful apps created by third-party software developers in addition to apps provided by Microsoft. While these apps are created by third-party providers, Microsoft does rigorous validation of the functionality and security of these apps. For more information, see [Understand third-party apps in Microsoft Teams](/microsoftteams/overview-third-party-apps).

Ensure that the end-users have access to your apps on Teams store. Admins can set up an app governance process that balances the wide-ranging requirements of users with your organization's IT policies, standards, and risk profiles. It may mean IT admins blocking access to some apps. For more information, see [Create policies for app access](#create-policies-to-give-permission-to-use-apps-and-pin-it).

## Understand how you can drive app adoption

You can help your customers drive adoption within their organizations by app adoption and usage related guidance. To do so, you can follow some or all the following steps.

:::image type="content" source="assets/images/app-deployment-guidance/drive-app-adoption.png" alt-text="Diagram shows the steps to drive app adoption.":::

1. **[Perform internal enablement to support app adoption](#step-1-perform-internal-enablement-to-support-app-adoption)**: Share important and relevant information to IT admins and help end-users understand and adopt your apps. Provide an adoption toolkit for your app to achieve this. Define a rollout process and enablement trainings for your customer facing teams.
1. **[Help admins to do app config and rollout](#step-2-help-admins-to-do-app-config-and-rollout-for-their-end-users)**: Help the IT admins make the necessary configurations to enable your app for the end-users in your customers' organizations. Provide a help guide for IT admins to understand the configuration steps.
1. **[Educate users and drive awareness about your app](#step-3-educate-users-and-drive-awareness-about-your-app)**: Provide user guide for end-users that describes their jobs to be done (JTBD) and your app’s features. Promote awareness about your app and its use cases. You can conduct email campaigns, webinars, or social media engagements depending on your target audience.
1. **[Provide support contact for IT admins and end-users](#step-4-provide-support-information-for-it-admins-and-end-users)**: As admins start to roll out the app and as users start to use it, they'll reach out for support for the issues that they can't resolve using your documentation. Timely help during this stage ensures quick onboarding and better retention.
1. **[Track app adoption and usage using analytics](#step-5-track-app-adoption-and-usage-using-analytics)**: Track your app adoption progress after the rollout and promptly resolve issues for the early adopters. Your CSM or account manager can engage with the customer's organization and its IT admins to track adoption and provide support, if necessary.

## Step 1: Perform internal enablement to support app adoption

Within your own organization, you must streamline the app-related support and guidance programs. Internal readiness and enablement training programs for various business functions help to create good content, do targeted marketing, create an informed support team, and streamline the sales motion. All such activities and assets in turn ensure smooth app adoption journey for your customers and a seamless customer experience.

You must define a rollout process for your Teams app and make sure that:

* You incorporate a standard rollout process for onboarding a new client on the Teams app. If you're onboarding a customer on your SaaS application and the customer also uses Teams, ensure that the Teams app onboarding is done as part of your standard onboarding and not as a separate activity.
* Support professionals and CSMs are trained and are familiar with the nuances of your app, its value proposition, features, configuration steps, and the rollout process. Also, use the [deployment guidance for admins](#step-2-help-admins-to-do-app-config-and-rollout-for-their-end-users).

### App installation and configuration guide

The target audience for this guide is the IT administrators in your customer's organization, and it should contain the following technical information to help them configure your apps on Teams:

* Prerequisites to install your app
* How to configure security settings and permissions

To understand how an IT admin can configure your app, see [Help IT admins get your app adopted by their end-users](#step-2-help-admins-to-do-app-config-and-rollout-for-their-end-users). Also, see the [Documentation for IT admins and decision makers](#recap-of-the-documentation-requirements-for-it-admins), which contains a checklist of best practices and information required for an IT admin that needs to be included.

### User guide to describe features to end-users

Provide a user guide for your app and cover the following topics:

* Installation instructions for your app from the Teams store.
* Key features and use cases of your app. see Provide your app's use cases.
* How can users reach out for support?
* What are the end-user configuration settings, for example, profile setup?

For more information, see [drive awareness about features with end-users](#step-3-educate-users-and-drive-awareness-about-your-app).

### User awareness campaign guide and assets for organizations

Awareness and training are the marketing and enablement segments of your overall app adoption strategy. This will ensure that your end-users are aware of the capabilities of the Teams app and should encourage them to install and sign into your app on Teams.

A campaign should be at the correct time in the adoption lifecycle and contextual reminders after a campaign can help drive the adoption. An example is a campaign that has communications spanning across pre-rollout days to build excitement, at the time of rollout to inform, and post-rollout to serve as a reminder.

Post-adoption, there's a need for continuous engagement to help existing users with their tasks and to gradually onboard late adopters. You can host interaction sessions with the community such as support webinars and office hours. You can build a community around your app, answer queries, recognize top users or MVPs in your community, and do other similar activities.

For guidance to get help on creating these assets, register for the [ISV success program overview](https://www.microsoft.com/isv/program-benefits).

## Step 2: Help admins to do app config and rollout for their end-users

Admins create an app governance process that balances the wide-ranging requirements of end-users with their organization's IT policies, standards, and risk profiles. IT admins control the availability of and influence the adoption of apps within their organizations.

Teams admin center provides admins enterprise-grade controls and configurations to govern the apps. IT admins have complete control over the availability of apps for each user in various contexts, such as meetings, chats, and channels. IT admins accomplish the following tasks:

* Evaluate and allow apps.
* Define app availability for the required users using permissions policies for access.
* Add apps for some or all end-users using setup policies for rollout.
* Allow apps to access organization and user information by providing admin consent.
* Buy and manage licenses and subscriptions for paid apps.
* Upload and manage custom apps in their org-specific app catalog.
* Update some metadata of app to suit their org-specific requirements if the app allows it.

The IT admins in your customer’s organization have myriad of tasks to ensure daily operations. By sharing the below resources with the IT pros, you can remove friction in their app evaluation and rollout journey.

:::image type="content" source="assets/images/app-deployment-guidance/app-config-roll-out-end-users.png" alt-text="Diagram shows the steps for app configuration and rollout.":::

*Understand the tasks of an IT admin before, during, and after they roll out your app.*

### Deployment steps by admin

Admins use the following high-level steps to deploy your app.

* [Evaluate and allow an app](#evaluate-and-allow-apps) in their organization.
* [Create and apply app policies](#create-policies-to-give-permission-to-use-apps-and-pin-it) to make apps available to all or specific users, including pinning apps.
* [Understand app permissions and grant consent](#understand-app-permissions-and-grant-consent).
* Check and consider [app approval requests](/microsoftteams/user-requests-approve-apps) for apps that are blocked.

### Evaluate and allow apps

Before IT admins approve the usage of your app and let the organization users use it, they understand the permissions sought by the app and various details about the security, compliance, privacy, and data handling of the app.

Consider providing the following information to help admins evaluate your app:

* Detailed documentation of your app that provides information about data security, compliance certification, privacy policies and GDPR, data flow, app architecture, and other information.
* Describe the [permissions that your app needs](/microsoftteams/app-permissions-admin-center) and to accomplish what use cases.
* Use the [Microsoft compliance program](/microsoftteams/overview-of-app-certification) that checks and audits an app against controls that are derived from leading industry-standard frameworks. The various tiers of the program are Publisher verification, Publisher attestation, and Microsoft 365 certification that instill increasing levels of trust for admins and users.

Once an admin evaluates the app to be relevant and safe for their organization’s users, they [allow the app](/microsoftteams/manage-apps) in their tenant or organization.

### Create policies to give permission to use apps and pin it

Microsoft Teams uses app policies to govern access and installation behavior of apps. App policies help Teams admins control the following app behavior:

* Allow individual users or a group of users to use an app.
* Pin an app for end-users for ease of access.
* Install apps for end-users without user intervention to help end-users easily get started with the relevant apps.

With the help of the following app policies, admins can manage the above access:

* **App permission policies**: Admins can use app permission policies to control which apps are available to each user in their organization. They can allow a few apps for all users, a few apps for a specific group of users, or specific apps for specific users. See [app permission policies](/microsoftteams/teams-app-permission-policies).
* **App setup policies**: App setup policies allow admins to configure how and where apps are available for users in their Teams client. They can choose the apps that they want to pin to the app bar in the Teams client and define the order in which the apps are displayed. See [app setup policies](/microsoftteams/teams-app-setup-policies).

### Understand app permissions and grant consent

If your app accesses any data from outside Teams, it does that using Microsoft Graph API calls. Teams requires that an explicit consent is granted for such app permissions. Teams admins review and grant consent to the app on behalf of their organization users. It allows admins to review it and each user isn't required to review and accept the app permissions when they use your app. See [view app permissions and grant admin consent](/microsoftteams/app-permissions-admin-center).

### Buy and manage licenses and subscriptions for paid apps

Your app may require purchasing a service subscription to experience the app's full functionality and scope. These service subscriptions are called Software as a Service (SaaS) offers. A license is available for purchase through [AppSource](https://appsource.microsoft.com/?exp=ubp8) and through the [Teams admin center](https://admin.teams.microsoft.com/). As part of your app’s admin documentation, include instructions on buying and managing licenses. The governance controls for admins for paid and free apps remain the same. Admins can purchase apps using a credit card, debit card, or with invoice billing. See [how admins manage subscriptions for apps](/microsoftteams/purchase-third-party-apps).

### Allow custom apps in an organization

Three settings determine whether a user can upload a custom app to a team. It gives admins granular control over who can add custom apps to a team. These settings don't affect the ability to block third-party apps.

1. User app setup policy settings for custom apps: As part of [app setup policies](/microsoftteams/teams-app-setup-policies), admins can control whether a user can upload custom apps to Teams.

2. Team custom app setting: Admins and team owners can control whether a team allows for custom apps to be added to it. The setting Allow members to upload custom apps, along with a user's custom app setting, determines who can add custom apps to a particular team. To learn how to configure custom app, see [Configure the team custom app setting](/microsoftteams/teams-custom-app-policies-and-settings).

3. Org-wide custom app setting: The Allow interaction with custom apps org-wide custom app setting on applies to everyone in your organization and governs whether they can use custom apps. This setting acts as a master on or off switch for the user and team for settings related to custom apps. To learn how to configure org-wide app setting, see [Configure the org-wide custom app setting](/microsoftteams/teams-custom-app-policies-and-settings).

### Customize apps and your org's store branding

Microsoft Teams admins can modify the metadata and appearance of some Teams apps to provide a personalized branded experience within their organization. Such modifications help admins adhere to their organization's requirements and branding, which in turn enhances Teams store experience for end-users, improves trust, and app usage. See [how admins use app customization to update branding](/microsoftteams/customize-apps).

To support this use case, you as an app developer can allow your app to be customized by admins. Your app in Teams app store contains the default information and metadata that you provide when you create and submit an app. Customizations in one organization don't impact other organizations. Teams provide an option for a few properties to be customized but you control exactly which properties are allowed to even be customized by any admin. See [how to allow app customization](concepts/design/enable-app-customization.md).

### Recap of the documentation requirements for IT admins

Provide admin-focused documentation in your app toolkit that is based on the above understanding of the admin tasks. Your target audiences are decision makers who sponsor the app rollout and IT admins who do the app rollout. The following requirements are the recap of the information to provide in your admin-focused docs:

* A dedicated webpage of your Teams app on your official website that includes business benefits of using your app.
* Compliance, security, privacy, and data handling information about your app. App architecture diagram and data flow diagram.
* If your app is part of Microsoft Compliance program, highlight it and explain the benefits. Link to your app’s page in these [app security and compliance Microsoft docs](/microsoft-365-app-certification/teams/teams-apps).
* Suggest whether you have allowed app customization or not.
* Governance controls available to admins. Briefly describe how admins can use policies in admin center to control access to app.
* Information to troubleshoot any rollout issues. If admins may face app-specific issues, provide troubleshooting tips.
* Your contact information for app support. If admins can't troubleshoot app rollout or issues faced by end-users, then how do they contact you. Your contact information and method to raise a support ticket mustn't be behind a login.
* List of supported languages.

## Step 3: Educate users and drive awareness about your app

Apps in Microsoft Teams are designed to enable collaboration between people in your organization. Enabling the right workflows and notifications for critical events in your apps in Teams enhances collaboration by proactively letting users know the tasks to be done and how to do those tasks.

Ensure that your app is available and that IT admins have made the necessary changes to make it accessible to end users. When you're ready, begin promoting your app by following the steps outlined below so that end users start to install the app and start using it.

* [Provide app rollout guidance](#provide-app-rollout-guidance-to-your-customers)
* [Provide a feature guide for the end-users of your app](#provide-a-feature-guide-for-the-end-users-of-your-app)
* [Promote awareness about your app and its use cases](#promote-awareness-about-your-app-and-its-use-cases)
* [Provide training and build champions](#provide-training-and-build-champions)

### Provide app rollout guidance to your customers

The app rollout journey for your customers requires assistance in the form of consulting, adoption planning, and troubleshooting support. Your customer engagement team can work with customers to find early adopters to run a pilot program for your app adoption. Running a pilot program aids the customer to adopt the app faster, without roadblocks, and with higher retention numbers.

Encourage and guide your customers to do a phased rollout with a few members. The business decision makers and IT team can identify a department or a group of volunteer employees as early adopters for a trial run. It’ll help you build a stronger presence in the customer’s organization and provide you with user feedback around both – the app adoption journey and the app features usage patterns.

Share important and relevant information to help the end-users to adopt your apps and admins to deploy it. To do so, provide the following assets in your app adoption toolkit:

* App installation and configuration guide for IT admins.
* Feature and user guide for end-users.
* User awareness assets:
  * Customer app briefing template.
  * User awareness campaign guide and assets such as templates for adoption email, banner, and poster.
  * Customer webinar information for end-users and IT admins.

### Provide a feature guide for the end-users of your app

Provide the end-users of your app with guidance on how to use it. The guidance can be in the form of documentation, tips and best practices, videos or infographics, troubleshooting information, and support contact.

* Provide use cases that your app helps accomplish in Teams. Consider desktop, mobile, and browser platforms. Explain how using a Teams app helps users reduce context-switching.
* Explain how the end-users can find support for your app. They can contact their organization’s IT admin or contact your support team. See [provide support contact](#step-4-provide-support-information-for-it-admins-and-end-users).
* Describe what languages are supported by your app.
* Describe how the users can add your app to their Teams client.
* Describe how the users can request their admin’s approval if your app is blocked in their organization. See [manage user requests](/microsoftteams/user-requests-approve-apps).

### Promote awareness about your app and its use cases

Awareness and training are the marketing and communications segments of your overall app adoption strategy. This will ensure that your end-users are aware of the new capabilities of the Teams app and enables them to start using and deriving value out of your app.

For both your initial pilots and your eventual company-wide roll out, your internal communications should be a priority. They should include:

* Internal awareness materials such as posters, email templates, digital signage, and webinar or events.
* Campaigns: Educate end-users about the benefits of using the Teams app. Use the template provided by Microsoft to create campaigns to improve organization-level awareness for apps.
* Training webinar: Conduct a webinar and place usage, training, and self-help information in a single location.
* Events: You can also drive end-user awareness via physical events, kiosk, etc. where you distribute assets to promote the awareness and usage of your app.
* Reminders: Remind the end-users about the campaign after it happens.

Microsoft provides a few templates that you can use to speed up the adoption of your app by your customers. These templates help you quickly generate Toolkit to popularize your app. Register for [Microsoft ISV Success program](https://www.microsoft.com/isv/program-benefits) to receive guidance about and templates for some of the above digital assets.

The following considerations may help you make the awareness documents more user-friendly:

* Include a call to action encouraging users to download the app and use it.
* Ensure that there's a support path for end-users to contact the support team if they run into any problems.
* Your feature and usage guide should cover the details of how users can install the app from the Teams app store from different entry points such as channels, chats, meetings, and message extensions, as well as the details of each feature's usage.

### Provide training and build champions

Champions are essential to driving awareness, adoption, and education in your organization. A champion is motivated to help others, interested in promoting apps and increase employee productivity, and help users adopt apps and best practices of using these apps.

Champions should:

* Be formally trained to increase their depth and breadth of knowledge.
* Be encouraged and empowered to guide, teach, and train their peers.
* Have consistent and positive reinforcement that affirms the impact of their efforts.
* Have a clear plan to execute.

Champions will help to:

* Create the enthusiasm that grows adoption of improved business processes.
* Build a circle of influence among their teams.
* Bring to life across teams the new ways of working.
* Identify business challenges and possible solutions.
* Provide feedback to the project team and sponsors.

You can use Microsoft [Champions Program Guide](https://adoption.microsoft.com/become-a-champion/) as a reference and build this program in your organization for your app. For more information, see [Create your champions program for Microsoft Teams](/microsoftteams/teams-adoption-create-champions-program).

## Step 4: Provide support information for IT admins and end-users

When your app is being rolled out or being used, your customers may have queries about configuration, admin settings, end-user flows, app features, supportability information, and other queries. Provide support at each stage of app lifecycle to facilitate rollout, onboard app users, build a good brand reputation, and showcase commitment towards your app.

Enable and train your customer-facing teams such as enablement, consulting, support, and GTM functions to answer the expected support queries. Proactively establishing a support process for your app may involve internal enablement, socializing documentation and training videos, internally or even externally published escalation matrix, and providing supportability information in your communications.

In your app’s help documentation, consider providing some or all the following information to provide reliable support to your customers and admins:

* Contact method with support, for example, email, phone, or web portal.
* Links to help documentation about rollout for admins, about features for end-users, and about troubleshooting to supporting functions.
* Language support provided by the app in case the app is available in any non-English language.
* Latest release date and version that communicates app freshness and hence inspires confidence.
* Callout any app-specific configuration or permissions that may be required and any app-specific uptime information link if your app relies on a backend infrastructure to work.

The following table provides the supportability information that you already submit to Microsoft with your app and where is this information used in Microsoft products. Your customers can find this information and self-serve themselves to seek the above supportability information.

|Input source|Parameter|Description and meaning|Usage in the product|
|-----|-----|-----|-----|
|[Manifest file](resources/schema/manifest-schema.md)|websiteUrl|The web page at this URL provides the support information for an app.|App details page in Teams admin center displays the website URL.|
|[Manifest file](resources/schema/manifest-schema.md)|privacyUrl|The URL to the page that provides privacy information for the app.|• Displayed in app details page in admin center. <br> • Displayed in Store listing.|
|[Manifest file](resources/schema/manifest-schema.md)|termsOfUseUrl|The URL to the page that provides the terms of use for the app.|• Displayed in app details page in admin center. <br> • Displayed in Store listing.|
|[Manifest file](resources/schema/manifest-schema.md)|publisherDocsUrl|The URL to the page that provides more app information for the admins.|Available in admin center for apps that are blocked by publisher.|
|[Partner Center submission](/azure/marketplace/add-in-submission-guide)|NA|Support or help documentation URL. <br> <br> What about categories?|Displayed in [AppSource](https://appsource.microsoft.com/?exp=ubp8), in a tab named **Details + support**.|

## Step 5: Track app adoption and usage using analytics

You build an app for millions of Teams users to achieve specific business or customer goals. For this purpose, you distribute it using the distribution options available to you on the app store versus a custom app. After the app is published, you'll want to measure how your app is performing in the real-world. Also, you’d want to guide the organization admins to measure their org-specific app usage.

### Track app usage in Partner Center

You can track your app’s overall usage in the [Teams app usage report](concepts/deploy-and-publish/appsource/post-publish/overview.md) in Partner Center after a week of publishing your app on the Teams public app store. Custom app developers can find [usage analytics for their custom apps](concepts/build-and-test/analyze-your-apps-usage-in-developer-portal.md) in the Developer Portal for Teams. Partner Center's usage report provides standard metrics that enable you to track user demand, user churn, and frequency of usage for your app. These reports are available at an aggregate level, such as:

* Monthly, daily, and weekly active users.
* Retention and intensity charts.
* Users who have used your app more than five days in the last month.
* Platform, operating system, and geographic split of users for your app.

### Track detailed app usage via your in-app telemetry/analytics

You should build your own detailed adoption analytics and engagement methods to check tenant-wise adoption and engagement. This information helps you analyze the data against your business goals, take corrective action by fixing issues. It also helps you to intervene in the user journey or make informed decisions around feature investments, enhancements, and adoption for the app.

You'll also be interested in monitoring many data points, such as:

1. Who is interested in your app?
1. Which users and organizations are using your app?
1. How are users engaging with your app?
1. Which users have churned away after using your app for some time?

See [Analytics overview](concepts/design/overview-analytics.md) for tenant-wise adoption and engagement.

### Help admins track app usage in Teams admin center for their tenant

You can add guidance in [your app’s admin docs](#step-2-help-admins-to-do-app-config-and-rollout-for-their-end-users) that the Teams app usage report in the admin center provides admins with information about which apps are being used and how much. Admins can gain insights into the app activity in their organization for Microsoft apps, third-party apps, and all custom apps in their tenant. You as the app developer can't get organization-specific information from customer tenants.

The data represented in this report provide answers to the following questions:

* How many installed apps do users in your environment have?
* How many apps have at least one active user in your environment based on type (Microsoft, third-party, and custom)?
* How many apps are being used per platform (Windows, Mac, web, or mobile)?
* How many active users and active teams are using an app?

For more information, see [Teams app usage report](/microsoftteams/teams-analytics-and-reports/app-usage-report).

### Measure and share post-adoption success and engagement

As with any communication and adoption campaign, identify your metrics in advance and build these into your app. It's important to plan for the kind of data, metrics, and events that you want to monitor before you start developing your Teams app. For more information, see [strategize and decide what to measure](concepts/design/strategize-measure.md).

After successful app adoption and analysis, share your journey and your achievements in the form of a case study or an app success story. Work with Microsoft ISV program to publish it with Microsoft.
