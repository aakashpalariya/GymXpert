using AutoMapper;
using Data;
using Data.Entities;
using Dtos;
using Microsoft.EntityFrameworkCore;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class PlanRepository : IPlanRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public PlanRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task AddPlanAsync(PlanDto dto)
        {
            var plan = _mapper.Map<Plan>(dto);
            await _context.Plans.AddAsync(plan);
        }

        public Task<bool> DeletePlanAsync(int dto)
        {
            throw new NotImplementedException();
        }

        public async Task<PlanDto> GetPlanByIdAsync(int id)
        {
            var plan = await _context.Plans.FindAsync(id);
            return _mapper.Map<PlanDto>(plan);
        }

        public async Task<List<PlanDto>> GetPlanListAsync()
        {
            var list = await _context.Plans.Where(p => p.IsActive == true).Include(p => p.Durations).ToListAsync();
            var result = list.Select(p => new PlanDto
            {
                PlanId = p.PlanId,
                PlanName = p.PlanName,
                MonthlyPrice = p.MonthlyPrice,
                MaxMembers = p.MaxMembers,
                MaxGymAdmins = p.MaxGymAdmins,
                Features = p.Features,
                Durations = p.Durations.Select(d => new PlanDurationDto
                {
                    DurationId = d.DurationId,
                    DurationMonths = d.DurationMonths,
                    DiscountPercent = d.DiscountPercent,
                    TotalPrice = d.TotalPrice
                }).ToList()
            });
            return _mapper.Map<List<PlanDto>>(list);
        }

        public Task<bool> UpdatePlanAsync(PlanDto dto)
        {
            throw new NotImplementedException();
        }
    }
}
