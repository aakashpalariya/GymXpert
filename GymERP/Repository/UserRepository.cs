using AutoMapper.QueryableExtensions;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Repository.Interfaces;
using Data;
using Dtos;
using Helpers;
using Dtos.Params;
using Data.Entities;

namespace Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<MemberDto> GetMemberAsync(string username, bool isCurrentUser)
        {
            var query = _context.Users
            .Where(x => x.UserName == username)
            .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
            .AsQueryable();

            if (isCurrentUser) query = query.IgnoreQueryFilters();
            return await query.FirstOrDefaultAsync();
        }

        public async Task<PagedList<MemberDto>> GetMembersAsync(UserParams userParams)
        {
            var query = _context.Users.AsQueryable();

            query = query.Where(u => u.UserName != userParams.CurrentUsername);
            query = query.Where(u => u.Gender == userParams.Gender);

            var minDob = DateOnly.FromDateTime(DateTime.Today.AddYears(-userParams.MaxAge - 1));
            var maxDob = DateOnly.FromDateTime(DateTime.Today.AddYears(-userParams.MinAge - 1));

            query = query.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);

            query = userParams.OrderBy switch
            {
                "created" => query.OrderByDescending(u => u.CreatedAt),

                _ => query.OrderByDescending(u => u.CreatedAt)
            };
            return await PagedList<MemberDto>.CreateAsync(
                query.AsNoTracking().ProjectTo<MemberDto>(_mapper.ConfigurationProvider),
                userParams.PageNumber, userParams.PageSize);
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(p => p.UserPhotos)
                .SingleOrDefaultAsync(s => s.UserName == username);
        }

        public async Task<string> GetUserGender(string username)
        {
            return await _context.Users.Where(x => x.UserName == username)
            .Select(s => s.Gender)
            .FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<User>> GetUsersAsync()
        {
            return await _context.Users
                .Include(p => p.UserPhotos)
                .ToListAsync();
        }

        public void Update(User user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }

        public async Task<User> GetUserByPhotoId(int photoId)
        {
            return await _context.Users
            .Include(p => p.UserPhotos)
            .IgnoreQueryFilters()
            .Where(p => p.UserPhotos.Any(p => p.PhotoId == photoId))
            .FirstOrDefaultAsync();
        }
    }
}
