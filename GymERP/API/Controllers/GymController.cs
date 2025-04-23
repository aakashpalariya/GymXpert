using AutoMapper;
using Dtos.Params;
using Dtos;
using Extensions;
using Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository.Interfaces;
using Services.Interfaces;
using Data.Entities;
using API.Constants;
using API.Response;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Authorize(Policy = "OnlyAdmin")]
    [Route("api/[controller]")]
    [ApiController]
    public class GymController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _uow;

        public GymController(IMapper mapper, IUnitOfWork uow)
        {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpGet("select-item")]
        public async Task<ActionResult<List<SelectOptionDto<int>>>> GetGymSelect()
        {
            var gyms = await _uow.GymRepository.GetGymsSelect();

            return Ok(new ApiResponse<List<SelectOptionDto<int>>>(statusCode: (int)StatusCodeEnum.OK, message: "", data: gyms));
        }

        [HttpGet("")]
        public async Task<ActionResult<List<GymDto>>> GetGyms()
        {
            var gyms = await _uow.GymRepository.GetGymsAsync();

            return Ok(new ApiResponse<List<GymDto>>(statusCode: (int)StatusCodeEnum.OK, message: "", data: gyms));
        }

        [HttpPost("")]
        public async Task<ActionResult> AddGym([FromBody] GymDto gym)
        {
            var data = await _uow.GymRepository.AddGymAsync(gym);
            if(await _uow.Complete())
            {
                return Ok(new ApiResponse<object>(statusCode: (int)StatusCodeEnum.OK, message: "Gym details added successfully!", data: data.GymId));
            }
            return BadRequest(new ApiResponse<object>(statusCode: (int)StatusCodeEnum.BadRequest, message: "Failed to add Gym!", data: null));
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult> RegisterGym([FromForm] GymRegistrationRequest gymRegister)
        {
            //var data = await _uow.GymRepository.AddGymAsync(new GymDto());
            //if (await _uow.Complete())
            //{
            //    return Ok(new ApiResponse<object>(statusCode: (int)StatusCodeEnum.OK, message: "Gym details added successfully!", data: data.GymId));
            //}
            return Ok(new ApiResponse<object>(statusCode: (int)StatusCodeEnum.OK, message: "Failed to add Gym!", data: null));
        }

        [HttpGet("{gymId}")]
        public async Task<ActionResult<Gym>> GetGymById(int gymId)
        {
            var gym = await _uow.GymRepository.GetGymByIdAsync(gymId);
            if (gym == null)
            {
            return NotFound(new ApiResponse<object>(statusCode: (int)StatusCodeEnum.NotFound, message: "Gym detail not found!", data: null));
            }

            return Ok(new ApiResponse<GymDto>(statusCode: (int)StatusCodeEnum.OK, message: "", data: gym));
        }

        [HttpPut("")]
        public async Task<ActionResult> UpdateGym([FromBody] GymDto gym)
        {
            if (await _uow.GymRepository.UpdateGymAsync(gym))
            {
                return Ok(new ApiResponse<object>(statusCode: (int)StatusCodeEnum.OK, message: "Gym details updated successfully!", data: null));
            }
            return BadRequest(new ApiResponse<object>(statusCode: (int)StatusCodeEnum.BadRequest, message: "Failed to update Gym!", data: null));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteGym(int id)
        {
            if (await _uow.GymRepository.DeleteGymAsync(id))
            {
                return Ok(new ApiResponse<object>(statusCode: (int)StatusCodeEnum.OK, message: "Gym deleted successfully!", data: null));
            }
            return BadRequest(new ApiResponse<object>(statusCode: (int)StatusCodeEnum.BadRequest, message: "Failed to delete Gym!", data: null));
        }
    }
}
