type QueryFilters = Record<string, unknown>;

type CtxLike = {
  query?: Record<string, unknown>;
  request?: { body?: { data?: Record<string, unknown> } };
  state: { user?: { id: number } };
};

const mergeFilters = (
  existing: unknown,
  ownerFilter: QueryFilters
): QueryFilters => {
  if (existing && typeof existing === 'object' && !Array.isArray(existing)) {
    return { ...(existing as QueryFilters), ...ownerFilter };
  }
  return ownerFilter;
};

export const isJwtUser = (ctx: CtxLike) => Boolean(ctx.state.user?.id);

export const scopeQueryToOwner = (ctx: CtxLike, relationField: string) => {
  if (!isJwtUser(ctx)) {
    return;
  }

  ctx.query = ctx.query ?? {};
  ctx.query.filters = mergeFilters(ctx.query.filters, {
    [relationField]: { id: { $eq: ctx.state.user!.id } },
  });
};

export const assignOwnerOnCreate = (ctx: CtxLike, relationField: string) => {
  if (!isJwtUser(ctx)) {
    return;
  }

  ctx.request = ctx.request ?? {};
  ctx.request.body = ctx.request.body ?? {};
  ctx.request.body.data = {
    ...(ctx.request.body.data ?? {}),
    [relationField]: ctx.state.user!.id,
  };
};

export const ownerDocumentFilter = (
  ctx: CtxLike,
  relationField: string
): QueryFilters | undefined => {
  if (!isJwtUser(ctx)) {
    return undefined;
  }

  return {
    [relationField]: { id: { $eq: ctx.state.user!.id } },
  };
};
