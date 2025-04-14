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
    public class PlanController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _uow;

        public PlanController(IMapper mapper, IUnitOfWork uow)
        {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpGet("")]
        public async Task<ActionResult<List<PlanDto>>> GetPlans()
        {
            try
            {
                var data = await _uow.PlanRepository.GetPlanListAsync();

                return Ok(new ApiResponse<List<PlanDto>>(statusCode: (int)StatusCodeEnum.OK, message: "", data: data));
            }
            catch (Exception ex)
            {
                var data = ex.Message;
                return BadRequest(new ApiResponse<object>(statusCode: (int)StatusCodeEnum.BadRequest, message: "Failed to add Plan!", data: null));
            }
        }

        [HttpPost("")]
        public async Task<ActionResult> AddPlan([FromBody] PlanDto plan)
        {
            try
            {
                await _uow.PlanRepository.AddPlanAsync(plan);
                if (await _uow.Complete())
                {
                    return Ok(new ApiResponse<object>(statusCode: (int)StatusCodeEnum.OK, message: "Plan added successfully!", data: null));
                }
                return BadRequest(new ApiResponse<object>(statusCode: (int)StatusCodeEnum.BadRequest, message: "Failed to add Plan!", data: null));
            }
            catch(Exception ex)
            {
                var data = ex.Message;
                return BadRequest(new ApiResponse<object>(statusCode: (int)StatusCodeEnum.BadRequest, message: "Failed to add Plan!", data: null));
            }

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Plan>> GetPlanById(int id)
        {
            var data = await _uow.PlanRepository.GetPlanByIdAsync(id);
            if (data == null)
            {
                return NotFound(new ApiResponse<object>(statusCode: (int)StatusCodeEnum.NotFound, message: "Plan detail not found!", data: null));
            }

            return Ok(new ApiResponse<PlanDto>(statusCode: (int)StatusCodeEnum.OK, message: "", data: data));
        }
    }
}
