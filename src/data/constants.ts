import { getCompletePath } from "@/util/url"

//Urls
const { VITE_URL_API } = import.meta.env
export const URL_API = getCompletePath(VITE_URL_API, location.href)
export const URL_HOME = `${VITE_URL_API}/homePageData.json`
export const URL_ALL_APP_LIST = `${VITE_URL_API}/allAppList.json`
