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
> **If you've already built O365 Connectors**
>
> * Create a Power Automate connector: Power Automate enhances the widely used **Workflows** apps in Teams. It's the scalable and secure approach to transmit data programmatically into and out of Teams. If you adopt this method, you can create one or two workflow templates for posting alerts from your product to Teams channels. This approach simplifies user adoption of the new method. For more information, see [Power Automate for enterprise developers, ISVs, and partners.](/power-automate/developer/dev-enterprise-intro)
>
> * Update your Teams app: You can enhance your current Teams app. For example, you can enable users to set up proactive messages based on trigger events within your system. For more information, see [how bots can post to channels through proactive messages.](../bots/how-to/conversations/send-proactive-messages.md#send-the-message)
>
> **Known issues**
>
> * Workflows app can't post in private channels.
> * Workflows can't post messages using the payload or format of O365 Connectors. Workflows support only Adaptive Cards and don't support the older message card format. For more information, see [how to convert connector message card format to Adaptive Card.](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/tools/message-card-to-ac-transformation)
> * Workflows aren't available in Government community cloud (GCC) High.
> * Workflows don't include connectors such as, Jenkins, DataDog, and so on.
> * Workflows can only be created in your default environment.
>
> **Limitations**
>
> * Workflows don't allow you to upgrade users to premium connectors.
> * Workflows are linked only to specific users and not to Teams team or channel.
