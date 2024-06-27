---
title: Copilot for Microsoft 365 plugin FAQ
author: v-ypalikila
description: In this article, fetch answers to some frequently asked questions while building a plugin for Microsoft Copilot for Microsoft 365.
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
ms.date: 11/14/2023
---

# Copilot for Microsoft 365 Frequently Asked Questions

Get answers to your common queries about building a message extension and extending the message extension as a plugin in Copilot for Microsoft 365.

</br>
<details>

<summary>Why isn't Copilot for Microsoft 365 including my plugin in a response?</summary>

Ensure your app manifest (previously called Teams app manifest) is descriptive. The app manifest helps in plugin matching in response to a user prompt. Also, ensure that you upload the app package to Outlook and interacted with the app, including authentication.

If the problem continues, use the thumbs down indicator in the Copilot for Microsoft 365 reply and prefix your reply with [MessageExtension].

</details>
</br>
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
</br>
<details>

<summary> Copilot for Microsoft 365 includes my plugin in the response, but the Copilot for Microsoft 365’s response doesn’t meet my expectations. What should I do?</summary>

Use the downvoting option in the Copilot for Microsoft 365 reply and prefix your reply with [MessageExtension].

</details>
</br>
<details>

<summary> Can I build my own Teams message extension? </summary>

Yes, you can. Ensure that you have a descriptive app manifest and upload the app to Outlook and interacted with it.</br>
</details>
</br>
<details>

<summary> How can I get my existing Teams message extension to work with Copilot for Microsoft 365? </summary>

1. Register the bot channel in Azure Bot Service.
1. Upload the app to Outlook.

</details>
</br>

<details>
<summary>What are the guidelines for Teams apps extensible as plugin for Microsoft Copilot for Microsoft 365? </summary>

You can read the [Teams Store validation guidelines](../concepts/deploy-and-publish/appsource/prepare/teams-store-validation-guidelines.md#teams-apps-extensible-as-plugin-for-microsoft-copilot-for-microsoft-365) for Teams apps extensible as plugin for Microsoft Copilot for Microsoft 365.

</details>
</br>

<details>

<summary> What is the certification process?</summary>

After publishing the plugin, start the App Compliance flow in Partner Center. If [Publisher verification](/entra/identity-platform/publisher-verification-overview) is incomplete, ensure that the App Compliance flow is completed before Microsoft 365 Certification. Then, complete [Publisher Attestation](/microsoft-365-app-certification/docs/attestation), which gathers self-attested data about the plugin, company, and operations. For more information, see [Microsoft 365 App Compliance Program](/microsoft-365-app-certification/overview).

To start the [Microsoft 365 Certification process](/microsoft-365-app-certification/docs/certification), upload initial documents that define the assessment scope for the plugin and operating environment. Depending on the scope, provide evidence for specific controls related to application security, operational security, and data handling or privacy. If you build your plugin on Azure, you can use the App Compliance Automation Tool (ACAT) to scan the environment and generate evidence for several controls, reducing the manual workload. For more information, see [App Compliance Automation Tool for Microsoft 365](/microsoft-365-app-certification/docs/acat-overview).

</details>
</br>
<details>

<summary> How are plugins certified?</summary>

After the app passes the proactive validation, developers of both existing and new message extensions that aren't certified will be encouraged to certify their plugin. This is communicated through an email confirming their message extension is validated.
</details>
</br>
<details>

<summary> How are new plugins certified?</summary>

Developers will be encouraged to certify their new plugin after successfully completing validation.
</details>
</br>

<details>
<summary>How can I create or upgrade a message extension plugin for Copilot for Microsoft 365?</summary>

 You can [create or upgrade a message extension as a plugin in Copilot for Microsoft 365](build-bot-based-plugin.md) to interact with third-party tools and services and achieve more with Copilot for Microsoft 365. Additionally, your extensions must meet the standards for compliance, performance, security, and user experience outlined in [guidelines to create or upgrade a message extension plugin for Copilot for Microsoft 365](high-quality-message-extension.md).
</details>
