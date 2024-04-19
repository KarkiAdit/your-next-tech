'use server';

import Link from 'next/link';
import paths from '@/paths';
import dbConnect from '@lib/dbConnect';
import { Admin, AdminRequest } from '@/mongodb/index'
import { AdminWithData } from '@/mongodb/admin/admin-query';
import { Avatar } from '@nextui-org/react';

interface AdminListProps {
    fetchData: () => Promise<AdminWithData[]>
  }
export default async function AdminList({ fetchData }: AdminListProps) {
    const admins = await fetchData();
    console.log(admins)

  
    const renderedAdmins = admins.map((admin) => {
        return (
        <div key={admin.userInfo.id} className="border rounded p-2">
            <div className='flex items-center font-bold cursor-pointer'>
                <p className='mr-3'>{admin.userInfo.name}</p>
                <Avatar src={admin.userInfo.image || ""} />
            </div>
        </div>
        );
    });

  return <div className="space-y-2">{renderedAdmins}</div>;
}
