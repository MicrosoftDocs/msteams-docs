---
title: Up-to-date views
description: Sample for up to date views using Universal Bot
author: surbhigupta12
ms.topic: conceptual
localization_priority: Normal
---

# Up-to-date cards

You can now provide latest information to your users on adaptive cards with a combination of refresh and message edits in Teams. With this you would be able to update the even the user specific views dynamically to its latest state as and when there is a change on your service. For example in the case of project management/ticketing cards, you can update comments and status of task, in case of approvals reflect the latest state while also providing them differentiated information and actions. 

For example, a user can create an asset approval request in Teams conversation. Shiladitya creates an approval request and assigns it to Sowrabh and Dipesh. The following are the two parts to create the approval request:

* Now user-specific views can be leveraged using the refresh property of the Adaptive Cards.
Using user specific views one can show a card with **Approve** or **Reject** buttons to a set of users, and show a card without these buttons to other users.

* To keep the card state updated at all times, Teams message edit mechanism can be leveraged.
For example, each time there is an approval, bot can trigger a message edit to all users. This bot message edit triggers an `adaptiveCard/action` invoke request for all automatic refresh users, to which the bot can respond with the updated role-based view card.

## Sample approval base card

The following code provides an example of an approval base card:

```JSON
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
    "userIds": ["<Sowrabh's user MRI>", "<Dipesh's user MRI>"]
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

<<<<<<< HEAD
**Sample approval card with Approve, Reject buttons**
=======
## Sample approval card with Approve and Reject buttons

The following code provides an example of an approval card with **Approve** and **Reject** buttons:

>>>>>>> 3818443091d0eb2b2be065e6f2a70d257d8b443a
```JSON
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
    "userIds": ["<Dipesh's user MRI>", "<Sowrabh's user MRI>"]
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

The following are the two roles that are shown to users depending on their access to approvals:

* Approval base card: Shown to users who are not part of approvers list and have not yet approved or rejected the request not part of userIds list in refresh property of the Adaptive Card json.
* Approval card with **Approve** or **Reject** buttons: Shown to the users who are part of the approvers list and the userIds list in the refresh property of the Adaptive Card json.

**To send the asset approval request**

1. Shiladitya raises an asset approval request in a Teams conversation and assigns it to Sowrabh and Dipesh.
2. Bot sends the approval base card in the conversation.
3. All other users in the conversation see the card sent by the bot. Automatic refresh is triggered for Sowrabh and Dipesh who now see the role-based view card with **Approve** or **Reject** buttons as their user MRIs are added to the userIds list in the refresh property of the Adaptive Card.

    ![Role-based views](~/assets/images/bots/up-to-date-views-stage1.png)

4. Dipesh selects the **Approve** button which is powered with `Action.Execute`. The bot gets an `adaptiveCard/action` invoke request to which it can return an Adaptive Card in response.
5. The bot triggers a message edit with an updated card which says Dipesh has approved the request while Sowrabh's approval is pending.
6. Bot message edit triggers an automatic refresh for Sowrabh and sees the updated role-based card which says Dipesh has approved the request, but also see the **Approve** or **Reject** buttons. Dipesh's user MRI is removed from the userIds list in refresh property of this Adaptive Card json in steps 4 and 5. Now, automatic refresh is only triggered for Sowrabh.

    ![Up-to-date role-based views](~/assets/images/bots/up-to-date-views-stage2.png)

7. Now, Sowrabh selects the **Approve** button, which is powered with `Action.Execute`. The bot gets an `adaptiveCard/action` invoke request to which it can return an Adaptive Card in response.
8. The bot triggers a message edit with an updated card, which says Dipesh and Sowrabh have approved the request.
9. Bot message edit does not trigger any automatic refresh. Sowrabh's user MRI is also removed from the userIds list in refresh property of this Adaptive Card json in steps 7 and 8.

    ![Up-to-date views](~/assets/images/bots/up-to-date-views-stage3.png)

## Sample Adaptive Card sent as response of `adaptiveCard/action` and `message edit` for steps 4 and 5

The following code provides an example of an Adaptive Card sent as response of `adaptiveCard/action` and `message edit` for steps 4 and 5:

```JSON
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
    "userIds": ["<Sowrabh's user MRI>"]
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

## Sample Adaptive Card sent as response of `adaptiveCard/action` invoke for step 6

The following code provides an example of an Adaptive Card sent as response of `adaptiveCard/action` invoke through automatic refresh for step 6:

```JSON
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
    "userIds": ["<Sowrabh's user MRI>"]
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

## Sample Adaptive Card sent as response of `adaptiveCard/action` and `message edit` for steps 7 and 8

The following code provides an example of an Adaptive Card sent as response of `adaptiveCard/action` and `message edit` for steps 7 and 8:

```JSON
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
