using Data.Entities;
using Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IPlanRepository
    {
        Task AddPlanAsync(PlanDto dto);
        Task<bool> UpdatePlanAsync(PlanDto dto);
        Task<List<PlanDto>> GetPlanListAsync();
        Task<PlanDto> GetPlanByIdAsync(int id);
        Task<bool> DeletePlanAsync(int dto);
    }
}
