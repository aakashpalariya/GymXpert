using Data.Entities;
using Dtos.Params;
using Dtos;
using Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IMemeberRepository
    {
        Task<IEnumerable<MemberDto>> GetMembersAsync(int gymId);
        Task<MemberDto> GetMemberByIdAsync(int id);
        Task<bool> CreateMemberAsync(MemberDto member, int gymId);
    }
}
