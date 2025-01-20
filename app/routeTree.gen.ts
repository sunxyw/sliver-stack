/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthLayoutImport } from './routes/auth/layout'
import { Route as LayoutImport } from './routes/layout'
import { Route as AuthSignInImport } from './routes/auth/sign-in'

// Create/Update Routes

const AuthLayoutRoute = AuthLayoutImport.update({
  id: '/auth',
  path: '/auth',
  getParentRoute: () => rootRoute,
} as any)

const LayoutRoute = LayoutImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const AuthSignInRoute = AuthSignInImport.update({
  id: '/sign-in',
  path: '/sign-in',
  getParentRoute: () => AuthLayoutRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof LayoutImport
      parentRoute: typeof rootRoute
    }
    '/auth': {
      id: '/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthLayoutImport
      parentRoute: typeof rootRoute
    }
    '/auth/sign-in': {
      id: '/auth/sign-in'
      path: '/sign-in'
      fullPath: '/auth/sign-in'
      preLoaderRoute: typeof AuthSignInImport
      parentRoute: typeof AuthLayoutImport
    }
  }
}

// Create and export the route tree

interface AuthLayoutRouteChildren {
  AuthSignInRoute: typeof AuthSignInRoute
}

const AuthLayoutRouteChildren: AuthLayoutRouteChildren = {
  AuthSignInRoute: AuthSignInRoute,
}

const AuthLayoutRouteWithChildren = AuthLayoutRoute._addFileChildren(
  AuthLayoutRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof LayoutRoute
  '/auth': typeof AuthLayoutRouteWithChildren
  '/auth/sign-in': typeof AuthSignInRoute
}

export interface FileRoutesByTo {
  '/': typeof LayoutRoute
  '/auth': typeof AuthLayoutRouteWithChildren
  '/auth/sign-in': typeof AuthSignInRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof LayoutRoute
  '/auth': typeof AuthLayoutRouteWithChildren
  '/auth/sign-in': typeof AuthSignInRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/auth' | '/auth/sign-in'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/auth' | '/auth/sign-in'
  id: '__root__' | '/' | '/auth' | '/auth/sign-in'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  LayoutRoute: typeof LayoutRoute
  AuthLayoutRoute: typeof AuthLayoutRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  LayoutRoute: LayoutRoute,
  AuthLayoutRoute: AuthLayoutRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/auth"
      ]
    },
    "/": {
      "filePath": "layout.tsx"
    },
    "/auth": {
      "filePath": "auth/layout.tsx",
      "children": [
        "/auth/sign-in"
      ]
    },
    "/auth/sign-in": {
      "filePath": "auth/sign-in.tsx",
      "parent": "/auth"
    }
  }
}
ROUTE_MANIFEST_END */
