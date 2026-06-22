/**
 * store controller
 */

import { createOwnerScopedController } from '../../../utils/owner-scope-controller';

export default createOwnerScopedController('api::store.store', 'publisher', {
  readOnly: false,
});
