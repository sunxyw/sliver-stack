/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthSignInImport } from './routes/auth/sign-in'

// Create/Update Routes

const AuthSignInRoute = AuthSignInImport.update({
  id: '/auth/sign-in',
  path: '/auth/sign-in',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/auth/sign-in': {
      id: '/auth/sign-in'
      path: '/auth/sign-in'
      fullPath: '/auth/sign-in'
      preLoaderRoute: typeof AuthSignInImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/auth/sign-in': typeof AuthSignInRoute
}

export interface FileRoutesByTo {
  '/auth/sign-in': typeof AuthSignInRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/auth/sign-in': typeof AuthSignInRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/auth/sign-in'
  fileRoutesByTo: FileRoutesByTo
  to: '/auth/sign-in'
  id: '__root__' | '/auth/sign-in'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthSignInRoute: typeof AuthSignInRoute
}

const rootRouteChildren: RootRouteChildren = {
  AuthSignInRoute: AuthSignInRoute,
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
        "/auth/sign-in"
      ]
    },
    "/auth/sign-in": {
      "filePath": "auth/sign-in.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
