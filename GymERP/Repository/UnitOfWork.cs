using AutoMapper;
using Data;
using Data.Entities;
using Microsoft.AspNetCore.Identity;
using Repository.Interfaces;

namespace Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;
        public UnitOfWork(DataContext context, IMapper mapper, UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            _mapper = mapper;
            _context = context;
            _userManager = userManager;
            _roleManager = roleManager;
        }
        public IUserRepository UserRepository => new UserRepository(_context, _mapper, _userManager);
        public IGymRepository GymRepository => new GymRepository(_context, _mapper);
        public IMemeberRepository MemeberRepository => new MemeberRepository(_context, _mapper, _userManager, _roleManager);
        public IPlanRepository PlanRepository => new PlanRepository(_context, _mapper);
        public IMasterRepository MasterRepository => new MasterRepository(_context, _mapper);

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }
    }
}
