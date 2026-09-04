
# Single-tenant and multi-tenant agents

The configuration model that determines whether a Teams agent can be used in multiple tenants has evolved over time. This article reflects the current model and supersedes any descriptions that may be found in older documentation and other online resources.

A *multi-tenant agent* is a Teams agent that can be installed and used in Entra tenants other than the one where its Entra ID app registration resides. Agents that need to be installed in other tenants, including all agents distributed publicly via the Teams app store, must be configured as multi-tenant. Most workflows for creating and registering an agent result in multi-tenant configuration by default.

## Verify and configure agent tenancy

The configuration property that determines whether an agent is eligible for multi-tenant use is the `signInAudience` property of the Entra ID app registration linked to the agent's Bot Connector registration. This property is displayed in some contexts as its **Supported account types**.

To be eligible for multi-tenant usage, the app registration's `signInAudience` must be set to `AzureADMultipleOrgs` (**Supported account types** displays as **Multiple Entra ID tenants** or **Multiple organizations** depending on the context). A value of `AzureADMyOrg` indicates that the app registration can only be used in the tenant where it resides.

`signInAudience` determines whether new service principals for the app registration can be created in external tenants, and whether users in those tenants can authenticate to the application.

## Implementation and security considerations

Agents intended to be used only in one tenant, or in a known set of tenants, should always validate the tenant ID of incoming activity payloads in their runtime code. These agents should be distributed only via organizational app catalogs, not the Teams store.

When appropriate, configuring an agent's app registration to be single tenant (setting `signInAudience` to `AzureADMyOrg`; **Supported account types** is displayed as **My organization only** or **Single tenant only**) or setting [sign in audience restrictions](/graph/api/resources/allowedtenantsaudience) on a multi-tenant app registration are valid security measures, but are not a substitute for performing tenant validation in code.

As with all multi-tenant applications, developers of multi-tenant agents are responsible for enforcing strong tenant boundaries. All stored data should be strongly associated with its tenant, and users in one tenant should not be able to access data stored for another tenant.

## Azure AI Bot Service resource bot type

An Azure AI Bot Service resource configured with a **Bot type** of **Single Tenant** (shown as its **Type of App** or `msaAppType` in some contexts) is **not** restricted to single-tenant use. The naming of this configuration value is based on a legacy configuration model and is retained for compatibility. A value of **Single Tenant** for this property only indicates that that the Entra ID identity linked to the resource is an app registration, not a user-assigned managed identity. The `signInAudience` of the app registration determines an agent's eligibility for use in tenants other than the one where the linked app registration resides.

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
