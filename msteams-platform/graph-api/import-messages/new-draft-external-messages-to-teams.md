
# Use Microsoft Graph to Import Messages from External Platforms to Teams

You can use Microsoft Graph to migrate users' existing message history and data from an external system into a Teams channel. This enables users to continue conversations without interruption by recreating the messaging hierarchy from a third-party platform directly within Teams.

> [!NOTE]
> In the future, Microsoft may require you or your customers to pay extra fees based on the amount of data imported.

## API Migration Workflow
Use the step-by-step migration flow to ensure a seamless transition of historical messages in both existing and newly created channels or chats by enabling migration mode.

## Step-by-Step Migration Flow
### Step 1: Create or select a channel/chat
You can either create a new channel or chat in a Team or use an existing channel or chat. <insert cross reference on creating a new channel> hyperlink

> [!NOTE]
> All APIs listed in the following sections require the `Teamswork.Migrate.All` permission in the application context. Delegated authentication isn't supported.

### Step 2: Use startMigration API to start channel migration 
* The startMigration API enables migration mode on existing Teams channels, allowing import of historical messages. Previously, import operations were restricted to newly created standard channels in an empty state. Refer [Import third-party platform messages to Teams using Microsoft Graph](#https://learn.microsoft.com/en-us/microsoftteams/platform/graph-api/import-messages/import-external-messages-to-teams).

* You can define a minimum timestamp for messages to be migrated. The provided timestamp must be older than the channel’s current createdDateTime and will replace it during migration.

* Supported Channels: Existing Shared, Private and Public

#### HTTP Request

```http
POST  /teams/{team-id}/channels/{channel-id}/startMigration
{
  INSERT ACTUAL CODE
}
```
> [!NOTE]
> * You can optionally provide a request body to specify the minimum timestamp for the messages to be migrated.
> * If no request body is provided, the API uses the current date and time as the minimum timestamp.
You can optionally provide a request body to specify the minimum timestamp for the messages to be migrated.
> * If no request body is provided, the API uses the current date and time as the minimum timestamp.
> - `ConversationCreationDateTime` must be:
>   - Greater than the minimum value for `DateTimeOffset`.
>   - Less than the current value of the channel's `CreatedDateTime`.

