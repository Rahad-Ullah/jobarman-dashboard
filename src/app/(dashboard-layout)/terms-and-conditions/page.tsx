import TermsAndConditions from "@/components/page/terms-and-conditions/TermsAndConditions";
import { nextFetch } from "@/utils/nextFetch";

const TermsAndConditionsPage = async () => {
  const res = await nextFetch("/disclaimer?type=terms", { tags: ["terms"] });

  return (
    <>
      <TermsAndConditions data={res?.data} />
    </>
  );
};

export default TermsAndConditionsPage;
