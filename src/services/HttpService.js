import globalState from "../state";
let instance = null;

const baseURL = "http://ifoundit.tcennoc.unifi.space/";
const endPoints = {
  checkBalance: "cls/wallet/get-balance"
};
class HttpService {
  constructor() {
    if (instance) {
      return instance;
    }

    instance = this;
  }

  get(url) {
    this.api("get", url);
  }
  post(url, body = {}) {
    this.api("post", url, body);
  }

  api = (method, url, body) => {
    if (endPoints[url] != null) {
      url = baseURL + endPoints[url];
    }

    var request = new XMLHttpRequest();
    request.setRequestHeader;
    request.onreadystatechange = e => {
      if (request.readyState !== 4) {
        return;
      }
      alert(JSON.stringify(request.responseText));

      if (request.status === 200) {
        console.log("success", request.responseText);
      } else {
        console.warn("error");
      }
    };

    request.open(method.toUpperCase(), url);
    request.setRequestHeader("Authorization", `Bearer ${globalState.token}`);
    request.setRequestHeader("Content-Type", `application/json`);
    request.setRequestHeader("Accept", `application/json`);
    request.send();
  };
}

export default new HttpService();
