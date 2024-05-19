import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'amplifyTeamDrive',
  access: (allow) => ({
    'user/*': [
      allow.authenticated.to(['write']),
      
    ],
  })
});