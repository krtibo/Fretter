import { App, Component } from 'vue';
import * as Widgets from '../widgets';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;
config.autoReplaceSvg = false;
config.observeMutations = false;

export function widgets(Vue: App) {
	const registerGlobally = (Widget: Component) => Vue.component(Widget.name!, Widget);
	Object.values(Widgets).forEach(registerGlobally);
}
