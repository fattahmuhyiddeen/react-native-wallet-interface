let instance = null;

class State {
  constructor() {
    if (instance) {
      return instance;
    }

    instance = this;
  }

  setState(st) {
    for (var key in st) {
      if (st.hasOwnProperty(key)) {
        this[key] = st[key];
      }
    }
  }
}

export default new State();
