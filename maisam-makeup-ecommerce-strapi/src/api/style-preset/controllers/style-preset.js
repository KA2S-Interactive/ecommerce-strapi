'use strict';

/** Multi-tenant controller — scopes every op to the authenticated user via the `owner` string (u<userId>). */
const { createCoreController } = require('@strapi/strapi').factories;
const UID = 'api::style-preset.style-preset';

module.exports = createCoreController(UID, ({ strapi }) => ({
  async find(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized();
    ctx.query.filters = { ...(ctx.query.filters || {}), owner: `u${user.id}` };
    return super.find(ctx);
  },
  async findOne(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized();
    const e = await strapi.entityService.findOne(UID, ctx.params.id);
    if (!e || e.owner !== `u${user.id}`) return ctx.notFound();
    return super.findOne(ctx);
  },
  async create(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized();
    ctx.request.body.data = { ...(ctx.request.body.data || {}), owner: `u${user.id}` };
    return super.create(ctx);
  },
  async update(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized();
    const e = await strapi.entityService.findOne(UID, ctx.params.id);
    if (!e || e.owner !== `u${user.id}`) return ctx.notFound();
    ctx.request.body.data = { ...(ctx.request.body.data || {}), owner: `u${user.id}` };
    return super.update(ctx);
  },
  async delete(ctx) {
    const user = ctx.state.user;
    if (!user) return ctx.unauthorized();
    const e = await strapi.entityService.findOne(UID, ctx.params.id);
    if (!e || e.owner !== `u${user.id}`) return ctx.notFound();
    return super.delete(ctx);
  },
}));
