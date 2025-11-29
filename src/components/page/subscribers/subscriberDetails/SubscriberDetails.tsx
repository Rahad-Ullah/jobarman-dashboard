import { ISubscriber } from "@/types/subscriber";

const calculateRemainingDays = (endDate: string) => {
  const end = new Date(endDate).getTime();
  const now = Date.now();
  const diffMs = end - now;
  // If expired
  if (diffMs <= 0) return 0;

  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
};

const SubscriberDetails = ({ item }: { item: ISubscriber }) => {
  return (
    <div className="grid gap-4">
      <section className="flex items-center gap-8 border-b pb-4">
        {/* <figure>
          <Image
            src={
              item?.image?.includes("http")
                ? item.image
                : `${IMAGE_URL}${item.image}`
            }
            alt="user-image"
            width={80}
            height={80}
            className="rounded-full"
          />
        </figure> */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{item?.user?.name}</h1>
            <h3 className="text-lg font-medium">{item.user?.email}</h3>
          </div>
        </div>
      </section>
      {/* plan details */}
      <section className="grid gap-4 h-fit">
        <div className="bg-white p-2 px-3 rounded-lg shadow-md">
          <p className="flex justify-between items-center gap-4 py-3 border-b">
            Package Name <span>{item.name}</span>
          </p>
          <p className="flex justify-between items-center gap-4 py-3 border-b">
            Price <span>${item.price}</span>
          </p>
          <p className="flex justify-between items-center gap-4 py-3 border-b">
            Start Date <span>{item.startDate?.split("T")[0]}</span>
          </p>
          <p className="flex justify-between items-center gap-4 py-3 border-b">
            End Date <span>{item.endDate?.split("T")[0]}</span>
          </p>
          <p className="flex justify-between items-center gap-4 py-3">
            Remaining Days <span>{calculateRemainingDays(item.endDate)}</span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default SubscriberDetails;
