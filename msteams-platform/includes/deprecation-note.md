> [!IMPORTANT]
>
> Office 365 Connectors in Teams, including connector-based Incoming Webhooks, were retired in May 2026. The retirement rolled out from May 18 to May 22, 2026. To receive webhook requests and post messages in Teams, use the Workflows app. For details, see [Retirement of Office 365 connectors within Microsoft Teams](https://devblogs.microsoft.com/microsoft365dev/retirement-of-office-365-connectors-within-microsoft-teams/).
>
> **How can you create a webhook in Teams**?
>
> * To automatically post to a chat or channel when a webhook request is received, use the predefined workflow templates or create a workflow from scratch using the **When a Teams webhook request is received** trigger. For more information, see [Send messages in Teams using incoming webhooks](https://support.microsoft.com/en-us/office/send-messages-in-teams-using-incoming-webhooks-323660ec-12ca-40b1-a1d3-a3df47e808c4).
> * For more information about the **When a Teams webhook request is received** trigger, see [Microsoft Teams - Webhook](/connectors/teams#microsoft-teams-webhook).
>
> **If you've already built Office 365 Connectors**:
>
> * Create a Power Automate connector: Power Automate enhances the widely used Workflows apps in Teams. It's the scalable and secure approach to transmit data programmatically into and out of Teams. If you adopt this method, you can create workflow templates for posting alerts from your product to Teams channels. This approach simplifies user adoption of the new method. For more information, see [Power Automate for enterprise developers, ISVs, and partners](/power-automate/developer/dev-enterprise-intro).
> * Update your Teams app: You can enhance your current Teams app. For example, you can enable users to set up proactive messages based on trigger events within your system. For more information, see [how bots can post to channels through proactive messages](../bots/how-to/conversations/send-proactive-messages.md#send-the-message).
>
> **Known issues**
>
> * Workflows webhooks support private channels. You can configure them through the Power Automate portal or the Workflows app in Teams.
> * Workflows webhooks support Adaptive Card and MessageCard payloads. MessageCard payloads render content but don't support interactive HTTP POST action buttons. For interactive cards, use Adaptive Cards and configure the workflow to handle card responses.
>
> **Limitations**
>
> Workflows are linked only to specific users (referred to as owners of the workflow) and not to a Teams team or channel. Workflows can become orphan flows in the absence of an owner if no co-owners assigned. To maintain continuity in the business process automated by the flow, admins can add one or more co-owners and grant them full control over the workflow. They can also add authentication for connections, if any, and enable the flow if it has been disabled. For more information, see [manage orphan flows](/troubleshoot/power-platform/power-automate/flow-management/manage-orphan-flow-when-owner-leaves-org).
