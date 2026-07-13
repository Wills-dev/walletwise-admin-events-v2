import { useRouter, useSearchParams } from "next/navigation";

export const useTab = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab") || "";

  const handleSwitchTab = (newTab: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newTab) {
      params.set("tab", newTab);
    } else {
      params.delete("tab");
    }

    router.replace(`?${params.toString()}`);
  };

  return {
    tab,
    handleSwitchTab,
  };
};
