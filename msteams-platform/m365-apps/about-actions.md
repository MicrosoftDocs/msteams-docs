---
title: Actions overview
description: In this article, learn more about the function of Actions and its use cases. 
ms.date: 10/11/2023
ms.author: mosdevdocs
author: mobajemu
ms.topic: Conceptual
ms.subservice: m365apps
---

# Actions

Building Actions give developers the power to enhance their users' productivity by streamlining task completion and minimizing context switching across various M365 applications. 
This feature benefits users by enabling them to accomplish tasks more efficiently and enhances the visibility and user engagement of your app by seamlessly integrating it into their workflow.

This empowers users to take immediate action on content files through your app, expanding the range of interactions users can have with their content.  Actions is currently supported in Microsoft365 App on web and desktop
   
 [Screenshot or Gif of Actions in action]  

## What is an Action?     
 Actions aim to integrate your app into your user's workflow by enabling easy discoverability and seamless interaction with their content. By directing users to your app with their intent and contextual content, Actions enable efficient task completion. This integration not only enhances the visibility and engagement of your app but also offers these benefits with minimal development effort.   
  
## Understand how Actions work   

An Action is built using a combination of Intent + Object + Handler. When a user intends to accomplish a task, it can be represented as intent + object, with the intent describing the user's desired action, and the object, the function to be performed.

As a developer, your role is to receive the user's intent + object input and construct the corresponding handler that facilitates task completion for the users.   
To build an Action, you will define the intent, object, and handler of your actions in the manifest. And in your handler, use Teams JS V2 to receive the Action information to create a seamless user experience for performing users specific tasks.  

### Intent
 
"intent" is the objective a user wants to perform or achieve. User intent is typically represented by a verb, such as "open," or “add to”. This "intent" enables the M365 platform to display the Actions in locations that most align with the user's needs and intentions. This includes but not limited to, where Actions show up and how Actions are grouped or ordered.    
We currently enable three main intents for Actions: “open”, “addTo”, and “custom”. With the "custom" intent, developers have the flexibility to build tailored Actions to fulfill any user task.  

### Object

 "object" is the file on which the user wants to perform an action on. Currently, Actions can be triggered on content objects, files that has an extension, like Word, PowerPoint, Excel, PDF, images, etc, which reside in OneDrive and SharePoint that are accessible through Microsoft Graph.

### Handlers

A "handler" is the method or mechanism to fulfill the user's intent and perform the desired action on the specified object. It is responsible for implementing the logic and functionality of the Action, ensuring a seamless and meaningful user experience.

To support your users in the most meaningful way, we offer multiple types of handlers that you can build. You have the choice to direct users to the app’s page or enable them to complete tasks within a dialog.    

Currently supported handler:

#### openPage

This handler allows you to directly guide users to your app's personal tab. By using the openPage handler you can drive users to your app's dedicated pages.

Scenario 1: Action opens a dialog   
1a: She sees the latest Sales report for a supplier, 'Tokyo Trader,' and wants to add it as an attachment in the supplier management system app built by Northwind Traders.   Right-clicking on the Word document, she chooses the Action 'Add to supplier' built by Northwind Traders.  
1b: A dialog pops up where she selects 'Tokyo Traders' and then clicks 'Add'. She is able to add the attachment quickly, without opening the document or app.  

#### openDialog

This handler directs users to a dialog, offering a dedicated and contextualized interface for interacting with your app's features without opening the full app. This ensures a focused and efficient workflow, allowing users to complete tasks seamlessly within their current context.

Scenario 2: Action opens page  
2a: On the same page, she notices the 'Q2 Top suppliers' Excel sheet and wants to see which suppliers she works with are on this list.   She right-clicks on the Excel file, then clicks on the Action 'Related suppliers'.  
2b: The Northwind app opens, displaying the list of suppliers filtered to show only those that appear in the document.  This saves her time opening up the app and the Excel file and checking each item manually.  

There are future plans to introduce additional types of handlers.
 
## User scenarios   
When a user wants to complete a task on a piece of content, an Action can surface your app right when they need it. Let’s walk through a user scenario of how users might interact with your app through Actions you develop.  
  
## Customer scenarios walk through  
Background: Kat is a supervisor at Northwind Traders with limited time for focused work. She starts her day in the Microsoft 365 app, where she can easily access all of her content.  






 
   
 
 
