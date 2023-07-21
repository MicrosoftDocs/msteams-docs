---
title: Bot configuration experience
author: surbhigupta
description: Learn about bot configuration experience.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
---

# Bot configuration experience

Bot configuration feature was designed to provide a way for users to configure bots after installation, so that the initial interaction doesn’t feel like a cold start.
Apart from being able to configure a bot  on first installation , it is necessary that bots can be reconfigured at any time. The configuration is supported for bots in channel scope within a team, and in personal/group chat. The idea is to support bot configuration for all entry points that bot installation can be initiated from.

## Manifest schema

```json
 configuration:{  

personal:{<same as team>},  //not needed for now 
groupChat:{<same as team >},  

 team:{  

fetchTask: true/false,       
taskInfo: {  

 __typename: “”,  

 title: null,  

 height: null,  

 width: null,  

 url: null, 

 }  

        }  
```

## Config/fetch

```json
{ 

  name: ‘config/fetch’, 

  type: 'invoke', 

  timestamp: 2022-10-02T20:12:08.450Z, 

  localTimestamp: 2022-10-02T20:12:08.450Z, 

  id: 'f:a1b78a1c-1568-ae80-30f3-c44536c21b1f', 

  channelId: 'msteams', 

  serviceUrl: 'https://smba.trafficmanager.net/amer/', 

  from: { 

    id: '29:1QRfWYe8GaC-a6wkME0VJuPz3rNA8J3xzZ-96zy-1A-sBX2GgTgRmmXgiEqwBRFrSKvr7CnNgatACgqfTykWegQ', 

    name: 'Deekshanya Badrinarayanan', 

    aadObjectId: '45284ebc-52f6-4ce9-baa8-c80d2d255744' 

  }, 

  conversation: { 

    conversationType: 'personal', 

    tenantId: '72f988bf-86f1-41af-91ab-2d7cd011db47', 

    id: 'a:15iTnL28mj62f44lEQE306R_2peCVf8yo9BeovWvY0Uf2t-y-L6KtLBOWocCXjvOSmCyvEOmwrSw9C5tiH83wRTg8rXUTeAvLhWf2iPTtCi4Xzn-eDXVQW4LIMmb9Ccum' 

  }, 

  recipient: { 

    id: '28:4e8f5ac6-ab89-4f46-8d95-c6e907479f0c', 

    name: 'deekshanya_urltest' 

  }, 

  entities: [ 

    { 

      locale: 'en-IN', 

      country: 'IN', 

      platform: 'Web', 

      timezone: 'America/Los_Angeles', 

      type: 'clientInfo' 

    } 

  ], 

  channelData: { 

    tenant: { id: '72f988bf-86f1-41af-91ab-2d7cd011db47' }, 

    source: { name: 'compose' } 

  }, 

  value: { 

    commandId: 'dynamicsearch', 

    commandContext: 'compose', 

    context: { theme: 'default' } 

  }, 

  locale: 'en-IN', 

  localTimezone: 'America/Los_Angeles', 

  rawTimestamp: '2022-10-02T20:12:08.45Z', 

  rawLocalTimestamp: '2022-10-02T13:12:08.45-07:00', 

  callerId: 'urn:botframework:azure' 

} 

```

## Config/continue

```json
Config/continue 

{​ 

  "responseType": "config", 

  "config": {​ 

    "type": "continue", 

    "value": {​ 

      "title": "Task module title", 

      "height": 500, 

      "width": "medium", 

      "card": {​ 

        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json", 

        "type": "AdaptiveCard", 

        "version": "1.0", 

        "body": [ 

          {​ 

            "type": "Input.Text", 

            "placeholder": "FormField1", 

            "id": "FormField1" 

          }​, 

          {​ 

            "type": "Input.Text", 

            "placeholder": "FormField2", 

            "id": "FormField2" 

          }​, 

          {​ 

            "type": "Input.Text", 

            "placeholder": "FormField3", 

            "id": "FormField3" 

          }​, 

          {​ 

            "type": "ActionSet", 

            "actions": [ 

              {​ 

                "type": "Action.Submit", 

                "title": "Action.Submit", 

                "id": "submitAction" 

              }​ 

            ] 

          }​ 

        ] 

      }​ 

    }​ 

  }​ 

}​ 
```

## See also
