const {React} = require('powercord/webpack');
const {Button} = require('powercord/components');
const {TextInput} = require('powercord/components/settings');
const { SwitchItem } = require('powercord/components/settings');

module.exports = class EightballSettings extends React.Component {
		render() {
				return (
						<div>
						<SwitchItem
		          value={this.props.getSetting('useAPI', false)}
		          onChange={() => this.props.toggleSetting('useAPI')}
							note={
								<div>
								Enabled this to get the answers from the nekos.life api because why not.....
								<br/>
								See the list here without api: <a href={"#"} onClick={() => shell.openExternal("https://github.com/alexflipnote")}>Github</a>
								</div>
							}
		        >
		          Use nekos.life API
		        </SwitchItem>
						</div>
				)
		}
}
