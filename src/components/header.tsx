import Link from 'next/link';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
    Avatar,
    Popover,
    PopoverTrigger,
    PopoverContent
} from '@nextui-org/react';
import { auth } from '@/auth';
import * as actions from '@/actions';
import SearchInput from '@/components/search-input';
import { Suspense } from 'react';


export default async function Header() {
    const session = await auth();

    let authContent: React.ReactNode;
    if (session?.user) {
            authContent =(
            <Popover placement='left'>
                <PopoverTrigger>
                    <div className='flex items-center font-bold cursor-pointer'>
                        <p className='mr-3'>{session.user.name}</p>
                        <Avatar src={session?.user.image || ""} />
                    </div>
                </PopoverTrigger>
                <PopoverContent>
                    <div className='p-4'>
                        <form action={actions.signOut}>
                            <Button type='submit'>
                                Sign Out
                            </Button>
                        </form>
                    </div>
                </PopoverContent>
            </Popover>);
        } else {
            authContent = <>
                <NavbarItem>
                    <form action={actions.signIn}>
                        <Button type='submit' color='secondary' variant='bordered'>
                            Sign In
                        </Button>
                    </form>
                </NavbarItem>

                <NavbarItem>
                    <form action={actions.signOut}>
                        <Button type='submit' color='primary' variant='flat'>
                            Sign Up
                        </Button>
                    </form>
                </NavbarItem>
            </>
        }

    return(
        <Navbar className='shadow mb-6'>
            <NavbarBrand>
                <Link href='/' className='font-bold'>YourNextTech</Link>
            </NavbarBrand>
            <NavbarContent justify='center'>
                <Suspense>
                    <SearchInput />
                </Suspense>
            </NavbarContent>
            <NavbarContent justify='end'>
                {authContent}
            </NavbarContent>
        </Navbar>
    )
}