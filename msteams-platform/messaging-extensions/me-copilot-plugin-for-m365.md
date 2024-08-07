---
title: Message Extension Plugins for Microsoft 365
author: surbhigupta12
description: Learn about a message extension plugin in Copilot for Microsoft 365
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
ms.date: 10/19/2023
---

# Message extensions Plugins in Copilot for Microsoft 365

Copilot extensions customize and extend the Copilot for Microsoft 365 experience by bringing additional skills and knowledge to Copilot for a personalized user experience. Plugins, which are a specific type subset of Copilot extensions, enable users to integrate additional capabilities into Copilot by interacting with third-party applications, whether for retrieving or modifying information within those apps. For instance, message extension plugins facilitate searching for data in other applications so that Copilot can present it upon request when the plugin is activated.. 

 If you've developed a plugin for Copilot in Teams or copilot.microsoft.com, you're already aware of the benefits it offers to users within their workflow. To extend your plugin's functionality to Copilot in Word, Excel, PowerPoint, and OneNote, refer to the following document for the required additional steps.

## Requirements for plugins in Word, PowerPoint, Excel, OneNote Copilots

To enable your Plugins to work in Word, Excel, PowerPoint & OneNote Copilots, ensure to follow the following requirements:

* <b>Update Microsoft Azure Active Directory (Azure AD) app registration for SSO</b>

    Azure Active Directory (AD) single sign-on (SSO) for message extensions work in the same way [as it does in Teams](../bots/how-to/authentication/auth-aad-sso-bots) or Outlook. However, you need to add the Office app Copilot’s client application identifier to the Azure AD app registration of your bot in your tenant's App registrations portal.

    1. Sign in to [Azure portal](https://portal.azure.com/)  with your sandbox tenant account. 
    1. Open <b>App registrations</b>. 
    1. Select the name of your application to open its app registration. 
    1. Select Expose an <b>API</> (under Manage). 
    1. In the <b>Authorized client applications</b> section, ensure the following Client Id values are listed:

        | Microsoft 365 client application  | Client ID |
        | --- | --- |
        | OfficeAIAppChatCopilotExt | 3068386c-7a16-4f6a-a664-043b6b232816 |

* <b>Ensure your registered bot is connected to Microsoft 365 and Microsoft Teams channel</b>

    1. Sign in to [Azure portal](https://portal.azure.com/) with your sandbox tenant account.
    1. Open Bot <b>Services</b>. 
    1. Select the name of your bot to update its channels. 
    1. Select Channels (under Settings). 
    1. From <b>Available channels</b>, choose <b>Microsoft 365 & Microsoft Teams</b> and then select <b>Apply</b>. 

* <b>Configure content security policy headers</b>

    If your app makes use of [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) (CSP) headers, make sure you allow all the following [frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors) in your CSP headers:

    | Microsoft 365 App | frame-ancestor permission |
    | --- | --- |
    | Word | fa000000125.resources.office.net |
    | PowerPoint | fa000000129.resources.office.net |
    | Excel | fa000000124.resources.office.net |
    | OneNote | fa000000128.resources.office.net |

* <b>Upgrade Teams JS version to the 2.19.0 build</b>

    If you're using Teams JS version lower than 2.19, update it to 2.19+.  

    For more information, see Teams JS Repository Link: [@microsoft/teams-js - npm (npmjs.com)](https://www.npmjs.com/package/@microsoft/teams-js).
