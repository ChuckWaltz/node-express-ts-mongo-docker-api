class APIResponse {
  success: boolean;
  message?: string;
  payload?: any;

  constructor() {
    this.success = false;
  }
}

export default APIResponse;
