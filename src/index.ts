/**
 * This is the entrypoint file of the application. It communicates the
 * important features of this microfrontend to the app shell. It
 * connects the app shell to the React application(s) that make up this
 * microfrontend.
 */
import { getAsyncLifecycle, defineConfigSchema, getSyncLifecycle } from '@openmrs/esm-framework';
import { configSchema } from './config-schema';
import { createDashboardLink } from './createDashboardLink';

const moduleName = '@ampath/esm-radiology-app';

const options = {
  featureName: 'radiology',
  moduleName,
};

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

export const root = getAsyncLifecycle(() => import('./root.component'), options);

export const radiologyDashboardLink = getSyncLifecycle(createDashboardLink({ name: 'radiology', title: 'Radiology' }), options);

// Actions
export const addRadiologyRequestResultsAction = getAsyncLifecycle(
  () => import('./actions/add-radiology-request-results-action.component'),
  options,
);

export const pickupRadiologyRequestAction = getAsyncLifecycle(
  () => import('./actions/pickup-radiology-request-action.component'),
  options,
);

export const rejectRadiologyRequestAction = getAsyncLifecycle(
  () => import('./actions/reject-radiology-request-action.component'),
  options,
);

export const generateBillRequestAction = getAsyncLifecycle(
  () => import('./actions/generate-bill-request-action.component'),
  options,
);

// Modals
export const pickupRadiologyRequestModal = getAsyncLifecycle(
  () => import('./modals/pickup-radiology-request-modal.component'),
  options,
);

export const rejectRadiologyRequestModal = getAsyncLifecycle(
  () => import('./modals/reject-radiology-request-modal.component'),
  options,
);

// Workspaces
export const postRadiologyForm = getAsyncLifecycle(
  () => import('./forms/post-radiology/post-radiology-form.component'),
  options,
);

// Tables
export const orderedRequestsTable = getAsyncLifecycle(
  () => import('./data-table-extensions/ordered-requests-table.extension'),
  options,
);

export const inprogressRequestsTable = getAsyncLifecycle(
  () => import('./data-table-extensions/in-progress-requests-table.extension'),
  options,
);

export const completedRequestsTable = getAsyncLifecycle(
  () => import('./data-table-extensions/completed-requests-table.extension'),
  options,
);

export const declinedRequestsTable = getAsyncLifecycle(
  () => import('./data-table-extensions/declined-requests-table-extension'),
  options,
);

// Tiles
export const inProgressRequestsTile = getAsyncLifecycle(
  () => import('./summary/tiles/in-progress-requests-tile.component'),
  options,
);

export const declinedRequestsTile = getAsyncLifecycle(
  () => import('./summary/tiles/declined-requests-tile.component'),
  options,
);

export const completedRequestsTile = getAsyncLifecycle(
  () => import('./summary/tiles/completed-requests-tile.component'),
  options,
);

export const orderedRequestsTile = getAsyncLifecycle(() => import('./summary/tiles/ordered-requests-tile.component'), options);