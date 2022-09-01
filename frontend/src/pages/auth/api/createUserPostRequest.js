export const createUserPostRequest = async (registerForm) => {
  console.log(registerForm.username);
  try {
    const resp = await fetch("/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: registerForm.username,
        email: registerForm.email,
        password: registerForm.password,
        confirm_password: registerForm.confirm_password,
      }),
    });
    if (!resp.ok) {
      throw new Error();
    }
    const data = await resp.json();
    console.log("success");
    return data;
  } catch (error) {
    alert(error.message);
  }
};
