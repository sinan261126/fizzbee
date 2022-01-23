import Appearance from './settings/appearance';
import SelectFont from './settings/font';
import OtherSettings from './settings/otherSettings';
import UserData from './settings/user';

function Settings() {
  return (
    <div className="display-cut">
      <UserData />
      <Appearance />
      <SelectFont />
      <OtherSettings />
      <div className="text-center"></div>
    </div>
  );
}
export default Settings;
