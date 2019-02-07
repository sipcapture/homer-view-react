/**
 *
 * Asynchronously loads the component for QoS
 *
 */

import loadable from 'loadable-components';

export default loadable(() => import('./index'));
