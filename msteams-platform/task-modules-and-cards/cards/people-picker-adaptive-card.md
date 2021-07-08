---
title: People Picker in Adaptive Cards
description: Describes how to use the People Picker control in Adaptive Cards
localization_priority: Normal
keywords: Adaptive Cards People Picker
ms.topic: reference
ms.author: surbhigupta
---

# People Picker in Adaptive Cards

You can add a People Picker as an input control to your Adaptive Card through which users can search for people and select them. You can search for people within the context of the conversation, such as a chat, channel or an organization that the card is sent in. The people picker supports picking multiple users, pre-populate the field with selected users and works across Adaptive Card surfaces like chats, channels, task modules and tabs. 

For more information on Adaptive Cards, see [Cards Reference](cards-reference.md).

## Popular scenarios for People Picker in Adaptive Cards

The following examples show how the People Picker in Adaptive Cards is used in different scenarios:

* Approval based scenarios: To request, assign and reassign the approval to the intended people based on the requirement.
* Incident management: To track incidents and notify, assign and reassign the appropriate person for immediate action. 
* Project management: To assign tickets/bugs to particular users
* User lookup: To look for people in the organization

## Understand how People Picker works

# [Mobile](#tab/mobile)

People Picker is supported on the iOS and Android mobile clients. Selecting People Picker on mobile launches a new experience from which a search is performed. The search experience is similar to other people selection experience across mobile, such as adding a person to a chat or channel.

![People Picker on Mobile](../../assets/images/cards/mobilepp.gif)

# [Desktop](#tab/desktop)

People Picker is supported in web and desktop client. While searching on the web involves an inline typing experience.

![People Picker on Desktop](../../assets/images/cards/desktoppp.gif)
In the above scenario, Robert receives a ticket for a sprint planning task in a channel. He realizes that he's not the correct assignee for the task and hits reassign where he sees the people picker field pre-populated with his name. He removes his name and selects Mona and Robin for the task. He then reassigns the task which sends the information back to the bot to update the card and notify the appropriate users.

## Implement People Picker

People Picker is implemented as an extension of the [Input.ChoiceSet](https://adaptivecards.io/explorer/Input.ChoiceSet.html) control. The control includes the following:
* Dropdown, such as an expanded selection.
* Radio button, such as single selection.
* Check boxes, such as multiple selection.  
> [!NOTE]
> The `Input.ChoiceSet` control is based on the `style` and `isMultiSelect` properties.  

### Update schema

The following properties are the new additions to the `Input.ChoiceSet` schema to enable a People Picker experience on the card.  

#### Input.ChoiceSet control

|Property |Type |Required |Description |
|----|----|----|----|
|**choices.data** |**Data.Query** |No |Enables dynamic auto complete as the user types, by fetching results from the dataset specified. |

#### Data.Query

|Property |Type |Required |Description |
|--|--|--|--|
|**dataset** |string |Yes |The type of data that must be fetched dynamically.|   

#### dataset
The following predefined values are provided as a **dataset** for people picker:   

|dataset|Search Scope
|--|--|
|**graph.microsoft.com/users** |Search all of the organization's members.|
|**graph.microsoft.com/users?scope=currentContext** |Search within the members of the current conversation, such as chat or channel in which the particular card is sent in.|  

<br> 

> [!NOTE]
> Currently, the search functionality for all the members across the organization is supported in 1:1 chats with bots, Adaptive Card task modules and tabs only. It is not supported in other 1:1 chats, group chats or channels.  

### Example
The code example for creating a People Picker with organization search is as follows:

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

The following image depicts People Picker Adaptive Card with organization search:

![People Picker Org Search](../../assets/images/cards/peoplepicker-org-search.png)

>[!NOTE]
> To enable search within a conversation's member list, use the appropriate dataset defined in the [dataset](#dataset) table. `isMultiSelect` property is used to enable selecting multiple people in the control. It is set to false by default and allows to select one person only.

#### Data Submission
When a `Submit Action` is performed on the Adaptive Card, all the inputs provided in the card is sent back to the bot through an `invoke`. This `Submit Action` is similar to other `Input control` in Adaptive Cards. The `invoke` payload consists of a list of input IDs to their corresponding values.  

In People Picker, when a person is selected in the control, the `AAD ID` of the person is the value sent back. The `AAD ID` is a string and uniquely identifies a user in a directory.

The format of the value submitted to the bot depends on the value of the `isMultiSelect` property:

|value of `isMultiSelect`|Format|
|--|--|
|false _(single select)_|The `AAD ID` of the selected user as a string.|
|true _(multi select)_|A string composed of all the `AAD ID`s of the selected users concatenated with a 'comma'.|  

#### Preselection of People
People Picker supports preselection of people in the control when creating and sending an Adaptive Card.  
`Input.ChoiceSet` supports the `value` property which is used to preselect a person. The format of this `value` property is the same as the submitted value format discussed in data submission section.  
To preselect a person in the control, specify the `AAD ID` of the person as the `value`. To preselect multiple people, such as `isMultiSelect` is `true`, specify a comma separated string of `AAD ID`s.

#### Static choices
The static choices support scenarios where custom profiles must be inserted into the predefined datasets.
`Input.ChoiceSet` supports specifying `choices` statically in the json. The static choice is used to create the choices from which the user can select.
<br><br>
Static `choices` are used in conjunction with dynamic datasets. 
<br><br>
A choice basically consists of a `title` and a `value`. When used along with a People Picker, these choices are translated to people profiles which have the `title` as the name and `value` as the identifier. These custom profiles are also part of the search results when the search query matches the given `title`.   

