import { useCallback, useEffect, useState } from "react";
import * as api from "../lib/api";
import type { Opportunity } from "../lib/types";

export function useOpportunities(filters: api.OpportunityFilters = {}) {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);

  const key = JSON.stringify(filters);

  const refetch = useCallback(async () => {
    setLoading(true);
    const list = await api.getOpportunities(filters);
    setOpportunities(list);
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { opportunities, loading, refetch };
}
