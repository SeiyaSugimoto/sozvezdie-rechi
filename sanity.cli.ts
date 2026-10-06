import {sanityProjectId,sanityDataset} from './lib/cms-config';
import {defineCliConfig} from 'sanity/cli';
export default defineCliConfig({deployment:{appId:'gfgdr4rf40pk226tjrzlpzn7'},project:{basePath:'/studio'},api:{projectId:process.env.SANITY_STUDIO_PROJECT_ID||process.env.NEXT_PUBLIC_SANITY_PROJECT_ID||sanityProjectId,dataset:process.env.SANITY_STUDIO_DATASET||process.env.NEXT_PUBLIC_SANITY_DATASET||sanityDataset}});
