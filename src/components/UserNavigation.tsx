"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu"

import { menuItems } from "@/config/constants"

type UserTypeDef = 'anon' | 'auth'


interface UserNavigationDef {
    userType: UserTypeDef,
    menu: {
        [key:string]: {
            title: string
            href: string
        }[]
    }
}

const UserNavigation = ({ userType, menu }: UserNavigationDef) => {
    return menu[userType].map(i => {
        return <ListItem href={i.href} title={i.title} />
    })
}

export function AppNavigation({ user }: any) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>{user ? 'My Dashboard' : 'Getting started'}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4">
                <UserNavigation userType={user ? 'auth' : 'anon'} menu={menuItems} />
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md px-4 py-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})

ListItem.displayName = "ListItem"
