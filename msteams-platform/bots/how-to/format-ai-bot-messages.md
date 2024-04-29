---
title: Format your AI bot messages
author: v-preethah
description: Learn how to 
ms.topic: conceptual
ms.localizationpriority: medium
ms.author: v-preethah
---
# Format your AI bot messages

As we make our bots intelligent and more conversational, there is an emerging need for user experiences which are designed for AI and promote user trust and transparency.  

Enhance the user experience of your AI-powered bot to make the most of its AI abilities by adding features like citations, an AI-label, feedback buttons, and a sensitivity label. These elements can help create a seamless user experience for common AI scenarios like citing data sources for RAG, identifying AI generated responses, and collecting feedback. Moreover, through these elements you can elevate the user experience of your bot to match those of industry-leading AI experiences such as Copilot.

Even bots which don’t use AI might want to add citations or feedback buttons to their response and can benefit from these UI elements.  

This guide will cover how to add the following elements to your bot message:  

* AI-Label – Add an AI-Label to indicate that the message’s content was creating using AI
* Citations – Add In-text citations and a list of references to your responses
* Feedback Buttons – Add feedback buttons and a feedback form to your message
* Sensitivity Label – Add a sensitivity label to your message which conveys the confidentiality of the message

## Add AI label to bot message

It is important to communicate to users that your bot is using AI to generate its messages. While LLMs are mostly reliable, there can be scenarios where its response is incorrect or misleading.

Adding a label to your AI-generated message will increase transparency and help users practice reasonable caution when consuming the message.  

Here is how you add the AI-Label to your message:

```javascript
{ 
    "type": "message", 
    "from": { 
        "id": "28:48b2e1fd-b6b8-46ce-8074-8e918304fcb2" 
    }, 
    "conversation": { 
        "isGroup": true, 
        "id": "19:88b15596-2dd4-440b-98c6-a19cf49455a1@thread.tacv2" 
    }, 
    "recipient": { 
        "id": "8:orgid:f20c2a2c-1b43-416a-b5e8-fbcc69387c5e" 
    }, 
    "text": "2fd50566-ad63-4237-b240-f1942f7bdeb6", 
    "attachments": [], 
    "entities": [ 
        { 
            "@type": "Message", 
            "@context": "https://schema.org", 
            "@id": "", 
            "additionalType": [ 
                "AIGeneratedContent" 
            ] 
        } 
    ] 
}
```

Once implemented, your bot’s message will have an AI-Label next to the bot’s name. The label will have pop-up which states that**AI-generated content may be incorrect**:

*image placeholder*

## Add citations to bot message

If your bot is responding to users based on information in data sources such as files, messages, emails, work items, and others – it is important to cite these sources in the message itself. This will greatly boost the confidence and trust users have in your bot. Moreover, it gives users helpful references that they can use for asking follow-up questions or doing their own research.  

Adding citations is particularly important for bots using techniques like RAG.

Adding citations to your message consists of two key parts: in-text citations and a list of references.  

This is the format in which Teams is expecting your in-text citations:

*placeholer - code snippet*

Next is the list of references. The indexing on this list should match the corresponding in-text citations. Use this list to provide key details like the title of the citation, the link to the resource, a relevant quote from the document, and more. Here is how you can add a list of references to your message:

```javascript
{
    "type": "message", 
    "from": { 
        "id": "28:48b2e1fd-b6b8-46ce-8074-8e918304fcb2" 
    }, 
    "conversation": { 
        "isGroup": true, 
        "id": "19:136c757a-88d8-48c1-829d-3007c9f684b0@thread.tacv2" 
    }, 
    "recipient": { 
        "id": "8:orgid:7e425333-960e-4d3e-b136-0e98701ff5cc" 
    }, 
    "textFormat": "plain", 
    "text": "c53a7514-4abb-4592-b882-c2d0fac6f5bb[1];", 
    "attachments": [], 
    "entities": [ 
        { 
            "@type": "Message", 
            "@context": "https://schema.org", 
            "@id": "", 
            "citation": [ 
                { 
                    "@type": "Claim", 
                    "position": 1, 
                    "appearance": { 
                        "@type": "DigitalDocument", 
                        "name": "Name 1", 
                        "url": "https://example.com/claim-1", 
                        "abstract": "Abstract 1", 
                        "keywords": [ 
                            "Keyword1 - 1", 
                            "Keyword1 - 2", 
                            "Keyword1 - 3" 
                        ], 
                        "usageInfo": { 
                            "@type": "CreativeWork", 
                            "description": "UsageInfo 1 description", 
                            "name": "UsageInfo 1" 
                        } 
                    } 
                } 
            ] 
        } 
    ] 
}
```

Once implemented, your bot message will automatically have in-text citations and a list of references in the footer of the message. The in-text citations will show users details when hovered upon:

*image placeholder*

## Add sensitivity label to bot message

The last element you may want to add to your message is a sensitivity label. In some scenarios, your bot might respond with or use information that is confidential or only available to select people in the organization. It is important to help users identify the confidentiality of a message so that they can practice the appropriate caution needed when sharing the message contents.

We recommend adding this property only if your bot’s message contains sensitive information.  

Here is how you can add a sensitivity label to your bot message:

```javascript
{ 
    "type": "message", 
    "from": { 
        "id": "28:48b2e1fd-b6b8-46ce-8074-8e918304fcb2" 
    }, 
    "conversation": { 
        "isGroup": true, 
        "id": "19:751e0de5-9729-4182-882c-1cf98c5ea3d4@thread.tacv2" 
    }, 
    "recipient": { 
        "id": "8:orgid:db0778ad-ed6c-4e21-b98c-896ec6ad7ed0" 
    }, 
    "text": "ea2492cd-f768-41ad-a1ae-8f356c7cca28", 
    "attachments": [], 
    "entities": [ 
        { 
            "@type": "Message", 
            "@context": "https://schema.org", 
            "@id": "", 
            "usageInfo": { 
                "@type": "CreativeWork", 
                "description": "Sensitivity description", 
                "name": "Sensitivity name" 
            } 
        } 
    ] 
}
```

Reference the sensitivity label from citation

```javascript
{ 
    "type": "message", 
    "from": { 
        "id": "28:48b2e1fd-b6b8-46ce-8074-8e918304fcb2" 
    }, 
    "conversation": { 
        "isGroup": true, 
        "id": "19:5a5faeb2-8967-4469-b306-9a319072f96f@thread.tacv2" 
    }, 
    "recipient": { 
        "id": "8:orgid:209f94ff-7f34-42a2-883e-5dafc6a7d2f8" 
    }, 
    "textFormat": "plain", 
    "text": "1721a2f9-c79e-4502-b62e-ae31189ba17e[1];", 
    "attachments": [], 
    "entities": [ 
        { 
            "@type": "Message", 
            "@context": "https://schema.org", 
            "@id": "", 
            "citation": [ 
                { 
                    "@type": "Claim", 
                    "position": 1, 
                    "appearance": { 
                        "@type": "DigitalDocument", 
                        "name": "Name 1", 
                        "usageInfo": { 
                            "@type": "CreativeWork", 
                            "@id": "usage-info-1", 
                            "description": "UsageInfo 1 description", 
                            "name": "UsageInfo 1" 
                        } 
                    } 
                } 
            ], 
            "usageInfo": { 
                "@type": "CreativeWork", 
                "@id": "usage-info-1" 
            } 
        } 
    ] 
}
```

Once added, your bot message will contain a shield icon that the user can hover upon to find details on the sensitivity of the message:

*image placeholder*

## Samples

*Placeholder*
