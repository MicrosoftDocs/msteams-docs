---
title: Up to date views
description: Sample for up to date views using Universal Bot
ms.topic: conceptual
---

## Up to date views
Up to date views are now powered with a combination of Universal bots and bot fanouts in Teams.

Example: A user creates an asset approval request in Teams conversation. Shiladitya creates an approval request and assigns it to Sowrabh and Dipesh. 

Part 1: Now role based views can be leveraged by using refresh property of the adaptive cards.
Using role based views one can show a card with Approve/Reject buttons to a set of users, and show a card without Approve/Reject buttons to other users depending on their role.

Part 2: To keep the card state updated an all times, bot fanout mechanism can be leveraged.
example: Each time there is an approval, bot can trigger a fanout to all users. This bot fanout would trigger an `adaptiveCard/action` invoke request for all automatic refresh users, to which the bot can respond with the updated role based view card.

**Sample approval base card JSON**
```
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.4",
  "refresh": {
    "action": {
      "type": "Action.Execute",
      "title": "Refresh",
      "verb": "roleBasedView"
    },
    "userIds": ["<Sowrabh's user mri>", <Dipesh's user mri>]
  },
  "body": [
    {
      "type": "TextBlock",
      "text": "Asset Request 1234"
    },
    {
      "type": "TextBlock",
      "text": "Submitted by **Shiladitya**"
    },
    {
      "type": "TextBlock",
      "text": "Approval pending from **Sowrabh and Dipesh**"
    }
  ]
}
```

**Sample approval card JSON with approve, reject buttons**
```
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.4",
  "refresh": {
    "action": {
      "type": "Action.Execute",
      "title": "Refresh",
      "verb": "roleBasedView"
    },
    "userIds": ["<Dipesh's user mri>", "<Sowrabh's user mri>"]
  },
  "body": [
    {
      "type": "TextBlock",
      "text": "Approval Request 1234"
    },
    {
      "type": "TextBlock",
      "text": "Submitted by **Shiladitya**"
    },
    {
      "type": "TextBlock",
      "text": "Approval pending from **Sowrabh and Dipesh**"
    }
  ],
  "actions": [
    {
      "type": "Action.Execute",
      "title": "Approve",
      "verb": "approve",
      "data": {
            "more info": "<more info>"
      }
    },
    {
      "type": "Action.Execute",
      "title": "Reject",
      "verb": "reject",
      "data": {
            "more info": "<more info>"
      }
    }
  ]
}
```
Role 1: Approval base card - Shown to users who are not part of approvers list and have not yet approved or rejected the request (not part of userIds list in refresh property of adaptive card json). 

Role 2: Approval card with Approve/Reject buttons - Shown to the users who are part of the approvers list (part of the usersIds list in refresh property of the adaptive card json).

1. Shiladitya raised an asset approval request in a Teams conversation and assigns it to Sowrabh and Dipesh.
2. Bot sends the approval base card in the conversation.
3. All other users in the conversation see the card sent by the bot. Automatic refresh is triggered for Sowrabh and Dipesh who now see the role based vew card with Approve/Reject buttons (Since their user mri's are added to the userIds list in the refresh property of the adaptive card json). 

![Role-based views](~/assets/images/bots/up-to-date-views-stage1.png)

4. Dipesh clicks on the Approve button which is powered with `Action.Execute`. The bot gets an `adaptiveCard/action` invoke request to which it can return an adaptive card in response.
5. The bot triggers a fanout with an updated card which says Dipesh has approved the request while Sowrabh's approval is pending.

**Sample adaptive card JSON sent as response of `adaptiveCard/action` and `bot fanout` for #4, #5**

```
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.4",
  "refresh": {
    "action": {
      "type": "Action.Execute",
      "title": "Refresh",
      "verb": "roleBasedView"
    },
    "userIds": ["<Sowrabh's user mri>"]
  },
  "body": [
    {
      "type": "TextBlock",
      "text": "Asset Request 1234"
    },
    {
      "type": "TextBlock",
      "text": "Submitted by **Shiladitya**"
    },
    {
      "type": "TextBlock",
      "text": "Approval pending from **Sowrabh**"
    },
    {
      "type": "TextBlock",
      "text": "Approved by **Dipesh**"
    }
  ]
}
```

6. Bot fanout triggeres an automatic refresh for Sowrabh and sees the updated role based card which says Dipesh has approved the request but also see the Approve/Reject buttons. (Dipesh's user mri is removed from the userIds list in refresh property of this adaptive card json in #4, #5. Now, automatic refresh would only be triggered for Sowrabh)

**Sample adaptive card JSON sent as response of `adaptiveCard/action` invoke through automatic refresh for #6**

```
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.4",
  "refresh": {
    "action": {
      "type": "Action.Execute",
      "title": "Refresh",
      "verb": "roleBasedView"
    },
    "userIds": ["<Sowrabh's user mri>"]
  },
  "body": [
    {
      "type": "TextBlock",
      "text": "Approval Request 1234"
    },
    {
      "type": "TextBlock",
      "text": "Submitted by **Shiladitya**"
    },
    {
      "type": "TextBlock",
      "text": "Approval pending from **Sowrabh**"
    },
    {
      "type": "TextBlock",
      "text": "Approved by **Dipesh**"
    }
  ],
  "actions": [
    {
      "type": "Action.Execute",
      "title": "Approve",
      "verb": "approve",
      "data": {
            "more info": "<more info>"
      }
    },
    {
      "type": "Action.Execute",
      "title": "Reject",
      "verb": "reject",
      "data": {
            "more info": "<more info>"
      }
    }
  ]
}
```

![Up to date role based views](~/assets/images/bots/up-to-date-views-stage2.png)

7. Now, Sowrabh clicks on the Approve button which is powered with `Action.Execute`. The bot gets an `adaptiveCard/action` invoke request to which it can return an adaptive card in response.
8. The bot triggers a fanout with an updated card which says Dipesh and Sowrabh has approved the request.

**Sample adaptive card JSON sent as response of `adaptiveCard/action` and `bot fanout` for #7, #8**

```
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.4",
  "refresh": {
    "action": {
      "type": "Action.Execute",
      "title": "Refresh",
      "verb": "roleBasedView"
    },
    "userIds": []
  },
  "body": [
    {
      "type": "TextBlock",
      "text": "Asset Request 1234"
    },
    {
      "type": "TextBlock",
      "text": "Submitted by **Shiladitya**"
    },
    {
      "type": "TextBlock",
      "text": "Approved by **Dipesh and Sowrabh**"
    }
  ]
}
```

9. Bot fanout does not trigger any automatic refresh. (Sowrabh's user mri is also removed from the userIds list in refresh property of this adaptive card json in #7, #8)

![Up to date views](~/assets/images/bots/up-to-date-views-stage3.png)