import React from 'react';

const ProfilePageComp = () => {
  const fields = [
    { label: 'Name', placeholder: 'first name' },
    { label: 'Surname', placeholder: 'surname' },
    { label: 'Mobile Number', placeholder: 'enter phone number' },
    { label: 'Address Line 1', placeholder: 'enter address line 1' },
    { label: 'Address Line 2', placeholder: 'enter address line 2' },
    { label: 'Postcode', placeholder: 'enter postcode' },
    { label: 'State', placeholder: 'enter state' },
    { label: 'Area', placeholder: 'enter area' },
    { label: 'Email ID', placeholder: 'enter email id' },
    { label: 'Education', placeholder: 'education' },
    { label: 'Country', placeholder: 'country' },
    { label: 'State/Region', placeholder: 'state/region' }
  ];

  return (
    <div className="container mx-auto bg-white mt-5 mb-5 p-5 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col items-center text-center p-5 border-b md:border-r md:border-b-0">
          <img
            className="rounded-full mt-5 w-36"
            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            alt="Profile"
          />
          <span className="font-bold mt-2">Edogaru</span>
          <span className="text-gray-500">edogaru@mail.com.my</span>
        </div>
        <div className="md:col-span-2 p-5">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-bold">Profile Settings</h4>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {fields.map((field, index) => (
              <div key={index}>
                <label className="block text-gray-700">{field.label}</label>
                <input
                  type="text"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </div>
          <div className="mt-5 text-center">
            <button className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full">
              Save Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageComp;
