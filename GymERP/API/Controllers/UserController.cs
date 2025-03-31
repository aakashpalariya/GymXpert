using API.Constants;
using API.Response;
using AutoMapper;
using AutoMapper.Execution;
using Data.Entities;
using Dtos;
using Extensions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository.Interfaces;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _uow;

        public UserController(IMapper mapper, IUnitOfWork uow)
        {
            _uow = uow;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            var user = await _uow.UserRepository.GetUserByIdAsync(id);

            return Ok(new ApiResponse<User>(statusCode: (int)StatusCodeEnum.OK, message: "", data: user));
        }

        [HttpGet("get-user/{username}")]
        public async Task<ActionResult<MemberDto>> GetUserByUserName(string username)
        {
            var currentUsername = User.GetUserName();
            return await _uow.UserRepository.GetMemberAsync(username, isCurrentUser: currentUsername == username);
        }

        [HttpGet("check-username/{username}")]
        public async Task<ActionResult<MemberDto>> CheckUsername(string username)
        {
            var isExist = await _uow.UserRepository.CheckUsername(username);
            if(!isExist)
            {
                return Ok(new ApiResponse<bool>(statusCode: (int)StatusCodeEnum.OK, message: "User Name is available", data: true));
            }
            return BadRequest(new ApiResponse<bool>(statusCode: (int)StatusCodeEnum.BadRequest, message: "User Name is taken", data: false));
        }
    }
}
