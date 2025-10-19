import { File } from "lucide-react";
import Image from "next/image";

const UserDetails = () => {
  return (
    <div className="grid gap-4">
      <section className="flex items-center gap-8 border-b pb-4">
        <figure>
          <Image
            src="/avatar.png"
            alt="avatar"
            width={80}
            height={80}
            className="rounded-full"
          />
        </figure>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Rahad Ullah</h1>
            <h3 className="text-lg font-medium">Web Developer</h3>
          </div>
        </div>
      </section>
      {/* user details */}
      <section className="grid gap-4 h-fit">
        <div className="bg-white p-2 px-3 rounded-lg shadow-md">
          <p className="flex justify-between items-center gap-4 py-3 border-b">
            Gender <span>Male</span>
          </p>
          <p className="flex justify-between items-center gap-4 py-3 border-b">
            Date of Birth <span>01 January 2000</span>
          </p>
          <p className="flex justify-between items-center gap-4 py-3">
            Nationality <span>African</span>
          </p>
        </div>
        <div className="bg-white p-2 px-3 rounded-lg shadow-md">
          <p className="flex justify-between items-center gap-4 py-3 border-b">
            Mobile <span>+99123456789</span>
          </p>
          <p className="flex justify-between items-center gap-4 py-3 border-b">
            Whatsapp <span>+99123456789</span>
          </p>
          <p className="flex justify-between items-center gap-4 py-3">
            E-mail <span>example@gmail.com</span>
          </p>
        </div>
        <div className="bg-white p-2 px-3 rounded-lg shadow-md">
          <p className="flex justify-between items-center gap-4 py-3">
            Address
            <span className="text-right">
              Flat 1204, Al Noor Tower, Sheikh Zayed Road, South Africa.
            </span>
          </p>
        </div>
        <div className="bg-white p-2 px-3 rounded-lg shadow-md">
          <p>
            <span className="font-semibold">Overview:</span> <br />{" "}
            <span className="text-sm">
              I’m a web developer with over 5 years of experience creating
              responsive, high-performing websites and web applications. Skilled
              in both front-end and back-end development, I focus on clean code,
              seamless user experiences, and reliable performance.
            </span>
          </p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow-md">
          <p className="flex items-center gap-2 cursor-pointer">
            <File className="text-red-500" />
            <span>License.pdf</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default UserDetails;
