const faceapi = require('face-api.js');
const canvas = require('canvas');
const fetch = require('node-fetch');
const path = require('path');
const { Canvas, Image, ImageData } = canvas;

module.exports = {
  authoriseFace: async function (username, imageUrl) {
    const modelsUrl = path.join(__dirname, '/models');
    await Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromDisk(modelsUrl),
      faceapi.nets.faceLandmark68Net.loadFromDisk(modelsUrl),
      faceapi.nets.ssdMobilenetv1.loadFromDisk(modelsUrl)
    ]);

    var isAuthorised = await authoriseFaceCore(username, imageUrl);
    if (isAuthorised) {
      console.log(username + ' has been authorised.');
    }
    else {
      console.log(username + ' cannot be authorised.');
    }
    return isAuthorised;
  }
}

async function authoriseFaceCore(username, imageName) {
    faceapi.env.monkeyPatch({ fetch: fetch, Canvas, Image, ImageData });
    let imageUrl = path.join(__dirname, '../../upload/references/' + imageName); 
    const image = await canvas.loadImage(imageUrl);

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
            let url =`https://raw.githubusercontent.com/VP1996/SES-2B/main/backend/facial_recognition/${username}/${index}.jpg`;
            const authorisedFaceModel =  await canvas.loadImage(url);
            const face = await faceapi.detectSingleFace(authorisedFaceModel).withFaceLandmarks().withFaceDescriptor()
            faceDescriptors.push(face.descriptor);
        }
      }
      catch(err) {
        console.log('Either this user does not exist, or they have no authorised photos.')
        console.log(err);
      }
      resolve(new faceapi.LabeledFaceDescriptors(username, faceDescriptors));
    });
  }