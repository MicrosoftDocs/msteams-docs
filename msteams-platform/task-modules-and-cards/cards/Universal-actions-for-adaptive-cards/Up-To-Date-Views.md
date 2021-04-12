---
title: Up to date views
description: Sample for up to date views using Universal Bot
ms.topic: conceptual
---

## Up to date views
Up to ate views are now powered with a combination of Universal bots and bot fanouts in Teams.

Example: A user creates a poll in a Teams conversation. 

Part 1: Now role based views can be leveraged by using refresh property of the adaptive cards.
Using role based views one can show base poll card (with question, options, submit vote button) and show summary card to different users depending on their role.

Part 2: To keep the summary view updated an all times, bot fanout mechanism can be leveraged.
Each time there is vote from an user, bot can trigger a fanout to all users. This bot fanout would trigger an automatic refresh request for all users, to which the bot can respond with the latest updated role based card.

Role 1: Poll base card - Shown to users who have not responded to the poll or users who have voted but are not part of the userIds property in adaptive card json.
Role 2: Summary card - Shown to users who have voted and are in userIds property in the adaptive card json.

**Sample Poll base card JSON**
```
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.4",
  "refresh": {
    "action": {
      "type": "Action.Execute",
      "title": "Refresh",
      "verb": "roleBasedViewCardRefresh"
    },
    "userIds": ["userId1", "userId2", "userId3", "userId4", "userId5"]
  },
  "body": [
    {
      "type": "TextBlock",
      "text": "Poll 1234"
    },
    {
      "type": "Input.ChoiceSet",
      "id": "choice",
      "style": "expanded",
      "isMultiSelect": false,
      "label": "What is your favorite color",
      "choices": [
        {
          "title": "Red",
          "value": "1"
        },
        {
          "title": "Blue",
          "value": "2"
        }
      ]
    }
  ],
  "actions": [
    {
      "type": "Action.Execute",
      "title": "Submit Vote",
      "verb": "vote",
      "data": {
            "poll info": "<poll-info>"
      }
    }
  ]
}
```

**Sample Poll summary card JSON**
```
{
  "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
  "type": "AdaptiveCard",
  "version": "1.4",
  "refresh": {
    "action": {
      "type": "Action.Execute",
      "title": "Refresh",
      "verb": "roleBasedViewCardRefresh"
    },
    "userIds": ["userId1", "userId2", "userId3", "userId4", "userId5"]
  },
  "body": [
    {
      "type": "TextBlock",
      "text": "Poll 1234"
    },
    {
      "type": "TextBlock",
      "text": "Summary View"
    },
    {
      "type": "TextBlock",
      "text": "Red: 100%"
    },
    {
      "type": "TextBlock",
      "text": "Blue: 0%"
    }
  ]
}
```

1. Poll base card is sent to a conversation.
2. Automatic refresh would be triggered for all users which are present in userIds property.
3. Same base card is returned in response of the automatic refresh to all users since no one has voted.
4. User 1 votes with option 'Red' on the poll.
5. User 1 gets his role based view card in response, in this case the summary view (Red 100%, Blue 0%).
6. Bot initiates a fanout to all users with base card. 
7. Automatic refresh is triggered for all users which are present in userIds property.
8. User 1 gets the up to date summary card as role based view. User 2, user 3, user 4, user 5 get base card as role based view.
9. Now, user 2 votes with option 'Blue' on the poll.
10. User 2 gets his role based view card in response, in this case the summary view (Red 50%, Blue 50%).
11. Bot initiates a fanout to all users with base card. (User 1 still sees summary view with Red 100%, Blue 0%)
12. Automatic refresh is triggered for all users which are present in userIds property.
13. User 1 and user 2 get the up to date summary card as role based view (Red 50%, Blue 50%). User 3, user 4, user 5 get base card as role based view.
14. Now, user 6 votes with option 'Blue' on the poll.
15. User 6 gets his role based view card in response, in this case the poll base card. (since user 6 is not part of userIds list)
16. Bot initiates a fanout to all users with base card. (User 1 and User 2 still sees summary view with Red 50%, Blue 50%)
17. Automatic refresh is triggered for all users which are present in userIds property. 
18. User 1 and user 2 get the up to date summary card as role based view (Red 33%, Blue 67%). User 3, user 4, user 5 get base card as role based view.

Note: When a user votes, bot developer can keep on adding the user's user Id to the userIds property inside the refresh section of the adaptive card json which is sends in response of Action.Execute and then bot fanout (Step #5 and #6, Step #10 and #11, Step #15 and #16). Hence user whose user id is added will trigger automatic refresh request on bot fanout, to which bot can return an up to date summary view. The users who submit vote on the poll hence get poll summary view which remains up to date on every vote.