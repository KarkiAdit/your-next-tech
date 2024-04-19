import Link from 'next/link';
import { Suspense } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react';
import HeaderAuth from '@/components/header-auth';
import SearchInput from '@/components/search-input';
import LoadingSkeleton from './common/loading-skeleton';

export default function Header() {
  return (
    <Navbar className="shadow mb-6">
      <NavbarBrand>
        <Link href="/" className="font-bold">
          Your Next Tech
        </Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <NavbarItem>
          <Suspense>
            <SearchInput />
          </Suspense>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <Suspense fallback={<LoadingSkeleton />}>
          <HeaderAuth />
        </Suspense>
      </NavbarContent>
    </Navbar>
  );
}
