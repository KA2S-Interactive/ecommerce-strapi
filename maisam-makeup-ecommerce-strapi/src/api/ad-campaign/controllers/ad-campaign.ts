/**
 * ad-campaign controller
 */

import { createOwnerScopedController } from '../../../utils/owner-scope-controller';

export default createOwnerScopedController(
  'api::ad-campaign.ad-campaign',
  'users_permissions_user',
  { readOnly: true }
);
