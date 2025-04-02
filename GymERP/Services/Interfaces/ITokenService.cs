using Data.Entities;
using Services.Interfaces;

namespace Services.Interfaces
{
    public interface ITokenService
    {
        Task<string> CreateToken(User user, int gymId);
    }
}
