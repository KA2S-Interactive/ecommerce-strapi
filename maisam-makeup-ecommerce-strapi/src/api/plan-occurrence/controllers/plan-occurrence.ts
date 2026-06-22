/**
 * plan-occurrence controller
 */

import { createOwnerScopedController } from '../../../utils/owner-scope-controller';

export default createOwnerScopedController(
  'api::plan-occurrence.plan-occurrence',
  'users_permissions_user',
  { readOnly: true }
);
