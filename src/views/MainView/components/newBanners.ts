import { computed } from 'vue';
import * as _ from "lodash";
import { props } from './HomeBanner.vue';

export const newBanners = computed(() => {
const newBannersData = _.cloneDeep(props.banners);
newBannersData.data.forEach((item) => {
if (item.src) {
item.src = getCompletePath(item.src, props.baseUrl || location.href);
}
});
return newBannersData;
});
