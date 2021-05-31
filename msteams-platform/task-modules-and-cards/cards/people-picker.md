---
title: People Picker in Adaptive Cards
description: Describes how to use the People Picker control in Adaptive Cards
localization_priority: Normal
keywords: Adaptive Cards People Picker
ms.topic: reference
ms.author: surbhigupta
---

# People Picker in Adaptive Cards

You can add a People Picker as an input control to your Adaptive Card through which users can search for people and pick them. You can search within the context of the conversation, such as a chat, channel or an organization that the card is sent in. 

For more information about Adaptive Cards, see [Cards Reference](cards-reference.md).

## Advantages of People Picker in Adaptive Cards

Following examples show how the People Picker in Adaptive Cards is used in different scenarios:

* People Picker in Adaptive Cards is used in sales department to request, assign and re-assign the approval to suitable people based on the requirement.
* It is used in incident management app on Teams to track incidents and notify them to the correct person for fast action. 
* It is used in technical support to resolve issues, such as VPN connectivity. In this case, the person can raise an issue ticket with a Help bot and send it to a group with experts who can help with this issue.

The following image shows the initial card that is sent out: 
 
![People Picker Base Card](../../assets/images/cards/peoplepicker-base-card.png)  

The issue is initially unassigned. Experts in the group can view the card, understand the employee's issue and search for the correct person to assign the issue. The following image shows the issue assignment to the correct person:

![People Picker Search Experience](../../assets/images/cards/peoplepicker-card-search.png)  

After finding the correct person to resolve the issue, select the person's name in the search results. It populates the picker control as follows:

![People Picker Name Selected](../../assets/images/cards/peoplepicker-name-selected.png) 

After selection, select **Assign**. This sends the information back to the bot for further processing and notifying the selected person of the issue.  

## Overview

Given a set of `choices`, an [Input.ChoiceSet](https://adaptivecards.io/explorer/Input.ChoiceSet.html) control can be used in multiple forms like a dropdown, expanded single selection(radio buttons) or as a multi select control(check boxes) based on the `style` and `isMultiSelect` props.  

People Picker is implemented as an extension of the Input.ChoiceSet control.  

### Updates to the Input.ChoiceSet schema

The following are the new additions to the Input.ChoiceSet schema to enable a People Picker experience on the card.  

#### Input.Choiceset

|Property |Type |Required |Description |
|--|--|--|--|
|**choices.data** |**Data.Query** |No |Enables dynamic auto-complete as the user types, by fetching results from the dataset specified |

#### Data.Query

|Property |Type |Required |Description |
|--|--|--|--|
|**dataset** |string |Yes |The type of data that should be fetched dynamically|   

#### dataset
The following are the pre-defined values that can be provided as a **dataset** for people picker:   

|dataset|Search Scope
|--|--|
|**graph.microsoft.com/users** |Search all of the organization's members|
|**graph.microsoft.com/users?scope=currentContext** |Search within the members of the current conversation (chat/channel) in which the particular card is sent in|  

<br> 

> [!NOTE]
> Currently, search for all the members across the organization is supported in 1:1 chats with bots, task modules with Adaptive Card and tabs only. It is not supported in other 1:1 chats, group chats or channels.  

### Example
Following is an example code for creating a People Picker with Organization search enabled:

```json 
{
    "type": "AdaptiveCard",
    "body": [
        {
            "type": "TextBlock",
            "size": "Medium",
            "weight": "Bolder",
            "text": "People Picker with Org search enabled"
        },
        {
            "type": "Input.ChoiceSet",
            "choices": [],
            "choices.data": {
                "type": "Data.Query",
                "dataset": "graph.microsoft.com/users"
            },
            "id": "people-picker",
            "isMultiSelect": true
        },
        {
            "type": "ActionSet",
            "actions": [
                {
                    "type": "Action.Submit",
                    "title": "Submit"
                }
            ]
        }
    ],
    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    "version": "1.2"
}
```  

To enable search within a conversation's member list, use the appropriate dataset defined in the following table. `isMultiSelect` property is used to enable selecting multiple people in the control. It is set to false by default and allows to select one person only.

![People Picker Org Search](../../assets/images/cards/peoplepicker-org-search.png)

#### Data Submission
Like every other Input control in Adaptive Cards, when a Submit Action is performed on the card, all the inputs provided in the card is sent back to the bot via an invoke. The invoke payload consists of a dictionary of input IDs to their corresponding values.  

In the case of People Picker, when a person is selected in the control, on submission, the `AAD ID` of the person is the value that is sent back. The `AAD ID` is a string(GUID) and uniquely identifies a user in a directory.

The format of the value submitted to the bot depends on the value of the `isMultiSelect` property:

|value of `isMultiSelect`|Format|
|--|--|
|false _(single select)_|The `AAD ID` of the selected user as a string|
|true _(multi select)_|A string composed of all the `AAD ID`s of the selected users concantenated with a 'comma'|  

#### Pre-Selection of People
People Picker supports pre-selection of people in the control when creating and sending an Adaptive Card.  
Input.ChoiceSet supports the `value` property which can be used to pre-select a person. The format of this `value` property is the same as the submitted value format discussed above.  
To pre-select a person in the control, specify the `AAD ID` of the person as the `value`. To pre-select multiple people (`isMultiSelect` should be _true_), specify a comma separated string of `AAD ID`s.

#### Static Choices
Input.ChoicSet supports specifying `choices` statically in the json. Generally, these are used to create the choices from which the user can pick.
<br><br>
Static `choices` can be used in conjunction with dynamic datasets. 
<br><br>
A choice basically consists of a `title` and a `value`. When used along with a People Picker, these choices are translated to people profiles which have the `title` as the name and `value` as the identifier. On searching, these custom profiles are also part of the results when the search query matches the given `title`.   
This enables developers to support scenarios where custom profiles need to be inserted into the pre-defined datasets.

## Mobile (iOS and Android)

People Picker is also supported on the iOS and Android clients along with the Web and Desktop client.   
While searching on the web involves an inline typing experience, tapping on a people picker on mobile launches a new experience from which a search can be performed. This search experience is similar to other people selection experience across mobile like adding a person to a chat/channel.

![People Picker on Mobile](../../assets/images/cards/people-picker-mobile-experience.gif)
