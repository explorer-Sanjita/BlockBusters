import web3 from "./web3";
import campaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(campaignFactory.interface),
  "0x732d267EEC9eBa2ddf9442Ba55B86e3018542079"
);

export default instance;
