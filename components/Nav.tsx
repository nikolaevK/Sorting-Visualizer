import { Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  PlayIcon,
  XMarkIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";
import { useContext } from "react";
import { settingContext } from "./utils/AlgoContext";

const Nav = () => {
  const { settings, setSettings } = useContext(settingContext);

  const onArrayChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!setSettings) return;
    // chosen length 0-100 * 5: Max array length 500, min 5
    setSettings((prev) => ({ ...prev, arrayLength: +e.target.value * 5 }));
  };

  const onDelayChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!setSettings) return;
    setSettings((prev) => ({ ...prev, delay: +e.target.value }));
  };

  const navigation = [
    { name: "MergeSort", href: "#", current: false },
    { name: "Team", href: "#", current: true },
    { name: "Projects", href: "#", current: false },
    { name: "Calendar", href: "#", current: false },
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-[5rem] items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex items-center text-purple-500">
                  <ChartBarIcon className="h-8 w-8" />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                    <div className="flex flex-col justify-center items-center text-gray-300">
                      <label htmlFor="items_amount">
                        Array Size: {settings.arrayLength}
                      </label>
                      <input
                        type="range"
                        name="items_amount"
                        id="items_amount"
                        className=" accent-purple-500"
                        defaultValue={25}
                        min={1}
                        onChange={onArrayChange}
                      />
                    </div>

                    <div className="flex flex-col justify-center items-center text-gray-300">
                      <label htmlFor="delay">Delay: {settings.delay}</label>
                      <input
                        type="range"
                        name="delay"
                        id="delay"
                        className=" accent-purple-500"
                        min={3}
                        defaultValue={15}
                        onChange={onDelayChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button className="rounded-full bg-gray-800 p-1 text-purple-500 hover:text-purple-500 focus:outline-none  hover:ring-2 hover:ring-purple-500 ">
                  <PlayIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <div className="flex flex-col justify-center items-center text-gray-300">
                <label htmlFor="items_amount">
                  Array Size: {settings.arrayLength}
                </label>
                <input
                  type="range"
                  name="items_amount"
                  id="items_amount"
                  className=" accent-purple-500"
                  defaultValue={25}
                  min={1}
                  onChange={onArrayChange}
                />
              </div>

              <div className="flex flex-col justify-center items-center text-gray-300">
                <label htmlFor="delay">Delay: {settings.delay}</label>
                <input
                  type="range"
                  name="delay"
                  id="delay"
                  className=" accent-purple-500"
                  min={3}
                  defaultValue={15}
                  onChange={onDelayChange}
                />
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Nav;
