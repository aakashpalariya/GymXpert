using API.Constants;
using API.Response;
using AutoMapper;
using Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository.Interfaces;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MemberController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _uow;

        public MemberController(IMapper mapper, IUnitOfWork uow)
        {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpGet("{gymId}")]
        public async Task<ActionResult<List<MemberDto>>> GetMembers(int gymId)
        {
            var members = await _uow.MemeberRepository.GetMembersAsync(gymId);

            return Ok(new ApiResponse<List<MemberDto>>(statusCode: (int)StatusCodeEnum.OK, message: "", data: members.ToList()));
        }

        [HttpGet("member/{id}")]
        public async Task<ActionResult<List<MemberDto>>> GetMemberById(int id)
        {
            var member = await _uow.MemeberRepository.GetMemberByIdAsync(id);

            return Ok(new ApiResponse<MemberDto>(statusCode: (int)StatusCodeEnum.OK, message: "", data: member));
        }

        [HttpPost("{gymId}")]
        public async Task<ActionResult<List<MemberDto>>> AddMember([FromBody]MemberDto member, int gymId)
        {
            await _uow.MemeberRepository.CreateMemberAsync(member, gymId);
            if (await _uow.Complete())
            {
                return Ok(new ApiResponse<object>(statusCode: (int)StatusCodeEnum.OK, message: "Member added successfully!", data: null));
            }
            return BadRequest(new ApiResponse<object>(statusCode: (int)StatusCodeEnum.BadRequest, message: "Failed to add member!", data: null));
        }
    }
}
