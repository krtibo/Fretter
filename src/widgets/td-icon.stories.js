import { library } from '@fortawesome/fontawesome-svg-core';
import TdIcon from './td-icon';

export default { title: 'widgets / td-icon', component: TdIcon };

const play = {
	prefix: 'td',
	iconName: 'play',
	icon: [512, 512, [], 'f005', 'M136 48.154L496 256L136 463.846L136 48.154'],
};
library.add(play);

const Template = args => ({
	template: `
		<td-icon :icon="icon" :size="size" :mask="mask" :transform="transform" :spin="spin" />
	`,
	setup: () => args,
});

export const Base = Template.bind({});
Base.args = { icon: play, size: '1x', mask: '', transform: '', spin: false };

export const IconByName = Template.bind({});
IconByName.args = { ...Base.args, icon: 'play' };

export const Size = Template.bind({});
Size.args = { ...Base.args, size: '2x' };

export const Mask = Template.bind({});
Mask.args = { ...Base.args, mask: play, transform: 'shrink-8 rotate-180', size: '3x' };
