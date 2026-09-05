
# Single-tenant and multi-tenant agents

The configuration model that determines whether a Teams agent can be used in multiple Entra tenants has evolved over time. This article reflects the current model and supersedes any descriptions that might be found in older documentation and other online resources.

The Bot Connector registration of every Teams agent has a 1:1 association with an Entra ID app registration, which resides in a tenant controlled by its developer. A *single-tenant agent* is configured to only allow installation and use in the app registration's tenant. A *multi-tenant agent* is not restricted in that way.

Most workflows for creating and registering an agent result in multi-tenant configuration by default.

## Configure and verify agent configuration

To determine an agent's tenancy, examine the `signInAudience` property of the Entra ID app registration linked to its Bot Connector registration. In some contexts, this property is displayed as its **Supported account types**. A `signInAudience` value of `AzureADMultipleOrgs` (**Supported account types** displays as **Multiple Entra ID tenants** or **Multiple organizations**) indicates a multi-tenant agent. A value of `AzureADMyOrg` (**Supported account types** displays as **My organization only** or **Single tenant only**) indicates a single-tenant agent.

`signInAudience` can be changed after the app registration is created, but should be confirmed by the time development is complete and remain unchanged once the agent is published.

## Implementation and security considerations

Agents intended to be used only in one tenant, or in a known set of tenants, should always validate the tenant ID of incoming activity payloads in their runtime code. These agents should be distributed only via organizational app catalogs, not the Teams store.

`signInAudience` determines whether new service principals for the app registration can be created in external tenants, and whether users in those tenants can authenticate to the application. When appropriate, setting `signInAudience` to `AzureADMyOrg` or configuring [sign in audience restrictions](/graph/api/resources/allowedtenantsaudience) on a multi-tenant app registration are valid security measures, but are not a substitute for performing tenant validation in code.

As with all multi-tenant applications, developers of multi-tenant agents are responsible for enforcing tenant boundaries. All stored data should be strongly associated with its tenant, and users in one tenant should not be able to access data associated with another.

## Azure AI Bot Service resource bot type

Developers with agents that use an Azure AI Bot Service resource instead of a standalone Bot Connector registration might notice that their Bot Service resources appears to be configured as **Single Tenant**.

Azure AI Bot Service resource configuration includes a property called `msaAppType`, often referred to as the resource's **Bot type** or **Type of App**. A value of `singleTenant` (**Single Tenant**) for this property **does not** determine whether an agent is single-tenant or multi-tenant.

This value's name is based on a legacy configuration model and is retained for compatibility. `singleTenant` indicates only that that the associated identity linked to the resource is an app registration, not a user-assigned managed identity. The `signInAudience` of the app registration determines an agent's eligibility for use in tenants other than the one where the linked app registration resides.

Azure AI Bot Service resources with a **Bot type** of **User-Assigned Managed Identity** are

Every Azure AI Bot Service is permanently and uniquely associated with an Entra ID identity. Typically, that identity is an app registration, but Bot Service also permits an Azure user-assigned managed identity to be used.

Azure AI Bot Service resources are each configured with a reference to an Entra ID application identity. The `msaAppType` property of a Bot Service resource (shown as its **Type of App** or **Bot Type** in some interfaces) determines what kind of identity.

UserAssignedMSI

 supports two different kinds of identity: Entra ID app registration and Azure user-assigned managed identity.

> [!TIP]
> This section explains concepts associated with legacy configuration options, and does not apply to new agent creation.
>
> If you creating a new Azure AI Bot Service resource, configure it as **Single Tenant**:
>
> - Creating or migrating to an Azure AI Bot Service resource using the Teams developer CLI will always result in the Single Tenant configuration
> - If creating via Azure portal: for **Type of App**, select **Single Tenant**
> - If creating via Azure resource manager: for `msaAppType`, specify `SingleTenant`
>
> Configuring the resource as **Single Tenant** does not restrict your agent to operating in your developer tenant.

**When creating a new Azure AI Bot Service resource,**

CLI only creates Single Tenant

This is different from the app registration single or multi tenant

msaAppType

TODO a bit about "Single Tenant" vs "UAMI", the latter requires Azure hosting and is less flexible, I think we consider it legacy?
