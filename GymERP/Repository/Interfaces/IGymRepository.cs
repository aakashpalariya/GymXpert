using Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IGymRepository
    {
        Task AddGymAsync(GymDto gymDto);
        Task<bool> UpdateGymAsync(GymDto gymDto);
        Task<List<GymDto>> GetGymsAsync();
        Task<GymDto> GetGymByIdAsync(int id);
        Task<bool> DeleteGymAsync(int gymId);
        Task<List<SelectOptionDto<int>>> GetGymsSelect();

        Task AddUserGymAsync(int userId, int gymId);
        Task<bool> RemoveUserGymAsync(int gymId, int userId);
    }
}
