interface Props {
  inputs: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    city: string;
    password: string;
  };
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isSignin: boolean;
}

function AuthModalInputs({ inputs, handleChangeInput, isSignin }: Props) {
  return (
    <>
      <div>
        {isSignin ? null : (
          <div className="my-3 flex justify-between text-sm">
            <input
              type="text"
              className="border rounded  p-2 py-3 w-[49%] "
              placeholder="First Name"
              value={inputs.firstName}
              onChange={handleChangeInput}
              name="firstName"
            />
            <input
              type="text"
              className="border rounded  p-2 py-3 w-[49%] "
              placeholder="Last Name"
              value={inputs.lastName}
              onChange={handleChangeInput}
              name="lastName"
            />
          </div>
        )}

        <div className="my-3 flex justify-between text-sm">
          <input
            type="text"
            className="border rounded  p-2 py-3 w-full"
            placeholder="email"
            value={inputs.email}
            onChange={handleChangeInput}
            name="email"
          />
        </div>

        {isSignin ? null : (
          <>
            <input
              type="text"
              className="border rounded  p-2 py-3 w-[49%] "
              placeholder="phone"
              value={inputs.phone}
              onChange={handleChangeInput}
              name="phone"
            />
            <input
              type="text"
              className="border rounded  p-2 py-3 w-[49%] "
              placeholder="city"
              value={inputs.city}
              onChange={handleChangeInput}
              name="city"
            />
          </>
        )}
      </div>

      <div className="my-3 flex justify-between text-sm">
        <input
          type="text"
          className="border rounded  p-2 py-3 w-full"
          placeholder="password"
          value={inputs.password}
          onChange={handleChangeInput}
          name="password"
        />
      </div>
    </>
  );
}

export default AuthModalInputs;
