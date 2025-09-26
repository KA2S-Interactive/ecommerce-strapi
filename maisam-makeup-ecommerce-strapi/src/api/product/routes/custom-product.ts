export default {
  routes: [
    {
      method: 'PUT',
      path: '/products/unpublish/:id',
      handler: 'product.unpublish',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'PUT',
      path: '/products/publish/:id',
      handler: 'product.publish',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};

