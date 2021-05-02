async function authoriseFace(username, image) {
  Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('./models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('./models')
  ]).then(authoriseFaceCore(username, image))
}

async function authoriseFaceCore(username, image) {
    let confidenceInterval = 0.6; // 60% certainty is considered a match.
    console.log('Searching for ' + username + '...');
  
    console.log('\n');
  
    console.log('Loading & Analysing Authorised Face Models...');
    const authorisedFaceModels = await loadAuthorisedFaceModelsForUser(username); 
    console.log('DONE: Loaded & Analysed Authorised Face Models.');
    
    console.log('\n');
  
    if (authorisedFaceModels.descriptors.length > 0)
    {
      console.log('Detecting Faces In Uploaded Image...');
      const detectedFaces = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
      console.log('DONE: Detected Faces In Uploaded Image.');
    
      console.log('\n');
      
      console.log('Finding Best Match From Detected Faces...');
      const faceMatcher = new faceapi.FaceMatcher(authorisedFaceModels, confidenceInterval);
      const facialIdentifications = detectedFaces.map(d => faceMatcher.findBestMatch(d.descriptor))
      console.log('DONE: Found Best Match From Detected Faces.');
    
      console.log('\n');
    
      let found = false;
      for (i = 0; i < facialIdentifications.length; i++) {
        if (facialIdentifications[i].label != 'unknown')
        {
          found = true;
        }
      }
      return found;
    }
  
    return false;
  }
  
  function loadAuthorisedFaceModelsForUser(username) {
    return new Promise(async (resolve, reject) => 
    {
      const faceDescriptors = [];
      try {
        for (var index = 1; index <= 2; index++) {
            const authorisedFaceModel = await faceapi.fetchImage(`https://raw.githubusercontent.com/VP1996/SES-2B/main/backend/facial_recognition/${username}/${index}.jpg`)
            const face = await faceapi.detectSingleFace(authorisedFaceModel).withFaceLandmarks().withFaceDescriptor()
            faceDescriptors.push(face.descriptor);
        }
      }
      catch {
        console.log('Either this user does not exist, or they have no authorised photos.')
      }
      resolve(new faceapi.LabeledFaceDescriptors(username, faceDescriptors));
    });
  }