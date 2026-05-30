import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const useTab = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialTab = searchParams.get("tab") || "";

  const [tab, setTab] = useState(initialTab);

  const handleSwithTab = (tab: string) => {
    setTab(tab);
  };

  const updateUrl = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (tab) params.set("tab", tab);
    else params.delete("tab");

    router.replace(`?${params.toString()}`);
  }, [router, tab, searchParams]);

  useEffect(() => {
    updateUrl();
  }, [updateUrl]);

  return {
    handleSwithTab,
    tab,
  };
};
