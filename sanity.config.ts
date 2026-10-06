import {sanityProjectId,sanityDataset} from './lib/cms-config';
import {defineConfig} from 'sanity';
import {structureTool} from 'sanity/structure';
import {schemaTypes} from './sanity/schema';
const projectId=process.env.SANITY_STUDIO_PROJECT_ID||process.env.NEXT_PUBLIC_SANITY_PROJECT_ID||sanityProjectId;
if(!projectId)throw new Error('Укажите NEXT_PUBLIC_SANITY_PROJECT_ID в .env.local');
export default defineConfig({name:'sozvezdie-rechi',title:'Созвездие речи — управление сайтом',projectId,dataset:process.env.SANITY_STUDIO_DATASET||process.env.NEXT_PUBLIC_SANITY_DATASET||sanityDataset,plugins:[structureTool({structure:S=>S.list().title('Содержание сайта').items([S.listItem().title('О центре').child(S.document().schemaType('about').documentId('about')),S.listItem().title('Контакты').child(S.document().schemaType('contacts').documentId('contacts')),...S.documentTypeListItems().filter(item=>!['about','contacts'].includes(item.getId()||''))])})],schema:{types:schemaTypes},document:{newDocumentOptions:options=>options.filter(option=>!['about','contacts'].includes(option.templateId)),actions:(actions,context)=>['about','contacts'].includes(context.schemaType)?actions.filter(action=>!['delete','duplicate'].includes(action.action||'')):actions}});
