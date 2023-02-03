import React from 'react';

export interface Router {
  name?: string;
  path: string;
  children?: Array<Router>;
  element: any;
}

export interface ChildrenDataType {
  children: React.ReactNode;
}
