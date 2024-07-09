/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from "clsx";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ListItem } from "@/components/ui/ListItem";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import UOlogo from "../assets/images/logo_rectangle.png";
import OUHlogo from "../assets/images/ouh_logo_white.png";

import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButtion";
import ThemeToggle from "./ThemeToogle";

const viewLinks: { title: string; href: string; description: string }[] = [
  {
    title: "Runs",
    href: "/runs",
    description: "View and manage runs",
  },
  {
    title: "Specimens",
    href: "/specimens",
    description: "View and manage specimens",
  },
  {
    title: "Samples",
    href: "/samples",
    description: "View and manage samples",
  },
  {
    title: "Storage",
    href: "/storage",
    description: "View and manage storage",
  },
];

const uploadLinks: { title: string; href: string; description: string }[] = [
  {
    title: "Spreadsheet",
    href: "/excel-upload",
    description: "Upload the Specimen, Sample, Runs, Storage spreadsheet",
  },
  {
    title: "Summary",
    href: "/summary-upload",
    description: "Upload the Summary CSV file",
  },
  {
    title: "Mutations",
    href: "/mutation-upload",
    description: "Upload the Mutations CSV file",
  },
  {
    title: "Last Upload Logs",
    href: "/upload-result",
    description: "View the logs of the last upload",
  },
];

function Navbar() {
  const navButtonClass =
    "text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2";

  const [isSideMenuOpen, setMenu] = useState(false);

  return (
    <main>
      <nav className="grid grid-cols-2 items-center border-b border-indigo-500 bg-oxford-blue px-8 py-6">
        {/* left navbar items */}
        <section className="flex gap-4">
          <FiMenu
            onClick={() => setMenu(true)}
            className="min-w-[50px] cursor-pointer text-3xl text-white lg:hidden"
          />
          <NavLink
            className="mr-4 hidden shrink-0 grow-0 items-center lg:flex"
            to="/"
          >
            <img className="max-h-[40px]" src={OUHlogo} alt="NHS-OUH" />
          </NavLink>
          <NavLink
            className="mr-4 hidden shrink-0 grow-0 items-center lg:flex"
            to="/"
          >
            <img
              className="max-h-[40px]"
              src={UOlogo}
              alt="University of Oxford"
            />
          </NavLink>
          <NavLink className="flex items-center" to="/">
            <span className="text-2xl font-bold text-white">LabBox</span>
          </NavLink>
          <span className="hidden lg:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>View</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {viewLinks.map((view) => (
                        <ListItem
                          key={view.title}
                          title={view.title}
                          to={view.href}
                        >
                          {view.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Upload</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {uploadLinks.map((upload) => (
                        <ListItem
                          key={upload.title}
                          title={upload.title}
                          to={upload.href}
                        >
                          {upload.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </span>
        </section>
        {/* sidebar mobile menu */}
        <div
          onClick={() => setMenu(false)}
          className={clsx(
            "fixed right-0 top-0 z-[200] h-full  w-screen -translate-x-full bg-black/50  backdrop-blur-sm  transition-all lg:hidden",
            isSideMenuOpen && "translate-x-0"
          )}
        >
          <section
            onClick={(e) => e.stopPropagation()}
            className="absolute left-0 top-0 flex h-screen w-56 flex-col gap-8 bg-white p-8  text-black"
          >
            <IoCloseOutline
              onClick={() => setMenu(false)}
              className="mb-8 mt-0 cursor-pointer text-3xl"
            />
            <Accordion type="single" collapsible>
              <AccordionItem value="view">
                <AccordionTrigger>View</AccordionTrigger>
                <AccordionContent>
                  <ul className="grid gap-3">
                    {viewLinks.map((view) => (
                      <li key={view.title}>
                        <Link to={view.href} onClick={() => setMenu(false)}>
                          {view.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="upload">
                <AccordionTrigger>Upload</AccordionTrigger>
                <AccordionContent>
                  <ul className="grid gap-3">
                    {uploadLinks.map((upload) => (
                      <li key={upload.title}>
                        <Link to={upload.href} onClick={() => setMenu(false)}>
                          {upload.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>
        {/* Right navbar items */}
        <section className="flex justify-end gap-4">
          <ThemeToggle />
          <LoginButton className={navButtonClass} />
          <LogoutButton className={navButtonClass} />
        </section>
      </nav>
    </main>
  );
}

export default Navbar;
