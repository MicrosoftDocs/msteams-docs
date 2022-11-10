---
title: Frequently asked questions for Teams developer document
description: Frequently asked questions for Teams developer document
ms.topic: reference
ms.localizationpriority: high
---

# Frequently asked questions

This section contains the frequently asked questions and the answers.

## App validation

<br>
<details>
<summary>Publisher Attestation issue - the app needed to be published first(I attached the screenshot when I tried to submit the attestation). Before doing the Publisher Attestation. I think this is most likely to connect the Azure AD to an MPN account.</summary>

Publisher verification overview - Microsoft Entra | Microsoft LearnMark an app as publisher verified - Microsoft Entra | Microsoft Learn
Docs didn't help - had to raise  PC ticket
Resolution-to connect the Azure to MPN settings below developer tab.

</details>
<br>

<details>
<summary>Partner reported that the tab menu was showing a white screen under the "more" section on the Teams mobile iOS client and for Teams dark mode. We've reproduced the issue with the provided details and observed that it's a common issue for Teams mobile iOS clients and only for dark mode. So, we've raised a bug request for the same</summary>

Platform Bug
</details>
<br>

## Bots

<br>
<details>
<summary>The bot isn't supposed to crash when the card is invalid. It can fail to display it, but it shouldn't crash. Also the behavior should be consistent between web and mobile.</summary>

Work with Universal Actions for Adaptive Cards - Teams | Microsoft Docs to validate.

</details>
<br>

<details>
<summary>How can I remove specific messages from bot history? The only way I've found requires an activity ID (UpdateActivityAsync). Is there a way to get the chat history and find an activity ID of a specific message?</summary>

Use Delete messages-Bot framework's DeleteActivity //  ~/bots/how-to/update-and-delete-bot-messages?tabs=dotnet#delete-messages // method.

</details>

<br>
<details>
<summary>How can I test the validity of the card schema via code, to avoid it in the future?</summary>

Provided steps to test/validate adaptive card schema:“Adaptive cards editor(preview)” option from the Teams apps >>Developer portal >> Tools" and asked to refer Schema Explorer | Adaptive Cards.

</details>

<br>

## General

<details>
<summary>How can I migrate of Team store app from one tenant to another tenant?</summary>

<br>

Teams doesn't support that capability as yet.

</details>

<br>

## Live share

<br>

<details>

<summary><b>Can I use my own Azure Fluid Relay service?</b></summary>

Yes! When initializing Live Share, you can define your own `AzureConnectionConfig`. Live Share associates containers you create with meetings, but you'll need to implement the `ITokenProvider` interface to sign tokens for your containers. For example, you can use a provided `AzureFunctionTokenProvider`, which uses an Azure cloud function to request an access token from a server.

While most of you find it beneficial to use our free hosted service, there may still be times where it's beneficial to use your own Azure Fluid Relay service for your Live Share app. Consider using a custom AFR service connection if you:

* Require storage of data in Fluid containers beyond the lifetime of a meeting.
* Transmit sensitive data through the service that requires a custom security policy.
* Develop features through Fluid Framework, for example, `SharedMap`, for your application outside of Teams.

For more information, see [how to guide](./teams-live-share-how-to/how-to-custom-azure-fluid-relay.md) or visit the [Azure Fluid Relay documentation](/azure/azure-fluid-relay/).

<br>

</details>

<details>

<summary><b>How long is data stored in Live Share's hosted service accessible?</b></summary>

Any data sent or stored through Fluid containers created by Live Share's hosted Azure Fluid Relay service is accessible for 24 hours. If you want to persist data beyond 24 hours, you can replace our hosted Azure Fluid Relay service with your own. Alternatively, you can use your own storage provider in parallel to Live Share's hosted service.

<br>

</details>

<details>

<summary><b>What meeting types does Live Share support?</b></summary>

Scheduled meetings, one-on-one calls, group calls, and meet now are supported. Channel meetings aren't yet supported.

<br>

</details>

<details>

<summary><b>Will Live Share's media package work with DRM content?</b></summary>

No. Teams currently doesn't support encrypted media for tab applications on desktop. Chrome, Edge, and mobile clients are supported. For more information, you can [track the issue here](https://github.com/microsoft/live-share-sdk/issues/14).

<br>

</details>

<details>
<summary><b>How many people can attend a Live Share session?</b></summary>

