import { TabsEntity } from '../../entities/tabs/TabsState';

export interface HandleTabChangeRequest {
  tabs: TabsEntity;
  newValue: string;
  handler?: (value: string) => void | Promise<void>;
}

export interface HandleTabChangeResponse {
  updatedTabs: TabsEntity;
  success: boolean;
}

export class HandleTabChange {
  async execute(request: HandleTabChangeRequest): Promise<HandleTabChangeResponse> {
    try {
      if (request.handler) {
        await request.handler(request.newValue);
      }
      return {
        updatedTabs: request.tabs.withSelectedValue(request.newValue),
        success: true,
      };
    } catch (_error) {
      return { updatedTabs: request.tabs, success: false };
    }
  }
}
