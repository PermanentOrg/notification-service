import admin from 'firebase-admin';
import type { messaging, ServiceAccount } from 'firebase-admin';

const credentials: unknown = JSON.parse(
  process.env.FIREBASE_CREDENTIALS as string,
);
const firebaseApp = admin.initializeApp({
  credential: admin.credential.cert(credentials as ServiceAccount),
});
const messagingService = admin.messaging(firebaseApp);

const sendDryRunMessage = async (message: messaging.Message): Promise<string> => (
  messagingService.send(message, true)
);

const validateHealth = async (): Promise<boolean> => {
  await sendDryRunMessage({
    topic: 'health-check',
  });
  return true;
};

export { validateHealth };
