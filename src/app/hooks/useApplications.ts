import { useCallback, useEffect, useState } from "react";
import * as api from "../lib/api";
import type { Application, Opportunity } from "../lib/types";

export interface ApplicationWithOpportunity extends Application {
  opportunity?: Opportunity;
}

export function useApplications(studentId: string | undefined) {
  const [applications, setApplications] = useState<ApplicationWithOpportunity[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    if (!studentId) {
      setApplications([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const list = await api.getApplicationsByStudent(studentId);
    const withOpportunities = await Promise.all(
      list.map(async (a) => ({ ...a, opportunity: await api.getOpportunityById(a.opportunityId) }))
    );
    setApplications(withOpportunities);
    setLoading(false);
  }, [studentId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { applications, loading, refetch };
}
