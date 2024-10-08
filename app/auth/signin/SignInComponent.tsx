"use client";

import { getProviders, signIn } from "next-auth/react";

type Props = {
  providers: Awaited<ReturnType<typeof getProviders>>;
};

function SignInComponent({ providers }: Props) {
  if (!providers) {
    return <div>No authentication providers available.</div>;
  }

  return (
    <div className="flex justify-center">
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded"
            onClick={() =>
              signIn(provider.id, {
                callbackUrl: `${
                  process.env.NEXTAUTH_URL || "http://localhost:3000"
                }`,
              })
            }
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default SignInComponent;
