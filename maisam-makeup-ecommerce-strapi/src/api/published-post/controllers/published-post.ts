/**
 * published-post controller
 */

import { createOwnerScopedController } from '../../../utils/owner-scope-controller';

export default createOwnerScopedController(
  'api::published-post.published-post',
  'users_permissions_user',
  { readOnly: true }
);
