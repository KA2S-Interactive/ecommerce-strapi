/**
 * social-connection controller
 */

import { createOwnerScopedController } from '../../../utils/owner-scope-controller';

export default createOwnerScopedController(
  'api::social-connection.social-connection',
  'users_permissions_user'
);
