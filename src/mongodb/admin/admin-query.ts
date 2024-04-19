import dbConnect from '@lib/dbConnect';
import { Admin, AdminRequest } from '@/mongodb/index'

export type AdminWithData = {
  userInfo: {
    id: string;
    name: string;
    image: string;
    email: string;
  };
};

export async function fetchAdmins(): Promise<AdminWithData[]> {
  await dbConnect();
  const admins = await Admin.find({}); 
  console.log(admins);

  return admins.map(admin => ({
    userInfo: {
      id: admin.userInfo.id,
      name: admin.userInfo.name,
      image: admin.userInfo.image,
      email: admin.userInfo.email
    }
  })) as AdminWithData[];
}