// src/App.js
// src/App.js
import React, { useState, useEffect } from 'react';
import { dynamoDB } from './config/aws-config';

function App() {
  const [dynamoItems, setDynamoItems] = useState([]);

  useEffect(() => {
    // Setup parameters to fetch data from DynamoDB
    const params = {
      TableName: process.env.REACT_APP_DYNAMO_TABLE_NAME, // Set your DynamoDB table name
    };
    
    // Query DynamoDB using the DocumentClient
    dynamoDB.scan(params, (err, data) => {
      if (err) {
        console.error("Error fetching data from DynamoDB:", err);
      } else {
        setDynamoItems(data.Items);
      }
    });
  }, []);

  return (
    <div className="App">
      <h1>Testing DynamoDB with React</h1>
      <h2>Contents from DynamoDB:</h2>
      <ul>
        {dynamoItems.length > 0 ? (
          dynamoItems.map((item, index) => (
            <li key={index}>{JSON.stringify(item)}</li>
          ))
        ) : (
          <li>No items found</li>
        )}
      </ul>
    </div>
  );
}

export default App;










// import React, { useState, useEffect } from 'react';
// import { s3 } from './awsConfig';

// function App() {
//   const [bucketContents, setBucketContents] = useState([]);

//   useEffect(() => {
//     // List objects in the S3 bucket
//     const params = {
//       Bucket: process.env.REACT_APP_AWS_S3_BUCKET,
//     };

//     s3.listObjectsV2(params, (err, data) => {
//       if (err) {
//         console.error("Error fetching data from S3:", err);
//       } else {
//         setBucketContents(data.Contents);
//       }
//     });
//   }, []);

//   return (
//     <div className="App">
//       <h1>Testing AWS SDK with React</h1>
//       <h2>Contents of the S3 Bucket:</h2>
//       <ul>
//         {bucketContents.length > 0 ? (
//           bucketContents.map((file, index) => (
//             <li key={index}>{file.Key}</li>
//           ))
//         ) : (
//           <li>No files found</li>
//         )}
//       </ul>
//     </div>
//   );
// }

// export default App;

// src/App.js
// import React, { useState, useEffect } from 'react';
// import { s3 } from './awsConfig';

// function App() {
//   const [bucketContents, setBucketContents] = useState([]);

//   useEffect(() => {
//     // List objects in the S3 bucket
//     const params = {
//       Bucket: process.env.REACT_APP_AWS_S3_BUCKET,
//     };

//     s3.listObjectsV2(params, (err, data) => {
//       if (err) {
//         console.error("Error fetching data from S3:", err);
//       } else {
//         setBucketContents(data.Contents);
//       }
//     });
//   }, []);

//   return (
//     <div className="App">
//       <h1>Testing AWS SDK with React</h1>
//       <h2>Contents of the S3 Bucket:</h2>
//       <ul>
//         {bucketContents.length > 0 ? (
//           bucketContents.map((file, index) => (
//             <li key={index}>{file.Key}</li>
//           ))
//         ) : (
//           <li>No files found</li>
//         )}
//       </ul>
//     </div>
//   );
// }

// export default App;

