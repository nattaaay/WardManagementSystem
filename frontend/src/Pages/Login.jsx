import { useState } from "react";
import { BASE_URL } from "../constant/constant";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: userName, password: password }),
      });

      const data = await response.json();

      console.log("login", data);

      if (data && data.statusCode === 200) {
        localStorage.setItem("username", data.user[0].username);
        localStorage.setItem("employees_role", data.user[0].employees_role);
        localStorage.setItem("token", data.token);
        setLoading(false);

        console.log(data.user[0].employees_role == 2);

        if (data.user[0].employees_role == 2) {
          console.log("one");
          navigate("/patients");
        }
        if (data.user[0].employees_role == 3) {
          console.log("two");
          navigate("/patients");
        } else if (data.user[0].employees_role == 1) {
          console.log("three");
          navigate("/teams");
        }
      } else {
        setLoading(false);
        setError("User name and password is incorrect");
      }
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96 h-screen	">
            <div>
              <img
                className="h-19 w-auto"
                src="https://media.istockphoto.com/id/1421823625/vector/circle-with-gold-wings-inside.jpg?s=612x612&w=0&k=20&c=PBOKbpem1SA1CPXpqH2pgnL2d5wQFCroHGWgS_40KLE="
                alt="Your Company"
              />
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-10">
              <div>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      User name
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        type="text"
                        autoComplete="email"
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        autoComplete="current-password"
                        required
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <p className="text-sm text-red-500">
                    {error && !loading ? error : null}
                  </p>

                  <div>
                    {loading ? (
                      <button className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Loading...
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-gradient-to-r from-orange-400 to-violet-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Sign in
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://static.vecteezy.com/system/resources/previews/002/501/834/non_2x/health-and-medical-background-free-photo.jpg"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
