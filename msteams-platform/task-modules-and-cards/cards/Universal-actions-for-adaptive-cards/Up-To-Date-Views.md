---
title: Up-to-date views
description: Sample for up to date views using Universal Bot
author: surbhigupta12
ms.topic: conceptual
localization_priority: Normal
---

# Up-to-date cards

You can now provide latest information to your users on Adaptive Cards with a combination of refresh and message edits in Teams. With this you are able to update the user-specific views dynamically to its latest state as and when there is a change on your service. For example, in the case of project management or ticketing cards, you can update comments and the status of the task. In case of approvals the latest state is reflected while also providing differentiated information and actions.

For example, a user can create an asset approval request in Teams conversation. Alex creates an approval request and assigns it to Megan and Nestor. The following are the two parts to create the approval request:

* Now user-specific views can be leveraged using the refresh property of the Adaptive Cards.
Using user-specific views one can show a card with **Approve** or **Reject** buttons to a set of users, and show a card without these buttons to other users.

* To keep the card state updated at all times, Teams message edit mechanism can be leveraged. For example, each time there is an approval, bot can trigger a message edit to all users. This bot message edit triggers an `adaptiveCard/action` invoke request for all automatic refresh users, to which the bot can respond with the updated user-specific view card.

For more information, see [how to do a bot message edit](https://docs.microsoft.com/microsoftteams/platform/bots/how-to/update-and-delete-bot-messages?tabs=dotnet#update-cards).

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
      "verb": "acceptRejectView"
    },
    "userIds": ["<Megan's user MRI>", "<Nestor's user MRI>"]
  },
  "body": [
    {
      "type": "TextBlock",
      "text": "Asset Request B12"
    },
    {
      "type": "TextBlock",
      "text": "Submitted by **Alex**"
    },
    {
      "type": "TextBlock",
      "text": "Approval pending from **Megan and Nestor**"
    }
  ]
}
```

## Sample approval card with Approve and Reject buttons

The following code provides an example of an approval card with **Approve** and **Reject** buttons:

```JSON
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.4",
  "refresh": {
    "action": {
      "type": "Action.Execute",
      "title": "Refresh",
      "verb": "acceptRejectView"
    },
    "userIds": ["<Nestor's user MRI>", "<Megan's user MRI>"]
  },
  "body": [
    {
      "type": "TextBlock",
      "text": "Approval Request B12"
    },
    {
      "type": "TextBlock",
      "text": "Submitted by **Alex**"
    },
    {
      "type": "TextBlock",
      "text": "Approval pending from **Megan and Nestor**"
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

* Approval base card: Shown to users who are not part of approvers list and have not yet approved or rejected the request, and are not part of `userIds` list in `refresh` property of the Adaptive Card JSON.
* Approval card with **Approve** or **Reject** buttons: Shown to the users who are part of the approvers list and the `userIds` list in the `refresh` property of the Adaptive Card JSON.

**To send the asset approval request**

1. Alex raises an asset approval request in a Teams conversation and assigns it to Megan and Nestor.
2. Bot sends the approval base card in the conversation.
3. All other users in the conversation see the card sent by the bot. Automatic refresh is triggered for Megan and Nestor, who now see the user-specific view card with **Approve** or **Reject** buttons as their user MRIs are added to the `userIds` list in the `refresh` property of the Adaptive Card.

    ![User-specific views](~/assets/images/adaptive-cards/universal-bots-up-to-date-views-1.png)

4. Nestor selects the **Approve** button which is powered with `Action.Execute`. The bot gets an `adaptiveCard/action` invoke request to which it can return an Adaptive Card in response.
5. The bot triggers a message edit with an updated card which says Nestor has approved the request while Megan's approval is pending.
6. Bot message edit triggers an automatic refresh for Megan and sees the updated user-specific card, which says Nestor has approved the request, but also sees the **Approve** or **Reject** buttons. Nestor's user MRI is removed from the `userIds` list in `refresh` property of this Adaptive Card JSON in steps 4 and 5. Now, automatic refresh is only triggered for Megan.

    ![Up-to-date user-specific views](~/assets/images/adaptive-cards/universal-bots-up-to-date-views-2.png)

7. Now, Megan selects the **Approve** button, which is powered with `Action.Execute`. The bot gets an `adaptiveCard/action` invoke request to which it can return an Adaptive Card in response.
8. The bot triggers a message edit with an updated card, which says Nestor and Megan have approved the request.
9. Bot message edit does not trigger any automatic refresh. Megan's user MRI is also removed from the `userIds` list in `refresh` property of this Adaptive Card JSON in steps 7 and 8.

    ![Up-to-date views](~/assets/images/adaptive-cards/universal-bots-up-to-date-views-3.png)

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
      "verb": "acceptRejectView"
    },
    "userIds": ["<Megan's user MRI>"]
  },
  "body": [
    {
      "type": "TextBlock",
      "text": "Asset Request B12"
    },
    {
      "type": "TextBlock",
      "text": "Submitted by **Alex**"
    },
    {
      "type": "TextBlock",
      "text": "Approval pending from **Megan**"
    },
    {
      "type": "TextBlock",
      "text": "Approved by **Nestor**"
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
      "verb": "acceptRejectView"
    },
    "userIds": ["<Megan's user MRI>"]
  },
  "body": [
    {
      "type": "TextBlock",
      "text": "Approval Request B12"
    },
    {
      "type": "TextBlock",
      "text": "Submitted by **Alex**"
    },
    {
      "type": "TextBlock",
      "text": "Approval pending from **Megan**"
    },
    {
      "type": "TextBlock",
      "text": "Approved by **Nestor**"
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
      "verb": "acceptRejectView"
    },
    "userIds": []
  },
  "body": [
    {
      "type": "TextBlock",
      "text": "Asset Request B12"
    },
    {
      "type": "TextBlock",
      "text": "Submitted by **Alex**"
    },
    {
      "type": "TextBlock",
      "text": "Approved by **Nestor and Megan**"
    }
  ]
}
```
