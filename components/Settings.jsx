const {getModuleByDisplayName, React} = require('powercord/webpack');
const {Category, SwitchItem} = require('powercord/components/settings');
const {Button, AsyncComponent} = require('powercord/components');
const Input = AsyncComponent.from(getModuleByDisplayName('TextInput'));

module.exports = class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      useCustom: props.getSetting('useCustom', true),
      responsesOpen: false,
      customResponses: props.getSetting('customResponses', [])
    };
  }

  render() {
    return (
      <div>
        <SwitchItem
          value={this.state.useCustom}
          onChange={() => this._set('useCustom', !this.state.useCustom)}
        >
          Use custom responses
        </SwitchItem>
        <Category
          name='Custom responses'
          description='List of custom 8ball responses'
          opened={this.state.responsesOpen}
          onChange={() => this.setState({responsesOpen: !this.state.responsesOpen})}
        >
          <div id='eightball-responses'>
            {this.generateInputs()}
          </div>
        </Category>
        <Button
          disabled={!this.state.changes}
          onClick={() => {
            this._set('customResponses', this.state.customResponses);
            this.state.changes = false
          }}
        >
          Save
        </Button>
      </div>
    )
  }

  _set(key, value = !this.state[key], defaultValue) {
    if (!value && defaultValue) {
      value = defaultValue
    }

    this.props.updateSetting(key, value);
    this.setState({[key]: value})
  }


  generateInputs() {
    let is = [...this.state.customResponses];
    if (is.length === 0) {
      is.push({key: 0, value: ''})
    }

    const dis = is.map((n, i) => (
      <Input
        key={n.key}
        defaultValue={n.value}
        onBlur={e => {
          let a = is;

          if (e.target.value === "") {
            a.splice(i, 1);
            if (a.length === 0) {
              return
            }
          } else {
            a[i].value = e.target.value;
          }

          if (a[a.length - 1].value !== "") {
            a.push({
              key: a[a.length - 1].key + 1,
              value: ""
            })
          }

          this.setState({customResponses: a});
          this.state.changes = true
        }}
        placeholder='Response'
        style={{margin: "1%"}}
      />
    ));

    return <div>{dis}</div>
  }
};
