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
    public class GymRepository : IGymRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public GymRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task AddGymAsync(GymDto gymDto)
        {
            var gym = _mapper.Map<Gym>(gymDto);
            await _context.Gyms.AddAsync(gym);
        }
        public async Task AddUserGymAsync(int userId, int gymId)
        {
            var result = await _context.UserGyms.AddAsync(new UserGym()
            {
                GymId = gymId,
                UserId = userId,
                IsActive = true
            });
        }

        public async Task<bool> DeleteGymAsync(int gymId)
        {
            var gym = await _context.Gyms.FindAsync(gymId);
            gym.IsDeleted = true;
            _context.Entry(gym).State = EntityState.Modified;
            if (await _context.SaveChangesAsync() > 0)
            {
                return true;
            };
            return false;
        }

        public async Task<bool> RemoveUserGymAsync(int gymId, int userId)
        {
            var userGym = await _context.UserGyms.FindAsync(userId, gymId);
            userGym.IsActive = false;
            _context.Entry(userGym).State = EntityState.Modified;
            if (await _context.SaveChangesAsync() > 0)
            {
                return true;
            };
            return false;
        }

        public async Task<GymDto> GetGymByIdAsync(int id)
        {
            var gym = await _context.Gyms.FindAsync(id);
            return _mapper.Map<GymDto>(gym);

        }

        public async Task<List<GymDto>> GetGymsAsync()
        {
            var gymList = await _context.Gyms.Where(s => s.IsDeleted == false).ToListAsync();
            return _mapper.Map<List<GymDto>>(gymList);
        }

        public async Task<List<SelectOptionDto<int>>> GetGymsSelect()
        {
            var gymList = await _context.Gyms.Where(s => s.IsDeleted == false && s.IsActive == true).ToListAsync();
            return _mapper.Map<List<SelectOptionDto<int>>>(gymList);
        }

        public async Task<bool> UpdateGymAsync(GymDto gymDto)
        {
            var gym = _mapper.Map<Gym>(gymDto);
            _context.Entry(gym).State = EntityState.Modified;
            if (await _context.SaveChangesAsync() > 0)
            {
                return true;
            };
            return false;
        }
    }
}
