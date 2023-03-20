import React from "react";
import Layout from "../../../components/Layout";
import { Form, Button, Message, Label, Input } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";
class NewRequest extends React.Component {
  state = {
    value: "",
    description: "",
    recepient: "",
    loading: false,
    errorMessage: "",
  };

  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }

  onSubmit = async (event) => {
    event.preventDefault();
    const campaign = await Campaign(this.props.address);
    const { description, value, recepient } = this.state;
    this.setState({ loading: true, errorMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(description, web3.utils.toWei(value, "ether"), recepient)
        .send({ from: accounts[0] });

      Router.pushRoute(`/campaigns/${this.props.address}/requests`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };
  render() {
    return (
      <Layout>
        <Link route = {`/campaigns/${this.props.address}/requests`}>
            <a>
                back
            </a>
        </Link>
        <h3>Create a Request</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <Label>Description</Label>
            <Input
              value={this.state.description}
              onChange={(event) =>
                this.setState({ description: event.target.value })
              }
            />
          </Form.Field>

          <Form.Field>
            <Label>Value in Ether</Label>
            <Input
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </Form.Field>

          <Form.Field>
            <Label>Recipient</Label>
            <Input
              value={this.state.recepient}
              onChange={(event) =>
                this.setState({ recepient: event.target.value })
              }
            />
          </Form.Field>
          <Message error header = "Oops" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create Request
          </Button>
        </Form>
      </Layout>
    );
  }
}
export default NewRequest;
