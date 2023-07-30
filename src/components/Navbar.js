import { Disclosure } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
export default function Navbar() {
  const { data: session, status } = useSession();
  return (
    <>
      <Disclosure as="nav" className="bg-gray-800">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="flex items-center px-2 lg:px-0">
                  <div className="flex-shrink-0">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src="https://codex-themes.com/thegem/wordpress-woocommerce-theme/wp-content/uploads/2023/05/logo-1.svg"
                      alt="Your Company"
                    />
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src="https://codex-themes.com/thegem/wordpress-woocommerce-theme/wp-content/uploads/2023/05/logo-1.svg"
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden lg:ml-6 lg:block">
                    <div className="flex space-x-4">
                      {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                      <Link
                        href={'/'}
                        className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                      >
                        Home
                      </Link>
                      <Link
                        href={'/products'}
                        className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                      >
                        Products
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
                  {session?.user?.email ? (
                    <div className="py-6">
                      <Link
                        href="#"
                        onClick={() => signOut({ callbackUrl: '/' })}
                        className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                      >
                        Sign Out
                      </Link>
                    </div>
                  ) : (
                    <div className="py-6">
                      <Link
                        href={'/login'}
                        className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                      >
                        Log in
                      </Link>
                    </div>
                  )}
                </div>
                <div className="flex lg:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="hidden lg:ml-4 lg:block">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                <Link
                  href={'/'}
                  className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
                >
                  Home
                </Link>
                <Link
                  href={'/products'}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Products
                </Link>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </>
  );
}
