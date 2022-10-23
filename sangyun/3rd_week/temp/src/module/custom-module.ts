
import {ServiceInterface} from "custom-module";

const sc : ServiceInterface = {
  test(req, res) {
    res.send("TEST");
  },
};

export default sc;