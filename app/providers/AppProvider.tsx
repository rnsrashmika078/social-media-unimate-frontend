// contexts/AppProviders.tsx
"use client";

import { ReactNode } from "react";
import { CommentProvider } from "./CommentProvider";
import { LikeProvider } from "./LikeProvider";
import { ModalProvider } from "./ModalProvider";
import { NotificationProvider } from "./NotificationProvider";
import { TabProvider } from "./TabProvider";

export const AppProviders = ({ children }: { children: ReactNode }) => (
  <TabProvider>
    <LikeProvider>
      <CommentProvider>
        <ModalProvider>
          <NotificationProvider>{children}</NotificationProvider>
        </ModalProvider>
      </CommentProvider>
    </LikeProvider>
  </TabProvider>
);
