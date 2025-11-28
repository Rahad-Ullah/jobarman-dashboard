import PrivacyPolicy from "@/components/page/privacy-policy/PrivacyPolicy";
import { nextFetch } from "@/utils/nextFetch";

const PrivacyPolicyPage = async () => {
  const res = await nextFetch("/disclaimer?type=privacy", {
    tags: ["privacy"],
  });

  return (
    <>
      <PrivacyPolicy data={res?.data} />
    </>
  );
};

export default PrivacyPolicyPage;
