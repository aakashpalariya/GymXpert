using AutoMapper;
using Data.Entities;
using Dtos;

namespace Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<RegisterDto, User>();

            CreateMap<GymDto, Gym>();
            CreateMap<Gym, GymDto>();

            CreateMap<DateTime, DateTime>().ConvertUsing(d => DateTime.SpecifyKind(d, DateTimeKind.Utc));
            CreateMap<DateTime?, DateTime?>().ConvertUsing(d => d.HasValue ? DateTime.SpecifyKind(d.Value, DateTimeKind.Utc) : null);

            CreateMap<Gym, SelectOptionDto<int>>()
                .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.GymId))
                .ForMember(dest => dest.Label, opt => opt.MapFrom(src => src.Name));

            CreateMap<MemberDto, User>()
                .ForMember(dest => dest.DateOfBirth, opt => opt.MapFrom(src => DateOnly.FromDateTime(src.DateOfBirth)));

            CreateMap<User, MemberDto>()
                .ForMember(dest => dest.MemberId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.DateOfBirth, opt => opt.MapFrom(src => src.DateOfBirth.ToDateTime(TimeOnly.MinValue)));

            CreateMap<PlanDto, Plan>();
            CreateMap<Plan, PlanDto>();
            CreateMap<PlanDurationDto, PlanDuration>();
            CreateMap<PlanDuration, PlanDurationDto>();

            CreateMap<Country, MasterDto>();
            CreateMap<MasterDto, Country>();

            CreateMap<State, MasterDto>();
            CreateMap<MasterDto, State>();

            CreateMap<State, SelectOptionDto<string>>()
                .ForMember(dest => dest.Value, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Label, opt => opt.MapFrom(src => src.Name));

        }
    }
}
