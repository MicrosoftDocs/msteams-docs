---
title: Copilot plugin FAQ
author: v-ypalikila
description: In this article, fetch answers to some frequently asked questions while building a copilot plugin.
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
ms.date: 09/07/2023
---

# Frequently Asked Questions 

Q: I can't get Copilot to include my plugin in a response. 

A: Ensure that you have a descriptive Teams manifest file, as this is used to determine plugin matching in response to a user prompt. Additionally, ensure that you have sideloaded the app package to Outlook and interacted with the app, including authenticating. 

If that still doesn’t work, use the thumbs down indicator on the reply from copilot and prefix your reply with [MessageExtension].  

Q: What descriptions should I use in the manifest? 

Here are descriptions that work for NPM Finder. 

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
 

Q: Copilot includes my plugin in the response, but the Copilot’s response doesn’t match my expectations. 

A: Use the thumbs down indicator on the reply from copilot and prefix your reply with [MessageExtension]. 

Q: Can I build my own Teams message extension? 

A: Yes – just make sure that you have a descriptive application manifest and have sideloaded the application to Outlook and interacted with the app, including authentication. 

Q: I have problems building my Teams message extension with the Teams Toolkit. How can I get support? 

A: Reach out to Pierce Boggan, John Miller, and Abram Jackson over email. 

Q: I have an existing Teams message extension. How can I get it working with Microsoft 365 Copilot? 

A: 1. Register the Microsoft365Extensions bot channel in Azure Bot Service. 2. Sideload the application to Outlook. 


Q: How does certification work?
A: The plugin developer will opt into the App Compliance flow in Partner Center after publishing their plugin.  If the developer has not previously completed Publisher Verification, they will be prompted to do so prior to starting the M365 Certification process.  Their next step on the compliance journey is to complete Publisher Attestation which collects self-attested information about their plugin, company, and operations.  This information is published on a publicly facing MSDocs page for their customers to view.  The developer will then start the M365 Certification process by uploading some initial documents to help scope the assessment to their plugin and operating environment.  Based on the scope, the developer will then be required to provide evidence for specific controls related to application security, operational security, and data handling/privacy.  Developers that build on Azure can also opt to leverage the App Compliance Automation Tool (ACAT).  This tool will automatically scan their environment and produce evidence for several controls, reducing the amount of manual work required of the developer. More detailed instructions to achieve M365 Certification can be found in this video.


Q: How are existing plugins certified?

A: After successfully passing the proactive validating pass, existing MEs that have not already been certified will be encouraged to certify their plugin. This will be done through the email sent to developers confirming their existing ME has been validated.

Q: How are new plugins certified?
A: New plugins created will be encouraged to certify their plugin after successfully completing validation.