Currently, Live Share supports a maximum of 100 attendees per session. If this is something you're interested in, you can [start a discussion here](https://github.com/microsoft/live-share-sdk/discussions).

<br>

</details>

<details>
<summary><b>Can I use Live Share's data structures outside of Teams?</b></summary>

Currently, Live Share packages require the Teams Client SDK to function properly. Features in `@microsoft/live-share` or `@microsoft/live-share-media` won't work outside Microsoft Teams. If this is something you're interested in, you can [start a discussion here](https://github.com/microsoft/live-share-sdk/discussions).

<br>

</details>

<details>
<summary><b>Can I use multiple Fluid containers?</b></summary>

Currently, Live Share only supports having one container using our provided Azure Fluid Relay service. However, it's possible to use both a Live Share container and a container created by your own Azure Fluid Relay instance.

<br>

</details>

<details>
<summary><b>Can I change my Fluid container schema after creating the container?</b></summary>

Currently, Live Share doesn't support adding new `initialObjects` to the Fluid `ContainerSchema` after creating or joining a container. Because Live Share sessions are short-lived, this is most commonly an issue during development after adding new features to your app.

> [!NOTE]
> If you are using the `dynamicObjectTypes` property in the `ContainerSchema`, you can add new types at any point. If you later remove types from the schema, existing DDS instances of those types will gracefully fail.

To fix errors resulting from changes to `initialObjects` when testing locally in your browser, remove the hashed container ID from your URL and reload the page. If you're testing in a Teams meeting, start a new meeting and try again.

If you plan to update your app with new `SharedObject` or `LiveObject` instances frequently, you should consider how you deploy new schema changes to production. While the actual risk is relatively low and short lasting, there may be active sessions at the time you roll out the change. Existing users in the session shouldn't be impacted, but users joining that session after you deployed a breaking change may have issues connecting to the session. To mitigate this, you may consider some of the following solutions:

* Deploy schema changes for your web application outside of normal business hours.
* Use `dynamicObjectTypes` for any changes made to your schema, rather than changing `initialObjects`.

> [!NOTE]
> Live Share does not currently support versioning your `ContainerSchema`, nor does it have any APIs dedicated to migrations.

<br>

</details>

<details>
<summary><b>Are there limits to how many change events I can emit through Live Share?</b></summary>

While Live Share is in Preview, any limit to events emitted through Live Share isn't enforced. For optimal performance, you must debounce changes emitted through `SharedObject` or `LiveObject` instances to one message per 50 milliseconds or more. This is especially important when sending changes based on mouse or touch coordinates, such as when synchronizing cursor positions, inking, and dragging objects around a page.

<br>

</details>

## Microsoft Graph

<details>
<summary>We're wondering when the user sets the preferred time to get a notification, can we also get their timezone automatically? Any function may be in graph API where we can get the user's location?</summary>

<br>
Response:
You can use the following Grap API Get user mailbox settings - Microsoft Graph v1.0 | Microsoft Docs to get the user’s time zone like mentioned below.
• GET /me/mailboxSettings/timeZone
• GET /users/{id|userPrincipalName}/mailboxSettings/timeZone

</details>

<br>
<details>
<summary>Customer was looking for support to deploy the code in Azure using teams toolkit, also asked few queries related to graph api get user profile photo.</summary>

<br>
Shared references to deploy the code using toolkit: Create a new Teams app using Teams Toolkit - Teams | Microsoft Docs
TeamsFx Command Line Interface - Teams | Microsoft Docs
Also, provided guidance how they can call Graph API get user profile photo.

</details>

<br>

## Notifications

<br>
<details>
<summary>Notification Instability</summary>

<br>
Customer is using bot builder proactive message sample. Sample won't save object references. So, it's working with initial run and failing after it. Recommended to saving conversation references to database and use the same for building conversation object to send proactive message.

</details>

<br>

## PC

<details>
<summary>Where do you find MPN ID?</summary>

<br>
You need to fetch PC ID.

</details>

<br>

<details>
<summary>Not able to see Developer Tab in Partner Center.</summary>

<br>

// Raise a PC Ticket //

</details>

<br>

## Single sign-on

<details>
<summary>Partner asked few queries on SSO login flow and a way to redirect the user to auth from invoking an adaptive card. Also Partner needs a way to access the PROD app package and resources from Azure since they lost access to prod subscription.</summary>

<br>
you can open the authentication page in the task module when selects the button. We do have a sample for opening the task module on button click mentioned here BotBuilder-Samples/teams_task_module_bot.py at main · microsoft/BotBuilder-Samples (github.com). You can replace the taskInfo.url with your auth page.

</details>

<br>

<details>
<summary>How we can change Application ID URI of SSO scope to use bot ID also so that the consent window won't be required for Bot?</summary>

<br>
[Register your app on Azure AD](/bots/how-to/authentication/auth-aad-sso-bots#register-your-app-through-the-azure-ad-portal)

</details>

<br>
<details>
<summary>Customer's requirement is to open an iframe, it contains a react app (that displays sensitive information) from a bot task module securely. Can you suggest what is the best/easiest/standard approach to perform this operation?</summary>

<br>

Implement react page with tab SSO and render the content as required. You can open the same tab URL as task module from Bot.
</details>

<br>
<details>
<summary>When user selects sign in button, popup isn't opening. Because partner trying to open https://login.microsoftonline.com site from sign in button-click. And signin end page is showing sdk timeout error. Asked to open sign in simple start page instead of login page directly. Issue resolved by doing the same.</summary>

<br>
No resolution required.

</details>

<br>
<details>
<summary>Customer was facing issues with generating the access token using the endpoint oauth2/v2.0/token. with grant type as "authorization_code".

As we discussed with Azure AD team for the issue generating MS access token using (v2.0 endpoint), based on the event shared (Correlation ID 73454783-f0c5-4d48-9f8a-3ea6b5bd06f3 | 2022-09-19 06:48:00Z), the issue seems to reside on the scopes encoding, that is, the scopes were encoded twice. </summary>

<br>
Configure the application you're using to only execute HTML encoding of the scopes once, so the scopes can be correctly sent and evaluated by Azure AD.

</details>

<br>

<details>
<summary>Implementation of Bot SSO in React. Partner is looking for guidance for the same.</summary>

<br>
Code sample has been shared is in .NET or Node js.

</details>

<br>

## Tabs

<details>
<summary>Customer was facing issue with deeplink to get the subEntityId or subPageId on mobile client while navigating from one tab to another tab.</summary>

<br>
Customer to upgrade the teams JavaScript client SDK to (@microsoft/teams-js": "^2.0.0") and it resolves the issue.

</details>

<br>

## Task module

<details>
<summary>Partner reported issue with inconsistent behavior of closing the task module in desktop and android. The current behavior in mobile client won't be a blocker for partner since they can close it by clicking ‘ok’ in mobile. If partner wants to close the task module manually in desktop, then you can pass some string in the value property instead of passing it as empty.</summary>

<br>
No resolution required from the docs (Platform bug).

</details>

<br>

## Teams toolkit

FAQ for Provision cloud resources using Teams Toolkit // provision.md //

<br>

<details>

<summary><b>How to troubleshoot?</b></summary>

If you get errors with Teams Toolkit in Visual Studio Code, you can select **Get Help** on the error notification to go to the related document. If you're using TeamsFx CLI, there will be a hyperlink at the end of error message that points to the help doc. You can also view [provision help doc](https://aka.ms/teamsfx-arm-help) directly.

<br>

</details>

<details>

<summary><b>How can I switch to another Azure subscription while provisioning?</b></summary>

1. Switch subscription in current account or log out and select a new subscription.
2. If you have already provisioned current environment, you need to create a new environment and perform provision because ARM doesn't support moving resources.
3. If you didn't provision current environment, you can trigger provision directly.

<br>

</details>

<details>

<summary><b>How can I change resource group while provisioning?</b></summary>

Before provision, the tool asks you if you want to create a new resource group or use an existing one. You can provide a new resource group name or choose an existing one in this step.

<br>

</details>

<details>

<summary><b>How can I provision sharepoint-based app?</b></summary>

You can follow [provision SharePoint-based app](/microsoftteams/platform/sbs-gs-spfx?tabs=vscode%2Cviscode&tutorial-step=4).

> [!NOTE]
> Currently, the building Teams app with sharepoint framework with Teams Toolkit doesn't have direct integration with Azure, the contents in the doc doesn't apply to SPFx based apps.

<br>

</details>
