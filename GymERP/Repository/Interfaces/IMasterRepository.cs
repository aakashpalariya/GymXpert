using Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IMasterRepository
    {
        Task<List<SelectOptionDto<string>>> GetStateSelect();

        Task AddCountryAsync(MasterDto dto);
        Task<bool> UpdateCountryAsync(MasterDto dto);
        Task<List<MasterDto>> GetCountryListAsync();
        Task<MasterDto> GetCountryByIdAsync(int id);
        Task<bool> DeleteCountryAsync(int id);

        Task AddStateAsync(MasterDto dto);
        Task<bool> UpdateStateAsync(MasterDto dto);
        Task<List<MasterDto>> GetStateListAsync();
        Task<MasterDto> GetStateByIdAsync(int id);
        Task<bool> DeleteStateAsync(int id);
    }
}
