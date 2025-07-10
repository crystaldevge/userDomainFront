class BaseInfoService {
  private info: any = null;

  setBaseInfo(data: any) {
    this.info = data;
  }

  getBaseInfo() {
    return this.info;
  }
}

export default new BaseInfoService();
