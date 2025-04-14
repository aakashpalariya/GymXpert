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
    public class MasterRepository : IMasterRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public MasterRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<List<SelectOptionDto<string>>> GetStateSelect()
        {
            var list = await _context.States.Where(s => s.IsDeleted == false && s.IsActive == true).ToListAsync();
            return _mapper.Map<List<SelectOptionDto<string>>>(list);
        }

        public async Task AddCountryAsync(MasterDto dto)
        {
            var data = _mapper.Map<Country>(dto);
            await _context.Countries.AddAsync(data);
        }

        public async Task AddStateAsync(MasterDto dto)
        {
            var data = _mapper.Map<State>(dto);
            await _context.States.AddAsync(data);
        }

        public Task<bool> DeleteCountryAsync(int dto)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> DeleteStateAsync(int id)
        {
            var data = await _context.States.FindAsync(id);
            data.IsDeleted = true;
            _context.Entry(data).State = EntityState.Modified;
            if (await _context.SaveChangesAsync() > 0)
            {
                return true;
            };
            return false;
        }

        public async Task<MasterDto> GetCountryByIdAsync(int id)
        {
            var data = await _context.Countries.FindAsync(id);
            return _mapper.Map<MasterDto>(data);
        }

        public async Task<List<MasterDto>> GetCountryListAsync()
        {
            var list = await _context.Countries.Where(p => p.IsActive == true).ToListAsync();
            return _mapper.Map<List<MasterDto>>(list);
        }

        public async Task<MasterDto> GetStateByIdAsync(int id)
        {
            var data = await _context.States.FindAsync(id);
            return _mapper.Map<MasterDto>(data);
        }

        public async Task<List<MasterDto>> GetStateListAsync()
        {
            var list = await _context.States.Where(p => p.IsDeleted == false && p.CountryId == 1).ToListAsync();
            return _mapper.Map<List<MasterDto>>(list);
        }

        public Task<bool> UpdateCountryAsync(MasterDto dto)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> UpdateStateAsync(MasterDto dto)
        {
            var data = _mapper.Map<State>(dto);
            data.CountryId = 1;
            _context.Entry(data).State = EntityState.Modified;
            if (await _context.SaveChangesAsync() > 0)
            {
                return true;
            };
            return false;
        }
    }
}
