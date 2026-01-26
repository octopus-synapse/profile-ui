

export interface GetInitialsRequest {
  name: string;
}

export interface GetInitialsResponse {
  initials: string;
}

export class GetInitials {
  execute(request: GetInitialsRequest): GetInitialsResponse {
    const words = request.name.trim().split(/\s+/);
    
    if (words.length === 0 || words[0].length === 0) {
      return { initials: '?' };
    }

    if (words.length === 1) {
      return { initials: words[0].substring(0, 2).toUpperCase() };
    }

    return {
      initials: (words[0][0] + words[words.length - 1][0]).toUpperCase(),
    };
  }
}
