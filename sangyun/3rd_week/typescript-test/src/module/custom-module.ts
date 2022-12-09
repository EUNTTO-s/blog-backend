import {serviceInterface} from "./custom-module.d";

const sc : serviceInterface = {

async test(req, res) {
  res.send("TEST");
  return "ttt";
},

};

export default sc;