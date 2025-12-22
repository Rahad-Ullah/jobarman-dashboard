import { IMAGE_URL } from "@/config/env-config";
import { IUser } from "@/types/user";
import { File } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const UserDetails = ({ user }: { user: IUser }) => {
  return (
    <div className="grid gap-4">
      <section className="flex items-center gap-8 border-b pb-4">
        <figure>
          <Image
            src={
              user?.image?.includes("http")
                ? user.image
                : `${IMAGE_URL}${user.image}`
            }
            alt="user-image"
            width={80}
            height={80}
            className="size-16 rounded-full"
          />
        </figure>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-semibold">{user.name}</h1>
            <h3 className="text-lg font-medium">{user.designation}</h3>
          </div>
        </div>
      </section>
      {/* user details */}
      <section className="grid gap-4 h-fit">
        <div className="bg-white p-2 px-3 rounded-lg shadow-md">
          <p className="flex justify-between items-center gap-4 py-3 border-b">
            Gender <span>{user.gender}</span>
          </p>
          <p className="flex justify-between items-center gap-4 py-3 border-b">
            Date of Birth <span>{user.date_of_birth?.split("T")[0]}</span>
          </p>
          <p className="flex justify-between items-center gap-4 py-3">
            Nationality <span>{user.nationality}</span>
          </p>
        </div>
        <div className="bg-white p-2 px-3 rounded-lg shadow-md">
          <p className="flex justify-between items-center gap-4 py-3 border-b">
            Mobile <span>{user.phone}</span>
          </p>
          <p className="flex justify-between items-center gap-4 py-3">
            E-mail <span>{user.email}</span>
          </p>
        </div>
        <div className="bg-white p-2 px-3 rounded-lg shadow-md">
          <p className="flex justify-between items-center gap-4 py-3">
            Address
            <span className="text-right">{user.address}</span>
          </p>
        </div>
        <div className="bg-white p-2 px-3 rounded-lg shadow-md">
          <p>
            <span className="font-semibold">Overview:</span> <br />{" "}
            <span className="text-sm">{user.bio}</span>
          </p>
        </div>
        {user.resume && (
          <div className="bg-white p-3 rounded-lg shadow-md">
            <Link
              href={`${IMAGE_URL}${user.resume}`}
              target="_blank"
              className="flex items-center gap-2 cursor-pointer"
            >
              <File className="text-red-500" />
              <span>{user.resume?.split("/").pop()}</span>
            </Link>
          </div>
        )}
      </section>
    </div>
  );
};

export default UserDetails;
