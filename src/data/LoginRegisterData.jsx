export const loginFields = [
  { name: "username", label: "Username", type: "text" },
  { name: "password", label: "Password", type: "password" },
];

export const registerFields = [
  { name: "email", label: "Email", type:"email" },
  ...loginFields,
  { name: "confirm_password", label: "Confirm Password", type: "password" },
];
