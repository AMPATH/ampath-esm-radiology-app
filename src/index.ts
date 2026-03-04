/**
 * This is the entrypoint file of the application. It communicates the
 * important features of this microfrontend to the app shell. It
 * connects the app shell to the React application(s) that make up this
 * microfrontend.
 */
import { getAsyncLifecycle, defineConfigSchema, getSyncLifecycle } from '@openmrs/esm-framework';
import { configSchema } from './config-schema';
import { createDashboardLink } from './createDashboardLink';

const moduleName = '@ampath/esm-procedures-app';

const options = {
  featureName: 'procedures',
  moduleName,
};

export const importTranslation = require.context('../translations', false, /.json$/, 'lazy');

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

export const root = getAsyncLifecycle(() => import('./root.component'), options);

export const proceduresDashboardLink = getSyncLifecycle(createDashboardLink({ name: 'procedures', title: 'Procedures' }), options);

// Actions
export const addProcedureRequestResultsAction = getAsyncLifecycle(
  () => import('./actions/add-procedure-request-results-action.component'),
  options,
);

export const pickupProcedureRequestAction = getAsyncLifecycle(
  () => import('./actions/pickup-procedure-request-action.component'),
  options,
);

export const rejectProcedureRequestAction = getAsyncLifecycle(
  () => import('./actions/reject-procedure-request-action.component'),
  options,
);

// Modals
export const pickupProcedureRequestModal = getAsyncLifecycle(
  () => import('./modals/pickup-procedure-request-modal.component'),
  options,
);

export const rejectProcedureRequestModal = getAsyncLifecycle(
  () => import('./modals/reject-procedure-request-modal.component'),
  options,
);

// Workspaces
export const postProcedureForm = getAsyncLifecycle(
  () => import('./forms/post-procedures/post-procedure-form.component'),
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