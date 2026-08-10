import React, { useContext, useState } from "react";
import AuthContext from "../context/Authentication/authContext.js";
import { updateProfile } from "../api/api.js";
import Button from "./Button.jsx";

const ProfileComponent = () => {
  const { user, setUser } = useContext(AuthContext);

  const [edit, setEdit] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    gender: user?.gender || "",
    dob: user?.dob || "",
    address: {
      line1: user?.address?.line1 || "",
      line2: user?.address?.line2 || "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "line1" || name === "line2") {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    try {
      const res = await updateProfile(formData);
      setUser(res.data);
      setEdit(false);
    } catch (error) {
      // profile update failed silently
    }
  };

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm pt-5">
      {edit ? (
        <input
          className="font-medium text-3xl text-[#262626] mt-4 border border-gray-300 rounded px-2 py-1 w-full"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      ) : (
        <p className="font-medium text-3xl text-[#262626] mt-4">{user?.name}</p>
      )}

      <hr className="bg-[#ADADAD] h-[1px] border-none" />

      <div>
        <p className="text-gray-600 underline mt-3">CONTACT INFORMATION</p>

        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-[#363636]">
          <p className="font-medium">Email id:</p>
          <p className="text-blue-500">{user?.email}</p>

          <p className="font-medium">Phone:</p>
          {edit ? (
            <input
              className="border border-gray-300 rounded px-2 py-0.9 text-gray-500 "
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          ) : (
            <p className="text-gray-500">{user?.phone || "Not Selected"}</p>
          )}

          <p className="font-medium">Address:</p>
          {edit ? (
            <div className="flex flex-col gap-1">
              <input
                className="border border-gray-300 rounded px-2 py-0.9 text-gray-500"
                name="line1"
                value={formData.address.line1}
                onChange={handleChange}
                placeholder="Address line 1"
              />
              <input
                className="border border-gray-300 rounded px-2 py-0.9 text-gray-500"
                name="line2"
                value={formData.address.line2}
                onChange={handleChange}
                placeholder="Address line 2"
              />
            </div>
          ) : (
            <p className="text-gray-500">
              {user?.address?.line1
                ? `${user.address.line1}${user.address.line2 ? ", " + user.address.line2 : ""}`
                : "Not Selected"}
            </p>
          )}
        </div>
      </div>

      <div>
        <p className="text-[#797979] underline mt-3">BASIC INFORMATION</p>

        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-gray-600">
          <p className="font-medium">Gender:</p>
          {edit ? (
            <select
              className="border border-gray-300 rounded px-2 py-0.9 text-gray-500"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Not Selected</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className="text-gray-500">{user?.gender || "Not Selected"}</p>
          )}

          <p className="font-medium">Birthday:</p>
          {edit ? (
            <input
              className="border border-gray-300 rounded px-2 py-0.9 text-gray-500"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
            />
          ) : (
            <p className="text-gray-500">{user?.dob || "Not Selected"}</p>
          )}
        </div>
      </div>

      <div className="mt-10" onClick={edit ? handleSave : () => setEdit(true)}>
        <Button
          title={edit ? "Save Changes" : "Edit"}
          className={
            "border border-[#5F6FFF] px-8 py-2 rounded-full hover:bg-[#5F6FFF] hover:text-white transition-all"
          }
        />
      </div>
    </div>
  );
};

export default ProfileComponent;
