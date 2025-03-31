using AutoMapper;
using Data;
using Data.Entities;
using Dtos;
using Extensions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class MemeberRepository : IMemeberRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;

        public MemeberRepository(DataContext context, IMapper mapper, UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            _context = context;
            _mapper = mapper;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<MemberDto> GetMemberByIdAsync(int id)
        {
            var member = await _context.Users.FindAsync(id);
            return _mapper.Map<MemberDto>(member);
        }

        public async Task<IEnumerable<MemberDto>> GetMembersAsync(int gymId)
        {
            var users = await _context.Users.Where(u => u.IsDeleted == false).Where(u => _context.UserGyms
                        .Any(ug => ug.UserId == u.Id && ug.GymId == gymId && ug.IsActive == true))
                        .ToListAsync();
            return _mapper.Map<List<MemberDto>>(users);
        }

        public async Task<bool> CreateMemberAsync(MemberDto member, int gymId)
        {
            var user = _mapper.Map<User>(member);
            user.UserName = StringExtension.GenerateRandomAlphanumeric(8);
            var result = await _userManager.CreateAsync(user, user.FirstName + "@123");

            await _userManager.AddToRoleAsync(user, "Member");

            if (result.Succeeded)
            {
                await _context.UserGyms.AddAsync(new UserGym()
                {
                    GymId = gymId,
                    UserId = user.Id,
                    IsActive = true
                });

                return true;
            }
            return false;
        }
    }
}
