import { configure } from '@storybook/react';
import requireContext from 'require-context.macro'

// automatically import all files ending in *.stories.js
// configure(require.context('../src/stories', true, /\.stories\.js$/), module);
configure(requireContext('../src/stories', true, /\.stories\.js$/), module);
