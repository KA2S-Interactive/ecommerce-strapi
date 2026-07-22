import type { Core } from '@strapi/strapi';

const PERMISSIONS = {
  authenticated: [
    'api::store.store.create',
    'api::store.store.find',
    'api::store.store.findOne',
    'api::store.store.update',
    'api::social-connection.social-connection.create',
    'api::social-connection.social-connection.find',
    'api::social-connection.social-connection.findOne',
    'api::social-connection.social-connection.update',
    'api::social-connection.social-connection.delete',
    'api::post-setting.post-setting.find',
    'api::post-setting.post-setting.create',
    'api::post-setting.post-setting.update',
    'api::autopilot-plan.autopilot-plan.create',
    'api::autopilot-plan.autopilot-plan.find',
    'api::autopilot-plan.autopilot-plan.findOne',
    'api::autopilot-plan.autopilot-plan.update',
    'api::plan-occurrence.plan-occurrence.find',
    'api::plan-occurrence.plan-occurrence.findOne',
    'api::published-post.published-post.find',
    'api::published-post.published-post.findOne',
    'api::ad-campaign.ad-campaign.find',
    'api::ad-campaign.ad-campaign.findOne',
    // Grow Studio cross-device collections (owner-scoped in their controllers).
    'api::grow-workspace.grow-workspace.find',
    'api::grow-workspace.grow-workspace.findOne',
    'api::grow-workspace.grow-workspace.create',
    'api::grow-workspace.grow-workspace.update',
    'api::grow-workspace.grow-workspace.delete',
    'api::brand-profile.brand-profile.find',
    'api::brand-profile.brand-profile.findOne',
    'api::brand-profile.brand-profile.create',
    'api::brand-profile.brand-profile.update',
    'api::brand-profile.brand-profile.delete',
    'api::runway-workflow.runway-workflow.find',
    'api::runway-workflow.runway-workflow.findOne',
    'api::runway-workflow.runway-workflow.create',
    'api::runway-workflow.runway-workflow.update',
    'api::runway-workflow.runway-workflow.delete',
    'api::account-setting.account-setting.find',
    'api::account-setting.account-setting.findOne',
    'api::account-setting.account-setting.create',
    'api::account-setting.account-setting.update',
    'api::account-setting.account-setting.delete',
    'api::style-preset.style-preset.find',
    'api::style-preset.style-preset.findOne',
    'api::style-preset.style-preset.create',
    'api::style-preset.style-preset.update',
    'api::style-preset.style-preset.delete',
    'api::content-plan.content-plan.find',
    'api::content-plan.content-plan.findOne',
    'api::content-plan.content-plan.create',
    'api::content-plan.content-plan.update',
    'api::content-plan.content-plan.delete',
    'api::plan-item.plan-item.find',
    'api::plan-item.plan-item.findOne',
    'api::plan-item.plan-item.create',
    'api::plan-item.plan-item.update',
    'api::plan-item.plan-item.delete',
    'api::creative.creative.find',
    'api::creative.creative.findOne',
    'api::creative.creative.create',
    'api::creative.creative.update',
    'api::creative.creative.delete',
    'api::performance-snapshot.performance-snapshot.find',
    'api::performance-snapshot.performance-snapshot.findOne',
    'api::performance-snapshot.performance-snapshot.create',
    'api::performance-snapshot.performance-snapshot.update',
    'api::performance-snapshot.performance-snapshot.delete',
    'plugin::users-permissions.user.me',
    'plugin::users-permissions.user.update',
    'plugin::upload.content-api.upload',
  ],
  public: [] as string[],
};

/**
 * API-token permissions (Settings → API Tokens) must be granted manually:
 * - social-connection: find, update, delete
 * - payment-order: create
 * - autopilot-plan: find, update
 * - plan-occurrence: find, update, create
 * - published-post: create, find
 * - ad-campaign: create, update
 */

async function ensureRolePermissions(
  strapi: Core.Strapi,
  roleType: 'authenticated' | 'public',
  actions: string[]
) {
  const role = await strapi.db.query('plugin::users-permissions.role').findOne({
    where: { type: roleType },
  });

  if (!role) {
    strapi.log.warn(`[permissions] Role "${roleType}" not found`);
    return;
  }

  const permissionQuery = strapi.db.query('plugin::users-permissions.permission');

  for (const action of actions) {
    const existing = await permissionQuery.findOne({
      where: { action, role: role.id },
    });

    if (!existing) {
      await permissionQuery.create({
        data: { action, role: role.id },
      });
      strapi.log.info(`[permissions] Granted ${action} to ${roleType}`);
    }
  }
}

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensureRolePermissions(strapi, 'authenticated', PERMISSIONS.authenticated);
    await ensureRolePermissions(strapi, 'public', PERMISSIONS.public);
  },
};
