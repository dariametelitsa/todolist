import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import App from './App'
import { ReduxStoreProviderDecorator, storybookStore } from '../stories/ReduxStoreProviderDecorator'
import { Provider } from 'react-redux'
const meta: Meta<typeof App> = {
  title: 'Todolist/App',
  component: App,
  decorators: ReduxStoreProviderDecorator,
  tags: ['autodocs'],
  argTypes: {},
  args: {},
}

export default meta
type Story = StoryObj<typeof App>

export const AppWithProvider: Story = {
  // render: () => (
  //   <Provider store={storybookStore}>
  //     <App />
  //   </Provider>
  // ),
}
