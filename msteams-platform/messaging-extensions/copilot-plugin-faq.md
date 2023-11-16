---
title: Microsoft 365 Chat plugin FAQ
author: v-ypalikila
description: In this article, fetch answers to some frequently asked questions while building a plugin for Microsoft Copilot for Microsoft 365.
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
ms.date: 11/14/2023
---

# Frequently Asked Questions

Get answers to your common queries about building a message extension and extending the message extension as a plugin in  Microsoft 365 Chat.

</br>
<details>

<summary>Why isn't Microsoft 365 Chat including my plugin in a response?</summary>

Ensure your app manifest (previously called Teams app manifest) is descriptive. The app manifest helps in plugin matching in response to a user prompt. Also, make sure you've uploaded  the app package to Outlook and interacted with the app, including authentication.

If the problem continues, use the thumbs down indicator in the Microsoft 365 Chat reply and prefix your reply with [MessageExtension].

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

<summary> Microsoft 365 Chat includes my plugin in the response, but the Microsoft 365 Chat’s response doesn’t meet my expectations. What should I do?</summary>

Use the downvoting option in the Microsoft 365 Chat reply and prefix your reply with [MessageExtension].

</details>
</br>
<details>

<summary> Can I build my own Teams message extension? </summary>

Yes, you can. Ensure that you have a descriptive app manifest and have uploaded the app to Outlook and interacted with it, including authentication.</br>
</details>
</br>
<details>

<summary> How can I get my existing Teams message extension to work with Microsoft 365 Chat? </summary>

1. Register the bot channel in Azure Bot Service.
1. Upload the app to Outlook.

</details>
</br>
<details>

<summary> What is the certification process?</summary>

After publishing their plugin, developers opt into the App Compliance flow in Partner Center. If they haven't completed Publisher Verification, they'll be prompted to do so before starting the Microsoft 365 Certification process.  The next step is to complete Publisher Attestation, which collects self-attested information about their plugin, company, and operations. This information is published on a [Microsoft 365 App Compliance Program site](/microsoft-365-app-certification/teams/teams-apps).  The developer then starts the Microsoft 365 Certification process by uploading initial documents to help scope the assessment to their plugin and operating environment. Based on the scope, the developer will then be required to provide evidence for specific controls related to application security, operational security, and data handling/privacy. Developers that build on Azure can also use the App Compliance Automation Tool (ACAT). This tool automatically scans their environment and produces evidence for several controls, reducing the developer's manual work. For more information, see this video.

</details>
</br>
<details>

<summary> How are plugins certified?</summary>

After passing the proactive validation, developers of both existing and new message extensions that haven't been certified will be encouraged to certify their plugin. This will be communicated through an email confirming their message extension has been validated.
</details>
</br>
<details>

<summary> How are new plugins certified?</summary>

Developers will be encouraged to certify their new plugin after successfully completing validation.
</details>
