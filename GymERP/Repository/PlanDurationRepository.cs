using AutoMapper;
using Data;
using Data.Entities;
using Dtos;
using Microsoft.EntityFrameworkCore;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class PlanDurationRepository : IPlanDurationRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public PlanDurationRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task AddPlanDurationAsync(PlanDurationDto dto)
        {
            var plan = _mapper.Map<PlanDuration>(dto);
            await _context.PlanDuration.AddAsync(plan);
        }

        public Task<bool> DeletePlanDurationAsync(int dto)
        {
            throw new NotImplementedException();
        }

        public async Task<PlanDurationDto> GetPlanDurationByIdAsync(int id)
        {
            var plan = await _context.PlanDuration.FindAsync(id);
            return _mapper.Map<PlanDurationDto>(plan);
        }

        public async Task<List<PlanDurationDto>> GetPlanDurationListAsync(int planId)
        {
            var list = await _context.PlanDuration.Where(s => s.PlanId == planId).ToListAsync();
            return _mapper.Map<List<PlanDurationDto>>(list);
        }

        public Task<bool> UpdatePlanDurationAsync(PlanDurationDto dto)
        {
            throw new NotImplementedException();
        }
    }
}
