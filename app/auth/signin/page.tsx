import { getProviders } from "next-auth/react";
import Image from "next/image";
import SignInComponent from "./SignInComponent";

async function SignInPage() {
  const providers = await getProviders();

  return (
    <div className="grid justify-center">
      <div>
        <Image
          className="my-16 object-cover"
          src="https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/themes/2147555239/settings_images/AvZSrtWcTeWqkss86nJQ_Google.png"
          alt="Profile Picture"
          height={700}
          width={700}
        />
      </div>

      <SignInComponent providers={providers} />
    </div>
  );
}

export default SignInPage;
