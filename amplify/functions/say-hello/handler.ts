import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { env } from '$amplify/env/say-hello';


const s3 = new S3Client();

function getFileContent(key) {
    const params = {
        Bucket: env.AMPLIFY_TEAM_DRIVE_BUCKET_NAME,
        Key: key,
    };
    const command = new GetObjectCommand({
        Bucket: env.AMPLIFY_TEAM_DRIVE_BUCKET_NAME,
        Key: key,
      });

    return s3.send(command)
        .then((data) => data.Body?.transformToString())
        .catch((err) => {
            console.error('Error getting file content:', err);
            throw err;
        });
}

// 個人情報のパターンを定義する
const personalInfoPatterns = {
    電話番号: /\b\d{3}[-.]?\d{4}\b/g, // 電話番号のパターン
    メールアドレス: /\b\w+@\w+\.\w+\b/g, // メールアドレスのパターン
    // 他のパターンを必要に応じて追加
};



function checkPersonalInformationByRule(content) {
     const result = Object.keys(personalInfoPatterns).filter(pattern => content.match(personalInfoPatterns[pattern]))
     console.log(result);
     return result
}


function checkPersonalInformationByLLM(content) {

}


export const handler = async (event) => {
    console.log(event);
    console.log(env.AMPLIFY_TEAM_DRIVE_BUCKET_NAME);
    


    try {
        const content = await getFileContent(event.key);
        // console.log(content);
        
        const hits = checkPersonalInformationByRule(content);
        return { hitRule: JSON.stringify(hits) ,message: "生成AIの文言をここに入れてください。こちらがヒットしている可能性のある個人情報です。"};

    } catch (err) {
        console.error('Error processing file:', err);
        return { message: 'Error processing file' };
    }
};