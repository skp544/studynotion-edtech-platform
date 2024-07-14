import ChangeProfilePicture from "../components/Dashboard/ChangeProfilePicture";
import UpdatePassword from "../components/Dashboard/UpdatePassword";
import EditProfile from "../components/Dashboard/EditProfile";
import DeleteAccount from "../components/Dashboard/DeleteAccount";

const Settings = () => {
  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>

      <ChangeProfilePicture />

      <EditProfile />
      {/* Password */}
      <UpdatePassword />
      {/* Delete Account */}
      <DeleteAccount />
    </>
  );
};

export default Settings;
