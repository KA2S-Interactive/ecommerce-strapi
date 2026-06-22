import { factories } from '@strapi/strapi';
import {
  assignOwnerOnCreate,
  isJwtUser,
  ownerDocumentFilter,
  scopeQueryToOwner,
} from './owner-scope';

type OwnerScopeOptions = {
  readOnly?: boolean;
};

export const createOwnerScopedController = (
  uid: Parameters<typeof factories.createCoreController>[0],
  relationField: string,
  options: OwnerScopeOptions = {}
) =>
  factories.createCoreController(uid, ({ strapi }) => ({
    async find(ctx) {
      scopeQueryToOwner(ctx, relationField);
      return super.find(ctx);
    },

    async findOne(ctx) {
      if (isJwtUser(ctx)) {
        const ownerFilter = ownerDocumentFilter(ctx, relationField);
        const entity = await strapi.documents(uid).findOne({
          documentId: ctx.params.id,
          filters: ownerFilter,
        });

        if (!entity) {
          return ctx.notFound();
        }

        return this.transformResponse(entity);
      }

      return super.findOne(ctx);
    },

    // NOTE: create/update/delete are declared directly on this object literal
    // (not inside a spread sub-object). `super` binds to the *home object* where
    // a method is written, so nesting them in `...({ ... })` made `super.create`
    // resolve against a plain object and throw ".create is not a function".
    // The `options.readOnly` gate is applied inside each method instead.
    async create(ctx) {
      if (options.readOnly) {
        return super.create(ctx);
      }
      assignOwnerOnCreate(ctx, relationField);
      return super.create(ctx);
    },

    async update(ctx) {
      if (!options.readOnly && isJwtUser(ctx)) {
        const ownerFilter = ownerDocumentFilter(ctx, relationField);
        const existing = await strapi.documents(uid).findOne({
          documentId: ctx.params.id,
          filters: ownerFilter,
        });

        if (!existing) {
          return ctx.notFound();
        }
      }

      return super.update(ctx);
    },

    async delete(ctx) {
      if (!options.readOnly && isJwtUser(ctx)) {
        const ownerFilter = ownerDocumentFilter(ctx, relationField);
        const existing = await strapi.documents(uid).findOne({
          documentId: ctx.params.id,
          filters: ownerFilter,
        });

        if (!existing) {
          return ctx.notFound();
        }
      }

      return super.delete(ctx);
    },
  }));
