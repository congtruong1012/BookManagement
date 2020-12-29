/**
 *
 * Asynchronously loads the component for ModalBook
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
