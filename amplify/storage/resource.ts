import { defineStorage } from '@aws-amplify/backend';
import { sayHello } from '../functions/say-hello/resource';

export const storage = defineStorage({
  name: 'amplifyTeamDrive',
  access: (allow) => ({
    'user/*': [
      allow.authenticated.to(['write']),
      allow.resource(sayHello).to(['read'])
      
    ],
  })
});