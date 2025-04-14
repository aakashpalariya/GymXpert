using API.Constants;
using API.Response;
using AutoMapper;
using Data.Entities;
using Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository.Interfaces;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MasterController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _uow;

        public MasterController(IMapper mapper, IUnitOfWork uow)
        {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpGet("state/select-item")]
        public async Task<ActionResult<List<SelectOptionDto<string>>>> GetStateSelect()
        {
            var selectList = await _uow.MasterRepository.GetStateSelect();

            return Ok(new ApiResponse<List<SelectOptionDto<string>>>(statusCode: (int)StatusCodeEnum.OK, message: "", data: selectList));
        }

        [HttpGet("country")]
        public async Task<ActionResult<List<MasterDto>>> GetCountry()
        {
            var data = await _uow.MasterRepository.GetCountryListAsync();
            return Ok(new ApiResponse<List<MasterDto>>(statusCode: (int)StatusCodeEnum.OK, message: "", data: data));
        }

        [HttpGet("state")]
        public async Task<ActionResult<List<MasterDto>>> GetStates()
        {
            var data = await _uow.MasterRepository.GetStateListAsync();
            return Ok(new ApiResponse<List<MasterDto>>(statusCode: (int)StatusCodeEnum.OK, message: "", data: data));
        }

        [HttpPost("country")]
        public async Task<ActionResult> AddCountry([FromBody] MasterDto dto)
        {
            await _uow.MasterRepository.AddCountryAsync(dto);
            if (await _uow.Complete())
            {
                return Ok(new ApiResponse<object>(statusCode: (int)StatusCodeEnum.OK, message: "Country details added successfully!", data: null));
            }
            return BadRequest(new ApiResponse<object>(statusCode: (int)StatusCodeEnum.BadRequest, message: "Failed to country!", data: null));
        }

        [HttpPost("state")]
        public async Task<ActionResult> AddState([FromBody] MasterDto dto)
        {
            await _uow.MasterRepository.AddStateAsync(dto);
            if (await _uow.Complete())
            {
                return Ok(new ApiResponse<object>(statusCode: (int)StatusCodeEnum.OK, message: "State details added successfully!", data: null));
            }
            return BadRequest(new ApiResponse<object>(statusCode: (int)StatusCodeEnum.BadRequest, message: "Failed to add State!", data: null));
        }

        [HttpGet("country/{id}")]
        public async Task<ActionResult<MasterDto>> GetCountryById(int id)
        {
            var data = await _uow.MasterRepository.GetCountryByIdAsync(id);
            if (data == null)
            {
                return NotFound(new ApiResponse<object>(statusCode: (int)StatusCodeEnum.NotFound, message: "Country detail not found!", data: null));
            }

            return Ok(new ApiResponse<MasterDto>(statusCode: (int)StatusCodeEnum.OK, message: "", data: data));
        }

        [HttpGet("state/{id}")]
        public async Task<ActionResult<MasterDto>> GetStateById(int id)
        {
            var data = await _uow.MasterRepository.GetStateByIdAsync(id);
            if (data == null)
            {
                return NotFound(new ApiResponse<object>(statusCode: (int)StatusCodeEnum.NotFound, message: "State detail not found!", data: null));
            }
            return Ok(new ApiResponse<MasterDto>(statusCode: (int)StatusCodeEnum.OK, message: "", data: data));
        }

        [HttpPut("country")]
        public async Task<ActionResult> UpdateCountry([FromBody] MasterDto dto)
        {
            if (await _uow.MasterRepository.UpdateCountryAsync(dto))
            {
                return Ok(new ApiResponse<object>(statusCode: (int)StatusCodeEnum.OK, message: "Country details updated successfully!", data: null));
            }
            return BadRequest(new ApiResponse<object>(statusCode: (int)StatusCodeEnum.BadRequest, message: "Failed to update Country!", data: null));
        }

        [HttpPut("state")]
        public async Task<ActionResult> UpdateState([FromBody] MasterDto dto)
        {
            if (await _uow.MasterRepository.UpdateStateAsync(dto))
            {
                return Ok(new ApiResponse<object>(statusCode: (int)StatusCodeEnum.OK, message: "State details updated successfully!", data: null));
            }
            return BadRequest(new ApiResponse<object>(statusCode: (int)StatusCodeEnum.BadRequest, message: "Failed to update State!", data: null));
        }

        [HttpDelete("country/{id}")]
        public async Task<ActionResult> DeleteCountry(int id)
        {
            if (await _uow.MasterRepository.DeleteCountryAsync(id))
            {
                return Ok(new ApiResponse<object>(statusCode: (int)StatusCodeEnum.OK, message: "Country deleted successfully!", data: null));
            }
            return BadRequest(new ApiResponse<object>(statusCode: (int)StatusCodeEnum.BadRequest, message: "Failed to delete Country!", data: null));
        }

        [HttpDelete("state/{id}")]
        public async Task<ActionResult> DeleteState(int id)
        {
            if (await _uow.MasterRepository.DeleteStateAsync(id))
            {
                return Ok(new ApiResponse<object>(statusCode: (int)StatusCodeEnum.OK, message: "State deleted successfully!", data: null));
            }
            return BadRequest(new ApiResponse<object>(statusCode: (int)StatusCodeEnum.BadRequest, message: "Failed to delete State!", data: null));
        }
    }
}
