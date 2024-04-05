---
title: Frequently asked questions for Teams developer document
description: Frequently asked questions for Teams developer document
ms.topic: reference
ms.localizationpriority: high
---

# Frequently asked questions

This section contains the frequently asked questions and the answers.

## Adaptive Card Previewer

<details>
<summary>Why do we have to use a new extension in Visual Studio Code? Can’t this extension be integrated into Teams Toolkit for Visual Studio Code?</summary>

Adaptive Card Previewer is a standalone extension because it uses a closed-source package to render the Adaptive Cards to ensure consistent rendering logic with the Teams platform. Teams Toolkit is an open-source project and doesn't include dependencies on packages that third-party developers can't access.
<br>
&nbsp;
</details>
<details>
<summary>Does this extension support all Adaptive Card features in the Teams platform?</summary>

No. There are several [limitations](concepts/build-and-test/adaptive-card-previewer.md#limitations) that Adaptive Card Previewer extension doesn't support.
<br>
&nbsp;
</details>
<details>
<summary>Will Visual Studio be integrated into Adaptive Card Previewer?</summary>

No, Adaptive Card Previewer is available in Visual Studio Code only.
<br>
&nbsp;
</details>

## App validation

<details>
<summary>How can I connect Microsoft Entra ID to an MPN account?</summary>

<!--Question: Publisher Attestation issue - the app needed to be published first (I attached the screenshot when I tried to submit the attestation). Before doing the Publisher Attestation. I think this is most likely to connect the Azure AD to an MPN account.-->

Follow the steps in the pages given here:

1. [Publisher verification overview - Microsoft Entra](/azure/active-directory/develop/publisher-verification-overview).
1. [Microsoft LearnMark an app as publisher verified - Microsoft Entra](/azure/active-directory/develop/mark-app-as-publisher-verified).
1. [Microsoft Learn
Resolution - Connect Microsoft Entra ID to MPN settings](/partner-center/mpn-benefits-azure-cloud).

<!--Links found:
1. [Update preferred email](/partner-center/partner-center-account-setup.md#update-preferred-email)
1. [Merge your partner account with another partner account](/partner-center/merge-accounts.md)-->

</details>
<!--
<details>
<summary>How can I remove the 'white screen' showing under the 'more' section on Teams mobile iOS client for Teams dark mode?</summary>

<!--Question: Partner reported that the tab menu was showing a white screen under the "more" section on the Teams mobile iOS client and for Teams dark mode. We've reproduced the issue with the provided details and observed that it's a common issue for Teams mobile iOS clients and only for dark mode. So, we've raised a bug request for the same

Platform Bug
</details>
-->

## Bots

<details>
<summary>How can I use Adaptive Cards with a bot so that the desktop app behavior is consistent between web and mobile apps?</summary>

<!--Question: The bot isn't supposed to crash when the card is invalid. It can fail to display it, but it shouldn't crash. Also the behavior should be consistent between web and mobile.-->

For more information about using Adaptive Cards with a bot, see [Work with Universal Actions for Adaptive Cards](task-modules-and-cards/cards/Universal-actions-for-adaptive-cards/Work-with-Universal-Actions-for-Adaptive-Cards.md).
<br>
&nbsp;
</details>
<details>
<summary>How can I remove specific messages from bot history? Is there a way to get the chat history and find an activity ID of a specific message?</summary>

Use Delete messages-Bot framework's `DeleteActivity` method: [Update and delete messages sent from bot](bots/how-to/update-and-delete-bot-messages.md#delete-messages).
<br>
&nbsp;
</details>
<details>
<summary>How can I test the validity of the card schema via code?</summary>

You can test or validate the Adaptive Card schema using the **Adaptive cards editor (preview)** option in [Developer Portal > Tools](https://dev.teams.microsoft.com/tools).
</details>
<details>
<summary>Why am I unable to create a bot in Developer Portal?</summary>

App registration is disabled for the user or the user doesn't have enough permissions to create an app. For more information, see [limitations and known issues.](~/bots/bot-features.md#limitations-and-known-issues)
</details>

## Live share

<details>
<summary>Can I use my own Azure Fluid Relay service?</summary>

Yes! When initializing Live Share, you can define your own `AzureConnectionConfig`. Live Share associates containers you create with meetings, but you need to implement the `ITokenProvider` interface to sign tokens for your containers. For example, you can use a provided `AzureFunctionTokenProvider`, which uses an Azure cloud function to request an access token from a server.

While most of you find it beneficial to use our free hosted service, there might still be times where it's beneficial to use your own Azure Fluid Relay service for your Live Share app. Consider using a custom AFR service connection if you:

* Require storage of data in Fluid containers beyond the lifetime of a meeting.
* Transmit sensitive data through the service that requires a custom security policy.
* Develop features through Fluid Framework, for example, `SharedMap`, for your application outside of Teams.

For more information, see [how to guide](apps-in-teams-meetings/teams-live-share-how-to/how-to-custom-azure-fluid-relay.md) or visit the [Azure Fluid Relay documentation](/azure/azure-fluid-relay/).
<br>
&nbsp;
</details>
<details>
<summary>How long is data stored in Live Share's hosted service accessible?</summary>

Any data sent or stored through Fluid containers created by Live Share's hosted Azure Fluid Relay service is accessible for 24 hours. If you want to persist data beyond 24 hours, you can replace our hosted Azure Fluid Relay service with your own. Alternatively, you can use your own storage provider in parallel to Live Share's hosted service.
<br>
&nbsp;
</details>
<details>
<summary>What meeting types does Live Share support?</summary>

Live Share supports scheduled meetings, one-on-one calls, group calls, and meet now. Channel meetings aren't yet supported.
<br>
&nbsp;
</details>
<details>
<summary>Will Live Share's media package work with DRM content?</summary>

Live Share's media package work doesn't with DRM content. Currently, Teams doesn't support encrypted media for tab applications on desktop. Chrome, Edge, and mobile clients are supported.

For more information, you can [track the issue here](https://github.com/microsoft/live-share-sdk/issues/14).
<br>
&nbsp;
</details>
<details>
<summary>How many people can attend a Live Share session?</summary>

Currently, Live Share supports a maximum of 100 attendees per session. If it's something you're interested in, you can [start a discussion here](https://github.com/microsoft/live-share-sdk/discussions).
<br>
&nbsp;
</details>
<details>
<summary>Can I use Live Share's data structures outside of Teams?</summary>

Currently, Live Share packages require the Teams Client SDK to function properly. Features in `@microsoft/live-share` or `@microsoft/live-share-media` don't work outside Microsoft Teams. If this is something you're interested in, you can [start a discussion here](https://github.com/microsoft/live-share-sdk/discussions).
<br>
&nbsp;
</details>
<details>
<summary>Can I use multiple Fluid containers?</summary>

Currently, Live Share only supports having one container using our provided Azure Fluid Relay service. However, it's possible to use both a Live Share container and a container created by your own Azure Fluid Relay instance.
<br>
&nbsp;
</details>
<details>
<summary>Can I change my Fluid container schema after creating the container?</summary>

Currently, Live Share doesn't support adding new `initialObjects` to the Fluid `ContainerSchema` after creating or joining a container. Because Live Share sessions are short-lived, this is most commonly an issue during development after adding new features to your app.

> [!NOTE]
> If you are using the `dynamicObjectTypes` property in the `ContainerSchema`, you can add new types at any point. If you later remove types from the schema, existing DDS instances of those types will gracefully fail.

To fix errors resulting from changes to `initialObjects` when testing locally in your browser, remove the hashed container ID from your URL and reload the page. If you're testing in a Teams meeting, start a new meeting and try again.

If you plan to update your app with new `SharedObject` or `LiveObject` instances frequently, you should consider how you deploy new schema changes to production. While the actual risk is relatively low and short lasting, there might be active sessions at the time you roll out the change. Existing users in the session shouldn't be impacted, but users joining that session after you deployed a breaking change might have issues connecting to the session. To mitigate this, you might consider some of the following solutions:

* Deploy schema changes for your web application outside of normal business hours.
* Use `dynamicObjectTypes` for any changes made to your schema, rather than changing `initialObjects`.

> [!NOTE]
> Live Share does not currently support versioning your `ContainerSchema`, nor does it have any APIs dedicated to migrations.

<br>
&nbsp;
</details>
<details>
<summary>Are there limits to how many change events I can emit through Live Share?</summary>

While Live Share is in Preview, any limit to events emitted through Live Share isn't enforced. For optimal performance, you must debounce changes emitted through `SharedObject` or `LiveObject` instances to one message per 50 milliseconds or more. This is especially important when sending changes based on mouse or touch coordinates, such as when synchronizing cursor positions, inking, and dragging objects around a page.
<br>
&nbsp;
</details>

<details>
<summary>Is Live Share supported for Government Community Cloud (GCC), GCC High, and Department of Defense (DOD) tenants?</summary>

Live Share isn't supported for GCC, GCC High, and DOD tenants.

<br>

</details>

<details>
<summary>Does Live Share support external and guest users?</summary>

Yes, Live Share supports guest and external users for most meeting types. However, guest users aren't supported in channel meetings.

<br>

</details>

<details>
<summary>Does Live Share support Teams Rooms devices?</summary>

No, Live Share doesn't support Teams Rooms devices.

</details>

<details>
<summary>Do Live Share apps support meeting recordings?</summary>

No, Live Share doesn't support meeting recordings.

</details>

## Microsoft 365 Chat

<details>

<summary>Why isn't Microsoft 365 Chat including my plugin in a response?</summary>

Ensure your app manifest (previously called Teams app manifest) is descriptive. The app manifest helps in plugin matching in response to a user prompt. Also, ensure that you upload the app package to Outlook and interacted with the app, including authentication.

If the problem continues, use the thumbs down indicator in the Microsoft 365 Chat reply and prefix your reply with [MessageExtension].

</details>
<details>

<summary> What descriptions should I include in app manifest? </summary>

Here's an example description that work for NPM Finder.

```json
 "name": { 

        "short": "NPM Finder", 

        "full": "Nuget Package Manager Finder" 

    }, 

    "description": { 

        "short": "Returns information about available NPM packages", 

        "full": "The Nuget Package Manager (NPM) Finder application provides information (such as title and description) about Nuget packages available in the global NPM catalog." 

    }, 

… 

            "commands": [ 

                { 

                    "id": "searchQuery", 

                    "context": [ 

                        "compose", 

                        "commandBox" 

                    ], 

                    "description": "Searches the global NPM catalog for available packages", 

                    "title": "Search", 

                    "type": "query", 

                    "parameters": [ 

                        { 

                            "name": "searchQuery", 

                            "title": "Search Query", 

                            "description": "A package name or description of capability to search", 

                            "inputType": "text" 

                        } 

                    ] 

```

</details>
<details>

<summary> Microsoft 365 Chat includes my plugin in the response, but the Microsoft 365 Chat’s response doesn’t meet my expectations. What should I do?</summary>

Use the downvoting option in the Microsoft 365 Chat reply and prefix your reply with [MessageExtension].

</details>
<details>

<summary> Can I build my own Teams message extension? </summary>

Yes, you can. Ensure that you have a descriptive app manifest and upload the app to Outlook and interacted with it.</br>
</details>
<details>

<summary> How can I get my existing Teams message extension to work with Microsoft 365 Chat? </summary>

1. Register the bot channel in Azure Bot Service.
1. Upload the app to Outlook.

</details>
<details>
<summary>What are the guidelines for Teams apps extensible as plugin for Microsoft Copilot for Microsoft 365? </summary>

You can read the [Teams Store validation guidelines](concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md#teams-apps-extensible-as-plugin-for-microsoft-copilot-for-microsoft-365) for Teams apps extensible as plugin for Microsoft Copilot for Microsoft 365.

</details>
<details>

<summary> What is the certification process?</summary>

After publishing the plugin, start the App Compliance flow in Partner Center. If [Publisher verification](/entra/identity-platform/publisher-verification-overview) is incomplete, ensure that the App Compliance flow is completed before Microsoft 365 Certification. Then, complete [Publisher Attestation](/microsoft-365-app-certification/docs/attestation), which gathers self-attested data about the plugin, company, and operations. For more information, see [Microsoft 365 App Compliance Program](/microsoft-365-app-certification/overview).

To start the [Microsoft 365 Certification process](/microsoft-365-app-certification/docs/certification), upload initial documents that define the assessment scope for the plugin and operating environment. Depending on the scope, provide evidence for specific controls related to application security, operational security, and data handling or privacy. If you build your plugin on Azure, you can use the App Compliance Automation Tool (ACAT) to scan the environment and generate evidence for several controls, reducing the manual workload. For more information, see [App Compliance Automation Tool for Microsoft 365](/microsoft-365-app-certification/docs/acat-overview).

</details>
<details>

<summary> How are plugins certified?</summary>

After the app passes the proactive validation, developers of both existing and new message extensions that aren't certified will be encouraged to certify their plugin. This is communicated through an email confirming their message extension is validated.
</details>
<details>

<summary> How are new plugins certified?</summary>

Developers will be encouraged to certify their new plugin after successfully completing validation.
</details>
<details>
<summary>How can I create or upgrade a message extension plugin for Copilot for Microsoft 365?</summary>

 You can [create or upgrade a message extension as a plugin in Copilot for Microsoft 365](messaging-extensions/build-bot-based-plugin.md) to interact with third-party tools and services and achieve more with Copilot for Microsoft 365. Additionally, your extensions must meet the standards for compliance, performance, security, and user experience outlined in [guidelines to create or upgrade a message extension plugin for Copilot for Microsoft 365](messaging-extensions/high-quality-message-extension.md).
</details>

## Microsoft Graph

<details>
<summary>How can a user set their timezone to get notifications at a preferred time?</summary>

You can use the following Graph API [Get user mailbox settings](/graph/api/user-get-mailboxsettings#permissions). You can get the user’s time zone as follows:

* GET /me/mailboxSettings/timeZone
* GET /users/{id|userPrincipalName}/mailboxSettings/timeZone
<br>

&nbsp;

</details>
<details>
<summary>How can I deploy the code in Azure using Teams Toolkit, and use Graph API to get a user profile photo?</summary>

For more information on Teams Toolkit, see [Create a new Teams project](toolkit/create-new-project.md) and [Teams Toolkit CLI](toolkit/Teams-Toolkit-CLI.md).

<br>
&nbsp;
</details>
<details>
<summary>Does Graph API work in Postman?</summary>

You can use the Microsoft Graph Postman collection with Microsoft Graph APIs.

For more information, see [Use Postman with the Microsoft Graph API](/graph/use-postman).
<br>
&nbsp;
</details>
<details>
<summary>Does Graph API work in Microsoft Graph explorer?</summary>

Yes, Graph API works in Microsoft Graph explorer.

For more information, see [Graph explorer](https://developer.microsoft.com/graph/graph-explorer).
<br>
&nbsp;
</details>

## Moodle

<details>
<summary>What should I do if one or more of the course teams weren't created after synchronization?</summary>

Each Moodle course must have at least one faculty and one student matched to a Microsoft 365 account username. The team can't be created if the synchronization doesn't find a match.

Each team course instance must have an owner, and the synchronization sets the faculty as the owner, with assumption that the faculty has Teams license.
<br>
&nbsp;
</details>
<details>
<summary>What should we do to remove Moodle login page when working from Teams? Can we force single sign-on (SSO)?</summary>

The app users have multiple sign-in options from the Moodle login page.

* To sign in exclusively using Microsoft 365 credentials, enable the **Force redirect** configuration settings for the **auth_oidc plugin**. If the service is enabled, the app user can see the Microsoft sign in page.
* To sign in manually to the Moodle portal, see [Moodle](https://moodle.org/login/index.php).
<br>

&nbsp;

</details>
<details>
<summary>How can I specify which users to sync? I don’t want all Microsoft Entra users synchronized with the Moodle website. </summary>

Use the **User Creation Restriction** option to specify the app users by synchronizing the configuration options of the **local_o365** plugin. The dropdown menu to the left of the **filter** offers options, such as Country or region, Company Name, and Language.

> [!TIP]
> Create a dynamic Microsoft 365 group to enable the **filter** option with multiple profile properties.

The following image shows user creation restrictions options:

:::image type="content" source="assets/images/MoodleInstructions/faq-2.png" alt-text="sync":::

:::image type="content" source="assets/images/MoodleInstructions/faq-3.png" alt-text="Microsoft Entra ID":::
<br>
&nbsp;
</details>
<details>
<summary>We would like our faculty to be able to synchronize courses to Teams. Are Moodle administrators the only ones who can control synchronization of courses?</summary>

By default, only Moodle administrators can configure synchronization. The team owner can control if a course is synchronized to Teams and **Allow configure course sync in course** is enabled. In this case, the team owner is the faculty. The block displays the configuration option to individuals with the appropriate owner permissions.

The following image shows the option **Allow configure course sync in course**:

:::image type="content" source="assets/images/MoodleInstructions/faq-4.png" alt-text="admin":::

The following image shows synchronization of courses:

:::image type="content" source="assets/images/MoodleInstructions/faq-5.png" alt-text="synchronization":::
<br>
&nbsp;
</details>
<details>
<summary>We have followed the documentation, but the user accounts fail to sync Microsoft Entra ID and Moodle. What should we do?</summary>

The issue can be resolved before users perform the **Delta token clean up** as a final troubleshooting step.

The following table provides the actions and dependencies to be performed and checked:

| Dependency | Action | Reference|
|-------|------------|----------|
| Stable version| Verify that the version of Moodle is listed as a **stable**.| For more information, see [Version support](https://docs.moodle.org/dev/Releases#Version_support).|
|Permissions| Verify that the Azure application has the necessary permissions to run the synchronization.| For more information, see [Microsoft permissions](https://docs.moodle.org/311/en/Microsoft_365#Permissions).|
| Full sync| Verify that **Perform a full sync each run** is enabled, and review the **Task Logs** for **Sync users with Microsoft Entra ID**.| For more information, see [Enable full sync](https://docs.moodle.org/311/en/local_o365)</br>For more information, see [Check task logs](https://docs.moodle.org/311/en/local_o365#Sync_users_with_Azure_AD). |
|Token refresh|Clean the **User sync delta token** in the local_o365 plugin.| For more information, see, [Token refresh](https://docs.moodle.org/38/en/Office365).|

<br>
&nbsp;
</details>
<details>
<summary>One or more users are unable to sign in using their Microsoft 365 credentials, although most users can sign in without an issue. What would be the cause of this inconsistency?</summary>

The reason for inconsistencies with users being able unable to sign using their Microsoft 365 credentials can be related to the user mapping operation during synchronization. To resolve the issue, perform the following steps:

* Check if the Moodle user authentication type is **OpenID**.
* Check if the Moodle **User Name** matches the Microsoft Entra username.
* Clean up the **Token Issue** and retry.
* Check if the users have **Permissions** to access the Azure application.
<br>

&nbsp;

</details>
<details>
<summary>All users are unable to sign in using their Microsoft 365 credentials. What can we do to resolve this?</summary>

Users who were unable to sign in at the start need to report the issue and verify that the application's **Client secret** hasn't expired.

The following image shows the error message received when a user signs in using their Microsoft 365 credentials:

:::image type="content" source="assets/images/MoodleInstructions/faq-6.png" alt-text="report issue":::

The following image shows the error in Azure portal:

:::image type="content" source="assets/images/MoodleInstructions/faq-7.png" alt-text="Azure portal":::

If the **Client secret** has expired, then the app user needs to generate a new **Client secret**, and update the configuration found on page. Users can sign in again after the **Client secret** has been updated, which can take up to 24 hours to re-provision.
<br>
&nbsp;
</details>
<details>
<summary>How to change the Teams instance that is linked to a course?</summary>

Administrators can change the Teams instance associated with a course through the **Manage Teams Connections** page. Select **Connect** next to the course to be changed and select a Teams instance. If you use course reset to archive a team, you can link it back to the previous team.

The following image shows the Teams instance:

:::image type="content" source="assets/images/MoodleInstructions/faq-8.png" alt-text="teams instance":::
<br>
&nbsp;
</details>
<details>
<summary>Why isn’t the Atto Teams meeting integration showing up within the Atto editor?</summary>

The user can face Atto Teams meeting issue if the icon reference is missing in the **Toolbar config**, which displays the Teams icon within the Atto editor. The user needs to add Teams meeting icon to the right of the links icon using the following steps:

1. Install the plugin.
1. Update **Toolbar config** with **teams meeting**.

The following images show Toolbar icon after Toolbar configuration adjustment:

:::image type="content" source="assets/images/MoodleInstructions/faq-9.png" alt-text="tool bar":::

:::image type="content" source="assets/images/MoodleInstructions/faq-10.png" alt-text="links icon":::

For more information on editing Atto toolbar, see:

* [Atto editor-ModdleDocs](https://docs.moodle.org/311/en/Atto_editor)
* [Atto editor-Icon mapping](https://docs.moodle.org/311/en/Atto_editor#:~:text=in%20the%20editor.-,Atto%20editor%20toolbar,-Atto%20Row%201)

<br>
&nbsp;
</details>
<details>
<summary>Do the meetings scheduled through Microsoft integration appear in Outlook or in Teams calendars? What is the standard timeline for the meetings to be displayed?</summary>

The meetings scheduled through the app don't appear in the scheduler’s Outlook or Teams calendar as they're similar to Channel Meetings. All the members in the course channel can attend the meeting directly from the embedded channel link. For more information, see [Channel meetings](https://www.knowledgewave.com/blog/benefits-of-channel-meetings-in-microsoft-teams).

However, you can access the invite and manually add participant names to the **Required** or **Optional** fields of the meeting invitation to display the remote meeting on their calendars. The standard timelines are based on the date the user specifies when the meeting is created. For more information, see [Limits and specifications for Teams](/microsoftteams/limits-specifications-teams).
<br>
&nbsp;
</details>
<details>
<summary>Is there any support site where we can get more help on products and other issues?</summary>

For support and help on the product and services issues or developer community help see, [Support and feedback](feedback.md).

</details>

## Notifications

<details>
<summary>How can I save conservation reference in a proactive bot?</summary>

It's recommended that you save conversation references to database and use the same for building conversation object to send proactive message.

</details>

## Page orientation

> [!NOTE]
> The FAQs are applicable for Teams mobile only.

<br>

<details>
<summary>Do I need to make any changes in the app to get the landscape mode?</summary>

No. You can use apps in landscape mode by default.
<br>
&nbsp;
</details>
<details>
<summary>What if my app doesn't support one of the modes, or if the scenario is only intended to work in one of the modes?</summary>

Teams supports both modes by default. The apps in Teams aren't supported to work in one mode only. If your app demands this requirement, reach out to the [support team](feedback.md).
<br>
&nbsp;
</details>
<details>
<summary>How can I fix the scroll missing in the app empty state?</summary>

Add `<FlexColumn scroll></FlexColumn>` to the empty state for the app.
<br>
&nbsp;
</details>
<details>
<summary>How can I test my app compatibility in both landscape and portrait modes?</summary>

To test your app's compatibility in both modes, run the app on Teams mobile in different device orientations. Ensure that all elements, including buttons, text, and images are correctly aligned and displayed without any UI distortions or cut-offs.
<br>
&nbsp;
</details>
<details>
<summary>Are there any best practices for designing apps that work well in both landscape and portrait modes?</summary>
Yes, when designing apps for Teams, it's essential to follow responsive design principles to ensure optimal performance and user experience in both landscape and portrait modes. Use flexible layouts and adaptive components to accommodate different screen sizes and orientations.
<br>
&nbsp;
</details>
<details>

<summary>Does landscape mode support both Android and iOS Teams apps?</summary>

Yes, the landscape mode is supported on both Android and iOS Teams apps, providing consistent experience for users across both platforms.
<br>
&nbsp;
</details>
<details>
<summary>Can I customize the app's behavior differently for landscape and portrait modes?</summary>

The behavior of the app remains consistent across both modes. However, if you have specific use cases or requirements that require different behaviors in each mode, reach out to the [support team](feedback.md) with your feedback and suggestions.
<br>
&nbsp;
</details>
<details>
<summary>Is there any impact on the performance of apps in landscape mode?</summary>

No, the landscape mode support in Teams doesn't have any negative effect on app performance. Teams ensures a smooth and seamless experience for users, regardless of the device orientation.
<br>
&nbsp;
</details>

## Partner Center

<details>
<summary>Where do you find MPN ID?</summary>

You can find your MPN ID by fetching the Partner Center ID.
<br>
&nbsp;
</details>
<details>
<summary>I can't see the Developer Tab in Partner Center. How can I fix it?</summary>

If you can't see the Developer tab, you can raise a ticket in Partner Center.

For more information about raising a ticket, see [Get help or open a support ticket](/azure/marketplace/support#get-help-or-open-a-support-ticket).
<br>
&nbsp;
</details>
<details>
<summary>How do I create a Partner Center account?</summary>

You can create a Partner Center account one of the following ways:

* If you're new to Partner Center and don't have a Microsoft Network Account, [create an account using the Partner Center enrollment page](/office/dev/store/open-a-developer-account#create-an-account-using-the-partner-center-enrollment-page).
* If you're already enrolled in the Microsoft Partner Network, [create an account directly from Partner Center using existing Microsoft Partner Center enrollments](/office/dev/store/open-a-developer-account#create-an-account-using-an-existing-partner-center-enrollment).
<br>

&nbsp;

</details>
<details>
<summary>How can I find my account in Partner Center?</summary>

Open a [Partner Center support ticket](https://partner.microsoft.com/support/v2/?stage=1) and select the following:

| Menu | Option |
| ---   | --- |
| Category | Commercial Marketplace|
| Topic | General Marketplace Help and How-to questions |
| Subtopic | Office add-in |

<br>

</details>
<details>
<summary>Where can I get support for my Partner Center account issues?</summary>

Visit the [publishers support page](https://aka.ms/marketplacepublishersupport) to search for your issue. If the guidance isn't helpful, create a [Partner Center support ticket](/azure/marketplace/partner-center-portal/support#how-to-open-a-support-ticket).
<br>
&nbsp;
</details>
<details>
<summary>How do I manage my Microsoft 365 Store account in Partner Center?</summary>

See [manage your account through Partner Center](/office/dev/store/manage-account-settings-and-profile) for information.
<br>
&nbsp;
</details>
<details>
<summary>My phone number doesn't have an area code, so how do I add it to my profile?</summary>

The phone number has three parts: country code, area code, and telephone number. If your phone number doesn't include an area code, leave the second box empty and complete the third box.
<br>
&nbsp;
</details>
<details>

<summary>How do I manage my account settings and partner profile in Partner Center?</summary>

See [manage account settings and profile info](/windows/uwp/publish/manage-account-settings-and-profile#additional-settings-and-info) for information.
<br>
&nbsp;
</details>
<details>
<summary>Why do I see a, "This account isn't published eligible," message when I try to submit my app?</summary>

You received this error message because your [account verification status](/partner-center/verification-responses) is pending. Check your status in the Partner Center [dashboard](https://partner.microsoft.com/dashboard). Select the **Settings** gear icon and choose **Developer settings > Account > Account settings**.

![Partner Center verification status](~/assets/images/partner-center-verification-status.png)
<br>
&nbsp;
</details>
<details>
<summary>What is verified in the Partner Center account verification process?</summary>

There are three verification areas, **Email Ownership**, **Employment**, and **Business**. For more information, see [what is verified and how to respond](/partner-center/verification-responses#what-is-verified-and-how-to-respond).

If you're the primary contact, global admin, or account admin, you can monitor verification status and track progress on your profile page.

After the verification process is complete, the status of your enrollment on the profile page changes from *pending* to *authorized*. The primary contact then receives an email from Microsoft within a few business days.
<br>
&nbsp;
</details>
<details>
<summary>My account verification status hasn't advanced beyond Email Ownership. How should I proceed?</summary>

During the **Email Ownership** verification process, a verification email is sent to the primary contact. Check your primary contact inbox for an email from **<maccount@microsoft.com>** with the subject line **Action needed: Verify your email account with Microsoft** and complete the email verification process. The verification email is sent to the address listed on your Partner Center account settings.

Remember the following points about the email verification process:

* The email verification link is valid only for seven days.
* You can request to resend the email by visiting your partner profile page and selecting the **Resend verification email** link.
* To ensure you receive the email, safe-list **microsoft.com** as a secure domain and check your junk email folders.
<br>

&nbsp;

</details>
<details>
<summary>I've checked my mail folders and haven't received the verification email. What must I do next?</summary>

Try the following steps:

* Check your junk or spam folder.
* Clear the browser cache, go to your Partner Center account dashboard, and select **Resend verification email**.
* Try accessing the **Resend verification email** link from a different browser.
* Work with your IT department to ensure that the verification emails aren't blocked by your email server.
* Adjust your server's spam filter to allow or safe-list all emails from **<maccount@microsoft.com>**.
<br>

&nbsp;

</details>
<details>
<summary>How long does the employment verification process usually take?</summary>

If all the submitted details are correct, the employment verification process takes about two hours to complete.
<br>
&nbsp;
</details>
<details>
<summary>How long does the business verification process usually take?</summary>

If all the required documents are submitted, business verification takes one to two business days to complete.
<br>
&nbsp;
</details>
<details>
<summary>If I reach out to the support team, will my ticket be expedited?</summary>

Support tickets get resolved in a week. Check for updates sent to the email you provided when creating the support ticket.
<br>
&nbsp;
</details>
<details>
<summary>I created a support ticket but haven't received an update in seven business days. Where can I get help?</summary>

Send an email to <a href="mailto:teamsubm@microsoft.com">teamsubm@microsoft.com</a> with the following details:

* **Subject Line**: Partner Center Account Issue for *your app name*.
* **Email body**:
  * Support ticket number.
  * Your seller ID.
  * A screenshot of the issue, if possible.
<br>

&nbsp;

</details>
<details>
<summary>Where else can I go for Partner Center help?</summary>

The following resources can also assist:

* [Microsoft 365 app submission FAQ](/office/dev/store/appsource-submission-faq).
* [Commercial marketplace documentation](/azure/marketplace/).
<br>

</details>

## Single sign-on

<details>
<summary>How can I validate a user when they invoke an Adaptive Card? </summary>

You can open the authentication page in the dialog (referred as task module in TeamsJS v1.x) when the user selects the button.

You can use the [code sample](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-task-module/python) for opening the dialog on button click. You can replace the taskInfo.url with your auth page.

<br>
&nbsp;
</details>
</details>
<details>
<summary>How can I change application ID URI of SSO scope to use bot ID also so that the consent window won't be required for a bot app?</summary>

For more information, see [Configure your app in Microsoft Entra ID](bots/how-to/authentication/bot-sso-register-aad.md).
<br>
&nbsp;
</details>
<details>
<summary>I want to open an iframe that contains a React app (that displays confidential information) from a bot dialog (referred as task module in TeamsJS v1.x) securely. Can you suggest what is the best, easiest, and standard approach to perform this operation?</summary>

Implement react page with tab SSO and render the content as required. You can open the same tab URL as dialog from bot.

For more information, see [Enable SSO for tab app](tabs/how-to/authentication/tab-sso-overview.md).
<br>
&nbsp;
</details>
<details>
<summary>How can I avoid SDK timeout error while the app user signs in?</summary>

Open the sign in simple start page instead of opening login page directly to resolve the issue.
<br>
&nbsp;
</details>
<details>
<summary>How can I generate the access token using the endpoint oauth2/v2.0/token with grant type as authorization_code?</summary>

Configure the application you're using to only execute HTML encoding of the scopes once, so the scopes can be correctly sent and evaluated by Microsoft Entra ID.
<br>
&nbsp;
</details>
<details>
<summary>How can I implement Bot SSO using React?</summary>

If you use Teams Toolkit to build your app, see [Add single sign-on to Teams app](toolkit/add-single-sign-on.md) for more information.

For more information about Node js code sample, see [Bot SSO quick-start](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation-sso-quickstart/js).
<br>
&nbsp;
</details>

## Stageview

</br>

<details>

<summary>Which Stageview should I use?</summary>

Collaborative Stageview allows the users to open content along with a side panel conversation in a Teams window. This view is best suited for most of the collaboration scenarios.

</br>

</details>

<details>

<summary>What's the difference between Stageview Modal and dialogs?</summary>

Stageview Modal is useful to display rich content to the users, such as page, dashboard, or file. <br> Dialogs (referred as task modules in TeamsJS v1.x) are useful to display messages that need users' attention or collect information required to move to the next step.

</br>

</details>

<details>

<summary>When Stageview is invoked, the content opens in Collaborative Stageview but gets loaded in the main Teams window instead of a new window. How to open the content in a new window?</summary>

Ensure that your `contentUrl` domain is accurately reflected in the manifest `validDomains` property. For more information, see [app manifest schema](resources/schema/manifest-schema.md).

</br>

</details>

<details>

<summary>Why isn't any content displayed in a new Teams window even when contentUrl matches with validDomains?</summary>

Call `app.notifySuccess()` in all iframe-based contents to notify Teams that your app is loaded successfully. If applicable, Teams hides the loading indicator. If `notifySuccess` isn't called within 30 seconds, Teams assumes that the app is timed out and displays an error screen with a retry option. For app updates, this step is applicable for tabs that are already configured. If you don't perform this step, an error screen is displayed for the existing users.

</br>

</details>

<details>

<summary>Can I include a deep link in my contentUrl?</summary>

No, deep links aren't supported in `contentUrl`.

</br>

</details>

<details>

<summary>How do I keep a specific thread shown alongside my content?</summary>

Collaborative Stageview from a deep link or a stageView API comes with the additional `threadId` parameter. You can explicitly define the chat thread to be displayed in the side panel for your specific `contentUrl`. For more information about retrieving a `threadId`, see [get conversation thread](/graph/api/group-get-thread).

</br>

</details>

## Tabs

<details>
<summary>How can I use deeplink to get the subEntityId or subPageId on mobile client while navigating from one tab to another tab?</summary>

Upgrade the Teams JavaScript client SDK to (@microsoft/teams-js": "^2.0.0") to resolve the issue.
<br>
&nbsp;
</details>
<details>
<summary>Which tab gets pinned if both configurable tab and static tab are defined in the app manifest for a specific scope?</summary>

If you have both configurable tab and static tab defined in your app manifest for a specific scope, Teams pins the static tab by default.
<br>
&nbsp;
</details>
<details>
<summary>What if I already have pre-existing pinned configurable tabs after switching to static tabs?</summary>

Pre-existing pinned configurable tab instances of your app continue to work the same. You don't have the option to pin new instances of these configurable tabs. When you select to pin your tab, then Teams pins the static tab of your app.
<br>
</details>
</details>

## Teams AI library

<br>
<details>
<summary>What does the Teams AI library do?</summary>

Teams AI library provides abstractions for you to build robust applications that utilize OpenAI large language model (LLM)s.
<br>
</details>

<details>
<summary>Does Microsoft provide a hosted version of OpenAI models that are used by the AI library?</summary>

No, you need to have your large language model (LLM)s, hosted in Azure OpenAI or elsewhere.
<br>
</details>

<details>
<summary>Can we use the AI library with other large language models apart from OpenAI?</summary>

Yes, it's possible to use Teams AI library with other large language model (LLM)s.
<br>
</details>

<details>
<summary>Does a developer need to do anything to benefit from LLMs? If yes, why?</summary>

Yes, Teams AI library provides abstractions to simplify utilization of large language model (LLM)s in conversational applications. However, you (developer) must tweak the prompts, topic filters, and actions depending upon your scenarios.
<br>
</details>

<details>
<summary>How does Teams AI library integrate with ODSL?</summary>

The two are independent and can't be integrated.
<br>
</details>

<details>
<summary>How does Teams AI library co-exist against the hero-story of developers building for the skills ecosystem in Microsoft 365?</summary>

Teams AI library story is targeted towards Pro-developers and separate from the hero-story around skills ecosystem in Microsoft 365.
<br>
</details>

<details>
<summary>How should information about the existing Bot Framework SDK be communicated after announcing a new version?</summary>

Teams AI library works alongside the existing Bot Framework SDK and isn't a replacement.
<br>
</details>

## Teams toolkit

FAQ for [Provision cloud resources](toolkit/provision.md) using Teams Toolkit.
<br>

<details>
<summary>How to troubleshoot?</summary>

If you get errors with Teams Toolkit in Visual Studio Code, you can select **Get Help** on the error notification to go to the related document. If you're using TeamsFx CLI, there will be a hyperlink at the end of error message that points to the help doc. You can also view [provision help doc](https://aka.ms/teamsfx-arm-help) directly.
<br>
&nbsp;
</details>
<details>
<summary>How can I switch to another Azure subscription while provisioning?</summary>

1. Switch subscription in current account or log out and select a new subscription.
2. If you have already provisioned current environment, you need to create a new environment and perform provision because ARM doesn't support moving resources.
3. If you didn't provision current environment, you can trigger provision directly.
<br>

&nbsp;

</details>
<details>
<summary>How can I change resource group while provisioning?</summary>

Before provision, the toolkit asks you if you want to create a new resource group or use an existing one. You can provide a new resource group name or choose an existing one in this step.
<br>
&nbsp;
</details>
<details>
<summary>How can I provision a SharePoint-based app?</summary>

You can follow [provision SharePoint-based app](/microsoftteams/platform/sbs-gs-spfx?tabs=vscode%2Cviscode&tutorial-step=4).

> [!NOTE]
> Currently, building a Teams app using SharePoint Framework with Teams Toolkit doesn't have direct integration with Microsoft Entra admin center. The content in the document doesn't apply to SPFx-based apps.

<br>
&nbsp;
</details>
<details>
<summary>How can I deploy the code in Microsoft Entra ID using Teams Toolkit, and use Graph API to get the app user's profile photo?</summary>

Shared references to deploy the code using toolkit:

* [Create a new Teams app using Teams Toolkit](toolkit/create-new-project.md)
* [Teams Toolkit CLI](toolkit/Teams-Toolkit-CLI.md)

You can call Graph API to get the app user's profile photo.

</details>
