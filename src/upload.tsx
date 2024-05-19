import { StorageManager } from '@aws-amplify/ui-react-storage';
import '@aws-amplify/ui-react/styles.css';


interface DefaultStorageManagerExampleProps {
    username: string | undefined;
    setPath: any;
  }

export const DefaultStorageManagerExample = ({username,setPath}: DefaultStorageManagerExampleProps) => {
    const path = `user/${username}/`
    return (
        <StorageManager
            acceptedFileTypes= { ['text/*']}
            path = {path}
            maxFileCount = {1}
            isResumable
            onUploadSuccess={({ key }) => {
                setPath(key);
              }}
        />
        
  );
};