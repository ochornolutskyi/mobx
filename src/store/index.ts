// eslint-disable-next-line import/no-extraneous-dependencies
import { injectStores } from '@mobx-devtools/tools';
import { UsersStore } from 'store/users';

injectStores({
	UsersStore,
});
