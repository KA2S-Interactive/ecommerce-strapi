import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::product.product', ({ strapi }) => ({
  async unpublish(ctx) {
    const { id: documentId } = ctx.params;

    if (!documentId) {
      return ctx.badRequest('Missing document ID');
    }

    try {
      const unpublishedProduct = await strapi.documents('api::product.product').unpublish({
        // Cast `documentId` to `any` to bypass the TypeScript error.
        // In a real-world application, you might define a local type or ensure
        // the DocumentService is typed correctly if using custom content types.
        documentId: documentId as any,
        locale: '*', // unpublish for all locales
      });

      if (!unpublishedProduct) {
        return ctx.notFound(`No product found with document ID ${documentId}`);
      }
      
      return this.transformResponse(unpublishedProduct, {});
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return ctx.internalServerError(`Failed to unpublish entry: ${errorMessage}`);
    }
  },
  /**
   * Custom endpoint to publish a product entry.
   * Example: PUT /api/products/publish/p28vio3o8xvh1vue29tno28q
   */
  async publish(ctx) {
    const { id: documentId } = ctx.params;

    if (!documentId) {
      return ctx.badRequest('Missing document ID');
    }

    try {
      // The `publish` method handles the validation and publishing logic
      const publishedProduct = await strapi.documents('api::product.product').publish({
        documentId: documentId as any,
        locale: '*', // publish for all locales
      });

      if (!publishedProduct) {
        return ctx.notFound(`No draft product found with document ID ${documentId}`);
      }
      
      return this.transformResponse(publishedProduct, {});
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      return ctx.internalServerError(`Failed to publish entry: ${errorMessage}`);
    }
  },
}));
