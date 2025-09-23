import PocketBase from 'pocketbase';
import { formatRFC3339 } from 'date-fns';

// TODO: make pocketbase url configurable
const pb = new PocketBase('http://127.0.0.1:8090');

const pbTimeFormat = formatRFC3339;
export { pb, pbTimeFormat };
