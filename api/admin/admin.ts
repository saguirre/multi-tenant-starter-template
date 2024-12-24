import { api } from 'encore.dev/api';
import log from 'encore.dev/log';
import { getAuthData } from '~encore/auth';

export const getDashboardData = api(
  {
    expose: true, // Is publicly accessible
    auth: true, // Auth handler validation is required
    method: 'GET',
    path: '/admin',
  },
  async (): Promise<DashboardData> => {
    const userID = getAuthData()!.userID;
    // Log statements are viewable in the traces:
    log.info('Data requested by user', { userID });

    return { value: 'Admin stuff' };
  }
);

interface DashboardData {
  value: string;
}
