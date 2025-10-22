import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'pofl8c47',
    dataset: 'production'
  },
  deployment: {
    appId: 'vy8ur9v617teyx2t081rw1vg',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
  }
})
