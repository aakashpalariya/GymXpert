interface Plan {
    planId: number
    planName: string
    monthlyPrice: number
    maxMembers: number
    maxGymAdmins: number
    features: string
    durations: PlanDuration[]
  }