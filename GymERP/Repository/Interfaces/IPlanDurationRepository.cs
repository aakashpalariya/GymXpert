using Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IPlanDurationRepository
    {
        Task AddPlanDurationAsync(PlanDurationDto dto);
        Task<bool> UpdatePlanDurationAsync(PlanDurationDto dto);
        Task<List<PlanDurationDto>> GetPlanDurationListAsync(int planId);
        Task<PlanDurationDto> GetPlanDurationByIdAsync(int id);
        Task<bool> DeletePlanDurationAsync(int dto);
    }
}
