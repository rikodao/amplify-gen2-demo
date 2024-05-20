import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { sayHello } from './functions/say-hello/resource';
import { storage } from './storage/resource';
const backend = defineBackend({
    auth,
    sayHello,
    storage,
});
const authenticatedUserIamRole = backend.auth.resources.authenticatedUserIamRole;
backend.sayHello.resources.lambda.grantInvoke(authenticatedUserIamRole);


backend.addOutput({
    custom: {
        sayHelloFunctionName: backend.sayHello.resources.lambda.functionName,
    },

});
