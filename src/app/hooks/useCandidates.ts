import { useCallback, useEffect, useState } from "react";
import * as api from "../lib/api";
import type { Application, ApplicationStatus, StudentProfile, User } from "../lib/types";

export interface Candidate extends Application {
  student?: User;
  profile?: StudentProfile;
}

async function joinStudent(application: Application): Promise<Candidate> {
  const [profile, student] = await Promise.all([
    api.getStudentProfile(application.studentId),
    api.getUserById(application.studentId),
  ]);
  return { ...application, profile, student };
}

export function useCandidatesForOpportunity(opportunityId: string | undefined) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    if (!opportunityId) {
      setCandidates([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const list = await api.getApplicationsForOpportunity(opportunityId);
    const joined = await Promise.all(list.map(joinStudent));
    setCandidates(joined);
    setLoading(false);
  }, [opportunityId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const setStatus = async (applicationId: string, status: ApplicationStatus) => {
    await api.updateApplicationStatus(applicationId, status);
    await refetch();
  };

  return { candidates, loading, refetch, setStatus };
}

export function useCandidatesForOfferer(offererId: string | undefined) {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    if (!offererId) {
      setCandidates([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const list = await api.getApplicationsForOfferer(offererId);
    const joined = await Promise.all(list.map(joinStudent));
    setCandidates(joined);
    setLoading(false);
  }, [offererId]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { candidates, loading, refetch };
}
