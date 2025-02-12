import initFirebase from "../utils/initFirebase";

export default defineNitroPlugin((nuxtapp) => {
  const firebaseConfig = JSON.parse(
    process.env.GOOGLE_APPLICATION_CREDENTIALS as string
  );

  if (firebaseConfig.private_key) {
    firebaseConfig.private_key = firebaseConfig.private_key.replace(/\\n/g, '\n');
  }
  
  initFirebase(firebaseConfig);
});
