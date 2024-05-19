// Body.tsx
import React, { useState } from 'react';
import { DefaultStorageManagerExample } from './upload.tsx';
import { Authenticator } from '@aws-amplify/ui-react';
import { InvokeCommand, LambdaClient } from '@aws-sdk/client-lambda';
import { fetchAuthSession } from 'aws-amplify/auth';
import outputs from "../amplify_outputs.json";

const containerStyles : React.CSSProperties =  {
  width: '100%',
  maxWidth: '800px',
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const buttonStyles: React.CSSProperties =  {
  backgroundColor: '#ff6b00',
  color: '#fff',
  border: 'none',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  marginRight: '1rem',
};

const textStyles : React.CSSProperties = {
  marginBottom: '1rem',
  fontSize: '1.2rem',
  textAlign: 'center',
};

const Body: React.FC = () => {
  const [text, setText] = useState("");
  const [path, setPath] = useState("");

  async function invokeSayHello() {
    const { credentials } = await fetchAuthSession();
    const awsRegion = outputs.auth.aws_region;
    const functionName = outputs.custom.sayHelloFunctionName;

    const labmda = new LambdaClient({ credentials: credentials, region: awsRegion });
    const command = new InvokeCommand({
      FunctionName: functionName,
    });
    const apiResponse = await labmda.send(command);
    console.log(apiResponse);

    if (apiResponse.Payload) {
      const payloadStr = new TextDecoder().decode(apiResponse.Payload);
      console.log(payloadStr);

      const payload = JSON.parse(payloadStr);
      setText(payload.message);
    }
  }

  return (
    <div style={containerStyles}>
      <Authenticator hideSignUp>
        {({ signOut, user }) => (
          <p style={textStyles}>
            {user?.username}
            <DefaultStorageManagerExample username={user?.username} setPath={setPath} />
            <div style={textStyles}>{path}</div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button style={buttonStyles} onClick={invokeSayHello}>個人情報が含まれるかチェックする</button>
              <button style={buttonStyles} onClick={signOut}>ログアウト</button>
            </div>
            <h4 style={textStyles}>{text}</h4>
          </p>
        )}
      </Authenticator>
    </div>
  );
};

export default Body;