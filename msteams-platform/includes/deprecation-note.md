> [!IMPORTANT]
>
> Microsoft 365 connectors (previously called Office 365 connectors) are nearing deprecation, and the creation of new Microsoft 365 connectors will soon be blocked. For more information on the schedule and how the Workflows app provides a more flexible and secure experience, see [retirement of Microsoft 365 connectors within Microsoft Teams](https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/).
>
> **How can you create a webhook in Teams?**
>
> * To automatically post to a chat or channel when a webhook request is received, use the predefined workflow templates or create a workflow from scratch using the **When a Teams webhook request is received** trigger. For more information, see [post a workflow when a webhook request is received in Microsoft Teams.](https://prod.support.services.microsoft.com/en-us/office/post-a-workflow-when-a-webhook-request-is-received-in-microsoft-teams-8ae491c7-0394-4861-ba59-055e33f75498).
>
> * For more information about the **When a Teams webhook request is received** trigger, see [Microsoft Teams - Webhook.](/connectors/teams#microsoft-teams-webhook)
>
> **ISV Outreach for those with O365 Connectors**
>
> * Create a Power Automate connector: Power Automate is the technology powering the popular "Workflows" app in Teams. It is the scalable and secure method we'll be recommending our customers use to relay information programmatically into and out of Teams. If you go this route we could even help create a workflow template or two for posting alerts from your product to Teams channels. This would make it very simple for users to adopt the new method. For more information, see [Power Automate for enterprise developers, ISVs, and partners.](/power-automate/developer/dev-enterprise-intro)
>
> * Update your Teams app: Another option is invest further in your existing Teams app. For example, you could allow users to set up proactive messages based on trigger events in your system. For more information, see [how bots can post to channels through proactive messages.](../resources/bot-v3/bot-conversations/bots-conversations.md#proactive-messages)
>
> **Coming soon**
>
> * Workflows bot can't post to private channels.
> * Workflows can't post messages using the payload or format of O365 Connectors such as, workflows only supports Adaptive Cards and not the legacy message card format.
> * Currently Workflows is not in GCCH.
> * Workflows are missing some connectors such as, Jenkins, DataDog etc.
> * Ability to create a workflow within another environment but default.
>
> **Limitations**
>
> * Moving users to premium connectors.
> * Workflows are tied to individuals while O365 Connectors are tied to the Teams team/channel.
